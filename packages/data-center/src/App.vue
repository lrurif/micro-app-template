<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
    数据中心页面
  </div>
  <router-view />
</template>
<script lang="ts" setup>
import microApp from '@micro-zoe/micro-app'
// 发送数据给子应用 my-app，setData第二个参数只接受对象类型
const data = window.microApp.getData() // 返回基座下发的data数据
console.log(data);
setTimeout(() => {
  window.microApp.dispatch({type: '子应用发送的数据'})
}, 1000)

</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
