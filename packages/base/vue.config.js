// const Icons = require("unplugin-icons/webpack");
const path = require("path");
const resolve = (dir) => path.join(__dirname, ".", dir);
module.exports = {
    publicPath: "/micro/",
    devServer: {
        open: true,
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
        resolve: {
            extensions: [".js", ".vue", ".json"], //这个是匹配扩展名的
            alias: {
                "@": resolve("src"), //src解析成@
                assets: resolve("src/assets"), // src/assets解析成assets
            },
        },
    },
};
