const modulesFiles = require.context("./", true, /^(?!.*index).*ts$/);
const directives = {};
modulesFiles.keys().forEach((key) => {
    const keyName = key.replace(/\.\/(.*)\.ts/, "$1");
    directives[keyName] = modulesFiles(key).default;
});
export default {
    install(vm) {
        Object.entries(directives).forEach(([key, value]) => {
            vm.directive(key, value);
        });
    },
};
