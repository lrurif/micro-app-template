<template>
    <div class="side-bar-wrapper">
        <el-menu
            ref="menu"
            :default-active="activeRouteName"
            :collapse="isCollapse"
        >
            <Menubar :routes="sidebarData"></Menubar>
        </el-menu>
    </div>
</template>
<script lang="ts" setup>
import Menubar from "./Menubar.vue";
import { useMainStore } from "@/store";
import { storeToRefs } from "pinia";
import { ref, defineProps } from "vue";
const store = useMainStore();
const { sidebarData, activeRouteName } = storeToRefs(store);
const menu = ref(null);
const props = defineProps({
    isCollapse: Boolean,
});
</script>
<style lang="scss">
.side-bar-wrapper {
    height: 100%;
    .el-menu {
        height: 100%;
    }
    .el-menu--vertical:not(.el-menu--collapse) {
        width: 200px;
    }
}
</style>
