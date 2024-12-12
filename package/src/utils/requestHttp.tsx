import qs from "qs";

interface RequestOptions {
  data?: any;
  token?: string;
  headers?: Record<string, string>;
  [key: string]: any; // 用於擴展其他配置
}

interface HttpResponse {
  code: string;
  [key: string]: any; // 用於擴展其他響應屬性
}

export const requestHttp = (
  endStr: string,
  { data, token, headers, ...config }: RequestOptions = {}
): Promise<HttpResponse> => {
  const initConfig: RequestInit & { isDefault?: boolean } = {
    method: "GET",
    headers: {
      ...headers,
      // 如果需要，取消下面的註釋以加入 token
      // Authorization: token ? `Bearer ${token}` : "",
      // "X-ESG-Auth": getLocalStorage({ localStorageKey: "token" }) || "",
    },
    ...config,
  };

  // 確保 initConfig.method 不會是 undefined
  initConfig.method = initConfig.method || "GET";

  // 根據請求方法處理數據
  if (initConfig.method.toUpperCase() === "GET") {
    endStr +=
      data && Object.keys(data).length > 0 ? `?${qs.stringify(data)}` : "";
  } else {
    if (data instanceof FormData) {
      initConfig.body = data;
    } else {
      (initConfig.headers as Record<string, string>)["Content-Type"] =
        "application/json";
      initConfig.body = JSON.stringify(data || {});
    }
  }

     //console.log(process.env.NEXT_PUBLIC_API_BASE_URL);
     const url = initConfig.isDefault
       ? process.env.NEXT_PUBLIC_API_BASE_URL || ""
       : "http://218.35.172.213:8082";

  // 調試信息，檢查 URL 和配置
  //console.log("Request URL:", url + `/${endStr}`);
  //console.log("Request Config:", initConfig);

  return fetch(url + `/${endStr}`, initConfig)
    .then(async (res) => {
      if (res.ok) {
        const response: HttpResponse = await res.json();
        if (response.code === "401101") {
          // 處理未授權錯誤，根據需求更新
          // const locale = Cookies.get('NEXT_LOCALE') || 'en';
          // Cookies.remove('esg-token');
          // window.location.replace(`/${locale}/login`);
        }
        return response;
      } else {
        const errorResponse = await res.json();
        return Promise.reject(errorResponse);
      }
    })
    .catch((error) => {
      console.error("Request failed:", error);
      return Promise.reject(error);
    });
};
