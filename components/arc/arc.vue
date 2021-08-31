


<template>
    <canvas
        class='canvas'
        id='canvas1'
        canvas-id='canvas1'
    ></canvas>
</template>


<script>
	export default {
		props:{
			color:{
				type:String,
				default:'rgba(255,255,255,1)'
			},
			bg:{
				type:String,
				default:'rgba(255,255,255,.7)'
			},
            bgLineWidth:{
				type:String,
                default:'5'
            },
            lineWidth:{
	            type:String,
	            default:'8'
            },
            per:{
				type:Number,
                default:0          //要显示的圆环的百分比
            },
            startDeg:{
				type:Number,
                default:90           //默认正右方为0deg开始的地方
            }
		},
		data(){
			return {

			}
		},
		watch:{
			per(){
				console.log(this.per)
				// this.init();
            }
		},

		onReady(){
            this.init();
		},
		methods:{
            async init(){
            	let style = await this.getCanvasStyle();
            	this.width = style.width;
            	this.height = style.height;
            	this.centerX = parseInt(this.width/2);
            	this.centerY = parseInt(this.height/2);
            	let r = (this.centerX>this.centerY)? this.centerY : this.centerX;
            	this.r = r-this.lineWidth/2;

            	this.setCanvas();
                this.createBg();
                this.createArc();
            },
			getCanvasStyle(){
				let query = uni.createSelectorQuery().in(this);
				return new Promise(success=>{
					setTimeout(e=>{
						query.select('#canvas1').boundingClientRect(rs => {
							success(rs);
						}).exec();
					},0)

				});
			},
			setCanvas(){
				this.ctx = uni.createCanvasContext('canvas1',this);
            },
			createBg(){
				this.ctx.beginPath();
				this.ctx.arc(this.centerX, this.centerY, this.r, 0, 2 * Math.PI);
				this.ctx.setStrokeStyle(this.bg);
				this.ctx.setLineWidth(this.bgLineWidth);
				this.ctx.stroke();
                this.ctx.draw(true);
            },
			createArc(){
            	console.log(this.per)
            	let startDeg = this.startDeg * 2 * Math.PI / 360,
		            endDeg = startDeg + 2 * Math.PI * this.per/100;
            	console.log(endDeg)

				this.ctx.beginPath();
				this.ctx.arc(this.centerX, this.centerY, this.r, startDeg , endDeg,false);
				this.ctx.setStrokeStyle(this.color);
				this.ctx.setLineWidth(this.lineWidth);
				this.ctx.setLineCap('round');
				this.ctx.stroke();
				this.ctx.draw(true);
            }
		}
	}
</script>

<style>
    .canvas{
        display: block; width: 100%; height: 100%;
    }
</style>
