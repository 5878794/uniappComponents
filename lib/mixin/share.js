
//分享功能
//配置setting中需要单独分享的参数

//需要在main.js 中引入

// import share from './lib/mixin/share';
// Vue.mixin(share);


let setting = {
	query:function(){   //分享参数，只能分享整个小程序  (朋友圈)
		return '';
		// return 'id=1&a=2';        //动态去取值 一般是用户id eg:getApp().id;
		// return getApp().id;
	},
	default:{
		title:'default title',  //标题  (朋友圈 分享好友)
		path:'#123',        //分享页面  (分享好友)
		imageUrl:''        //分享图  默认截屏  (朋友圈 分享好友)

	},
	'pages/index/index':{
		title: 'index page',
		path: '/page/user?id=123',
		imageUrl:''
	}
};

let nowPageData = '';

export default {
	onShow(){
		let routes = getCurrentPages(),
			nowPage = routes[routes.length-1];

		//判断是否是app.vue中的
		if(!nowPage){
			nowPageData = setting.default;
			return;
		}
		let page = nowPage.route || '';

		nowPageData = setting[page] || setting.default;
	},
	//分享
	onShareAppMessage(){
		return JSON.parse(JSON.stringify(nowPageData));
	},
	//朋友圈
	onShareTimeline(){
		let obj = JSON.parse(JSON.stringify(nowPageData));
		delete obj.path;
		obj.query = setting.query();
		return obj;
	}
};
