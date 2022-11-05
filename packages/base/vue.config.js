const path = require("path");
const AutoImport = require("unplugin-auto-import/webpack");
const Components = require("unplugin-vue-components/webpack");
const { ElementPlusResolver } = require("unplugin-vue-components/resolvers");
const unpluginElementPlus = require("unplugin-element-plus/webpack");
const resolve = (dir) => path.join(__dirname, ".", dir);
const SERVER_Url = (() => {
    let env = "dev";
    let envMap = {
        dev: "https://dev.gateway.iuctrip.com",
        fat: "https://fat.gateway.iuctrip.com",
        prod: "https://gateway.iuctrip.com",
    };
    return envMap[env];
})();
module.exports = {
    publicPath: "/micro/",
    devServer: {
        open: true,
        port: 9001,
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
        proxy: {
            [process.env.VUE_APP_BASE_URL]: {
                target: SERVER_Url, //API服务器的地址
                ws: true, //代理websockets
                changeOrigin: true,
                pathRewrite: {
                    [`^${process.env.VUE_APP_BASE_URL}`]: "",
                },
            },
        },
    },
    chainWebpack: (config) => {
        config.module
            .rule("vue")
            .use("vue-loader")
            .tap((options) => {
                options.compilerOptions = {
                    ...(options.compilerOptions || {}),
                    isCustomElement: (tag) => /^micro-app/.test(tag),
                };
                return options;
            });
    },
    configureWebpack: {
        plugins: [
            AutoImport({
                resolvers: [ElementPlusResolver()],
                imports: ["vue", "vue-router", "pinia"],
            }),
            Components({
                dirs: ["src/components"],
                extensions: ["vue"],
                deep: true,
                version: 3,
                resolvers: [ElementPlusResolver()],
            }),
            unpluginElementPlus()
        ],
        resolve: {
            extensions: [".js", ".vue", ".json"],
            alias: {
                "@": resolve("src"),
                assets: resolve("src/assets"),
            },
        },
    },
    css: {
        loaderOptions: {
            sass: {
                prependData: `@import "@monorepo/share/style/index.scss";`, // 全局导入scss混入
            },
        },
    },
};
