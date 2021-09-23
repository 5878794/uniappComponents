

<template>
    <view class="_main" @tap="showFn">
        <image
            class="_img"
            mode="aspectFill"
            :src="imageSrc"
            v-if="isImage"
        />
        <video
            @fullscreenchange="videoFullScreenFn"
            class="_video"
            :autoplay="true"
            :controls="videoControls"
            :loop="true"
            :muted="videoMuted"
            :src="videoSrc"
            id="_video"
            v-else
        />
    </view>
</template>


<script>
    export default {
    	props:{
            src:{
            	type:String,
                default:''
            },
            canFullScreen:{
            	type:Boolean,
                default:true
            }
        },
    	data(){
    	    return {
		        isImage:true,
		        imageSrc:'',
		        videoSrc:'',
		        videoControls:false,
		        videoMuted:true
            }
        },
        watch:{
    		src(){
			    this.checkFile();
            }
        },
	    mounted(){
		    this.checkFile();
        },
    	methods:{
    		checkFile(){
			    let exts = ',bmp,jpg,jpeg,png,tif,gif,pcx,tga,exif,fpx,svg,psd,cdr,pcd,dxf,ufo,eps,ai,raw,WMF,webp,avif,apng,',
				    ext = this.src.substr(this.src.lastIndexOf('.')+1),
				    state = (exts.indexOf(','+ext+',')>-1);
			    this.isImage = state;

			    if(this.isImage){
			    	this.imageSrc = this.src;
                }else{
			    	this.videoSrc = this.src;
                }
            },

		    showFn(){
    		    if(this.isImage){
    		    	this.showImageFn();
                }else{
    		    	this.showVideoFn();
                }
            },



    		//图片点击预览
		    showImageFn(){
                if(this.canFullScreen){
	                uni.previewImage({
		                urls: [this.src],
		                indicator:'default',
		                current: 0
	                });
                }
            },
            //视频全屏播放
		    showVideoFn(){
                if(this.canFullScreen){
                    let video = uni.createVideoContext('_video', this);
                    video.requestFullScreen();
                }
            },
		    videoFullScreenFn(e){
    			let state = e.detail.fullScreen;
                this.videoControls = state;
                this.videoMuted = !state;
            }
        }
    }
</script>



<style scoped>
    @import "../../publish/box.css";
    ._main{
        width: 100%; height: 100%;
    }
    ._img,._video{
        width:100%; height:100%; display:block;
    }
</style>
