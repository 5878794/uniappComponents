

import setting from './setting.js';



let socket = {
	socketOpen:false,		//socket当前状态
	userClose:false,
	interFn:null,
	socketMsgQueue:[],
	async init(){
		console.log('socket 发起连接')
		await this.create();
		this.connect();
		this.onClose(e=>{
			//关闭时 判断是否是用户主动关闭
			if(!this.userClose){
				this.reconnect();
			}
		});
	},
	
	reconnect(){
		this.interFn = setInterval(e=>{
			this.init();
		},5000)
	},
	
	//创建连接
	create(){
		let _this = this;
		return new Promise((success,error)=>{
			uni.connectSocket({
			    url: setting.socketServerUrl,
			    // header: {
			    //     'content-type': 'application/json'
			    // },
			    // protocols: ['protocol1'],
			    // method: 'GET',
				success(e){
					_this.userClose = false;
					if(_this.interFn){
						clearInterval(_this.interFn);
						_this.interFn = null;
					}
					success();
				},
				fail(e){
					error(e);
				}
			});
		})
	},
	//连接成功处理缓存的队列
	connect(){
		let _this = this;
		uni.onSocketOpen(function (res) {
		  _this.socketOpen = true;
		  
		  console.log('socket 已连接');
		  for (var i = 0; i < _this.socketMsgQueue.length; i++) {
		    sendMessage(_this.socketMsgQueue[i]);
		  }
		  _this.socketMsgQueue = [];
		});
		
		
	},
	
	onClose(callback){
		callback = callback || function(){};
		let _this = this;
		uni.onSocketClose(function (res) {
			console.log('socket 断开');
			_this.socketOpen = false;
			callback();
		});
		
		uni.onSocketError(function (res) {
			console.log('socket 错误');
			_this.socketOpen = false;
			console.log(res);
			callback();
		});
	},
	//单独调用  发送信息
	sendMessage(data){
		return new Promise(success=>{
			if (this.socketOpen) {
				uni.sendSocketMessage({
					data: JSON.stringify(data),
					success(res){
						success(res)
					},
					fail(e){
						console.log(e);
					}
				});
			} else {
				this.socketMsgQueue.push(data);
			}
		});
		
	},
	//单独调用  接受信息
	onMessage(callback){
		uni.onSocketMessage(function (res) {
			callback(res);
		});
	},
	//单独调用  关闭连接
	close(){
		this.userClose = true;
		uni.closeSocket();
	}
};



export default socket;