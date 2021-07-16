
//权限主动申请
// scope	对应接口	描述
// scope.userInfo	wx.getUserInfo	用户信息
// scope.userLocation	wx.getLocation, wx.chooseLocation	地理位置
// scope.userLocationBackground	wx.startLocationUpdateBackground	后台定位
// scope.address	wx.chooseAddress	通讯地址（已取消授权，可以直接调用对应接口）
// scope.invoiceTitle	wx.chooseInvoiceTitle	发票抬头（已取消授权，可以直接调用对应接口）
// scope.invoice	wx.chooseInvoice	获取发票（已取消授权，可以直接调用对应接口）
// scope.werun	wx.getWeRunData	微信运动步数
// scope.record	wx.startRecord	录音功能
// scope.writePhotosAlbum	wx.saveImageToPhotosAlbum, wx.saveVideoToPhotosAlbum	保存到相册
// scope.camera	camera 组件	摄像头

//调用
// import authorize from "../../lib/authorize";
// await authorize(['userInfo','userLocation']);


let authorize = {
	async init(opt){
		let setting = await this.getSysSetting();

		opt = opt || [];

		for(let i=0,l=opt.length;i<l;i++){
			let key = opt[i];
			if(!setting['scope.'+key]){
				//需要申请权限
				await this.setSysAuthorize(key);
			}
		}
	},
	//获取授权信息
	getSysSetting(){
		return new Promise(success=>{
			uni.getSetting({
				success(res){
					success(res.authSetting)
				}
			})
		});
	},
	//申请权限  同意、不同意都返回成功
	setSysAuthorize(key){
		return new Promise((success,error)=>{
			uni.authorize({
				scope: 'scope.'+key,
				success () {
					// 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
					success();
				},
				fail(e){
					console.log(key)
					console.log(e);
					success();
				}
			})
		})
	}
};


export default function(opt){
	return authorize.init(opt);
};