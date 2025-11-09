//測試部屬使用

import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // 檢查是否有 token（根據你的實際 token 存儲方式調整）
  const token =
    request.cookies.get("authToken")?.value ||
    request.cookies.get("esg-token")?.value; // 根據你實際使用的 cookie 名稱

  // 公開路徑，不需要身份驗證
  const publicPaths = [
    "/authentication/login",
    "/authentication/register",
    "/api", // API 路徑也要排除
  ];

  const isPublicPath = publicPaths.some((path) => pathname.startsWith(path));

  // 靜態資源和 Next.js 內部路徑，直接通過
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/static") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // 根路徑重定向
  if (pathname === "/") {
    if (token) {
      // 如果已登入，重定向到主要功能頁面
      return NextResponse.redirect(new URL("/driver-management", request.url));
    } else {
      // 如果未登入，重定向到登入頁面
      return NextResponse.redirect(
        new URL("/authentication/login", request.url)
      );
    }
  }

  // 如果沒有 token 且不在公開路徑，重定向到登入
  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL("/authentication/login", request.url));
  }

  // 如果有 token 且在登入頁面，重定向到儀表板
  if (token && pathname === "/authentication/login") {
    return NextResponse.redirect(new URL("/driver-management", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * 匹配除了以下路徑之外的所有請求：
     * - api (API 路由)
     * - _next/static (靜態文件)
     * - _next/image (圖片優化文件)
     * - favicon.ico (favicon 文件)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
