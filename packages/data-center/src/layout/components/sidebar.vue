<template>
    <div class="side-bar-wrapper">
        <el-menu :default-active="activeRouteName">
            <Menubar :routes="asyncRoutes"></Menubar>
        </el-menu>
    </div>
</template>
<script lang="ts" setup>
import Menubar from "./Menubar.vue";
import { useMainStore } from "@/store";
import { storeToRefs } from "pinia";
const store = useMainStore();
const { asyncRoutes, activeRouteName } = storeToRefs(store);
</script>
<style lang="scss">
.side-bar-wrapper {
    width: 200px;
}
</style>
