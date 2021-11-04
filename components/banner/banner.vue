

<template>
    <swiper
            class="swiper"
            :indicator-dots="indicatorDots"
            :indicator-color="indicatorColor"
            :indicator-active-color="indicatorActiveColor"
            :autoplay="autoplay"
            :circular="circular"
            :vertical="vertical"
            :interval="interval"
            :duration="duration"
            :previous-margin="previousMargin"
            :next-margin="nextMargin"
            @animationfinish="changeEndFn"
    >
        <block v-for="(item,index) in srcs_" :key="index">
            <swiper-item class="swiper_item">
                <view class="banner_list box_hcc" :data-n="index" :data-data="item" @tap="onclick">
<!--                    是app-->
                    <!-- #ifdef APP-PLUS -->
                    <block v-if="item.isImg">
                        <image
                            class="banner_img"
                            :mode="mode"
                            :src="item.src"
                        ></image>
                    </block>
                    <block v-else>
                        <image
                            class="banner_img"
                            :mode="mode"
                            :src="item.poster"
                        ></image>
                        <view class="playVideo" :style="playImg"></view>
                        <video
                            :src="item.src"
                            :id="'video'+index"
                            class="video_"
                            @fullscreenchange="videoEventFn"
                        ></video>
                    </block>
                    <!-- #endif -->


<!--                    非app-->
                    <!-- #ifndef APP-PLUS -->
                    <image
                            v-if="item.isImg"
                            class="banner_img"
                            :mode="mode"
                            :src="item.src"
                    ></image>
                    <video
                            v-else
                            class="banner_img"
                            :src="item.src"
                            :autoplay="true"
                            :loop="true"
                            :muted="true"
                            :controls="false"
                            :show-play-btn="false"
                            :show-center-play-btn="false"
                            :enable-progress-gesture="false"
                    ></video>
                    <!-- #endif -->

                </view>
            </swiper-item>
        </block>
    </swiper>

</template>


<script>
    let playImg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAdZJREFUaEPtlz1LA0EQQOf9JhsLC1OKhY0IoiiS3sJCEWxESMTGQmu/ChHSiShWBiSFINhYWFhob6eFXWTgFoJNbnd2cxu4g6uys/PezM7lDhnzizHnl1qg6g7WHag7YKyA9xHq9/vTIqL3J3BqzG8ODxF4KAQ0eUdE2sCLmSRwgxCB/r9cPyLSAtqBDKawGAIO4LHoxp2JyDM4poBLfQSse3IEL08hoDDvxbFKPuSpBFxFdcibwHdwiYcEphbQ9EmHfBQCg0O+AnzE7MYoBRz3IbARS6IKATfki8CzVaQqAcd9AaxaJKoWcEM+D9yHiOQg4LhvgVlfiZwEHPsScFlWJEcBZX8CJstI5Cqg7B1gYZhEzgJdoDGuAj1gahi8/p5jB+aA6zLwuQmcAM2y4G5dDh34EpEG8OoLn0MHtoCDEPCqO9ATkeUYr9ZVHCF9C72yVH0wdpQCJyKiR0bPfLRrFAIKvAbcRKMe2Ci1QEtE9oDfFPApn0I6pDtANxV4yqfQNrCfGjyFgP7963Exf+f6yMeYAR3SXeDYJ3GstSECWuGJAkC/nLTqb7GAfPcJEZgRkU0ROQfOfBPGXu8tEBvAul8tYK2gNb7ugLWC1vi6A9YKWuP/ADcYvDHue2tkAAAAAElFTkSuQmCC';

	export default {
		props:{
			//是否显示点
			indicatorDots:{
				type:Boolean,
				default:true
			},
			//是否自动播放
			autoplay:{
				type:Boolean,
				default:true
			},
			//是否采用衔接滑动
			circular:{
				type:Boolean,
				default:true
			},
			//滑动方向是否为纵向
			vertical:{
				type:Boolean,
				default:false
			},
			//自动切换时间间隔
			interval:{
				type:Number,
				default:5000
			},
			//滑动动画时长
			duration:{
				type:Number,
				default:500
			},
			//前边距，可用于露出前一项的一小部分，接受 px 和 rpx 值
			previousMargin:{
				type:String,
				default:'0'
			},
			//后边距，可用于露出后一项的一小部分，接受 px 和 rpx 值
			nextMargin:{
				type:String,
				default:'0'
			},
			//指示点颜色
			indicatorColor:{
				type:String,
				default:'rgba(0, 0, 0, .3)'
			},
			//当前选中的指示点颜色
			indicatorActiveColor:{
				type:String,
				default:'#000000'
			},
			//传入的图片   [{img:'',href:''}]
			// href 可以不传或空 点击事件无效
			srcs:{
				type:Array,
				default:[]
			},
            mode:{
				type:String,
                default:'aspectFill'
            }
		},
		data(){
			return {
				srcs_:[],
				playImg:''
			}
		},
        watch:{
		    srcs(){
		    	this.handlerSrc();
            }
        },
		mounted(){
			this.handlerSrc();

			this.playImg = `background-image:url(${playImg}); background-size:48rpx 48rpx;background-repeat:no-repeat;background-position:center center;`;
		},
		methods:{
			handlerSrc(){
				let data = this.srcs,
                    newData = [];

				data.map(rs=>{
					let src = rs.src;
					rs.isImg = this.fileIsImg(src);
					newData.push(rs);
                });

				this.srcs_ = newData;
            },
            //判断是否是图片
			fileIsImg(src){
				let exts = ',bmp,jpg,jpeg,png,tif,gif,pcx,tga,exif,fpx,svg,psd,cdr,pcd,dxf,ufo,eps,ai,raw,WMF,webp,avif,apng,',
                    ext = src.substr(src.lastIndexOf('.')+1);

				return (exts.indexOf(','+ext+',')>-1);
            },
            onclick(e){
	            let data = e.currentTarget.dataset.data,
		            href = data.href,
                    index = e.currentTarget.dataset.n,
                    id = 'video'+index,
                    isImg = data.isImg;

	            //是视频
	            if(!isImg){
                    this.video = uni.createVideoContext(id,this);
                    this.video.requestFullScreen();

                }else{
		            if(href){
			            uni.navigateTo({
				            url:href
			            })
		            }
                }
            },
            //全屏和退出全屏时触发
			videoEventFn(e){
				let isFullScreen = e.target.fullScreen;
				if(isFullScreen){
					this.video.play();
                }else{
					this.video.pause();
                }

            },
			changeEndFn(e){
				let now = e.detail.current+1,
					total = this.srcs.length;

				this.$emit('changeEnd',{now,total});
            }
		}
	}
</script>


<style scoped>
    @import "../../publish/box.css";

    .swiper{
        display: block;
        width: 100%;
        height: 100%;
        position: relative;
    }
    .swiper_item{
        top:0;left:0;right:0;bottom:0;
    }
    .banner_list{
        display: block; width: 100%; height: 100%;
        position: relative;
    }
    .banner_img{
        display: block; width: 100%; height: 100%;
    }
    .playVideo{
        display:block; width:100rpx; height:100rpx;
        position: absolute; left:50%; top:50%;
        margin-top:-50rpx; margin-left:-50rpx;
        background-color: rgba(0,0,0,.5);
        border-radius: 20rpx;
    }
    .video_{
        display: block; width: 0rpx; height: 0rpx;
        opacity: 0;
    }
</style>
