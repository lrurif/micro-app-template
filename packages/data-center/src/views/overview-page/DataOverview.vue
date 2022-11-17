<template>
    <div>
        <div>数据看板</div>
        <el-input v-model="inputValue" v-focus />
        <el-pagination layout="prev, pager, next" :total="size" v-model="pageIndex" @current-change="handleChange" />
        <el-button @click="reduceSize">-1</el-button>
        <el-button @click="addSize">+1</el-button>
        <el-button @click="handleClick">发送</el-button>
        <el-button @click="handleClick" v-permission="['admin']">管理员才展示的按钮</el-button>
    </div>
</template>
<script lang="ts" setup>
import {  ref, inject } from "vue";
import { useRouter } from "vue-router";
const inputValue = ref<string>("");
const eventBus: any = inject("eventBus");
const router = useRouter();

const handleClick = () => {
    router.push({
        name: "userList",
        query: {
            name: "小明",
            age: "123123"
        }
    });
    document.querySelector("input").focus();
    console.log(eventBus, "eventBus");
    eventBus.emit("hide", "123", "123");
};

const size = ref(31);
const reduceSize = () => {
    size.value--;
};
const addSize = () => {
    size.value++;
};
let pageIndex = ref(1);
const handleChange = (...args) => {
    console.log("页数改变了", ...args);
};
</script>
<style lang="scss">

</style>
