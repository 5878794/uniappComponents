<!-- 顶部模拟导航条   背景透明 -->

<!-- 目前只写咯标题   没写左右的按钮  带slot-->
<!-- 没有测试ios -->


<template>
	<view id='top_nav'>
		<view class='top_nav_top box_hlt'>
			<view class='left_btn box_hlc' @tap='backFn'>
				<block v-if="showBack">
					<image src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAhlJREFUaEPtmUtPFEEQgL/lRwIhhChvNChvQRBBUJT3GxXQGEKI3kzg5gFvHOBmwk0P3PDgDRJOpJOuxHRq2cxszywV6NvMzsx+33R3TVd1AeOtYJyfe4EIPTgKVAFjaZ5V6R4YASY8+HgaiUoKPAdeB289sUSlBAaBqQD+N1ANnCQZSpUQGADeBZDnHv5nEnh3bd4CfcBMAHnh4Q+Swuct0APMKZA1wLc08HkKdAELCmQT8CktfF4CncCyAvkEWCkHPg+Bx8CqAulCaBiFUrlkOYkfAWsK1RtgOBWtclNWAu3AhvJ/S4CbD9FaFgKtwAeFcBtojkbuHxRbwAFuKpBfgdrY8LEncSPg3nLY9v2H6vI2CzwAPiuAhx7+bxbwsXqgAfiiAB57+D9ZwccQqAd2FMBTD/8rS/hyBeqAXQXwzMMfZQ1fjoCLKHsK4D8P/yMP+LQCLulwYTFsVx7+e17wd1bAiZseQjJCTE9ikTAdRkXC9IdMJB4WSQ1NLCVEwuW3W1YXc8LdAnxUJEwsp4W7DXivSJhIaIS7A1hXJEyklMJdrCJhIqkXiWI1IRNlFZF4Ciwqw8lEYUu4u4F5RcJEaVG4e4FZRcJEcVe4+4HpQMJMeV24nwFvAwkzGxzCPQS4cPp/M7PFJNCuwDsZSJjZ5BPuF8Arf5AY3t0XuzaqBJmSp156DpMb3SXtSl1wG3qgFOONv5sXuAYs2mYxCnfniAAAAABJRU5ErkJggg=="></image>
				</block>
			</view>
			<view class='boxflex1 box_hcc'>{{title}}</view>
			<view class='right_btn'></view>
		</view>
		<slot></slot>
	</view>
</template>

<script>
	import sys from '../lib/sys.js';
	
	export default {
		name:"top-nav",
		props:{
			title:{
				type:String,
				value:''
			},
			showBack:{
				type:Boolean,
				value:false
			}
		},
		mounted(){

		},
		data() {
			return {
				
			};
		},
		methods:{
			backFn(){
				if(this.showBack){
					sys.goBack();
				}
			}
		}
	}
</script>

<style lang="less">
	#top_nav{
		width: 100%; 
		min-height:128rpx;
		position: fixed; left:0; top:0;
		box-sizing: border-box; padding-top: 40rpx;
		z-index:10;
		.top_nav_top{
			width: 100%; height:88rpx;
			.left_btn{
				width:150rpx; height:88rpx;
				image{
					width: 40rpx; height: 40rpx;
					margin-left: 20rpx;
				}
			}
			.right_btn{
				width:150rpx; height:88rpx;
			}
			.boxflex1{
				height: 88rpx;
			}
		}
	}
	
	
	.box_hlt{
	  display: flex;
	  flex-direction:row;
	  align-items:flex-start;
	  justify-content:flex-start;
	}
	.box_hlc{
	  display: flex;
	  flex-direction:row;
	  align-items:center;
	  justify-content:flex-start;
	}
	.box_hcc{
	  display: flex;
	  flex-direction:row;
	  align-items:center;
	  justify-content:center;
	}
	
	.boxflex1{
	  flex:1 1 0 !important;
	  min-width: 0;
	}
</style>
