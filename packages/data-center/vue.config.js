const path = require("path");
const AutoImport = require("unplugin-auto-import/webpack");
const Components = require("unplugin-vue-components/webpack");
const { ElementPlusResolver } = require("unplugin-vue-components/resolvers");
const resolve = (dir) => path.join(__dirname, ".", dir);
module.exports = {
    publicPath: "/data-center/",
    devServer: {
        open: true,
        port: 9002,
        headers: {
            "Access-Control-Allow-Origin": "*",
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
            }),
            Components({
                dirs: ["src/components"],
                extensions: ["vue"],
                deep: true,
                version: 3,
                resolvers: [ElementPlusResolver()],
            }),
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
