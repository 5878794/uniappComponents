
<template>
    <view class="item box_hlc">
        <view class="line"></view>
        <view class="boxflex1">{{title}}</view>
        <view class="level" :style="levelStyle">{{levelText}}</view>
    </view>
</template>


<script>
    let levelDist = {
        '0':'正常',
        '1':'轻度风险',
        '2':'中度风险',
        '3':'重度风险'
    },
    styleDist = {
        '0':'#21DEBE',
        '1':'#00D7FF',
        '2':'#FFA200',
        '3':'#FF6E48'
    };


	export default {
		props:{
            title:{
            	type:String,
                default:''
            },
            level:{          //第一个参数：0正常 1轻度 2中度 3重度
                             //第二个参数：问题数量
            	type:Array,
                default:[]      //[0,1]
            }
		},
		data(){
			return {
				levelStyle:'',
				levelText:''
			}
		},
		watch:{
			level(val){
                this.setText();
            }
		},

		onReady(){
            this.setText();
		},
		methods:{
			setText(){
				let level = this.level[0] || 0,
					problem = this.level[1] || 0,
					text = '';

				if(level == 0){
					text = levelDist[level];
				}else{
					text  =levelDist[level] + ` (${problem})项`
				}

				this.levelText = text;

				let color = styleDist[level];
				this.levelStyle = `background:${color};`
            }
		}
	}
</script>

<style scoped>
    @import "../../../publish/box.css";

    .item{
        width: 100%;
        height: 44rpx;
        font-size: 32rpx;
        color: #333;
        font-weight: bold;
    }
    .line{
        width: 10rpx;
        height: 32rpx;
        background: #3D7EFE;
        border-radius: 6rpx;
        margin-right: 30rpx;
    }
    .level{
        display: inline-block;
        height: 42rpx;
        border-radius: 6rpx;
        /*background: #21DEBE;*/
        padding:0 12rpx;
        color: #fff;
        font-size: 28rpx;
        font-weight: 500;
    }

</style>
