

<template>
    <view class="box_hlc item">
        <canvas id="canvas" class="canvas"  canvas-id='canvas'></canvas>
        <view class="arrow" :style="boxStyle">
            <view class="arrow_item"></view>
        </view>
        <view class="info box_sct">
            <view class="per">{{per}}</view>
            <view>{{title}}</view>
        </view>
    </view>
</template>


<script>
	export default {
		props:{
            title:{
            	type:String,
                default:''
            },
            per:{
            	type:Number,
                default: 0
            }
		},
		data(){
			return {
				boxStyle:''
			}
		},
		watch:{
            per(){
                this.rotateArrow();
            }
		},

		onReady(){
			//必须3个
            let winWidth = uni.getSystemInfoSync().windowWidth;
            this.lineWidth = winWidth*48/750;
            this.boxWidth = winWidth*370/750 - this.lineWidth*2;
            this.boxStyleTemp = `width:${this.boxWidth}px;height:${this.boxWidth}px;margin-left:-${this.boxWidth/2}px;margin-top:-${this.boxWidth/2}px;`;
            this.boxStyle = this.boxStyleTemp;

			this.lineColors = ['#FF6E48','#FFA200','#21DEBE'];
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
				this.rotateArrow();
			},
			getCanvasStyle(){
				let query = uni.createSelectorQuery().in(this);
				return new Promise(success=>{
					setTimeout(e=>{
						query.select('#canvas').boundingClientRect(rs => {
							success(rs);
						}).exec();
					},0)

				});
			},
			setCanvas(){
				this.ctx = uni.createCanvasContext('canvas',this);
			},
            getDeg(deg){
				return 2 * Math.PI * deg / 360;
            },
			createBg(){
				//原点在右中 整个圆分成4份  画出来3份  起点在 90+45 度位置
				let startDeg = this.getDeg(135);

				this.lineColors.map(rs=>{
                    let endDeg = startDeg + this.getDeg(90);

					this.ctx.beginPath();
					this.ctx.arc(this.centerX, this.centerY, this.r, startDeg , endDeg,false);
					this.ctx.setStrokeStyle(rs);
					this.ctx.setLineWidth(this.lineWidth);
					this.ctx.stroke();
					this.ctx.draw(true);

					startDeg = endDeg;
                });


            },
			rotateArrow(){
				let startDeg = -135,
                    total = 270,
                    now = total*this.per/100 + startDeg;

				this.boxStyle = this.boxStyleTemp + 'transform:rotate('+now+'deg)';
            }
		}
	}
</script>

<style scoped>
    @import "../../../publish/box.css";

    .item{
        width: 370rpx; height: 370rpx;
        position: relative;
    }
    .canvas{
        width: 100%; height: 100%; display: block;
    }

    .arrow{
        position: absolute; left: 50%; top:50%;
        border-radius: 100%;
        transform:rotate(-135deg);
        transition: all .3s linear;
    }
    .arrow_item{
        width: 0;
        height: 0;
        border-left: 24rpx solid transparent;
        border-right: 24rpx solid transparent;
        border-bottom: 40rpx solid #fff;
        position: absolute;
        left: 50%;
        top: -24rpx;
        margin-left: -24rpx;
    }
    .info{
        position: absolute; left: 0; top:0;
        width: 100%; height: 100%;
        font-size: 32rpx; color: #333;
        box-sizing: border-box;
        padding-top: 120rpx;
        font-weight: bold;
    }
    .per{
        color: #FFA200;
        font-size: 40rpx;
        padding-bottom: 10rpx;
        font-weight: 400;
    }

</style>
