
import sys from './sys.js';

export default {
	showLoadingRun(obj,fn,param,errorCallback){
		errorCallback = errorCallback || function(){};
		sys.showLoading();
		
		obj[fn].call(obj,param).then(()=>{
			sys.hideLoading();
		}).catch(e=>{
			sys.hideLoading();
			console.log(e);
			sys.showInfo(e);
			errorCallback();
		})
	},
	
	sleep(stamp){
		stamp = stamp || 0;
		return new Promise(success=>{
			setTimeout(function(){
				success();
			},stamp)
		})
	}
};