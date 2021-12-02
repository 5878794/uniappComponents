
<!--微信通过自己服务器授权获取用户信息及电话号码-->



<template lang="pug">
    view(class="body__")
        view(
            v-if='!showPhone'
            class="btn1_ box_hcc"
            @tap="login"
            hover-class="hover"
        ) 授权登录
        view(v-else class="btn1_ box_hcc") 授权电话号码
            button(
                class='btn2_'
                open-type="getPhoneNumber"
                @getphonenumber="getPhoneNumber"
            )
</template>

<script>
    import all from '../../lib/all';

	export default {
		props:{
			needPhone:{
				type:Boolean,
                default:true
            },
            getPhoneApi:{
				type:String
            },
            getUserInfoApi:{
				type:String
            }
        },
        data(){
			return {
				showPhone:false
            }
        },
		mounted(){

		},
		methods:{
			login(){
				all.showLoadingRun(this,'loginFn')
			},
            //授权获取用户信息
            async loginFn(){
				//获取用户信息
	            let wxInfo = await this.wxGetInfo(),
                //获取wx一次性的code
                    wxCode = await this.wxLogin();
	            //服务器获取用户完整信息
	            let info = await this.ajax(
	            	this.getUserInfoApi,
                    {code:wxCode,rawData:wxInfo.rawData},
                    'post'
                );

	            this.id = info.id;
	            this.session_key = info.session_key;
	            this.info = info;

                if(this.needPhone){
	                this.showPhone = true;
                }else{
	                this.$emit('success',info);
                }
            },

			getPhoneNumber(e){
				//点击事件获取参数
				all.showLoadingRun(this,'getPhoneNumberFn',{
					iv:e.detail.iv,
					encryptedData:e.detail.encryptedData,
                    id:this.id,
					session_key:this.session_key
                });
			},
            //服务器获取用户电话号码并解密
			async getPhoneNumberFn(obj){
				let phone = await this.ajax(
					this.getPhoneApi,
					obj,
					'post'
				);

				let backData = this.info;
				backData.mobile = phone;
				this.$emit('success',backData);
            },

            //微信登录
            wxLogin(){
	            return new Promise((success,error)=>{
		            wx.login({
			            success(rs) {
				            success(rs.code)
			            },
			            fail(e) {
				            error(e)
			            }
		            });
	            })
            },
			//获取微信用户信息  需要点击事件中获取
			wxGetInfo(){
				return new Promise((success,error)=>{
					wx.getUserProfile({
						desc:'获取用户昵称及头像用于展示',
						success(rs) {
							success(rs)
						},
						fail(e) {
							error(e)
						}
					});
				})
			},
            //ajax
            ajax(url, data, type){
	            return new Promise((success,error)=>{
		            uni.request({
			            method: type,
			            url: url,
			            data: data,
			            dataType: "json",
			            timeout: 20000,     //20秒
			            header: {},
			            success: async function(rs) {
				            let data = rs.data,
					            statusCode = rs.statusCode;

				            if(statusCode != 200){
					            console.log(rs)
					            error('服务器异常！');
					            return;
				            }

				            if(data.code == 1){
					            let backData = data.data;
					            success(backData);
				            }else{
					            error(data.msg);
				            }
			            },
			            fail: function(e) {
				            if(e.status == 500){
					            error('服务器内部错误！');
					            return;
				            }


				            if(e.status == 0 && e.statusText == 'timeout'){
					            error('访问人数过多，请稍后访问');
					            return;
				            }

				            if(e.status == 0 && e.statusText != 'error'){
					            return;
				            }

				            error("网络错误,无法连接服务器。");
			            }
		            });
                })
            }
		}
	}
</script>

<style scoped>
    .body__{
        width: 100%; height: 100%;
    }
    .btn1_{
        width: 100%; height: 100rpx; border-radius: 10rpx;
        font-size: 32rpx; background: #0f9d58; color: #fff;
        position: relative; margin-bottom: 40rpx;
    }
    .btn2_{
        position: absolute; left:0; top:0;
        width: 100%; height: 100%; opacity: 0;
    }
</style>
