<template>
    <div>
        <el-menu>
            <Menubar :routes="asyncRoutes"></Menubar>
        </el-menu>
    </div>
</template>
<script lang="ts" setup>
import Menubar from "./Menubar.vue";
import { useMainStore } from "@/store";
import { storeToRefs } from "pinia";
const store = useMainStore();
const { asyncRoutes } = storeToRefs(store);
</script>