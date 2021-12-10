

let getCanvasSize = Symbol();



export default {
	async getContent(id,component,type,scale){
		// if(!type){
		// 	return uni.createCanvasContext(id,component);
		// }

		return new Promise(success=>{
			let view = uni.createSelectorQuery().in(component).select("#"+id);

			view.fields({ node: true, size: true })
				.exec((res) => {
					const canvas = res[0].node;
					const ctx = canvas.getContext('2d');
					const width = res[0].width*scale;         //px
					const height = res[0].height*scale;       //px
					const dpr = wx.getSystemInfoSync().pixelRatio;

					canvas.width = width * dpr*scale;
					canvas.height = height * dpr*scale;
					ctx.scale(dpr*scale, dpr*scale);

					success({canvas,ctx,width,height,dpr});
				})
		})
	},
	rem2px(val){
		return val / 750 * uni.getSystemInfoSync().windowWidth;
	},
	px2rem(val){
		return val*750/uni.getSystemInfoSync().windowWidth;
	},


	async getCanvasInfo(id,component){
		let info = await this[getCanvasSize](id,component);
		let width = info.width,
			height = info.height,
			canvas = info.node,
			ctx = canvas.getContext('2d'),
			dpr = uni.getSystemInfoSync().pixelRatio;

		canvas.width = width;
		canvas.height = height;
		ctx.scale(dpr,dpr);

		return {canvas,ctx,width,height,dpr}
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
