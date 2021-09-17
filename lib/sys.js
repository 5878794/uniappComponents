
import setting from './setting';

let all = {
	//获取元素样式
	//@obj:  调用时的this对象
	//@selecter:  使用id选择器   eg:'#info'
	getElementStyle(obj,selecter){
		return new Promise(success=>{
			var query = uni.createSelectorQuery().in(obj);
			query.select(selecter).boundingClientRect();
			query.exec(data => {
				data = data[0] || data;
				success(data)
			});
		})
	},
	alert(msg,title,btnText){
		msg = msg || '';
		title = title || '系统提示';
		btnText = btnText || '确定';  //最多4个字符

		return new Promise(success=>{
			uni.showModal({
			    title: title,
			    content: msg,
				showCancel:false,
				confirmText:btnText,
			    success: function () {
			        success();
			    }
			});
		});
	},
	confirm(msg,title,btnText,cancelText){
		msg = msg || '';
		title = title || '系统提示';
		btnText = btnText || '确定';  //最多4个字符
		cancelText = cancelText || '取消'; //最多4个字符

		return new Promise(success=>{
			uni.showModal({
			    title: title,
			    content: msg,
				confirmText:btnText,
				cancelText:cancelText,
			    success: function (res) {
			        if (res.confirm) {
						success();
					} else if (res.cancel) {

					}
			    }
			});
		});
	},

	//@type:  显示图标类型 默认：none   可选： success/none
	//@duration:  显示的时长  单位ms
	showInfo(text,type,duration){
		duration = duration || 2000;
		type = type || 'none';
		uni.showToast({
		    title: text,
		    duration: duration,
			icon:type
		});
	},
	hideInfo(){
		uni.hideToast();
	},
	//显示loading
	showLoading(text){
		text = text || 'loading';
		uni.showLoading({
		    title: text,
			mask:true
		});
	},
	hideLoading(){
		uni.hideLoading();
	},

	//打电话
	phoneCall(phoneNumber){
		uni.makePhoneCall({
		    phoneNumber: phoneNumber
		});
	},


	//页面跳转
	//@url  string  可以带参数 长度有限制
	//@closeType string  打开方式  默认‘’
						//''   		打开新的页面
						//self		自身窗口打开
						//all       关闭所有窗口 打开新页面
	openPage(url,closeType){
		if(!url){
			console.log('跳转地址为空');
			return;
		}

		if(!closeType){
			uni.navigateTo({
				url:url,
				animationType:'pop-in',
				animationDuration:200
			})
		}else if(closeType=='self'){
			uni.redirectTo({
				url:url
			});
		}else if(closeType == 'all'){
			uni.reLaunch({
				url:url
			})
		}else if(closeType == 'tab'){
			uni.switchTab({
				url:url
			})
		}

	},

	//页面返回
	goBack(number){
		number = number || 1;
		uni.navigateBack({
			delta:1,
			//窗口关闭的动画效果(只有app有)			'pop-in'   'pop-out'
			animationType:'pop-out',
			//窗口关闭动画的持续时间，单位为 ms
			animationDuration:200
		})
	},

	setLocationData(key,val){
		uni.setStorageSync(key, val);
	},
	getLocationData(key){
		return uni.getStorageSync(key);
	},

	//微信下面有  其他平台不确定  没有的话只能写到全局变量去处理
	//运行父级页面函数
	runParentPageFn(fn,param){
		let pages = getCurrentPages();
		if (pages.length < 2) {
			console.log('没有父级页面');
			return new Promise(r=>{r();});
		}
		let parentPage = pages[pages.length - 2].$vm;
		if(parentPage[fn]){
			return parentPage[fn](param);
		}else{
			return new Promise(r=>{r();});
		}

	},

	//调起相机扫码
	scanCode(){
		return new Promise((success,error)=>{
			uni.scanCode({
				onlyFromCamera:true,
				success(res){
					success(res.result);
				},
				fail(e){
					error(e);
				}
			})
		})
	},

	//选择照片 1张
	chooseImage() {
		return new Promise((success, error) => {
			uni.chooseImage({
				count: 1, //默认9
				sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album','camera'], //从相册选择
				success (res) {
					let img = res.tempFilePaths[0];
					success(img);
				},
				fail(e){
					let msg = e.errMsg;
					if(msg.indexOf('cancel') == -1){
						error(msg);
					}
				}
			});
		})
	},

	//检查路径是否是微信小程序本地路径
	checkIsLocalImage(url){
		return (
			url.indexOf(':\/\/tmp\/') > -1  ||
			url.indexOf('wxfile:') > -1
		);
	},


	//上传文件
	async uploadImages(data){
		data = (data)? data.split(',') : [];
		let back = [];
		for(let i=0,l=data.length;i<l;i++){
			let src = await this.uploadImage(data[i]);
			back.push(src);
		}
		return back;
	},
	uploadImage(src,name,data,header){
		name = name || 'file';
		data = data || {};
		header = header || {};
		return new Promise((success, error) => {
			//判断是否是本地图片
			if(!this.checkIsLocalImage(src)){
				//网络图片
				success(src);
			}else{
				uni.uploadFile({
					url: setting.uploadServerUrl,
					filePath: src,
					name: name,
					formData: data,
					header: header,
					timeout: 20000,
					success(res) {
						let data = res.data;
						data = JSON.parse(data);

						if (data.err) {
							error(data.msg);
							return;
						}

						data = data.data || {};
						success(data.url);
					},
					fail(e) {
						error(e);
					}
				});
			}
		});
	},

	//data 数据中图片相对地址转绝对地址
	//处理ajax返回数据图片不是绝对地址的问题

	//addImgServerUrl:添加还是去除 默认true添加
	imgSrcRelToAbs(data,addImgServerUrl){
		if(!data){return data;}
		addImgServerUrl = (typeof addImgServerUrl == 'boolean') ? addImgServerUrl : true;

		let imgExt = ['.jpeg','.png','.jpg','.gif','.bmp'],
			imgExtText = ','+imgExt.join(',')+',',
			serverUrl = setting.serverUrl;

		//图片后缀的字符串自动加前缀域名
		let changeFn = function(str){
			let ext = str.substr(str.lastIndexOf('.'));
			ext = ','+ext+',';
			if(imgExtText.indexOf(ext) > -1){
				if(addImgServerUrl){
					return serverUrl + str;
				}else{
					return str.replace(serverUrl,'');
				}
			}else{
				return str;
			}
		};

		let searchFn = function(obj){
			for(let [key,val] of Object.entries(obj)){
				if(typeof val == 'string' && val){
					obj[key] = changeFn(val);
				}else if(typeof val == 'object' && val){
					searchFn(val);
				}
			}
		};

		searchFn(data);

		return data;
	},

	//rem转px
	rem2px(num){
		return num / 750 * uni.getSystemInfoSync().windowWidth
	},


	//复制内容到剪贴板
	setClipboard(text){
		return new Promise((success,error)=>{
			uni.setClipboardData({
				data:text,
				success(){
					success();
				},
				fail(){
					error();
				}
			})
		});
	}

};

export default all;
