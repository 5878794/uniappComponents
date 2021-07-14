
//微信小程序 sdk 
import wxMapSdk from '@/lib/gd_map_wx/sdk.js';
import setting from '@/lib/setting.js';


let key = setting.gdMapWxKey,
	myAmapFun = new wxMapSdk.AMapWX({key: key});
	
	
let obj = {
	//获取驾车 路线
	getDrivingRoute(startPoint,endPoint){
		let sP = startPoint.longitude+','+startPoint.latitude,
			eP = endPoint.longitude+','+endPoint.latitude;

		return new Promise((success,error)=>{
			myAmapFun.getDrivingRoute({
				origin: sP,
				destination: eP,
				success: function(data){
					var points = [];
					if(data.paths && data.paths[0] && data.paths[0].steps){
					  var steps = data.paths[0].steps;
					  for(var i = 0,l=steps.length; i < l; i++){
						var poLen = steps[i].polyline.split(';');
						for(var j = 0,jl=poLen.length;j < jl; j++){
							let t = poLen[j].split(',');
						  points.push({
							longitude: parseFloat(t[0]),
							latitude: parseFloat(t[1])
						  })
						} 
					  }
					}
					
					success(points);
					// if(data.paths[0] && data.paths[0].distance){
					//   that.setData({
					// 	distance: data.paths[0].distance + '米'
					//   });
					// }
					// if(data.taxi_cost){
					//   that.setData({
					// 	cost: '打车约' + parseInt(data.taxi_cost) + '元'
					//   });
					// }
				  
				},
				fail: function(info){
					error(info);
				}
			})
		});
	},
	getRidingRoute(startPoint,endPoint){
		let sP = startPoint.longitude+','+startPoint.latitude,
			eP = endPoint.longitude+','+endPoint.latitude;
		
		return new Promise((success,error)=>{
			myAmapFun.getRidingRoute({
				origin: sP,
				destination: eP,
				success: function(data){
					var points = [];
					if(data.paths && data.paths[0] && data.paths[0].steps){
					  var steps = data.paths[0].steps;
					  for(var i = 0,l=steps.length; i < l; i++){
						var poLen = steps[i].polyline.split(';');
						for(var j = 0,jl=poLen.length;j < jl; j++){
							let t = poLen[j].split(',');
						  points.push({
							longitude: parseFloat(t[0]),
							latitude: parseFloat(t[1])
						  })
						} 
					  }
					}
					
					success(points);
					// if(data.paths[0] && data.paths[0].distance){
					//   that.setData({
					// 	distance: data.paths[0].distance + '米'
					//   });
					// }
					// if(data.taxi_cost){
					//   that.setData({
					// 	cost: '打车约' + parseInt(data.taxi_cost) + '元'
					//   });
					// }
				  
				},
				fail: function(info){
					error(info);
				}
			})
		});
	}
	
	
};


export default obj;