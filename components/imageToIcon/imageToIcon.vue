


<template>
    <view class="page box_scc">
        <view class="canvas_main boxflex1">
            <canvas
                    type="2d"
                    class="canvas"
                    id="__createImage_canvas__"
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
        <view class="btns box_hcc">
            <view class="box_hcc" hover-class="hover" @tap="roteRightFn">
                <image class="icon" :src="roteRightImg" />
            </view>
            <view class="box_hcc" hover-class="hover" @tap="rotateLeftFn">
                <image class="icon" :src="roteLeftImg" />
            </view>
            <view class="box_hcc" hover-class="hover" @tap="cancelFn">
                <image class="icon" :src="cancelImg" />
            </view>
            <view class="box_hcc" hover-class="hover" @tap="yesFn">
                <image class="icon" :src="yesImg" />
            </view>
        </view>
    </view>

</template>



<script>
    let cancelImg = "data:image/png;base64,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",
	    yesImg = "data:image/png;base64,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",
	    roteLeftImg = "data:image/png;base64,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",
	    roteRightImg = "data:image/png;base64,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";

    import canvasLib from '../_publish/canvas_publish';

    export default {
        props:{
            imgSrc:{
            	type:String,
                default:''
            },
	        cutWidth:{
            	type:Number,
	            default:100
            }
        },
        data(){
        	return {
		        cancelImg:cancelImg,
		        yesImg:yesImg,
		        roteLeftImg:roteLeftImg,
		        roteRightImg:roteRightImg,
		        coverViewStyle:''
            }
        },
        watch:{
	        imgSrc(src){
	        	if(!this.isInit){return;}
		        if(!src){return;}
	        	this.setImageInfo().catch(e=>{
	        		console.log(e)
			        uni.showModal({
				        title: '系统提示',
				        content: '获取图片失败1111',
				        showCancel:false,
				        confirmText:'确定',
				        success: function () {

				        }
			        });
		        });
            }
        },
        mounted(){
            this.init();
        },
        methods:{
        	async init(){
        		this.isInit = true;
        		//获取canvas信息并设置
        		let canvasInfo = await canvasLib.getCanvasInfo('__createImage_canvas__',this);
		        this.canvasWidth = canvasInfo.width;
		        this.canvasHeight = canvasInfo.height;
		        this.canvas = canvasInfo.canvas;
		        this.ctx = canvasInfo.ctx;
		        this.dpr = canvasInfo.dpr;

                this.rotates = 0;

		        if(!this.imgSrc){return;}
        	    await this.setImageInfo().catch(e=>{
		            uni.showModal({
			            title: '系统提示',
			            content: '获取图片失败',
			            showCancel:false,
			            confirmText:'确定',
			            success: function () {

			            }
		            });
                });
            },
            //设置图片缓存
	        async setImageInfo(){
		        let info = await canvasLib.loadImg(this.canvas,this.imgSrc);
		        this.imgWidth = info.width;
		        this.imgHeight = info.height;
		        this.imgLocal = info;

                this.drawImage();
		        this.setCutBoxInitSize();
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
	                imgPos.left/this.dpr,
                    imgPos.top/this.dpr,
                    imgSize.width/this.dpr,
                    imgSize.height/this.dpr
                );

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
        		let _this = this;
                uni.canvasToTempFilePath({
                    x:this.boxStyle.left,
                    y:this.boxStyle.top,
                    width:this.boxStyle.width,
                    height:this.boxStyle.height,
	                destWidth:this.cutWidth,
	                destHeight:this.cutWidth,
	                canvas:this.canvas,
	                success(rs){
                    	_this.$emit('success',rs.tempFilePath);
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
                },this);
            }

        }
    }
</script>


<style scoped>
    @import "../../publish/box.css";
    .page{
        width: 100vw; height: 100vh; position: relative;
        overflow: hidden;
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
    .btns{
        width: 100%; height: 120rpx;
        background: #333;
    }
    .icon{
        width: 80rpx; height: 80rpx;
    }
</style>
