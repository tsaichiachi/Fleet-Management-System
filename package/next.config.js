// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// };

// module.exports = nextConfig;


// next.config.js
module.exports = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/driver-management", // 替換為你希望的默認頁面路徑
        permanent: false,
      },
    ];
  },
};