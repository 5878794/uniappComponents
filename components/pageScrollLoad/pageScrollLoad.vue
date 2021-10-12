

<template>
    <view class="body box_hcc">
        <block v-if="showLoading">
            <view class="loadEffect">
                <view class="item"></view>
                <view class="item"></view>
                <view class="item"></view>
                <view class="item"></view>
                <view class="item"></view>
                <view class="item"></view>
                <view class="item"></view>
                <view class="item"></view>
            </view>
            <view>{{loadingText}}</view>
        </block>


        <view v-if="showEnd" class="">{{loadingEndText}}</view>


        <view v-if="showErr" class="box_hcc">
            <view>{{loadErrText}}</view>
            <view class="err" @tap="errReLoad">重试</view>
        </view>
    </view>

</template>


<script>
	export default {
		props:{
			loadingText:{
				type:String,
                default:'加载中...'
            },
            loadingEndText:{
				type:String,
                default:'没有更多数据咯'
            },
            loadErrText:{
				type:String,
                default:'加载失败，点击'
            }
		},
		data(){
			return {
				showLoading:false,
				showEnd:false,
                showErr:false
			}
		},
		methods:{
			startEventListener(){
				this.canRun = true;
            },
            endEventListener(){
				this.canRun = false;
            },

			loadFn(){
				if(!this.canRun){
					return;
                }

				if(this.isLoading){
					return;
                }
				this.isLoading = true;

				this.showLoading = true;
				this.showEnd = false;
				this.showErr = false;

				this.$emit('loadMoreFn');
            },

			//加载下一页完成
			loadMoreEnd(){
				this.isLoading = false;

				this.showLoading = false;
				this.showEnd = false;
				this.showErr = false;
			},
			//加载失败调用
			loadMoreError(){
				this.isLoading = true;

				this.showLoading = false;
				this.showEnd = false;
				this.showErr = true;
			},
			//加载完成  没有更多页面
			noMoreData(){
				this.endEventListener();

				this.showLoading = false;
				this.showEnd = true;
				this.showErr = false;
			},
			//加载失败  点击重试
			errReLoad(){
				this.isLoading = true;

				this.showLoading = true;
				this.showEnd = false;
				this.showErr = false;

				this.$emit('loadMoreFn');
			}
		}
	}
</script>


<style scoped>
    @import "../../publish/box.css";

    .body{
        font-size: 24rpx; color: #aaa;
        padding:40rpx 0;
    }
    .err{
        color: red;
    }

    .loadEffect{
        width: 40rpx;
        height: 40rpx;
        position: relative;
        margin-right: 20rpx;
    }
    .loadEffect .item{
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
    .loadEffect .item:nth-child(1){
        left: 0;
        top: 50%;
        margin-top:-5rpx;
        -webkit-animation-delay:0.13s;
    }
    .loadEffect .item:nth-child(2){
        left: 6.4rpx;
        top: 6.4rpx;
        -webkit-animation-delay:0.26s;
    }
    .loadEffect .item:nth-child(3){
        left: 50%;
        top: 0;
        margin-left: -5rpx;
        -webkit-animation-delay:0.39s;
    }
    .loadEffect .item:nth-child(4){
        top: 6.4rpx;
        right:6.4rpx;
        -webkit-animation-delay:0.52s;
    }
    .loadEffect .item:nth-child(5){
        right: 0;
        top: 50%;
        margin-top:-5rpx;
        -webkit-animation-delay:0.65s;
    }
    .loadEffect .item:nth-child(6){
        right: 6.4rpx;
        bottom:6.4rpx;
        -webkit-animation-delay:0.78s;
    }
    .loadEffect .item:nth-child(7){
        bottom: 0;
        left: 50%;
        margin-left: -5rpx;
        -webkit-animation-delay:0.91s;
    }
    .loadEffect .item:nth-child(8){
        bottom: 6.4rpx;
        left: 6.4rpx;
        -webkit-animation-delay:1.04s;
    }

</style>

