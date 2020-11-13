const url = "http://localhost:8882/";
module.exports = {
  publicPath: "./",
  devServer: {
    proxy: {
      auth: {
        target: url,
        changeOrigin: true, //是否跨域
        pathRewrite: {
          "^/": "/",
        },
      },
    },
  },
  chainWebpack: (config) => {
    config.externals({
      vue: "Vue",
      "vue-router": "VueRouter",
      vant: "vant",
      "vee-validate": "VeeValidate",
    });
  },
};
