<template>
    <div class="home">
        <micro-app name='dataCenter' :url='url' baseroute='/micro/data-center' @datachange='handleDataChange'>
        </micro-app>

    </div>
</template>
  
<script lang="ts" setup>
const url: string = process.env.NODE_ENV === 'development' ? 'http://localhost:9002/data-center' : '';
const handleDataChange = (e: unknown) => {
    console.log(e, 'handleDataChange')
}
</script>
  