

//创建地图对象  接口不多需要和map组件上的参数一起用。。。
//@id   地图id
//@obj  页面 this对象
class mapObj{
	constructor(mapId,obj) {
	    this.mapObj = uni.createMapContext(mapId,obj);
	}
	
	//设置地图中心点
	setMapCenterLocation(opt){
		let {latitude,longitude} = opt;
		return new Promise((success,error)=>{
			this.mapObj.moveToLocation({
				longitude:longitude,
				latitude:latitude,
				success(){
					success();
				},
				fail(){
					success();
				}
			})
		})
	}
	
	//显示所有点  
	//@points    要显示在可视区域内的坐标点列表，[{latitude, longitude}]
	//@padding   坐标点形成的矩形边缘到地图边缘的距离，单位像素。
	showAllPoints(points,padding){
		padding = padding || '180';
		this.mapObj.includePoints({
			points:points,
			padding:[padding,padding,padding,padding]
		})
	}
	
	//获取地图缩放级别
	getScale(){
		return new Promise((success,error)=>{
			this.mapObj.getScale({
				success(rs){
					success(rs.scale);
				},
				fail(e){
					success(16)
				}
			})
		})
	}
	
	
	//其他方法未写  见
	//https://uniapp.dcloud.io/api/location/map?id=createmapcontext
	
	//getCenterLocation	OBJECT	获取当前地图中心的经纬度，返回的是 gcj02 坐标系，可以用于 uni.openLocation		
	// translateMarker	OBJECT	平移marker，带动画	app-nvue 2.1.5+、微信小程序带动画	
	// getRegion	OBJECT	获取当前地图的视野范围		
	// getScale	OBJECT	获取当前地图的缩放级别		
}




export default {
	//获取定位
	getLocation(){
		return new Promise((success,error)=>{
			uni.getLocation({
				type:'gcj02',
				geocode:true,   //是否解析地址信息
				success(rs){
					success(rs);
				},
				fail(e){
					error(e);
				}
			})
		})
	},
	mapObj:mapObj
};
