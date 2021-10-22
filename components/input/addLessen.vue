
<template>
    <view class="box_slc" style="height:100%;">
        <view class="box_hlc body">
            <view class="input_body box_hlc boxflex1" :class="disabledClass">

                <!--            判断是否有图标-->
                <image v-if="icon" class="icon_" :src="icon"></image>

                <view v-if="name" class="name">{{name}}</view>

                <view class="boxflex1 box_hrc">
                    <view class="add" hover-class="hover" @tap="addFn">+</view>
                    <view class="number__">{{val}}</view>
                    <view class="lessen" hover-class="hover" @tap="lessenFn">-</view>
                </view>


                <view v-if="unit" class="unit">{{unit}}</view>

            </view>
        </view>
        <!--    <view class="err">{{err}}</view>-->
    </view>
</template>


<script>
	import mixinFn from "./mixin/mixin";
	export default {
		props:{
		    value:{
		    	type:Number,
                default:1
            }
        },
		mixins:[mixinFn],
        methods:{
	        addFn(){
                this.val = this.val+1;;
            },
	        lessenFn(){
	        	let val = this.val - 1;
	        	val = (val<0)? 0 : val;
                this.val = val;
            }
        }
	}
</script>

<style scoped>
    @import "../../publish/box.css";
    @import "./mixin/publish.css";

    .add,.lessen{
        width:48rpx; height:48rpx; background:#F2F4F5;
        margin:0 8rpx; font-size:40rpx; color:#9598A2;
        line-height: 48rpx; text-align:center;
    }
    .number__{
        height:48rpx; background: #F2F4F5; line-height: 48rpx;
        padding:0 20rpx; font-size:32rpx; color:#333;
    }

</style>
