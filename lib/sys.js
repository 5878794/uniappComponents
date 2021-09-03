


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

	}

};

export default all;
