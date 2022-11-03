<template>
    <div class="home-wrapper flex-column">
        <Navbar></Navbar>
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>
<script lang="ts" setup>
import Navbar from "./components/Navbar.vue";
</script>
<style lang="scss" scoped>
.home-wrapper {
    width: 100vw;
    height: 100vh;
    .content {
        flex: 1;
        min-height: 0;
    }
}
</style>
