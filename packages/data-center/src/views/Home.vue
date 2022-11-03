<template>
    <div class="home">
        <home-layout>
            <router-view></router-view>
        </home-layout>
    </div>
</template>

<script lang="ts" setup>
import HomeLayout from "@/layout/index.vue";
import empty from "@/layout/empty.vue"
</script>
