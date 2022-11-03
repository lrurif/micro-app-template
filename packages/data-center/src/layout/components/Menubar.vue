<template>
    <template v-for="route in routes" :key="route.name">
        <template v-if="route.children && route.children.length > 0">
            <el-sub-menu :index="route.name">
                <template #title>
                    <el-icon
                        ><i :class="['iconfont', route?.meta.icon]"></i
                    ></el-icon>
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
    </template>
</template>
<script lang="ts" setup>
import { defineProps, withDefaults } from "vue";
import { useRouter, RouteRecordRaw } from "vue-router";
interface Props {
    routes: RouteRecordRaw[];
}

const props = withDefaults(defineProps<Props>(), {
    routes: () => [],
});
const router = useRouter();
const handleMenuClick = (instance) => {
    router.push({
        name: instance.index,
    });
};
</script>
<style lang="scss"></style>
