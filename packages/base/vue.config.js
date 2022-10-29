// const Icons = require("unplugin-icons/webpack");
const path = require("path");
const AutoImport = require("unplugin-auto-import/webpack");
const Components = require("unplugin-vue-components/webpack");
const { ElementPlusResolver } = require("unplugin-vue-components/resolvers");
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
            AutoImport({
                resolvers: [ElementPlusResolver()],
            }),
            Components({
                dirs: ["src/components"],
                extensions: ["vue"],
                deep: true,
                version: 3,
                resolvers: [ElementPlusResolver()],
            }),
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
