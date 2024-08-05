import qs from "qs";
import { getLocalStorage } from "./tool";

// 定義 RequestOptions 類型
interface RequestOptions {
  data?: any;
  token?: string;
  headers?: Record<string, string>;
  isDefault?: boolean;
  [key: string]: any; // 其他配置
}

// 定義 HttpResponse 類型
interface HttpResponse {
  code?: string;
  [key: string]: any;
}

// 定義 requestHttp 函數
export const requestHttp = (
  endStr: string,
  { data, token, headers, ...config }: RequestOptions = {}
): Promise<HttpResponse> => {
  const initConfig: RequestInit & { isDefault?: boolean } = {
    method: "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "X-ESG-Auth": getLocalStorage({ localStorageKey: "token" }) || "",
      ...headers,
    },
    ...config,
  };

  // 確保 initConfig.method 不會是 undefined
  if (!initConfig.method) {
    initConfig.method = "GET";
  }

  if (initConfig.method.toUpperCase() === "GET") {
    endStr +=
      data && Object.keys(data).length > 0 ? `?${qs.stringify(data)}` : "";
  } else {
    if (data instanceof FormData) {
      initConfig.body = data;
    } else {
      if (!initConfig.headers) {
        initConfig.headers = {};
      }
      (initConfig.headers as Record<string, string>)["Content-Type"] =
        "application/json";
      initConfig.body = JSON.stringify(data || {});
    }
  }

  const url = initConfig?.isDefault
    ? process.env.NEXT_PUBLIC_API_DEFAULT
    : process.env.NEXT_PUBLIC_API;

  return fetch(url + `/${endStr}`, initConfig)
    .then(async (res) => {
      if (res.ok) {
        const response: HttpResponse = await res.json();
        if (response.code === "401101") {
          // const locale = Cookies.get('NEXT_LOCALE') || 'en';
          // Cookies.remove('esg-token');
          // return window.location.replace(`/${locale}/login`);
        }
        return response;
      } else {
        return Promise.reject(await res.json());
      }
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};
