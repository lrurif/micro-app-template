<template>
    <div class="nav-header flex ai-center">
        <i
            class="iconfont icon-side"
            @click="toggleOpenStatus"
            :class="[isOpen ? 'rotate' : '']"
        ></i>
        <el-breadcrumb separator="/">
            <transition-group name="breadcrumb">
                <el-breadcrumb-item
                    v-for="item in breadList"
                    :key="item.name"
                    :to="item"
                    ><span>{{ item.meta.name }}</span></el-breadcrumb-item
                >
            </transition-group>
        </el-breadcrumb>
    </div>
</template>
<script lang="ts" setup>
import { useRoute } from "vue-router";
import { watch, ref, onMounted, defineEmits } from "vue";
const route = useRoute();
let breadList = ref([]);
let isOpen = ref(true);
const emits = defineEmits(["toggle"]);
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
        return item?.meta?.name;
    });
}
const toggleOpenStatus = () => {
    isOpen.value = !isOpen.value;
    emits("toggle");
};
</script>
<style lang="scss" scoped>
.nav-header {
    background-color: #fff;
    box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
    position: relative;
    .icon-side {
        padding: 16px;
        cursor: pointer;
        &:hover {
            background: rgba(0, 0, 0, 0.025);
        }
    }
}
.el-breadcrumb__item {
    float: left;
    display: inline-block;
}
.rotate.icon-side {
    transform: rotate(180deg);
}
</style>
