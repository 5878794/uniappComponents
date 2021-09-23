

<template>
    <view
        :class="boxType"
        style="width:100%;"
        hover-class="hover"
        :url="href"
        :target="target"
        @tap="onclick"
    >
        <slot></slot>
    </view>

</template>


<script>
    export default {
    	props:{
		    href:{           //打开页面的地址  tab页面不能带参数
			    type:String,
			    default:''
		    },
		    boxType:{       //传入的盒子模型 box_  开头的class
			    type:String,
			    default:''
		    },
		    // self自身窗口打开
            // new新窗口打开
            // tel打电话
            // tab跳转到页面
            // back后退
            // close关闭所有并打开
		    target:{
			    type:String,
			    default:'new'
		    }
        },
        data(){
    		return {

            }
        },
        mounted(){

        },
        methods:{
	        onclick(){
	        	if(this.href == ''){
	        		return;
                }
	        	switch (this.target) {
                    case 'self':
	                    uni.redirectTo({url:this.href});
	                    break;
                    case 'new':
	                    uni.navigateTo({url:this.href});
	                    break;
                    case 'close':
	                    uni.reLaunch({url: this.href});
                    	break;
                    case 'tel':
	                    uni.makePhoneCall({phoneNumber: this.href});
	                    break;
                    case 'tab':
	                    uni.switchTab({url:this.href});
	                    break;
                    case 'back':
	                    uni.navigateBack({delta: this.href || 1});
	                    break;
                    default:
                    	break;
		        }
            }
        }
    }
</script>


<style scoped>
    @import "../../publish/box.css";
</style>
