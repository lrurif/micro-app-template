<template>
    <div>
        <span>图片地址（图片需支持跨域）：</span><input type="text" id="text" />
        <span>马赛克大小：</span><input type="number" id="number" />
        <span>文件名+后缀：</span><input type="text" id="fileName" />
        <button @click="upload">打马赛克</button>
    </div>
</template>
<script lang="ts" setup>
const upload = () => {
    let text: HTMLInputElement = document.querySelector("#text")
    let blockSize: HTMLInputElement = document.querySelector("#number")
    let fileName: HTMLInputElement = document.querySelector("#fileName")
    let img: HTMLImageElement = document.createElement("img")
    img.crossOrigin = "anonymous"
    img.setAttribute("crossOrigin", "anonymous")
    img.src = text.value;
    let wrapper = document.createElement("div")
    wrapper.classList.add("flex")
    img.onload = () => {
        let canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        wrapper.append(canvas)
        let ctx = canvas.getContext("2d")
        drawImage(ctx, img)
        initMaSaiKe(ctx, +blockSize.value)
        document.body.append(wrapper)
        creatMaSaiKeImage(ctx, wrapper, fileName.value)
    }
    wrapper.append(img);
}
function drawImage(ctx, img) {
    ctx.drawImage(img, 0, 0, img.width, img.height)
}
function initMaSaiKe(ctx, blockWidth) {
    let pixeArr = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height).data;
    for (let i = 0; i < ctx.canvas.width; i += blockWidth) {
        for (let j = 0; j < ctx.canvas.height; j += blockWidth) {
            let p = (i + j * ctx.canvas.width) * 4;
            ctx.fillStyle = `rgba(${pixeArr[p]}, ${pixeArr[p + 1]}, ${pixeArr[p + 2]}, ${pixeArr[p + 3]})`
            ctx.fillRect(i, j, blockWidth, blockWidth)
        }
    }

}
function creatMaSaiKeImage(ctx, wrapper, fileName) {
    let img = new Image();
    img.src = ctx.canvas.toDataURL("image/png");
    wrapper.append(img)
    let a = document.createElement("a")
    a.download = fileName;
    a.href = img.src;
    wrapper.append(a)
    a.click();
    a.remove();
}
</script>
