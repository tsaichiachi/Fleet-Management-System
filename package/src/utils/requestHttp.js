import qs from "qs";

// 取得 localStorage 裡的 Token（確保只在瀏覽器執行）
const getAuthToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("authToken") || null;
  }
  return null;
};

// 登出並導向登入頁面
const handleTokenExpiration = () => {
  alert("登入過期，請重新登入"); // 顯示彈窗
  localStorage.removeItem("authToken"); // 清除 Token
  window.location.href = "/authentication/login"; // 導向登入頁面
};

// 統一處理 API 請求
export const requestHttp = async (endStr, options = {}) => {
  const { data, token, headers, ...config } = options;

  // 設定請求配置
  const initConfig = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    ...config,
  };

  // 取得 Token 並設定 `Authorization`
  const authToken = token || getAuthToken();
  if (authToken) {
    initConfig.headers["Authorization"] = `Bearer ${authToken}`;
  }

  // 處理 GET 請求參數
  let url = process.env.NEXT_PUBLIC_API_BASE_URL + `/${endStr}`;
  if (initConfig.method.toUpperCase() === "GET" && data) {
    url += `?${qs.stringify(data)}`;
  } else if (data) {
    // 處理非 GET 請求的 body
    if (data instanceof FormData) {
      initConfig.body = data;
      delete initConfig.headers["Content-Type"]; // FormData 不能設定 Content-Type，會自動設定
    } else {
      initConfig.body = JSON.stringify(data);
    }
  }

  try {
    const response = await fetch(url, initConfig);

    // 如果 response 沒有內容，返回空物件
    if (response.status === 204) {
      return {};
    }

    // 嘗試解析 JSON
    let text = await response.text();
    let jsonResponse;
    try {
      jsonResponse = JSON.parse(text);
    } catch (error) {
      console.warn("非 JSON 回應，回應內容:", text);
      jsonResponse = { message: text }; // 轉成物件
    }

   

    // 🔥 檢查 Token 過期
    if (
      response.status === 401 ||
      jsonResponse.code === "401" ||
      (jsonResponse.message &&
        jsonResponse.message.includes("Token has expired"))
    ) {
      handleTokenExpiration();
      return Promise.reject("Token 過期，請重新登入");
    }

    return jsonResponse;
  } catch (error) {
    console.error("請求失敗:", error);
    throw error;
  }
};
