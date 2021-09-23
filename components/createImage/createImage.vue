<template>
	<view class="main">
		<canvas
				class="canvas"
				id="__createImage_canvas__"
				canvas-id = '__createImage_canvas__'
		></canvas>
		<canvas
				:style="style"
				class="__canvas"
				id="__canvas_qrcode__"
				canvas-id="__canvas_qrcode__"
		></canvas>
	</view>
</template>


<script>
	import createImage from './createImage.js';
	export default createImage;
</script>

<style lang='less' scoped>
	@import url("./createImage.less");
</style>
