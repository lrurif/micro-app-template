<template>
    <div class="home">
        <div class="nav flex jc-between ai-center">
            <div class="nav__left flex jc-center ai-center" @click="navigateToIndex">
                <img src="../assets/logo.png" class="logo" />
                <span class="merchant-name">商户名称</span>
            </div>
            <el-button type="primary" @click="loginOut">退出</el-button>
        </div>
        <div class="content">
            <div class="app-wrapper flex ai-center">
                <div class="app-block flex ai-center jc-center">
                    <router-link to="/data-center/">数据中心</router-link>
                </div>
                <div class="app-block flex ai-center jc-center">
                    <router-link to="/merchant/">商户中心</router-link>
                </div>
                <div class="app-block flex ai-center jc-center">
                    <router-link to="/404">404</router-link>
                </div>
            </div>
        </div>
        <empty></empty>
    </div>
</template>

<script lang="ts" setup>
import { mainStore } from "@/store";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import empty from "@/layout/empty.vue"
const store = mainStore();

const router = useRouter();
const loginOut = () => {
    store.setToken("");
    router.push({
        name: "login",
    });
};
const { token } = storeToRefs(store);
const navigateToIndex = () => {
    router.push("/")
}
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
.app-wrapper {
    flex-wrap: wrap;
}
.app-block {
    width: 200px;
    height: 200px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
    margin: 20px 20px 20px 20px;
    border-radius: 10px;
    flex-shrink: 0;
}
</style>
