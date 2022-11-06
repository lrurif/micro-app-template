<template>
    <div>数据看板</div>
    <el-input v-model="inputValue" />
    <el-button @click="handleClick">发送</el-button>
</template>
<script lang="ts" setup>
import { ref, inject } from "vue";
const inputValue = ref("");
const eventBus:any = inject("eventBus");
const handleClick = () => {
    document.querySelector("input").focus();
    console.log(eventBus, 'eventBus');
    eventBus.emit("hide", '123', '123')
};
</script>
<style lang="scss"></style>
