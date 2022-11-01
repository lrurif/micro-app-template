<template>
    <div class="home">
      <home-layout></home-layout>
      <Breadcrumb></Breadcrumb>
      <router-view></router-view>
    </div>
</template>

<script lang="ts" setup>
import HomeLayout from "@/layout/index.vue"
import Breadcrumb from "@/layout/components/Breadcrumb.vue"
</script>
