<template>
    <div>
        <el-menu>
            <Menubar :routes="permissionRoutes"></Menubar>
        </el-menu>
    </div>
</template>
<script lang="ts" setup>
import Menubar from "./Menubar.vue";
import { useMainStore } from "@/store";
import { storeToRefs } from "pinia";
const store = useMainStore();
const { permissionRoutes } = storeToRefs(store);
</script>