
<template>
    <view class="box_slc" style="height:100%;">
        <view class="box_hlc body">
            <view class="input_body box_hlc boxflex1" :class="disabledClass">

                <!--            判断是否有图标-->
                <image v-if="icon" class="icon_" :src="icon"></image>

                <view v-if="name" class="name">{{name}}</view>

                <input
                        v-if="!showInput"
                        :style="textAlign__"
                        placeholder-class="placeholder_style"
                        :disabled="disabled"
                        class="__input__ boxflex1"
                        type="password"
                        :placeholder="placeholder"
                        :value="val"
                        :rule="rule"
                        @input="onInput"
                />
                <input
                        v-else
                        :style="textAlign__"
                        placeholder-class="placeholder_style"
                        :disabled="disabled"
                        class="__input__ boxflex1"
                        type="text"
                        :placeholder="placeholder"
                        :value="val"
                        :rule="rule"
                        @input="onInput"
                />

                <view v-if="see" class="showHidePass" :style="showHidePassBtn" @tap="showHideBtnFn"></view>
                <view v-if="unit" class="unit">{{unit}}</view>

            </view>
        </view>
        <!--    <view class="err">{{err}}</view>-->
    </view>
</template>


<script>
	import mixinFn from "./mixin/mixin";
	import imgData from './mixin/arrow';

	export default {
		mixins:[mixinFn],
        props:{
            see:{
            	type:Boolean,
                default:true
            }
        },
        data(){
			return {
				showHidePassBtn:'',
                showInput:false
            }
        },
		mounted(){
            if(this.see){
            	this.showHidePassBtn = `background:url(${imgData.showPass}) no-repeat center center;background-size:40rpx 40rpx;`;
            }
        },
        methods:{
	        showHideBtnFn(){
                if(this.showInput){
                	//隐藏
	                this.showHidePassBtn = `background:url(${imgData.showPass}) no-repeat center center;background-size:40rpx 40rpx;`;
	                this.showInput = false;
                }else{
                    //显示
	                this.showHidePassBtn = `background:url(${imgData.hidePass}) no-repeat center center;background-size:40rpx 40rpx;`;
	                this.showInput = true;
                }
            }
        }
	}
</script>

<style>
    @import "../../publish/box.css";
    @import "./mixin/publish.css";

    .showHidePass{
        width: 40rpx; height: 100%;
        padding: 0 20rpx;
        background-size: 40rpx 40rpx !important;

    }
</style>
