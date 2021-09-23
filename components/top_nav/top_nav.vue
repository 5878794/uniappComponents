<!-- 顶部模拟导航条   背景透明 -->



<template>
    <view style="width: 100%;">
        <view v-if="useShim" class="top_" :style="navStyle_"></view>
        <view class="box_hlc top" :style="navStyle">
            <view class="left box_hlc" :style="leftStyle">
                <view class="backBtn" :style="arrowStyle" v-if="showBack" @tap="backFn"></view>
                <slot></slot>
            </view>
            <view class="boxflex1 diandian" :style="centerStyle">{{title}}</view>
            <view class="right box_hrc" :style="rightStyle">
                <slot name="right"></slot>
            </view>
        </view>
    </view>
</template>

<script>
    let getWinInfo = function(){
        return new Promise(success=>{
	        uni.getSystemInfo({
                success(res){
                	success(res);
                }
            })
        });
    };
    let blackArrow = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAAY1BMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABmaHTeAAAAIHRSTlMAgFd5cm1qYvfs4HxlW001dl/Wy7+zqJyQhUQ/LCEVCXfL2gUAAACrSURBVEjH1dVJDoMwFANQAk1TSgc6zyX3PyVgib0tb8DrF4nB+b9YYJog+pylE1UeEkS/PdK+HX39of1q9JuD5nMp+kT7CB9pv4avRP8S/ZP2O/iH6O+0T/C3jvUn+Otf85cf6/fw5y/vtUKX8PVb8Si0cUB5JP2l/c/q/zgkTdUwyifVW79A/hX1hwASpzFjDDJrVPrDGGmJsgsLxV9ZSIOlKK9dKSEUc08PDgQcUrhKnX0AAAAASUVORK5CYII=',
        whiteArrow = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwAQMAAABtzGvEAAAABlBMVEUAAAD///+l2Z/dAAAAAXRSTlMAQObYZgAAAGZJREFUGNN9kLENgCAQRTUWlo7gKI6GozmKI1hSECS59zoCFLyE3Lv73DI8T9zrG9i+wA4OHk9KrjuQ0CpaQcsTDSTsH62iFbSMhg14pERB3Wa2dpBjDWEkAxrX8H5lIgIW4nr60wBCxCaXcSlfCgAAAABJRU5ErkJggg==';

	export default {
		props:{
			title:{
				type:String,
				default:''
			},
			// showBack:{
			// 	type:Boolean,
			// 	default:false
			// },
            pageBg:{
				type:String,
	            default:''
            },
            topBg:{
			    type:String,
	            default:''
            },
			moveBg:{
				type:String,
				default:'#fff'
            },
			moveBgTop:{
				type:Number,
				default:50
            },
			useShim:{
				type:Boolean,
                default:true
            },
			theme:{
				type:String,
                default:'black'
            }
		},
        data(){
		    return {
			    rightStyle:'',      //左右块的样式
			    centerStyle:'',
			    leftStyle:'',
                catchNavStyle:'',
			    navStyle:'',         //nav整体样式
			    navStyle_:'',
			    arrowStyle:'',
			    showBack:false
            }
        },
		async mounted(){
			//#ifdef MP-WEIXIN
			let isWxApp = true;
			//#endif

			//#ifndef MP-WEIXIN
			let isWxApp = false;
			//#endif


			let wxBtnStyle = this.getWxBtnStyle(),
                winStyle = await getWinInfo(),
                //判断是否是android中的微信
                isAndroid = (winStyle.system.toLocaleLowerCase().indexOf('ios') == -1 && isWxApp),
                winWidth = winStyle.windowWidth,
                wxBtnRight = winWidth - wxBtnStyle.right,
                navHeight = wxBtnStyle.height+wxBtnStyle.top+6,
                textColor = (this.theme == 'black')? '#000' :'#fff';

			this.showBack = (getCurrentPages().length > 1);
			this.rightStyle = `width:${wxBtnStyle.width}px;height:${wxBtnStyle.height}px;`;
			this.leftStyle = this.rightStyle + `margin-left:${wxBtnRight}px;`;
			this.rightStyle += `margin-right:${wxBtnRight}px;`;
			this.centerStyle = `margin:0 ${wxBtnRight}px;color:${textColor};`;

            this.navStyle = `width:100%;height:${navHeight}px;box-sizing:border-box;padding-top:${wxBtnStyle.top}px;padding-bottom:6px;`;
            this.navStyle_ = (this.pageBg)? this.navStyle+`background:${this.pageBg};` : this.navStyle;
            this.navStyle += `background:${this.topBg};`;

            if(isAndroid){
	            this.navStyle += 'font-size:32rpx;';
	            this.leftStyle += 'width:auto;';
            }else{
            	this.navStyle += 'font-size:38rpx;';
            	if(isWxApp){
		            this.navStyle += 'font-weight: bold;';
                }
                this.centerStyle += 'text-align:center;';
            }

            let arrowBg = (this.theme == 'black')? blackArrow : whiteArrow;
            this.arrowStyle = `background:url(${arrowBg});background-size:100%;`;

			this.catchNavStyle = this.navStyle;
        },
		methods:{
			getWxBtnStyle(){
                //#ifdef MP-WEIXIN
				return uni.getMenuButtonBoundingClientRect();
                //#endif

                //#ifndef MP-WEIXIN
                return {
	                bottom: 80,
	                height: 32,
	                left: 281,
	                right: 368,
	                top: 30,
	                width: 87
                };
                //#endif

            },
			backFn(){
				uni.navigateBack({delta:1});
			},
			onScroll(scrollTop){
				if(scrollTop>this.moveBgTop){
					let opacity = (scrollTop-this.moveBgTop)/100;
					opacity = (opacity>1)? 1 : opacity;
					opacity = (opacity<0)? 0 : opacity;

					let l = this.moveBg.lastIndexOf(',')+1,
                        bg = this.moveBg.substr(0,l);
					bg += opacity+')';

					this.navStyle = this.catchNavStyle + `background:${bg};`
                }else{
					this.navStyle = this.catchNavStyle;
                }

            }
		}
	}
</script>

<style lang="less" scoped>
    @import "../../publish/box.css";

    .backBtn{
        width: 36rpx; height: 36rpx;
    }
    .top{
        position: fixed; left:0; top:0; width: 100%;
        z-index: 10000000;
        font-size: 38rpx; box-sizing: border-box;
    }

</style>
