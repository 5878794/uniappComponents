<template>
	<view class='slide_btn box_hcc'>
		<text class='slide_btn_text'>{{title}}</text>
		<view class='slide_btn_btn box_hcc'
			:class='animateClass'
			:style='styleX'
			@touchstart='startFn'
			@touchmove="moveFn"
			@touchend="endFn"
			@touchcancel="endFn"
		>
			<image class='slide_btn_btn_icon' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAcCAMAAAA6Aj1XAAAAqFBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8j1z1tAAAAN3RSTlMABB0gJiksLS40ODk8PT5AQ0VHTU5PUFFTVVZXWFlaW15kZWZnaGlseHl6e3zs7e7z9PX6+/z9k32+DAAAAPVJREFUOMuVk0cWgzAQQ0nvpJJGem+kAEb3v1kWGI/HacQrLf6TZHvGyixrVnIWLSXdrsXOHmIs5QxYSdkBDgyrBhCjWBbuwDqWWQ84Ms4hrvFQXNEz/ZxQ5daJK71wvQDCjaWtcVfgxLhBgCjhfGBDHO/XDxFNqJ/kyp7p5/DchHubO6Xc7cdcgWgmc31gR35n7kf9muRXvpncMFS5Te5n9BOI5tRP4y6MOwHIx3INoCJTAPzvNgzVXb90S3dT7d3sz+9m/IJGHX//6Y33Sjch6eatl2qKtF0wEg/vN8v22SboVJ2oEu1LzpzHHW29qyirbWzfE4VXQVr9srTaAAAAAElFTkSuQmCC'></image>
			<view class='box_hcc animate2 showText' :class='showTextClass'>
				<text class='showTextText'>{{title}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				styleX:'width:200rpx',
				animateClass:'',
				showTextClass:''
			}
		},
		props:{
			title:{
				type:String,
				value:''
			}
		},
		async mounted(){
			this.points = [];
			this.isTouchStart = false;
			this.width = 100;
			this.minEndWidth = 270;
			this.isComplate = false;
		},
		methods:{
			startFn(e){
				if(this.isComplate){return}

				this.isTouchStart = true;
				this.points = [];
				let point = this.getPointXY(e);
				this.points.push(point);
			},
			moveFn(e){
				if(!this.isTouchStart){return;}

				let point = this.getPointXY(e);
				this.points.push(point);

				this.handlerBtn();
			},
			endFn(){
				this.isTouchStart = false;

				//获取最后的长度
				if(this.width > this.minEndWidth){
					//触发成功
					//自动填满
					this.animateBtn(375);
					this.triggerCallBack();
					this.isComplate = true;
					this.showTextClass = 'showText1';
				}else{
					//回退到初始状态
					this.goBack();
					// this.animateBtn(100);
				}
			},
			getPointXY(e){

				let point = e.changedTouches || [];
				point = point[0] || {};

				let x = point.screenX || point.clientX;

				return x;
			},
			handlerBtn(){
				let points = this.points,
					l = points.length,
					sP = points[l-2],
					eP = points[l-1];
				if(l<2){return;}


				let mX = eP - sP,
					nowWidth = this.width + mX;

				nowWidth = (nowWidth>375)? 375 : nowWidth;
				nowWidth = (nowWidth<100)? 100 : nowWidth;

				this.width = nowWidth;
				this.styleX = 'width:'+this.width+'px';

				// console.log(this.x)
			},
			triggerCallBack(){
				if(this.isRun){
					return;
				}
				this.isRun = true;
				uni.$emit('slideOk',{msg:'ok'})
			},
			animateBtn(width){
				this.animateClass = 'animate1';
				this.width = width;
				this.styleX = 'width:'+this.width+'px';

				setTimeout(()=>{
					this.animateClass = '';
				},200)
			},

			goBack(){
				this.isComplate = false;
				this.showTextClass = '';
				this.isRun = false;
				this.animateBtn(100);
			}
		}
	}
</script>


<style scoped src="@/publish/all_nvue.css"></style>
<style scoped>
	.slide_btn{
		width: 750rpx; height: 110rpx;
		background-color: #B6B6B6;
		padding-left:200rpx;
		position: relative;
	}
	.slide_btn_text{
		color: #fff;  font-size: 32rpx;
		font-weight: bold;
		color: #FFFFFF;
	}
	.slide_btn_btn{
		width: 200rpx; height: 110rpx;
		position: absolute; left:0; top:0;
		background-color: #26BF8E;
	}
	.slide_btn_btn_icon{
		width: 38rpx; height: 28rpx;
		position: absolute; top:41rpx;
		right:80rpx;
	}
	.showText{
		opacity: 0;
	}
	.showTextText{
		color:#ffffff;
	}
	.showText1{
		opacity: 1;
	}
</style>
