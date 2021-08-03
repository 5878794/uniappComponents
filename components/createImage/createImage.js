
import imageLib from '../../lib/imageHandler';
import qrcode from '../../lib/qrcode';

export default {
	name:"createImage",
	props:{
		items:{
			type:Array,
			value:[]
		}
	},
	watch:{
		items(){
			// console.log('param change');
			// this.init();
		}
	},
	async mounted(){
		this.canvasId = '__createImage_canvas__';
		this.ctx = uni.createCanvasContext(this.canvasId, this);

		let style = await this.getCanvasStyle();
		this.width = style.width;
		this.height = style.height;
		this.winWidth = uni.getSystemInfoSync().windowWidth;

		this.init();
	},
	data() {
		return {
			canvasItems:[],
			style:''
		};
	},
	methods:{
		async init(){
			this.canvasItems = this.items;
			this.clearCanvas();
			await this.draw();
		},
		getCanvasStyle(){
			let query = uni.createSelectorQuery().in(this);
			return new Promise(success=>{
				setTimeout(e=>{
					query.select('#'+this.canvasId).boundingClientRect(rs => {
						success(rs);
					}).exec();
				},2000)

			});
		},
		clearCanvas(){
			this.ctx.clearRect(0,0,this.width,this.height);
		},

		async draw(){
			for(let i=0,l=this.canvasItems.length;i<l;i++){
				let thisItem = this.canvasItems[i];
				if(thisItem.type=='img'){
					let info = await imageLib.getImageInfo(thisItem.src);
					if(info){
						this.drawImage(thisItem,info);
					}
				}else if(thisItem.type=='text'){
					this.drawText(thisItem);
				}else if(thisItem.type=='qrcode'){

					let src = await this.drawQrCode(thisItem);
					let info = {
						path:src,
						width:this.winWidth,
						height:this.winWidth
					};

					this.drawImage(thisItem,info);
				}
			}
			this.ctx.draw(true);


			let outPath = await imageLib.canvasToTempFile(this.canvasId,this);
			this.$emit('success',outPath);
		},
		rpx2px(val){
			return val / 750 * this.winWidth;
		},
		drawImage(data,img){
			let x = this.rpx2px(data.x),
				y = this.rpx2px(data.y),
				w = this.rpx2px(data.width),
				h = this.rpx2px(data.height);
			this.ctx.drawImage(img.path,0,0,img.width,img.height,x,y,w,h);
		},
		drawText(data){
			let x = this.rpx2px(data.x),
				y = this.rpx2px(data.y),
				size = this.rpx2px(data.fontSize),
				color = data.color,
				text = data.text,
				lineWidth = data.lineWidth;

			this.ctx.setTextBaseline('top');
			this.ctx.setFontSize(size);
			this.ctx.setLineWidth(lineWidth);
			this.ctx.setFillStyle(color);
			this.ctx.fillText(text,x,y);
		},
		drawQrCode(data) {
			let w = this.winWidth,
				h = w,
				url = data.src,
				color = data.color || '#333,#fff';
			color = color.split(',');

			return new Promise((success,error)=>{
				new qrcode('__canvas_qrcode__', {
					text: url,
					usingIn:this,
					// image:'/images/bg.jpg',
					width: w,
					height: h,
					colorDark: color[0],
					colorLight: color[1],
					correctLevel: qrcode.CorrectLevel.H,
					callback(res){
						let path = res.path;
						success(path);
					}
				});
			});

		}
	}
}