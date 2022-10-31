<template>
    <div class="home">
        <main-wrapper></main-wrapper>
        <div class="content">
            <div class="app-wrapper flex ai-center">
                <div class="app-block flex ai-center jc-center">
                    <router-link to="/data-center/">数据中心</router-link>
                </div>
                <div class="app-block flex ai-center jc-center">
                    <router-link to="/merchant/">商户中心</router-link>
                </div>
                <div class="app-block flex ai-center jc-center">
                    <router-link to="/404">404</router-link>
                </div>
            </div>
        </div>
        <empty></empty>
    </div>
</template>

<script lang="ts" setup>
import empty from "@/layout/empty.vue";
import mainWrapper from "@/layout/index.vue";
</script>
<style lang="scss">
.app-wrapper {
    flex-wrap: wrap;
}
.app-block {
    width: 200px;
    height: 200px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
    margin: 20px 20px 20px 20px;
    border-radius: 10px;
    flex-shrink: 0;
}
</style>
