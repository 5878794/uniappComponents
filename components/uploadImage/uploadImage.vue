
<!--TODO-->
<!--//原生创建ui界面显示上传图片及进度-->
<!--//微信端未写-->
<!--目前只做咯ui显示  未做上传功能-->


<template></template>


<script>
    export default {
    	props:{
    		data:{
    			type:Object,
                default(){return {}}
            },
            getOssParamUrl:{
    			type:String,
                default:''
            }
        },
	    mounted(){
    		//原生创建ui界面显示上传图片及进度
            //微信端未写
		    // this.createView();
        },
        methods:{
	    	createView(){
	    		let screen = plus.screen,
                    winWidth = screen.width/screen.scale,
                    winHeight = screen.height/screen.scale,
                    width = 220,
                    height = 220,
                    left = (winWidth-width)/2,
                    top = (winHeight-height)/2;

	    		//创建遮罩层
	    		let zz = new plus.nativeObj.View('zz',
                    {top:0,left:0,width:'100%',height:'100%'}
                );
	    		zz.drawRect(
	    			{color:'rgba(0,0,0,.4)'},
                    {top:0,left:0,width:'100%',height:'100%'}
                );
	    		this.zz = zz;

	    		//创建gif动画图片及容器
			    let view = new plus.nativeObj.View('test',
				    {top:top+'px',left:left+'px',height:height+'px',width:width+'px'}
                );
			    view.drawRect(
			    	{
                        color:'#000',
                        radius:'10px'
                    },
                    {
                        top:0,
                        left:0,
                        width:'100%',
                        height:'100%'
			        }
			    );

			    let  bitmap = new plus.nativeObj.Bitmap('img1', '_www/static/loading.gif');
			    view.drawBitmap(
			    	bitmap,
                    {
                    	top:'0px',
                        left:'0px',
                        width:'100%',
                        height:'100%'
                    },
                    {
                    	top:0,
                        left:'30px',
                        width:'160px',
                        height:'160px'
                    });


			    // 创建文字
			    view.drawText('正在上传文件',
                    {
                    	bottom:'40px',
                        left:'0px',
                        width:'100%',
                        height:'20px'
                    },
                    {
                    	align:'center',
                        color:'#FFFFFF'
                    });
			    view.drawText('0%',
				    {
					    bottom:'20px',
					    left:'0px',
					    width:'100%',
					    height:'20px'
				    },
				    {
					    align:'center',
					    color:'#FFFFFF'
				    });

			    this.view = view;
            },
            changeText(per){
	    		// this.view.clearRect({
				//     bottom:'20px',
				//     left:'0px',
				//     width:'100%',
				//     height:'20px'
                // });

	            this.view.drawRect(
		            {
			            color:'#000'
		            },
		            {
			            bottom:'20px',
			            left:'0px',
			            width:'200px',
			            height:'20px'
		            }
	            );

	    		this.view.drawText(per+'%',
				    {
					    bottom:'20px',
					    left:'0px',
					    width:'100%',
					    height:'20px'
				    },
				    {
					    align:'center',
					    color:'#FFFFFF'
				    });
            },
            show(){
	            this.zz.show();
	    		this.view.show();
            },
            hide(){
	    		this.view.hide();
	    		this.zz.hide();
            },
            destroy(){
	    		this.view.close();
	    		this.zz.close();
            },



	        async upload(data){
	    		// this.show();
	    		console.log(data)
                //获取data中要上传的数据
                for(let [key,val] of Object.entries(data)){

                }
            },
	        checkIsLocalImage(url){
		        return (
			        url.indexOf(':\/\/tmp\/') > -1  ||
			        url.indexOf('wxfile:') > -1 ||
			        url.indexOf('file:') > -1
		        );
	        },

        }
    }
</script>


