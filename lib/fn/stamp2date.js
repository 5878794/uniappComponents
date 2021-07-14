

let format = function(date,fmt) {
	//y 年份
	let o = {
		"M+" : date.getMonth()+1,                 //月份
		"d+" : date.getDate(),                    //日
		"h+" : date.getHours(),                   //小时
		"m+" : date.getMinutes(),                 //分
		"s+" : date.getSeconds(),                 //秒
		"q+" : Math.floor((date.getMonth()+3)/3), //季度
		"S"  : date.getMilliseconds()             //毫秒
	};
	if(/(y+)/.test(fmt)) {
		fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
	}
	for(let k in o) {
		if(new RegExp("("+ k +")").test(fmt)){
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ?
				(o[k]) :
				(("00"+ o[k]).substr((""+ o[k]).length)));
		}
	}
	return fmt;
};

//时间戳、日期格式 转 日期对象
let _str2Obj = function(date){
	if(date.indexOf('-')>-1 || date.indexOf('\/')>-1){
		date = date.split(/-|\//g);
		let newDate = [];

		//Safari 月日  必须是：01 不能是：1
		date.map(rs=>{
			if(parseInt(rs)<10){
				newDate.push('0'+parseInt(rs))
			}else{
				newDate.push(parseInt(rs));
			}
		});
		date = newDate.join('-');
	}else{
		date = parseInt(date);
	}

	date = new Date(date);

	return date;
};

//时间戳转 日期
let getDate = function(date){
	if(!date){return '';}

	date = _str2Obj(date.toString());

	return format(date,'yyyy-MM-dd');
};


//时间戳转 月日 星期
let getMDW = function(data){
	data = _str2Obj(data.toString());

	//获取月 日  星期
	let weekData = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];
	let year = data.getFullYear(),
		month = data.getMonth()+1,
		day = data.getDate(),
		week = weekData[data.getDay()],
		hours = data.getHours(),
		minutes = data.getMinutes();

	return {
		text:month+'月'+day+'日 ('+week+')',
		hours:hours,
		minutes:minutes,
		val:year+'-'+month+'-'+day
	}
};





//a :   2012-12-13   2012-12-12 12:12:33  自动补位
let getStamp = function(a){
	if(!a){
		return new Date().getTime();
	}

	var new_str = a.replace(/:/g,'-');
	new_str = new_str.replace(/ /g,'-');
	new_str = new_str.replace(/\//ig,'-');
	var arr = new_str.split("-");
	if(arr.length != 6){
		for(var i= 0,l=6-arr.length;i<l;i++){
			arr.push(0);
		}
	}

	return new Date(Date.UTC(arr[0],arr[1]-1,arr[2],arr[3]-8,arr[4],arr[5])).getTime();
};


export default {
	stamp2Date:getDate,
	stamp2MDW:getMDW,
	getStamp:getStamp
}