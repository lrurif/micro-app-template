<template>
    <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="item in breadList" :key="item.name">{{
            item.meta.name
        }}</el-breadcrumb-item>
    </el-breadcrumb>
</template>
<script lang="ts" setup>
import { useRoute } from "vue-router";
import { watch, ref, onMounted } from "vue";
const route = useRoute();
let breadList = ref([]);
onMounted(() => {
    watch(
        route,
        () => {
            breadList.value = getRouteNames(route);
        },
        {
            immediate: true,
        }
    );
});

function getRouteNames(currentRoute) {
    return currentRoute.matched.filter((item) => {
        return item?.meta.name;
    });
}
</script>
