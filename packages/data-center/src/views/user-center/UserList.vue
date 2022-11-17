<template>
    用户列表:{{name}}
</template>
<script lang="ts" setup>
import { ref } from "vue"
import { useRoute } from "vue-router"
const name = ref("")
const route = useRoute();
name.value = route.query.name as string;

console.log(route.query, route.params);
</script>