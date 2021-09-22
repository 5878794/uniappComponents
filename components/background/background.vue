


<template>
    <view :class="boxType" class="body" :style="viewStyle">
        <slot></slot>
    </view>
</template>


<script>
	export default {
		props:{
            boxType:{
            	type:String,
                default:''
            },
            bg:{
	            type:String,
	            default:''
            },
            mode:{
            	type:String,
                default:''
            }
		},
		data(){
			return {
				viewStyle:''
			}
		},
		watch:{
            bg(){
            	this.init();
            }
		},

		mounted(){
            this.init();
		},
		methods:{
            async init(){
            	// 判断是否是微信
                this.isWxApp = false;

	            //#ifdef MP-WEIXIN
	            this.isWxApp = true;
	            //#endif

	            //#ifndef MP-WEIXIN
	            this.isWxApp = false;
	            //#endif


                let src = this.bg;
                if(this.checkNeedToBase64(src)){
	                src = await this.getBase64(src);
                }

	            this.viewStyle = `background-image:url(${src});background-size:${this.mode};`;



            },
            checkNeedToBase64(src){
            	//只处理咯微信和app
	            if(src.indexOf('http')== 0 || src.indexOf('https')==0){
		            //网络图片直接使用
                    return false;
	            }else{
		            //微信设置背景需要转base64
		            if(!this.isWxApp){
			            //直接使用
                        return false;
		            }else{
			            return true;
		            }
	            }
            },
			getBase64(src){
            	let ext = src.substr(src.lastIndexOf('.')+1);
				let fn = uni.getFileSystemManager();
				return new Promise((success,error)=>{
					fn.readFile({
						filePath: src,
						encoding: 'base64', //编码格式
						success(res){ //成功的回调
							let base64 = res.data;
							success('data:image/'+ext+';base64,' + res.data);
						},
						fail(e){
							error(e);
						}
					});
                })
            }
		}
	}
</script>

<style>
    @import "../../publish/box.css";
    .body{
        width: 100%; height: 100%;
    }
</style>
