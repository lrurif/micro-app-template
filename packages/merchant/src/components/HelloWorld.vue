<template>
    <div class="hello">
    </div>
</template>

<script lang="ts">
import { useSlots } from "vue";

export default {
    setup() {
        let slots = useSlots();
        console.log(slots.default(), '1123')
        console.log(slots.name(), '1123')
        let func = function() {
            // 在这里面做处理，筛选掉不需要的dom
            console.log(slots.name()[0])
            return [ slots.name(), slots.default()]
        }
        return func
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
    margin: 40px 0 0;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}

a {
    color: #42b983;
}
</style>
