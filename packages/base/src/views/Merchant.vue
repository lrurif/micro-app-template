<template>
    <div class="home">
        <micro-app name='merchant' :url='url' baseroute='/micro/merchant' @datachange='handleDataChange'>
        </micro-app>

    </div>
</template>
  
<script lang="ts" setup>
const url = process.env.NODE_ENV === 'development' ? 'http://localhost:9003/merchant/' : '';
const handleDataChange = (e: unknown) => {
    console.log(e, 'handleDataChange')
}
</script>
  