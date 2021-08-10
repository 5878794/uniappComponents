<template>
	<scroll-view
	        class="scroll-view"
	        scroll-y="true"
	        lower-threshold="200"
	        scroll-with-animation="true"
	        enable-back-to-top="true"
	        :refresher-enabled="canPullRefresh"
	        :refresher-triggered="refreshState"
	        enhanced="true"
	        refresher-default-style="white"
	        paging-enabled="true"
	        @scrolltolower="bottomFn"
	        @refresherrefresh="topFn"
	>
	    <slot></slot>
	    <view class="bottom_info box_hcc" :class='hidden' v-if="canPushLoadMore">
	        <block v-if="!loadError">
	            <view class="loadEffect" :class='hiddenLoad'>
	                <view></view>
	                <view></view>
	                <view></view>
	                <view></view>
	                <view></view>
	                <view></view>
	                <view></view>
	                <view></view>
	            </view>
	            <view>{{bottomText}}</view>
	        </block>
	        <block class="box_hcc" v-else>
	            <view>加载失败,请</view>
	            <view class="err" @tap="errReLoad">重试</view>
	        </block>
	    </view>
	</scroll-view>
</template>

<script>
	export default {
		name:"scroll-load",
		data() {
			return {
				loadError:false,         //加载出错
				hidden:'hidden',         //加载文字部分初始隐藏
				hiddenLoad:'',            //加载动画不隐藏
				bottomText:'',
				refreshState:false
			};
		},
		props:{
			canPushLoadMore:{
				type:Boolean,
				value:false
			},
			canPullRefresh:{
				type:Boolean,
				value:false
			}
		},
		created(){
			this.loadEnd = false;       //是否全部分页加载完成
			this.bottomText = '正在加载中';

		},
		methods:{
			topFn(){
				this.isRefreshing = true;
				this.$emit('RefreshFn')
			},
			bottomFn(){
				if(this.loadingMore ||  //正在加载中
					this.loadEnd   || //全部加载完成
					this.isRefreshing  //正在下拉刷新页面
				)
				{
					return;
				}
				this.loadingMore = true;
				this.hidden = '';

				this.$emit('loadMoreFn')
			},
			//刷新完成
			refreshEnd(){
				this.isRefreshing = false;
				this.refreshState = false;

			},
			//加载下一页完成
			loadMoreEnd(){
				this.loadingMore = false;
				this.hidden = 'hidden';


			},
			//加载失败调用
			loadMoreError(){
				// this.loadingMore = false;
				this.loadError = true;

			},
			//加载完成  没有更多页面
			noMoreData(){
				this.loadingMore = false;
				this.loadEnd = true;

				this.bottomText = '没有更多数据';
				this.hiddenLoad = 'hidden';
				this.hidden = '';




				// console.log('loadError:'+this.loadError)
				// console.log('hidden:'+this.hidden)
				// console.log('hiddenLoad:'+this.hiddenLoad)
				// console.log('bottomText:'+this.bottomText)
				// console.log('refreshState:'+this.refreshState)
				// console.log('canPushLoadMore:'+this.canPushLoadMore)

			},
			//加载失败  点击重试
			errReLoad(){
				this.loadError = false;
				this.$emit('LoadMoreFn')
			}
		}
	}
</script>

<style>
@import "../../publish/box.css";


.scroll-view{
	width: 100%; height: 100%;
}


.bottom_info{
    font-size: 28rpx;
    color: #C0C0C0;
    padding:40rpx 0;
}
.err{
    color:#000;
}

.hidden{
    display: none;
}




.loadEffect{
    width: 40rpx;
    height: 40rpx;
    position: relative;
    margin-right: 20rpx;
}
.loadEffect view{
    display: inline-block;
    width: 10rpx;
    height: 10rpx;
    border-radius: 50%;
    background: #999;
    opacity: 0.2;
    position: absolute;
    -webkit-animation: load 1.04s ease infinite;
}
@keyframes load{
    0%{
        opacity: 1;
    }
    100%{
        opacity: 0.2;
    }
}
.loadEffect view:nth-child(1){
    left: 0;
    top: 50%;
    margin-top:-5rpx;
    -webkit-animation-delay:0.13s;
}
.loadEffect view:nth-child(2){
    left: 6.4rpx;
    top: 6.4rpx;
    -webkit-animation-delay:0.26s;
}
.loadEffect view:nth-child(3){
    left: 50%;
    top: 0;
    margin-left: -5rpx;
    -webkit-animation-delay:0.39s;
}
.loadEffect view:nth-child(4){
    top: 6.4rpx;
    right:6.4rpx;
    -webkit-animation-delay:0.52s;
}
.loadEffect view:nth-child(5){
    right: 0;
    top: 50%;
    margin-top:-5rpx;
    -webkit-animation-delay:0.65s;
}
.loadEffect view:nth-child(6){
    right: 6.4rpx;
    bottom:6.4rpx;
    -webkit-animation-delay:0.78s;
}
.loadEffect view:nth-child(7){
    bottom: 0;
    left: 50%;
    margin-left: -5rpx;
    -webkit-animation-delay:0.91s;
}
.loadEffect view:nth-child(8){
    bottom: 6.4rpx;
    left: 6.4rpx;
    -webkit-animation-delay:1.04s;
}
</style>
