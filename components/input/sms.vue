
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


                <view
                    class="smsBtn isBtn"
                    :style="nowBtnStyle"
                    @tap="onclick"
                >{{nowBtnText}}</view>

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
	        //按钮发送短信前文字
	        btnText:{
		        type:String,
		        default:'发送短信'
	        },
	        //按钮发送短信后，文字模版  {x}变量，会被替换
	        btnSendText:{
		        type:String,
		        default:'剩{x}秒'
	        },
	        //按钮发送短信前样式
	        btnStyle:{
		        type:String,
		        default:'color:#333;'
	        },
	        //发送后样式
	        sendBtnStyle:{
		        type:String,
		        default:'color:#ccc;'
	        },
	        //发送函数名   传入Page中的对象下的函数名
	        sendSmsFn:{
		        type:String,
		        default:''
	        },
	        time:{
		        type:Number,
		        default:60
	        }
        },
        data(){
			return {
				nowBtnStyle:'',
				nowBtnText:'',
				sendOk:false
            }
        },
        mounted(){
			this.nowBtnStyle = this.btnStyle;
			this.nowBtnText = this.btnText;
        },
        methods:{
	        onclick(){
		        if(this.sendOk){return;}

		        this.sendAjaxFn().then().catch(e=>{
			        uni.showModal({
				        title: "系统提示",
				        content: e.toString(),
				        showCancel: false,
				        confirmText: "确定",
				        success: function () {

				        }
			        })
		        })

	        },

	        async sendAjaxFn(){
		        let pages = getCurrentPages(),    //获取加载的页面
			        page = pages[pages.length-1].$vm,
			        fnName = this.sendSmsFn;

		        if(page[fnName]){
			        let state = await page[fnName]();
			        if(state){
				        //发送成功
				        this.sendOk = true;

				        this.intervalTime();

			        }
		        }
	        },

	        intervalTime(){
	        	this.nowBtnStyle = this.sendBtnStyle;

		        let t = this.time+1;
		        let a = setInterval(()=>{
			        t--;
			        if(t<0){
				        //完成
                        this.nowBtnStyle = this.btnStyle;
                        this.nowBtnText = this.btnText;
				        this.sendOk = false;
				        clearInterval(a);
				        return;
			        }

			        let text = this.btnSendText.replace('{x}',t);
			        this.nowBtnText = text;
		        },1000)
	        }
        }
	}
</script>

<style>
    @import "../../publish/box.css";
    @import "./mixin/publish.css";
</style>
