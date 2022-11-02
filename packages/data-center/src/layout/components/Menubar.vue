<template>
    <div>
        <div v-for="route in routes" :key="route.name">
            <template v-if="route.children && route.children.length > 0">
                <el-sub-menu :index="route.name">
                    <template #title>
                        <span>{{ route.meta.name }}</span>
                    </template>
                    <Menubar :routes="route.children"></Menubar>
                </el-sub-menu>
            </template>
            <template v-else>
                <el-menu-item @click="handleMenuClick" :index="route.name"
                    >{{ route?.meta?.name || route.name }}
                </el-menu-item>
            </template>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { defineProps } from "vue";
import { useRouter } from "vue-router";
const props = defineProps({
    routes: Array,
});
const router = useRouter();
const handleMenuClick = (instance) => {
    router.push({
        name: instance.index,
    });
};
</script>
<style lang="scss"></style>
