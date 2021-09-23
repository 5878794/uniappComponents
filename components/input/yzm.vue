
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


                <image
                    class="isBtn"
                    :src="yzmSrc"
                    :style="yzmStyle"
                    @tap="onclick"
                ></image>

            </view>
        </view>
        <!--    <view class="err">{{err}}</view>-->
    </view>
</template>


<script>
	import mixinFn from "./mixin/mixin";
	export default {
		mixins:[mixinFn],
        props:{
	        yzmWidth:{
		        type:Number,
		        default:''
	        },
	        yzmHeight:{
		        type:Number,
		        default:''
	        },
	        getYzmFn:{
		        type:String,
		        default:''
	        }
        },
        data(){
		    return {
			    yzmStyle:'',
                yzmSrc:'',
                catchData:''
            }
        },
        mounted(){
			this.yzmStyle = `width:${this.yzmWidth}rpx;height:${this.yzmHeight}rpx;`;
	        this.getPic();
        },
        methods:{
	        getPic(){
		        this.getYzm().then().catch(e=>{
			        uni.showModal({
				        title: "系统提示",
				        content: '获取验证码失败，请稍后再试！',
				        showCancel: false,
				        confirmText: "确定",
				        success: function () {

				        }
			        })
		        })
	        },

	        onclick(){
		        //获取新的验证码
		        this.getPic();
	        },

	        async getYzm(){
		        let pages = getCurrentPages();    //获取加载的页面
		        this.pageObj = pages[pages.length-1].$vm;
		        let fnName = this.getYzmFn;
		        if(this.pageObj[fnName]){
			        let data = await this.pageObj[fnName]();

                    this.catchData = data;
                    this.yzmSrc = data.src;
                    this.val = '';
		        }
	        }
        }
	}
</script>

<style scoped>
    @import "../../publish/box.css";
    @import "./mixin/publish.css";
</style>
