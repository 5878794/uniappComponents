
<template>
    <view class="box_slc" style="height:100%;">
        <view class="box_hlc body">
            <view class="input_body box_hlc boxflex1" :class="disabledClass">

                <!--            判断是否有图标-->
                <image v-if="icon" class="icon_" :src="icon"></image>

                <view v-if="name" class="name">{{name}}</view>

                <input
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

                <block v-if="clickIcon">
                    <view class="image_body box_hcc" @tap="onClick">
                        <image
                            class="isBtn"
                            :src="clickIcon"
                            :style="nowBtnStyle"
                        ></image>
                    </view>
                </block>

            </view>
        </view>
        <!--    <view class="err">{{err}}</view>-->
    </view>
</template>


<script>
    import mixinFn from "./mixin/mixin";
    import icon from './mixin/arrow';

	export default {
		mixins:[mixinFn],
        props:{
	        clickIcon:{
		        type:String,
		        default:icon.scan
	        },
	        nowBtnStyle:{
		        type:String,
		        default:''
	        }
        },
        data(){
			return {

            }
        },
		methods:{
			onClick(){
				if(this.disabled){
					return;
                }

				let _this = this;
				uni.scanCode({
					onlyFromCamera:true,
					scanType:[
						'barCode',//	一维码
						'qrCode',//	二维码
						'datamatrix',//	Data Matrix 码
						'pdf417'	//PDF417 条码
					],
					success:function(res){
						_this.val = res.result;
					}
				})
			}
        }
	}
</script>

<style scoped>
    @import "../../publish/box.css";
    @import "./mixin/publish.css";

    .placeholder_style{
        color: #ccc;
    }
    .image_body{
        padding:0 15rpx 0 10rpx;
        height: 80rpx;
        width:auto;
    }
    .isBtn{
        width:30rpx; height: 30rpx;
    }
</style>
