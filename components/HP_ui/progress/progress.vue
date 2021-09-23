

<template>
    <view class="box_hlc item">
        <view class="name">{{title}}</view>
        <view class="ts box_hcc" @tap="tsClickFn">i</view>
        <view class="line boxflex1">
            <view class="point" :style="leftStyle"></view>
        </view>
    </view>
</template>


<script>
	export default {
		props:{
            title:{
            	type:String,
                default:''
            },
            per:{
                type:Number,
                default: 0
            }
		},
		data(){
			return {
				leftStyle:''
			}
		},
		watch:{
			per(){
				this.leftStyle = 'left:'+this.per+'%;'
            }
		},

		onReady(){
			this.leftStyle = 'left:'+this.per+'%;'
		},
		methods:{
			tsClickFn(){
                this.$emit('tsTap',this.title);
            }
		}
	}
</script>

<style scoped>
    @import "../../../publish/box.css";

    .item{
        width: 100%;
        height: 100rpx;
        background: #F2F4F5;
        border-radius: 20rpx;
        font-size: 28rpx;
        color:#1A1A1A;
        padding:0 32rpx;
        box-sizing: border-box;
    }
    .ts{
        width: 24rpx; height: 24rpx;
        border-radius: 24rpx;
        border:1rpx solid #7F7F7F;
        color: #7F7F7F;
        font-size: 20rpx;
        font-weight: bold;
        margin: 0 11rpx;
    }
    .line{
        height: 12rpx;
        border-radius: 12rpx;
        background: linear-gradient(left,#21DEBE,#FFA200,#FF6E48);
        position: relative;
    }
    .point{
        width: 26rpx;
        height: 26rpx;
        background: #FFFFFF;
        border-radius: 50%;
        position: absolute;
        top: 50%;
        margin-top: -13rpx;
        left:0;
        transition: all .3s linear;
    }

</style>
