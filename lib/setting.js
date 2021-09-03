


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


	lineChartOption(data){
		// data = [1,2,3,4,5,6];
		return {
			lazyload: true,
			option :{
				grid:{
					left:0,top:0,right:0,bottom:0
				},
				xAxis: {
					type: 'category',
					boundaryGap: false,

				},
				yAxis: {
					type: 'value',
					show:false,
				},
				series: [{
					data: data,
					type: 'line',
					areaStyle:{
						color: {
							type: 'linear',
							x: 0,
							y: 0,
							x2: 0,
							y2: 1,
							colorStops: [{
								offset: 0, color: 'rgba(61, 126, 254, 0.8)' // 0% 处的颜色
							}, {
								offset: 1, color: 'rgba(0, 215, 255, 0)' // 100% 处的颜色
							}],
							global: false // 缺省为 false
						}
					},
					lineStyle:{
						color:'#3D7EFE',
						width:4
					}
				}]
			}
		};
	},
	barChartOption(data){
		// data = [{name:'1月',value:'100'},...]
		let x = [], value = [];
		data.map(rs=>{
			x.push(rs.name);
			value.push(parseInt(rs.value));
		});
		console.log(x,value)
		return {
			lazyload: true,
			option :{
				grid:{
					top:40,bottom:60,left:40,right:10
				},
				xAxis: {
					type: 'category',
					data: x
				},
				yAxis: {
					type: 'value'
				},

				series: [{
					data: value,
					type: 'bar',
					itemStyle:{
						borderRadius: [1000, 1000, 0, 0],
						color: {
							type: 'linear',
							x: 0,
							y: 0,
							x2: 0,
							y2: 1,
							colorStops: [{
								offset: 0, color: '#3D7EFE' // 0% 处的颜色
							}, {
								offset: 1, color: '#00D7FF' // 100% 处的颜色
							}],
							global: false // 缺省为 false
						}
					}
				}]
			}
		}
	}
};
