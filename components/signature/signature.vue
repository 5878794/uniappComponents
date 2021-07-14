<template>
	<view class='box_hlt signature' ref='signature'>
		<view class='box_slt control'>
			<view class='colors boxflex1 box_sct'>
				<view 
					@tap='changeColorFn' 
					:data-item='item' 
					hover-class="hover" 
					v-for='(item,index) in pageColors'
					class='color'
					:data-n='index'
					:style="{background:item}"
					:class='selectColor[index]'
				></view>
			</view>
			<view class='btns box_sct'>
				<view class='noBtn box_hcc' hover-class='hover' @tap='clearFn'>清除</view>
				<view class='yesBtn box_hcc' hover-class='hover' @tap='submitFn'>完成</view>
			</view>
		</view>
		<view class='canvas_main box_hcc boxflex1'>
			<view class='placeholder'>{{placeholder}}</view>
			<canvas
				class='canvas'
				id='canvas1'
				canvas-id='canvas1' 
				disable-scroll='true'
				@touchstart='startFn'
				@touchmove='moveFn'
				@touchend='endFn'
				@touchcancel='endFn'
			></canvas>
		</view>
	</view>
	
	
</template>

<script>
	export default {
		props:{
			colors:{
				type:String,
				default:'black,red,blue'
			},
			placeholder:{
				type:String,
				default:''
			}
		},
		data(){
			return {
				pageColors:[],
				selectColor:[]
			}
		},
		watch:{
			// colors(oldVal,newVal){
			// 	console.log(oldVal,newVal)
			// }
		},
	
		onReady(){
			this.init();
		},
		methods:{
			init(){
				this.pageColors = this.colors.split(',');
				let l = this.pageColors.length,
					tempArray = new Array(l);
					tempArray[0] = 'select';
				this.selectColor = tempArray;
				
				 this.ctx = uni.createCanvasContext('canvas1',this);
				 this.ctx.lineWidth = 4;
				 this.ctx.lineCap = "round"
				 this.ctx.lineJoin = "round"
				 this.ctx.setStrokeStyle('#333');
			
			},
			startFn(e){
				this.points = [];
				this.hasTouch = true;
				let p = this.getPointXY(e);
				this.points.push(p);
				this.ctx.beginPath();
			},
			moveFn(e){
				if(!this.hasTouch){return;}
				
				let p = this.getPointXY(e);
				
				this.points.push(p);
				if(this.points.length >= 2){
					this.draw();
				}
			},
			endFn(e){
				this.points = [];
				this.hasTouch = false;
				
			},
			getPointXY(e){
				e = (e.touches)? e.touches[0] : e;
				return {
					x:e.x,
					y:e.y
				}
			},
			draw(){
				let l = this.points.length,
					sp = this.points[l-2],
					ep = this.points[l-1];
					this.ctx.moveTo(sp.x, sp.y);
					this.ctx.lineTo(ep.x, ep.y);
					this.ctx.stroke();
					this.ctx.draw(true);
			},
			clearFn(){
				let _this = this;
				uni.getSystemInfo({
					success: function(res) {
						let canvasw = res.windowWidth;
						let canvash = res.windowHeight;
						_this.ctx.clearRect(0, 0, canvasw, canvash);
						_this.ctx.draw(true);
					}
				})
			},
			async submitFn(){
				let img = await this.canvasToImage();
				this.$emit('success',img);
			},
			changeColorFn(e){
				let color = e.currentTarget.dataset.item,
					n = e.currentTarget.dataset.n;
				this.ctx.setStrokeStyle(color);
				
				let l = this.pageColors.length;
				
				this.selectColor = new Array(l);
				this.selectColor[n] = 'select'
			},
			canvasToImage(){
				return new Promise((success,error)=>{
					uni.canvasToTempFilePath({
						canvasId: 'canvas1',
						success: function(res) {
							let fileSrc = res.tempFilePath;
							success(fileSrc);
						},
						fail(e){
							error(e)
						}
					},this)
				})
			}
		}
	}
</script>

<style>
	@import url("../../publish/box.css");
	.signature{ 
		width: 100%; height: 100%;
	}
	.control{
		width: 100rpx; height: 100%;
	}
	.canvas_main{
		width: 100%; height: 100%;
		background: #fefefe; position: relative;
	}
	.canvas{
		position: absolute; left:0; top:0;
		width: 100%; height: 100%; display:block;
	}
	.btns{
		width: 100%; height: 300rpx;
	}
	.yesBtn,
	.noBtn{
		width: 100rpx; height: 80rpx; border:1rpx solid #ccc;
		transform: rotate(90deg); font-size:28rpx; color: #ccc;
		margin: 40rpx 0;
	}
	.yesBtn{
		border:1rpx solid #333; color:#333;
	}
	.hover{
		opacity:0.7;
	}
	.colors{
		width: 100%; padding-top: 40rpx;
	}
	.color{
		width: 60rpx; height: 60rpx; border-radius: 60rpx;
		margin: 20rpx 0; border:6rpx solid transparent;
		box-sizing: border-box;
	}
	.colors .select{
		border:6rpx solid #ccc;
	}
	.placeholder{
		font-size: 70rpx; color: #eee;
		transform: rotate(90deg);
	}
</style>
