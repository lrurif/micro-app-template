<template>
    <div class="nav flex jc-between ai-center">
        <div
            class="nav__left flex jc-center ai-center"
            @click="navigateToIndex"
        >
            <img src="@/assets/logo.png" class="logo" />
            <span class="merchant-name">商户名称</span>
        </div>
        <el-button type="primary" @click="loginOut">退出</el-button>
    </div>
</template>
<script lang="ts" setup>
import { mainStore } from "@/store";
import { useRouter } from "vue-router";
const store = mainStore();

const router = useRouter();
const loginOut = () => {
    store.setToken("");
    router.push({
        name: "login",
    });
};
const navigateToIndex = () => {
    router.push("/");
};
</script>
<style lang="scss">
.nav {
    padding: 10px 10px;
    background-color: rgb(7, 18, 77);
    .nav__left {
        cursor: pointer;
        .merchant-name {
            color: #fff;
            margin-left: 10px;
        }
    }
    &__left {
        .logo {
            width: 30px;
            height: 30px;
        }
    }
}
</style>
