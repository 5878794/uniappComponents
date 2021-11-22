
// 推送信息处理   具体处理部分没写 TODO
// 具体接口见   https://www.html5plus.org/doc/zh_cn/push.html#plus.push.getAllMessage
// 需要配置app模块 打开push
// 需要在uniapp后台设置 推送 https://dev.dcloud.net.cn/uni/push?appid=__UNI__B91217F&type=0
// 需要自定义基座

let lib =  {
	//获取客户端id
	getClientId() {
		return new Promise((success, error) => {
			plus.push.getClientInfoAsync(function(rs){
				success(rs.clientid);
			},function(e){
				error(e);
			});
		})
	},
	//获取客户端id  失败后会重新获取一次
	async getCid(){
		let _this = this;
		return new Promise((success,error)=>{
			_this.getClientId().then(rs=>{
				success(rs);
			}).catch(e=>{
				setTimeout(e=>{
					_this.getClientId().then(rs=>{
						success(rs);
					}).catch(e=>{
						error(e)
					});
				},2000)
			})
		})
	},
	//清空通知信息
	clear(){
		plus.push.clear();
	},
	//应用自己给自己发通知
	sendByMe(title,content,delay){
		delay = delay || 1;

		plus.push.createMessage( content, {
			title:title,
			content:content
			//其他参数。。。。自定义的
		}, {
			delay:delay,         //延迟时间秒
			title:title
		} );
	},


	//初始化
	init(){
		//透传监听
		plus.push.addEventListener('receive', function(msg){
			//TODO
			console.log('receive')
			console.log(msg)
			//处理透传消息的业务逻辑代码
		});

		//信息点击监听
		plus.push.addEventListener('click', function(msg){
			//TODO
			console.log('click')
			console.log(msg)
			//处理点击消息的业务逻辑代码
		});
	}
};




export default lib;



