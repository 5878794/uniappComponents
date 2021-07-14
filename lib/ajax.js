

import setting from '@/lib/setting.js';



let ajax = {
	//请求函数主体
	run(url, data, type, success, error){
		url = setting.serverUrl + url;

		console.log('ajax:'+url+'   type:'+type);
		// if(type=='post'){
		// 	data = JSON.stringify(data);
		// 	// console.log(data)
		// }

		uni.request({
			method: type,
			url: url,
			data: data,
			dataType: "json",
			timeout: 20000,     //20秒
			header: {
				// token: window.token
			},
			success: async function(rs) {
				let data = rs.data,
					statusCode = rs.statusCode;
				console.log(data)
				if(statusCode != 200){
					error('服务器异常！');
					return;
				}
		
				if(data.code == 1){
					success(data.data);
				}else{
					error(data.msg);
				}
			},
			fail: function(e) {
				console.log(e)
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
	},
	//发送一堆请求
	async send(arr){
		//预约挂号特有
		// this.token = await this.getToken();
		// this.userToken = await app.getUserToken();

		return new Promise((success,error)=>{
			Promise.all(arr).then(rs=>{
				success(rs)
			}).catch(rs=>{
				error(rs);
				throw "ajax error";
			})
		})
	}

};
 
// let serverUrl = 'http://192.168.0.';
let api = {
	//登录
	login:{url:'d/login',type:'post'},
	//首页订单列表
	getIndexList:{url:'d/order/homelist',type:'get'},
	//司机状态 上班 下班
	driverGoToWork:{url:'d/login/online',type:'post'},
	driverOffWork:{url:'d/login/offline',type:'post'},
	
	
	//流程
	// 开始预约订单
	hasAccept:{url:'d/order/accept',type:'post'},
	// 接驾
	hasMeet:{url:'d/order/meet',type:'post'},
	//开始代驾
	hasBegin:{url:'d/order/begin',type:'post'},
	//抵达目的地
	hasArrive:{url:'d/order/arrive',type:'post'},
	//结束代驾
	hasFinish:{url:'d/order/finish',type:'post'},
	
	
	//分类别获取订单  获取正在进行中的订单用
	getRuningOrder:{url:'d/order/list',type:'get'},
	//上传缓存的坐标点
	uploadLocationPoint:{url:'d/order/upload',type:'post'}
};






api = new Proxy(api, {
	get(target, key, receiver) {
		return function (data) {
			data = data || {};
			return new Promise((success, error) => {
				let url = target[key].url,
					type = target[key].type || 'post';

				//判断是否含有一堆大括号,大括号内为参数
				let delArray = [];
				url = url.replace(/{(.+?)}/g,function(key){
					key = key.substr(1,key.length-2);
					delArray.push(key);
					return data[key];
				});

				//删除data中的对象
				delArray.map(rs=>{
					delete data[rs];
				});

				ajax.run(url, data, type, success, error);
			})
		}
	}
});




module.exports = {ajax,api};