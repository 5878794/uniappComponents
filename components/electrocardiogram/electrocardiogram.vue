<!--
    文件名：centrogram
    创建人：bens
    时间：2021-12-09 1:39 下午
    编辑器:WebStorm
-->



<template lang="pug">
    view(class="_body")
        canvas(
            type='2d'
            class="canvas"
            id="canvas"
        )
        view(v-if='showNext' class="next" hover-class="hover" @tap="nextFn")
        view(v-if='showPer' class="per" hover-class="hover" @tap="perFn")
        view(class="ss") {{sTime}}
        view(class="es") {{eTime}}
</template>

<script>
    let canvasObj = {
	    async getContent(id,component,type,scale){
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
	    }
    };
    let rem2px = canvasObj.rem2px;


    export default {
        props:{
            value:{
            	type:Array,
                default(){return [];}
            }
        },
        data(){
    		return {
			    sTime:'',
			    eTime:'',
			    showNext:true,
			    showPer:true
            }
        },
        watch:{
            value(){
            	this.handlerData();
	            this.drawStart();
            }
        },
        mounted(){
            this.handlerData();
        },
	    async created(){
        	await this.init();
            this.createGrid(5);
            this.drawStart();
        },
        methods:{
        	handlerData(){
		        let newData = [],
                    arr = [];

		        for(let i=0,l=this.value.length;i<l;i++){
			        if(i%5==0 && i!=0){
				        newData.push(arr);
				        arr = [];
			        }

		        	let temp = this.value[i].values.split(',');
		        	arr = arr.concat(temp);
                }
		        newData.push(arr);

		        this.chartData = newData;

            },
        	async init(){
        		let scale = 50*5*5/750;
		        let {canvas,ctx,width,height,dpr} = await canvasObj.getContent('canvas',this,'2d',scale);
		        this.canvas = canvas;
		        this.ctx = ctx;
		        this.canvasWidth = width;
		        this.canvasHeight = height;

		        this.centerY = this.canvasHeight/2;
		        this.gridLineWidth1 = rem2px(scale);
		        this.gridLineWidth2 = rem2px(scale);
		        this.gridLineBettow = rem2px(50);
		        this.lineWidth = rem2px(3*dpr);
	        },
        	//创建网格
	        createGrid(times){
		        this.ctx.strokeStyle = "#ccc";

		        //y轴线
		        for(let i=0,l=times;i<l;i++){
		        	for(let j=0,jl=5;j<jl;j++){
				        this.ctx.beginPath();
				        this.ctx.lineWidth = (j==0)? this.gridLineWidth2 : this.gridLineWidth1;
				        let x = (i*jl+j)*this.gridLineBettow,
                            y = this.canvasHeight;
				        this.ctx.moveTo(x,0);
				        this.ctx.lineTo(x,y);
				        this.ctx.stroke();
                    }
                }

		        //x轴线
                let l = parseInt(this.canvasHeight/this.gridLineBettow)+1;
		        for(let i=0;i<l;i++){
			        this.ctx.beginPath();
			        this.ctx.lineWidth = this.gridLineWidth1;
			        let x = this.canvasWidth,
				        y = i*this.gridLineBettow;
			        this.ctx.moveTo(0,y);
			        this.ctx.lineTo(x,y);
			        this.ctx.stroke();
                }


            },
            getY(val){
                let y = rem2px(val);
                //减少10倍数据值
                y = y/3;

                y = this.centerY - y;

                return y;
            },
	        drawLine(data){
        		//转换坐标系到  x:0 y:中心
                this.ctx.save();

                //画线
		        this.ctx.strokeStyle = "#45baa6";
                this.ctx.beginPath();
		        this.ctx.lineWidth = this.lineWidth;

		        data.map((rs,i)=>{
		        	let y = this.getY(rs);
		        	if(i==0){
		        		this.ctx.moveTo(i,y);
                    }else{
				        this.ctx.lineTo(i,y);
                    }
                });
		        this.ctx.stroke();

            },
            drawStart(n){
        		n = n || this.chartData.length/2;
        		this.n = n;
	            this.drawLine(this.chartData[n]);
	            this.showTime(n);
            },
            showTime(n){
        		this.sTime = n*5+"S";
        		this.eTime = n*5+5+"S";

        		this.showPer = (n!=0);
        		this.showNext = (n!=this.chartData.length-1);

            },
	        nextFn(){
        		let n = this.n+1,
                    l = this.chartData.length;
        		n = (n>=l)? n-1 : n;
        		this.n = n;

		        this.ctx.clearRect(0,0,this.canvasWidth,this.canvasHeight);
		        this.createGrid(5);
		        this.drawLine(this.chartData[n]);
		        this.showTime(n);
            },
            perFn(){
	            let n = this.n-1;
	            n = (n<=0)? 0 : n;
	            this.n = n;

	            this.ctx.clearRect(0,0,this.canvasWidth,this.canvasHeight);
	            this.createGrid(5);
	            this.drawLine(this.chartData[n]);
	            this.showTime(n);
            }
        }
    }
</script>


<style lang="less" scoped>
    ._body{
        position: relative; width: 100%; height: 100%;
    }
    .canvas{
        display: block; width: 100%; height: 100%;
    }
    .next,.per{
        width: 50rpx; height: 50rpx; background: #fff;
        position: absolute; z-index: 10;
        border-radius: 50rpx; box-shadow: 0 0 3rpx 3rpx rgba(0,0,0,.3);
    }
    .next{
        right: 40rpx; top: 50%; margin-top: -25rpx;
        &:before{
            position: absolute; left:50%; top:50%;
            margin-top: -10rpx; margin-left: -8rpx;
            content: '';
            width: 0;
            height: 0;
            border-top: 10rpx solid transparent;
            border-left: 17rpx solid #45baa6;
            border-bottom: 10rpx solid transparent;
        }
    }
    .per{
        left: 40rpx; top: 50%; margin-top: -25rpx;
        &:before{
            position: absolute; left:50%; top:50%;
            margin-top: -10rpx; margin-left: -8rpx;
            content: '';
            width: 0;
            height: 0;
            border-top: 10rpx solid transparent;
            border-right: 17rpx solid #45baa6;
            border-bottom: 10rpx solid transparent;
        }
    }
    .ss{
        position: absolute; left: 40rpx; bottom:40rpx;
        font-size: 28rpx; color: #ccc;
    }
    .es{
        position: absolute; right: 40rpx; bottom:40rpx;
        font-size: 28rpx; color: #ccc;
    }
</style>
