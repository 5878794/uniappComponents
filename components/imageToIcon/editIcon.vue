
<!--图片编辑页面 app端用  非组件  直接是页面-->
<!--页面参数添加 src=''-->
<!--父级页面添加 editIconSuccess  方法 获取返回的本地图片路径-->


<!--pages.json中 当前页面配置style 添加-->
<!--
"style": {
    "navigationBarTextStyle": "white",
    "navigationBarTitleText": "",
    "navigationStyle": "custom",
    "enablePullDownRefresh": false,
    "app-plus": {
        "bounce": "none",
        "titleNView": {
            "backgroundColor": "rgba(0,0,0,1)",
            "titleColor": "#fff",
            "titleText": "",
            "type": "transparent",
            "buttons": [{
                "float": "right",
                "text": "完成",
                "fontSize": "16px",
                "background": "rgba(255,255,255,.1)",
                "color": "rgba(255,255,255,1)",
                "colorPressed": "rgba(255,255,255,.7)",
                "width": "60px"

            }]
        }
    }
}
-->



<template>
    <view class="page box_scc">
        <view class="canvas_main boxflex1">
            <canvas
                    class="canvas"
                    id="__createImage_canvas__"
                    canvas-id="__createImage_canvas__"
            ></canvas>
            <view
                    class="cover_view"
                    :style="coverViewStyle"
                    @touchstart="touchstart"
                    @touchmove="touchmove"
                    @touchend="touchend"
            >
            </view>
        </view>
    </view>

</template>



<script>


	export default {
		data(){
			return {
				coverViewStyle:''
			}
		},
        onLoad(e){
			this.cutWidth = 200;
		    this.imgSrc = e.src;

        },
		onReady(){
			this.init();
		},
		onNavigationBarButtonTap(e){
            this.yesFn().then(src=>{
            	this.runParentPageFn('editIconSuccess',src);
	            uni.navigateBack({
		            delta:1,
		            //窗口关闭的动画效果(只有app有)			'pop-in'   'pop-out'
		            animationType:'pop-out',
		            //窗口关闭动画的持续时间，单位为 ms
		            animationDuration:200
	            })
            })
		},
		methods:{
			runParentPageFn(fn,param){
				let pages = getCurrentPages();
				if (pages.length < 2) {
					console.log('没有父级页面');
					return new Promise(r=>{r();});
				}
				let parentPage = pages[pages.length - 2].$vm;
				if(parentPage[fn]){
					return parentPage[fn](param);
				}else{
					return new Promise(r=>{r();});
				}

			},
			async init(){
				let id = '__createImage_canvas__',
                    canvasInfo = await this.getCanvasSize(id),
                    imgInfo = await this.getImageInfo(this.imgSrc);

				this.canvasId = id;
				this.canvasWidth = canvasInfo.width;
				this.canvasHeight = canvasInfo.height;
				this.ctx = uni.createCanvasContext(id);

				this.imgWidth = imgInfo.width;
				this.imgHeight = imgInfo.height;
				this.imgLocal = imgInfo.path;

				this.drawImage();
				this.setCutBoxInitSize();

			},
            async getCanvasSize(id){
	            let query = uni.createSelectorQuery();
	            return new Promise(success=>{
		            query.select('#'+id)
			            .fields({ size: true })
			            .exec((res) => {
				            success(res[0]);
			            });
	            });
            },
            async getImageInfo(src){
	            return new Promise((success,error)=>{
		            uni.getImageInfo({
                        src:src,
                        success(res){
                        	success(res)
                        },
                        error(e){
                        	error('获取图片失败');
                        }
                    })
	            });
            },


			//画图片到画布
			drawImage(){
				let imgSize = this.imgAutoRoom(),
					imgPos = this.imgAutoCenter(imgSize);

				this.ctx.clearRect(0,0,this.canvasWidth,this.canvasHeight);
				this.ctx.drawImage(
					this.imgLocal,
					0,
					0,
					this.imgWidth,
					this.imgHeight,
					imgPos.left,
					imgPos.top,
					imgSize.width,
					imgSize.height
				);
				this.ctx.draw();

				this.imgCatch = {
					x:imgPos.left,
					y:imgPos.top,
					w:imgSize.width,
					h:imgSize.height,
					aspectRatio:imgSize.width/imgSize.height
				};

				this.setCutBoxInitSize();
			},
			//获取图片显示大小
			imgAutoRoom(rotate){
				let imgWidth = this.imgWidth,
					imgHeight = this.imgHeight;
				rotate = rotate || false;

				let canvasHeight,canvasWidth;
				if(rotate){
					canvasHeight = this.canvasWidth;
					canvasWidth = this.canvasHeight;
				}else{
					canvasWidth = this.canvasWidth;
					canvasHeight = this.canvasHeight;
				}

				if(imgWidth>0 && imgHeight>0){
					if(imgWidth/imgHeight>=canvasWidth/canvasHeight){
						if(imgWidth>canvasWidth){
							return {width:canvasWidth,height:(imgHeight*canvasWidth)/imgWidth};
						}else{
							return {width:imgWidth,height:imgHeight};
						}
					}
					else{
						if(imgHeight>canvasHeight){
							return {width:(imgWidth*canvasHeight)/imgHeight,height:canvasHeight};
						}else{
							return {width:imgWidth,height:imgHeight};
						}
					}
				}else{
					return {width:0,height:0};
				}
			},
			//获取图片的位置
			imgAutoCenter(imgData,rotate){
				rotate = rotate || false;

				let canvasHeight,canvasWidth;
				if(rotate){
					canvasHeight = this.canvasWidth;
					canvasWidth = this.canvasHeight;
				}else{
					canvasWidth = this.canvasWidth;
					canvasHeight = this.canvasHeight;
				}

				let imgWidth=imgData.width,
					imgHeight=imgData.height;

				let top,left;

				if(imgWidth>0 && imgHeight>0){
					if(canvasWidth>imgWidth){
						left=(canvasWidth-imgWidth)/2;
					}else{
						left=0;
					}
					if(canvasHeight>imgHeight){
						top=(canvasHeight-imgHeight)/2;
					}else{
						top=0;
					}
					return {top:top,left:left};
				}else{
					return {top:0,left:0};
				}
			},
			//图片旋转
			imageRotate(orientation){
				if(orientation=="right"){
					this.rotates++;
				}else{
					this.rotates--;
				}

				this.ctx.clearRect(0,0,this.canvasWidth,this.canvasHeight);
				this.ctx.save();
				this.ctx.translate(this.canvasWidth/2/this.dpr,this.canvasHeight/2/this.dpr);
				this.ctx.rotate(Math.PI*this.rotates/2);

				let imgSize,imgPos;
				if(parseInt(this.rotates/2) == this.rotates/2){
					imgSize = this.imgAutoRoom();
					imgPos = this.imgAutoCenter(imgSize);

					this.ctx.translate(-this.canvasWidth/2/this.dpr,-this.canvasHeight/2/this.dpr);
				}else{
					imgSize = this.imgAutoRoom(true);
					imgPos = this.imgAutoCenter(imgSize,true);

					this.ctx.translate(-this.canvasHeight/2/this.dpr,-this.canvasWidth/2/this.dpr);
				}


				this.ctx.drawImage(
					this.imgLocal,
					0,
					0,
					this.imgWidth,
					this.imgHeight,
					imgPos.left/this.dpr,
					imgPos.top/this.dpr,
					imgSize.width/this.dpr,
					imgSize.height/this.dpr
				);

				let rotatesed = (parseInt(this.rotates/2)==this.rotates/2);
				this.imgCatch = {
					x:(rotatesed)? imgPos.left : imgPos.top,
					y:(rotatesed)? imgPos.top : imgPos.left,
					w:(rotatesed)? imgSize.width : imgSize.height,
					h:(rotatesed)? imgSize.height : imgSize.width
				};


				this.ctx.restore();
			},
			//设置cutBox初始大小
			setCutBoxInitSize(){
				let w = this.cutWidth;
				// w = (w>this.imgWidth)? this.imgWidth : w;
				// w = (w>this.imgHeight)? this.imgHeight:w;

				let borderW = (this.canvasWidth>this.canvasHeight)? this.canvasWidth : this.canvasHeight,
					centerX = (this.canvasWidth-w)/2,
					canterY = (this.canvasHeight-w)/2;

				this.boxStyle = {
					width:w,
					height:w,
					borderWidth:borderW,
					left:centerX,
					top:canterY

				};
				this.boxStyleText = `border:${borderW}px solid rgba(0,0,0,.5);left:-${borderW}px;top:-${borderW}px;`;

				this.setBoxStyle();
			},
			setBoxStyle(){
				let s = this.boxStyle;
				this.coverViewStyle = this.boxStyleText +
					`width:${s.width}px;
                                       height:${s.height}px;
                                       transform:translate(${s.left}px,${s.top}px);
                                      `;
			},

			touchstart(e){
				if(e.touches.length > 2 || e.touches.length == 0){
					return;
				}

				let x=0,y=0;
				if(e.touches.length == 1){
					x=e.touches[0].pageX;
					y=e.touches[0].pageY;

				}

				this.touchStartParam = {
					x:x,
					y:y,
					width:this.boxStyle.width,
					height:this.boxStyle.height,
					left:this.boxStyle.left,
					top:this.boxStyle.top,
					point2Length:null,
					centerX:this.boxStyle.left+this.boxStyle.width/2,
					centerY:this.boxStyle.top+this.boxStyle.height/2
				};


			},
			touchmove(e){
				if(e.touches.length == 1){
					this.moveCutBox(e);
				}else if(e.touches.length==2){
					this.scaleCutBox(e);
				}
			},
			//移动剪切框
			moveCutBox(e){
				let x = e.touches[0].pageX,
					y = e.touches[0].pageY;

				x = x - this.touchStartParam.x + this.touchStartParam.left;
				y = y - this.touchStartParam.y + this.touchStartParam.top;

				//不超出画布显示的范围
				let maxX = this.canvasWidth - this.boxStyle.width,
					maxY = this.canvasHeight - this.boxStyle.height;
				x = (x<0)? 0 : x;
				x = (x>maxX)? maxX : x;
				y = (y<0)? 0 : y;
				y = (y>maxY)? maxY : y;


				this.boxStyle.left = x;
				this.boxStyle.top = y;
				this.setBoxStyle();
			},
			// 缩放剪切框
			scaleCutBox(e){
				let p1x = e.touches[0].pageX,
					p1y = e.touches[0].pageY,
					p2x = e.touches[1].pageX,
					p2y = e.touches[1].pageY,
					startParam = this.touchStartParam;

				//计算手指2点距离
				let l = Math.pow(p2x-p1x,2)+Math.pow(p2y-p1y,2);
				l = Math.sqrt(l);

				if(!startParam.point2Length){
					startParam.point2Length = l;
				}

				//计算缩放比例 及新的属性
				let per = l/startParam.point2Length,
					width = startParam.width*per,
					height = startParam.height*per,
					left = startParam.centerX - width/2,
					top = startParam.centerY - height/2;

				//显示坐标及大小
				let maxW = (this.canvasWidth > this.canvasHeight)? this.canvasHeight : this.canvasWidth;
				width = (width>maxW)? maxW : width;
				width = (width<this.cutWidth)? this.cutWidth : width;
				height = (height>maxW)? maxW : height;
				height = (height<this.cutWidth)? this.cutWidth : height;
				let maxX = this.canvasWidth - width,
					maxY = this.canvasHeight - height;
				left = (left < 0)? 0 : left;
				left = (left > maxX)? maxX : left;
				top = (top>maxY)? maxY : top;
				top = (top<0)? 0 : top;

				if(this.boxStyle.width == width && this.boxStyle.height == height){
					return;
				}
				this.boxStyle.width = width;
				this.boxStyle.height = height;
				this.boxStyle.left = left;
				this.boxStyle.top = top;
				this.setBoxStyle();
			},

			touchend(e){
				this.touchstart(e);
			},

            //旋转图片
			rotateLeftFn(){
				this.imageRotate('right');
			},
			roteRightFn(){
				this.imageRotate('left');
			},
			cancelFn(){
				this.$emit('close','');
			},
			//截图
			async yesFn(){
				return new Promise((success,error)=>{
					uni.canvasToTempFilePath({
						x:this.boxStyle.left,
						y:this.boxStyle.top,
						width:this.boxStyle.width,
						height:this.boxStyle.height,
						destWidth:this.cutWidth,
						destHeight:this.cutWidth,
						canvasId:this.canvasId,
						success(rs){
							success(rs.tempFilePath);
							// console.log(rs)
							// _this.$emit('success',rs.tempFilePath);
						},
						fail(e){
							uni.showModal({
								title: '系统提示',
								content: '生成图片失败',
								showCancel:false,
								confirmText:'确定',
								success: function () {

								}
							});
						}
					});
                });

			}


		}
	}
</script>


<style scoped>
    @import "../../publish/box.css";
    .page{
        width: 100vw; height: 100vh; position: relative;
        overflow: hidden; background: #000;
    }
    .canvas_main{
        width:100%; overflow: hidden; position: relative;
    }
    .canvas{
        width: 100%; height: 100%;
    }
    .cover_view{
        position: absolute; left:0; top:0; z-index: 10;
    }
    .cover_view:after{
        content: ''; display: block;
        width: 100%; height: 100%;
        border:2rpx solid red; box-sizing: border-box;
    }
</style>
