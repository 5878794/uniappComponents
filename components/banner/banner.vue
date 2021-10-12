

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
            :next-margin="nextMargin">
        <block v-for="(item,index) in srcs_" :key="index">
            <swiper-item class="swiper_item">
                <view class="banner_list box_hcc" :data-data="item" @tap="onclick">
                    <image
                        v-if="item.isImg"
                        class="banner_img"
                        mode="aspectFill"
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
                </view>
            </swiper-item>
        </block>
    </swiper>

</template>


<script>
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
			}
		},
		data(){
			return {
				srcs_:[]
			}
		},
        watch:{
		    srcs(){
		    	this.handlerSrc();
            }
        },
		mounted(){
			this.handlerSrc();
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
		            href = data.href;

	            if(href){
		            uni.navigateTo({
			            url:href
		            })
	            }
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
    }
    .banner_img{
        display: block; width: 100%; height: 100%;
    }
</style>
