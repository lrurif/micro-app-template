<template>
    <div class="home">
        <main-wrapper>
            <micro-app @beforemount="hideLoading" @catch="hideLoading" name="dataCenter" :data="data" :url="url"
                baseroute="/micro/data-center" @datachange="handleDataChange">
            </micro-app>
        </main-wrapper>
    </div>
</template>

<script lang="ts" setup>
import mainWrapper from "@/layout/index.vue";
import { ElLoading } from "element-plus";
import { reactive } from "vue";
import dataCenterEvent from "@/eventCenter/dataCenter";
const loading = ElLoading.service({
    lock: true,
    text: "创建应用中...",
    background: "rgba(0, 0, 0, 0.7)",
});
const hideLoading = () => {
    loading.close();
};
const { origin } = window.location;
const url: string =
    process.env.NODE_ENV === "development"
        ? "http://localhost:9002/data-center"
        : "https://lrurif.com:9002/data-center";

const handleDataChange = (e: unknown) => {
    console.log(e, "handleDataChange");
};
const data = reactive({
    eventBus: dataCenterEvent,
});
</script>
<style>

</style>
