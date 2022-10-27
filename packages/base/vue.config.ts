// const Icons = require("unplugin-icons/webpack");
module.exports = {
  publicPath: "/micro/",
  devServer: {
    port: 9001,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  configureWebpack: {
    plugins: [
      //   Icons({
      //     compiler: "vue3",
      //     // 自动安装
      //     autoInstall: true,
      //   }),
    ],
  },
};
