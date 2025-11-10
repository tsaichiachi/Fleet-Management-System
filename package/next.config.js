

//原本的
//next.config.js
module.exports = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/authentication/login", 
        permanent: false,
      },
    ];
  },
};



