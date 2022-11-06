const path = require("path");
const resolve = (dir) => path.join(__dirname, ".", dir);
const plugins = require("@monorepo/share/build/plugins");
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
    publicPath: "/data-center/",
    devServer: {
        open: false,
        port: 9002,
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
        if (process.env.NODE_ENV === "production") {
            // 移除 prefetch 插件
            config.plugins.delete("prefetch");
        }

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
        plugins,
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
    // productionSourceMap: false, // 关闭生产环境的sourceMap
};
