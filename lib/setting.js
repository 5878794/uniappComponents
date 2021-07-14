


export default {
	//接口服务器地址
	serverUrl:'https://czdj.kexunyun.cn/api/',
	socketServerUrl:'wss://czdj.kexunyun.cn/wss',
	imageServerUrl:'http://chongzhoudaijia.oss-cn-chengdu.aliyuncs.com/',
	//高德小程序 sdk 的 key   （路径规划用）
	// gdMapWxKey:'452da743f8f5e674e47d17ffcd7fafad',
	gdMapWxKey:'e5ea4df1be26e88d8ee436f081dc7ad9',
	//定位获取和上传定位时间间隔ms
	uploadLocationStamp:5000,
	//代驾接到乘客后多少条数据提交一次
	uploadLocatinDataMinNumber:5,
	
	
	
	//订单状态   订单状态:0=用户取消,1=待开始,2=等待接驾,3=已接驾,4=代驾中,5=抵达目的地,6=已结束
	orderStatus:{
		'0':'用户取消',
		'1':'待开始',
		'2':'等待接驾',
		'3':'已接驾',
		'4':'代驾中',
		'5':'抵达目的地',
		'6':'已结束'
	},
	//订单类型   订单类型:1=即时,2=代叫,3=预约,4=包时
	orderType:{
		'1':'即时代驾',
		'2':'代叫代驾',
		'3':'预约代驾',
		'4':'包时代驾',
	}
};