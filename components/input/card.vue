
<template>
    <view class="box_scc main" @tap="chooseImage" :style="imgStyle">
        <image
            class="image"
            v-if="val!=''"
            :src="val"
            mode="aspectFit"
            :style="imgStyle"
        ></image>
        <view
            v-if="val==''"
            class="choose_btn box_scc"
        >
            <view>+</view>
            <view class="placeholder_style">{{placeholder}}</view>
        </view>
    </view>
</template>


<script>
	import checkFn from './mixin/inputCheck';
	export default {
		props:{
			sizeType:{
				type:String,
				default:'compressed'    //original,compressed  原图、压缩
			},
			sourceType:{
				type:String,
				default:'album,camera'    //album,camera  相册、相机
			},
			placeholder:{
				type:String,
				default:''
			},
			rule:{
				type:String,
				default:''
			},
			err:{
				type:String,
				default:''
			},
            autoHeight:{
				type:Boolean,
                default:true
            }
        },
        data(){
			return {
				val:'',
				imgStyle:''
            }
        },
		async mounted(){
			//240*151 身份证宽 高
            let _this = this;
            if(this.autoHeight){
	            let obj = uni.createSelectorQuery().in(this).select('.main');
	            obj.boundingClientRect(function (data) { // data - 各种参数
                    let w = data.width,
                        h = 151*w/240;
                    _this.imgStyle = `height:${h}px;`;
	            }).exec();
            }
        },
        methods:{
	        chooseImage(e){
		        let _this = this;

		        uni.chooseImage({
			        count:1,
			        sizeType:this.sizeType.split(','),
			        sourceType:this.sourceType.split(','),
			        success:function(rs){
				        let file = rs.tempFiles[0],
					        src = file.path,
					        size = file.size;

				        _this.val = src;
			        }
		        });
	        },
	        setValue(value){
	        	this.val = value;
	        },
	        check(){
		        return new Promise((success,error)=>{
			        if(checkFn(this.val,this.rule)){
				        success(this.val);
			        }else{
				        error(this.err);
			        }
		        });
	        }
        }
	}
</script>

<style scoped>
    @import "../../publish/box.css";
    @import "./mixin/publish.css";


    .main{
        width: 100%; height: 100%;
        border:1rpx solid #ccc;
        background: #f6f7f7;
        box-sizing: border-box;
    }

    .choose_btn{
        width:100%; height: 100%;
        font-size:120rpx; color: #ccc;
        line-height: 120rpx; text-align: center;
    }
    .placeholder_style{
        font-size: 36rpx;
    }
    .image{
        width: 100%; display: block; height: 100%;
    }

</style>
