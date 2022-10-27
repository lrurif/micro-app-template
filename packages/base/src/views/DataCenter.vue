<template>
    <div class="home">
        <micro-app name="dataCenter" :url="url" baseroute="/micro/data-center" @datachange="handleDataChange">
        </micro-app>
    </div>
</template>

<script lang="ts">
import microApp from "@micro-zoe/micro-app";
microApp.setData("dataCenter", { type: "新的数据" });
const url: string =
    process.env.NODE_ENV === "development"
        ? "http://localhost:9002/data-center"
        : "";
const handleDataChange = (e: unknown) => {
    console.log(e, "handleDataChange");
};
export default {
    setup() {
        return {
            handleDataChange,
            url,
        };
    },
};
</script>
