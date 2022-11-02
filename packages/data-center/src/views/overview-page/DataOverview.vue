<template>
    <div>数据看板</div>
    <el-input v-model="inputValue" />
    <el-button @click="handleClick">发送</el-button>
</template>
<script lang="ts" setup>
import { ref } from "vue";
const inputValue = ref("");
const handleClick = () => {
    document.querySelector("input").focus();
};
</script>
<style lang="scss"></style>
