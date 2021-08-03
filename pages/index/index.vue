<template>
	<create-image
		class='page'
		:items='images'
		@success="test"
	></create-image>
</template>

<script>
	import createImage from '../../components/createImage/createImage.vue'
	import imageHandler from '../../lib/imageHandler';
	export default {
		components:{createImage},
		data() {
			return {
				images:[
					{type:'img',x:0,y:0,src:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fq_70%2Cc_zoom%2Cw_640%2Fimages%2F20190416%2Fd7bde5362c48486ca34c35ccf73b761c.jpeg&refer=http%3A%2F%2F5b0988e595225.cdn.sohucs.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1630551747&t=62d07b1c5f1b2679c640bbe59e82bd67',width:750,height:400},
					{type:'img',x:0,y:400,src:'/static/logo.png',width:100,height:100},
					{type:'text',x:30,y:30,text:'test123',color:'red',fontSize:40,lineWidth:5},
					{type:'qrcode',x:0,y:500,src:'http://www.baidu.com?id=1',color:'#ccc,#fff',width:375,height:375}
				]
			}
		},
		onLoad() {

		},
		methods: {
			async test(src){

				await imageHandler.saveImgToAlbum(src);

				console.log('save');
			}
		}
	}
</script>

<style>
	page{
		width: 100%; height: 100%;
	}
	.page{
		width: 100%; height: 100%; display: block;
	}
</style>
