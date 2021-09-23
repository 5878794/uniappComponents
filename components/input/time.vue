
<template>
    <view class="box_slc" style="height:100%;">
        <view class="box_hlc body">
            <view class="input_body box_hlc boxflex1" style="position: relative;" :class="disabledClass">

                <!--            判断是否有图标-->
                <image v-if="icon" class="icon_" :src="icon"></image>

                <view v-if="name" class="name">{{name}}</view>


                <view class="box_hcc show_text boxflex1">
                    <view
                            :style="textAlign__"
                            class="diandian boxflex1"
                            v-if="val"
                    >{{val}}</view>
                    <view
                            :style="textAlign__"
                            class="diandian boxflex1 placeholder_style"
                            v-else
                    >{{placeholder}}</view>
                    <block v-if="arrow">
                        <view class="unit">
                            <image class="arrow" :src="arrowImgSrc"></image>
                        </view>
                    </block>
                </view>


                <view v-if="unit" class="unit">{{unit}}</view>

                <picker
                        :start="start"
                        :end="end"
                        :disabled="disabled"
                        class="__input__ picker"
                        mode='time'
                        header-text="请选择"
                        :range="selectValue"
                        :rule="rule"
                        :value="val"
                        @change="onSelect"
                >
                    <view class="temp__"></view>
                </picker>
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
			value:{
			    type:String,
                default:''
            },
			arrow:{
				type:Boolean,
				default:true
			},
			start:{
				type:String,
				default:''
			},
			end:{
				type:String,
				default:''
			}
		},
		data(){
			return {
				val:'',
				arrowImgSrc:imgData.arrow
			}
		},
		watch:{
            value(){
            	this.val = this.value;
            }
		},
		mounted(){
            this.val = this.value;
		},
		methods:{
			onSelect(e){
				let val = e.detail.value;
				this.val = val;

				this.$emit('mychange',{value:val});
			},

			getValue(){
				return this.val;
			},

			setValue(value){
				if(!value){return;}

				this.val = value;
				this.$emit('mychange',{value:value});
			}
		}
	}
</script>

<style scoped>
    @import "../../publish/box.css";
    @import "./mixin/publish.css";

    .arrow{
        width: 24rpx; height: 12rpx;
    }
    .__input__{
        display: flex;
    }
    .picker{
        position: absolute; left:0; top:0; right:0; bottom:0;
        z-index: 10; opacity: 0;
    }
    .temp__{
        position: absolute; left:0; top:0; right:0; bottom:0;
    }
</style>
