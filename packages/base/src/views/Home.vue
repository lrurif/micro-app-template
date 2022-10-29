<template>
    <div class="home">
        <div id="nav">
            <el-button type="primary" @click="loginOut">退出</el-button>
            {{ token }}
            <router-link to="/">基座首页</router-link> |
            <router-link to="/data-center/">数据中心</router-link> |
            <router-link to="/merchant/">商户中心</router-link>
        </div>
        {{ url }}
    </div>
</template>

<script lang="ts" setup>
import { mainStore } from "@/store";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
const url =
    process.env.NODE_ENV === "development"
        ? "http://localhost:8888/popularize"
        : "http://www.finget.xyz/popularize";
const store = mainStore();

const router = useRouter();
const loginOut = () => {
    store.setToken("");
    router.push({
        name: "login",
    });
};
const { token } = storeToRefs(store);
</script>
