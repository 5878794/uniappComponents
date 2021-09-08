

let getCanvasSize = Symbol();



export default {
	async getCanvasInfo(id,component){
		let info = await this[getCanvasSize](id,component);
		let width = info.width,
			height = info.height,
			canvas = info.node,
			ctx = canvas.getContext('2d'),
			dpr = uni.getSystemInfoSync().pixelRatio;

		canvas.width = width;
		canvas.height = height;
		// ctx.scale(dpr,dpr);

		return {canvas,ctx,width,height}
	},
	//获取canvas大小
	[getCanvasSize](id,component){
		let query = uni.createSelectorQuery().in(component);
		return new Promise(success=>{
			query.select('#'+id)
				.fields({ node: true, size: true })
				.exec((res) => {
					success(res[0]);
				});
		});
	},
	loadImg(canvas,src){
		return new Promise((success,error)=>{
			let img = canvas.createImage();
			img.onload = function(){
				success(this);
			};
			img.onerror = function(){
				error('加载图片失败！');
			};
			img.src = src;
		});
	}
}
