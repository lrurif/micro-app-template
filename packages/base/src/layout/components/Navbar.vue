<template>
    <div class="nav flex jc-between ai-center">
        <div
            class="nav__left flex jc-center ai-center"
            @click="navigateToIndex"
        >
            <img src="@/assets/logo.png" class="logo" />
            <span class="merchant-name">商户名称</span>
        </div>
        <el-dropdown trigger="click" @command="handleDropClick">
            <img
                class="user-avatar"
                src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80"
            />
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item command="index">首页</el-dropdown-item>
                    <el-dropdown-item command="user-center"
                        >个人中心</el-dropdown-item
                    >
                    <el-dropdown-item divided command="logOut">
                        退出登录
                    </el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>
<script lang="ts" setup>
import { mainStore } from "@/store";
import microApp from "@micro-zoe/micro-app";
import { useRouter } from "vue-router";
const store = mainStore();

const router = useRouter();
const loginOut = () => {
    microApp.setData("dataCenter", {
        type: "destroy",
    });
    store.setToken("");
    router.push({
        name: "login",
    });
};
const navigateToIndex = () => {
    router.push("/");
};
const handleDropClick = (command) => {
    console.log(command);
    switch (command) {
    case "index":
        break;
    case "user-center":
        break;
    case "logOut":
        loginOut();
        break;
    }
};
</script>
<style lang="scss" scoped>
.nav {
    padding: 10px 20px;
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
    .user-avatar {
        cursor: pointer;
        width: 40px;
        height: 40px;
        border-radius: 10px;
    }
}
</style>
