const AutoImport = require("unplugin-auto-import/webpack");
const Components = require("unplugin-vue-components/webpack");
const { ElementPlusResolver } = require("unplugin-vue-components/resolvers");
const unpluginElementPlus = require("unplugin-element-plus/webpack");
const CompressionPlugin = require("compression-webpack-plugin");

const basePlugins = [
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
    unpluginElementPlus(),
];
const prodPlugins = [
    new CompressionPlugin({
        test: /\.js$|\.html$|.\css/, // 匹配文件名
        threshold: 10240, // 对超过10k的数据压缩
        minRatio: 0.8, // 只有压缩率比这个值小的资源才会被处理
        deleteOriginalAssets: true, // 不删除源文件
    }),
];
const devPlugins = [];
const isProd = process.env.NODE_ENV === "production";
const plugins = [...basePlugins, ...(isProd ? prodPlugins : devPlugins)];
module.exports = plugins;
