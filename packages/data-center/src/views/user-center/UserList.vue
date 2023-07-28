<template>
    用户列表:{{ name }}
    <span @click="increasment">
        {{ count }}
    </span>
    {{ a }}
    <Suspense>
        <AsyncComp></AsyncComp>
        <template #fallback>
            <div>组件加载中</div>
        </template>
    </Suspense>
</template>
<script lang="ts">
export default {
    name: "otherUserList",
    inheritAttrs: false,
}
</script>
<script lang="ts" setup>
import {
    ref,
    defineAsyncComponent,
    computed,
    shallowReactive,
    readonly,
    toRef,
    defineProps,
    toRaw,
} from "vue";
import { useRoute, useLink } from "vue-router";
const name = ref("");
const route = useRoute();
const props = defineProps<{
    name: string
    age: number
}>();
console.log(
    useLink({
        to: route,
    }).route.value,
    "内容"
);
const obj = shallowReactive({
    count: {
        value: 1,
    },
});

console.log(window.name1);
let rawCount = ref<number>(1);
console.log(toRaw(obj), '1');
let a = toRef({
    name: '哈哈哈'
}, 'name')
console.log(a);
setTimeout(() => {
    a.value = 'show me'
}, 200)
const increasment = () => {
    obj.count.value++;
    console.log(obj.count);
};
let count = computed({
    get: () => obj.count.value,
    set: () => {
        console.log(123);
    },
});

const AsyncComp = defineAsyncComponent(() => {
    return new Promise((resolve) => {
        setTimeout(() => {
            import("./asyncCom.vue").then((res) => {
                resolve(res);
            });
        }, 3000);
    });
});
name.value = route.query.name as string;

console.log(route.query, route.params);
</script>
