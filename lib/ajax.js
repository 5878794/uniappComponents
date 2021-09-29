

import setting from './setting.js';
import sys from './sys';



let ajax = {
	//请求函数主体
	run(url, data, type, success, error){
		url = setting.serverUrl + url;

		//处理图片不是绝对地址问题 需要setting中配置图片服务器地址 imageServerUrl
		//图片绝对地址转相对地址
		data = sys.imgSrcRelToAbs(data,false);

		let token = sys.getLocationData('token') || '';
		uni.request({
			method: type,
			url: url,
			data: data,
			dataType: "json",
			timeout: 20000,     //20秒
			header: {
				token: token
			},
			success: async function(rs) {
				let data = rs.data,
					statusCode = rs.statusCode;
				// console.log(data)
				if(statusCode != 200){
					error('服务器异常！');
					return;
				}

				if(data.code == 1){
					let backData = data.data;
					//图片绝对地址转相对地址
					backData = sys.imgSrcRelToAbs(backData,true);
					success(backData);
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
	//获取字典
	getDist:{url:'common/storeWords',type:'post'},
	//登录
	login:{url:'user/login',type:'post'},
	//核销记录
	hxRecordList:{url:'store/hxRecordList',type:'post'},
	//扫码获取优惠券信息
	scanCouponInfo:{url:'store/userCoupon',type:'post'},
	//扫码获取商品订单
	scanOrderInfo:{url:'store/userGoodsOrder',type:'post'},
	//确认核销
	hx:{url:'store/writeOff',type:'post'},
	//补充订单信息
	saveHxInfo:{url:'store/saveHxInfo',type:'post'},

	//优惠券订单列表
	couponOrderList:{url:'store/couponOrderList',type:'post'},
	//优惠券订单详情
	couponOrderInfo:{url:'store/couponOrderInfo',type:'post'},

	//获取车辆品牌
	getCarPP:{url:'common/carBrand',type:'post'},
	//车辆添加
	addCar:{url:'store/addUsedCar',type:'post'}
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
