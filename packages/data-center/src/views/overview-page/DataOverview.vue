<template>
    <div>
        <div>数据看板</div>
        <el-input v-model="inputValue" />
        <el-button @click="handleClick">发送</el-button>
    </div>
</template>
<script lang="ts" setup>
import { ref, inject } from "vue";
import { useRouter } from "vue-router";
const inputValue = ref("");
const eventBus: any = inject("eventBus");
const router = useRouter();

const handleClick = () => {
    router.push({
        name: "userList",
    });
    document.querySelector("input").focus();
    console.log(eventBus, "eventBus");
    eventBus.emit("hide", "123", "123");
};
</script>
<style lang="scss"></style>
