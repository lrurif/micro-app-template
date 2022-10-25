<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
    {{url}}
  </div>
</template>

<script lang="ts" setup>
import { defineComponent } from "vue";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
const url = process.env.NODE_ENV === 'development' ? 'http://localhost:8888/popularize' : 'http://www.finget.xyz/popularize';
</script>
