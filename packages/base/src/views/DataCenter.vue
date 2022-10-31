<template>
    <div class="home">
        <main-wrapper></main-wrapper>
        <micro-app
            name="dataCenter"
            :url="url"
            baseroute="/micro/data-center"
            @datachange="handleDataChange"
        >
        </micro-app>
    </div>
</template>

<script lang="ts" setup>
import mainWrapper from "@/layout/index.vue";

import microApp from "@micro-zoe/micro-app";
import { useRouter } from "vue-router"
microApp.setData("dataCenter", { type: "新的数据" });
const url: string =
    process.env.NODE_ENV === "development"
        ? "http://localhost:9002/data-center"
        : "";

const handleDataChange = (e: unknown) => {
    console.log(e, "handleDataChange");
};
console.log(useRouter(), 'useRouter')
</script>
