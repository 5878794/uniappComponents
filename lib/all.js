
import sys from './sys.js';
import setting from "./setting";

let getOssParam = Symbol(),
	uploadOssFn = Symbol();

export default {
	showLoadingRun(obj,fn,param,errorCallback,notNeedLoading){
		errorCallback = errorCallback || function(){};
		let stamp = new Date().getTime(),
			tt = 500;
		if(!notNeedLoading){
			sys.showLoading();
		}


		obj[fn].call(obj,param).then(()=>{
			let t = new Date().getTime();
			if(t-stamp>tt){
				if(!notNeedLoading){
					sys.hideLoading();
				}
			}else{
				setTimeout(e=>{
					if(!notNeedLoading){
						sys.hideLoading();
					}
				},tt+stamp-t)
			}
		}).catch(e=>{
			if(e=='401'){
				//未登陆跳转登陆页面
				if(!notNeedLoading){
					sys.hideLoading();
				}
				sys.openPage('/pages/my/loginByPass');
				return
			}

			let t = new Date().getTime();
			if(t-stamp>tt){
				if(!notNeedLoading){
					sys.hideLoading();
				}
				console.log(e);
				sys.showInfo(e);
				errorCallback();
			}else{
				setTimeout(r=>{
					if(!notNeedLoading){
						sys.hideLoading();
					}
					console.log(e);
					sys.showInfo(e);
					errorCallback();
				},tt+stamp-t)
			}
		})
	},
	pageLoadingFn(obj,fn,ref,param,errorCallback){
		errorCallback = errorCallback || function(){};
		let stamp = new Date().getTime(),
			tt = 800;

		obj[fn].call(obj,param).then(()=>{
			let t = new Date().getTime();
			if(t-stamp>tt){
				obj.$refs[ref].end();
			}else{
				setTimeout(e=>{
					obj.$refs[ref].end();
				},tt+stamp-t)
			}
		}).catch(e=>{
			if(e=='401'){
				//未登陆跳转登陆页面
				sys.openPage('/pages/my/loginByPass','self');
				return
			}

			let t = new Date().getTime();
			if(t-stamp>tt){
				obj.$refs[ref].err();
				errorCallback();
			}else{
				setTimeout(e=>{
					obj.$refs[ref].err();
					errorCallback();
				},tt+stamp-t)
			}
		})
	},

	sleep(stamp){
		stamp = stamp || 0;
		return new Promise(success=>{
			setTimeout(function(){
				success();
			},stamp)
		})
	},

	imageToBannerSrc(images){
		let backData = [];
		images = (images)? images.split(',') : [];
		images.map(rs=>{
			backData.push({src:rs});
		});

		return backData;
	},


	//小苏的文件直传oss服务器
	async uploadImg(src){
		let err = false;

		sys.showLoading();
		let fileName = src.substr(src.lastIndexOf('/')+1),
			ossParam = await this[getOssParam](fileName).catch(e=>{
				sys.hideLoading();
				sys.showInfo('连接服务器失败！');
				err = true;
			});

		if(!err){
			await this[uploadOssFn](src,ossParam).catch(e=>{
				sys.hideLoading();
				sys.showInfo(e);
				err = true;
			});
		}

		sys.hideLoading();

		if(err){
			return '';
		}else{
			return ossParam.url+"/"+ossParam.key;
		}
	},
	[getOssParam](fileName){
		let serverUrl = setting.getOSSParamUrl,
			//token每个项目获取方式不同。。。
			token = sys.getLocationData('token');

		return new Promise((success,error)=>{
			uni.request({
				method: 'post',
				url: serverUrl,
				data: {name:fileName},
				dataType: "json",
				timeout: 20000,     //20秒
				header: {
					token: token
				},
				success: async function(rs) {
					let data = rs.data,
						statusCode = rs.statusCode;
					if(statusCode != 200){
						let msg = data.msg || '服务器异常！';
						error(msg);
						return;
					}

					if(data.code == 1){
						success(data.data);
					}else{
						error(data.msg);
					}

				},
				fail: function(e) {
					// errorHandler.ajaxError(type,url,data,e);
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
	},
	[uploadOssFn](src,param){
		return new Promise((success, error) => {
			uni.uploadFile({
				url: param.url,
				filePath: src,
				name: 'file',
				formData: {
					OSSAccessKeyId:param.OSSAccessKeyId,
					key:param.key,
					policy:param.policy,
					Signature:param.signature,
					success_action_status:param.success_action_status
				},
				header: {},
				timeout: 20000,
				success(res) {
					let statusCode = res.statusCode;

					if(statusCode != 200){
						error('上传失败！');
					}else{
						success();
					}
				},
				fail(e) {
					error(e);
				}
			});
		});
	}
};
