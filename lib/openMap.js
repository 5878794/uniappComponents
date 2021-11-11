

// app 打开外置地图app

//建设路坐标
// 104.115444,30.676377
// 详见 https://www.cnblogs.com/neo-java/p/11305711.html


let openMapApp = function (title,lat,lng) {
	// lat = 30.676377;
	// lng = 104.115444;
	// title='建设路';

	let from = 'maixiaoer';


	let url = "";
	if (plus.os.name=="Android") {
		let urlBaiduMap = encodeURI(`baidumap://map/marker?location=${lat},${lng}&title=${title}&traffic=on&src=${from}`),
			urlAmap = encodeURI(`androidamap://viewMap?sourceApplication=${from}&poiname=${title}&lat=${lat}&lon=${lng}&dev=0`),
			urlAndroid = encodeURI(`geo:${lat},${lng}?q=${title}`);


		let hasBaiduMap = plus.runtime.isApplicationExist({pname:'com.baidu.BaiduMap',action:'baidumap://'}),
			hasAmap = plus.runtime.isApplicationExist({pname:'com.autonavi.minimap',action:'androidamap://'});


		if (hasAmap && hasBaiduMap) {
			plus.nativeUI.actionSheet({title:"选择地图应用",cancel:"取消",buttons:[{title:"百度地图"},{title:"高德地图"}]}, function(e){
				switch (e.index){
					case 1:
						plus.runtime.openURL(urlBaiduMap);
						break;
					case 2:
						plus.runtime.openURL(urlAmap);
						break;
				}
			})
		}else if (hasAmap) {
			plus.runtime.openURL(urlAmap);
		}else if (hasBaiduMap) {
			plus.runtime.openURL(urlBaiduMap);
		}else{
			plus.runtime.openURL(urlAndroid); //如果是国外应用，应该优先使用这个，会启动google地图。这个接口不能统一坐标系，进入百度地图时会有偏差
		}
	} else{
		let appleUrl = encodeURI(`http://maps.apple.com/?q=${title}&ll=${lat},${lng}&spn=0.008766,0.019441`),
			baiduUrl = encodeURI(`baidumap://map/marker?location=${lat},${lng}&title=${title}&src=${from}`),
			amapUrl = encodeURI(`iosamap://viewMap?sourceApplication=${from}&poiname=${title}&lat=${lat}&lon=${lng}&dev=0`);


		// iOS上获取本机是否安装了百度高德地图，需要在manifest里配置，在manifest.json文件app-plus->distribute->apple->urlschemewhitelist节点下添加（如urlschemewhitelist:["iosamap","baidumap"]）
		plus.nativeUI.actionSheet({title:"选择地图应用",cancel:"取消",buttons:[{title:"Apple地图"},{title:"百度地图"},{title:"高德地图"}]}, function(e){
			switch (e.index){
				case 1:
					url = appleUrl;
					break;
				case 2:
					url = baiduUrl;
					break;
				case 3:
					url = amapUrl;
					break;
				default:
					break;
			}

			if (url!="") {
				plus.runtime.openURL( url, function( e ) {
					console.log(e)
					plus.nativeUI.alert("本机未安装指定的地图应用");
				});
			}
		})
	}
};

export default openMapApp;
