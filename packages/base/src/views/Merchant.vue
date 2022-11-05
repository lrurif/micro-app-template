<template>
    <div class="home">
        <main-wrapper>
            <micro-app
                @beforemount="hideLoading"
                @catch="hideLoading"
                name="merchant"
                :url="url"
                baseroute="/micro/merchant"
                @datachange="handleDataChange"
            >
            </micro-app>
        </main-wrapper>
    </div>
</template>

<script lang="ts" setup>
import mainWrapper from "@/layout/index.vue";

import { ElLoading } from "element-plus";
const loading = ElLoading.service({
    lock: true,
    text: "创建应用中...",
    background: "rgba(0, 0, 0, 0.7)",
});
const hideLoading = () => {
    loading.close();
};
const url: string =
    process.env.NODE_ENV === "development"
        ? "http://localhost:9003/merchant"
        : "";

const handleDataChange = (e: unknown) => {
    console.log(e, "handleDataChange");
};
</script>
<style></style>
