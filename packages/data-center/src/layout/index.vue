<template>
    <div
        class="home-wrapper flex"
        ref="home"
        style="height: calc(100vh - 60px)"
    >
        <Sidebar :isCollapse="isCollapse"></Sidebar>
        <div class="main-content flex-column">
            <Breadcrumb @toggle="toggleStatus"></Breadcrumb>
            <div class="content">
                <slot></slot>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { Sidebar, Breadcrumb } from "./components";
import { ref } from "vue";
const home = ref(null);
const toggleStatus = () => {
    isCollapse.value = !isCollapse.value;
};
const isCollapse = ref(false);
</script>
<style lang="scss" scoped>
.home-wrapper {
    .main-content {
        flex: 1;
        min-width: 0;
        .content {
            flex: 1;
            padding: 20px;
            min-height: 0;
        }
    }
}
</style>
