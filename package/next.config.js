

//原本的
//next.config.js
// module.exports = {
//   async redirects() {
//     return [
//       {
//         source: "/",
//         destination: "/authentication/login", 
//         permanent: false,
//       },
//     ];
//   },
// };

//部屬版本
/** @type {import('next').NextConfig} */
const nextConfig = {
  // ① 讓首頁自動導向登入頁
  async redirects() {
    return [
      { source: '/', destination: '/authentication/login', permanent: true },
    ];
  },

  // ② 在 Vercel 上透過 rewrites() 代理 API
  //    這樣前端可以打 /api/**，由 Next 伺服器轉發到你的後端 IP
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://124.218.37.141:8081/:path*', // 你的實際後端
      },
    ];
  },
};

module.exports = nextConfig;

