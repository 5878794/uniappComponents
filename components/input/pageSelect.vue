
<template>
    <view class="box_slc" style="height:100%;">
        <view class="box_hlc body">
            <view class="input_body box_hlc boxflex1" @tap="clickFn" style="position: relative;" :class="disabledClass">

                <!--            判断是否有图标-->
                <image v-if="icon" class="icon_" :src="icon"></image>

                <view v-if="name" class="name">{{name}}</view>


                <view class="box_hcc show_text boxflex1">
                    <view
                            :style="textAlign__"
                            class="diandian boxflex1"
                            v-if="val"
                    >{{text}}</view>
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
	        selectPage:{
		        type:String,
		        default:''
	        },
	        arrow:{
		        type:Boolean,
		        default:true
	        },
            value:{
	        	type:Object,
                default(){
	        		return {};
                }
            }
        },
        data(){
			return {
                arrowImgSrc:imgData.arrow,
                text:''
            }
        },
        watch:{
	        value(val){
		        this.val = val.key;
		        this.text = val.val;
	        }
        },
		updated(){

        },
		mounted(){
            this.val = this.value.key;
            this.text = this.value.val;
        },
		methods:{
			clickFn(){
				if(this.selectPage){
					uni.navigateTo({
						url:this.selectPage,
						animationType:'pop-in',
						animationDuration:200
					})
				}
            },


	        getValue(){
		        return this.val;
	        },

	        setValue(value){
	        	this.val = value.key;
	        	this.text = value.val;
		        this.$emit('mychange',{value:this.val,ref:this.inRef});
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
