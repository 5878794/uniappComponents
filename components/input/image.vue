
<template>

    <view class="box_slt">
        <view class="box_hlc body">
            <image v-if="icon" class="icon_" :src="icon"></image>
            <view v-if="name" class="name">{{name}}</view>
            <view class="input_body box_slt boxflex1">

<!--                &lt;!&ndash;        图表和提示文字容器&ndash;&gt;-->
<!--                <view class="box_hlc" style="width:100%;">-->
<!--                    &lt;!&ndash;            判断是否有图标&ndash;&gt;-->
<!--                    <image v-if="icon" :src="icon"></image>-->
<!--                    <view v-if="placeholder" class="disabledClass">{{placeholder}}</view>-->
<!--                </view>-->


                <!--        文件容器-->
                <view
                    class="box_hlt box_lines"
                    :style="(placeholder || icon)? 'box-sizing:border-box;' :''"
                >
                    <block v-for="(item,index) in nowValues" :key="index">
                        <view
                            class="imageItem box_hcc"
                            :data-n="index"
                            @tap="showImage"
                        >
                            <image class="image__" mode="aspectFit" :src="item.src"></image>
                            <block v-if="showDelBtn">
                                <view
                                    class="del"
                                    :data-n="index"
                                    @tap.stop="del"
                                >删除</view>
                            </block>
                        </view>
                    </block>

                    <block v-if="(!disabled && nowValues.length < max)">
                        <!--                    上传按钮-->
                        <view
                            class="choose_btn"
                            :style="nowBtnStyle"
                            @tap="chooseImage"
                        >+</view>
                    </block>
                </view>


            </view>
        </view>
        <!--    <view class="err">{{err}}</view>-->


<!--        <canvas-->
<!--            :style="canvasStyle"-->
<!--            class="__canvas__"-->
<!--            canvas-id="__canvas__"-->
<!--        ></canvas>-->
    </view>
</template>


<script>
    import mixinFn from "./mixin/mixin";

	export default {
		mixins:[mixinFn],
        props:{
	        nowBtnStyle:{
		        type:String,
		        default:''
	        },
	        max:{
		        type:String,
		        default:1
	        },
	        sizeType:{
		        type:String,
		        default:'compressed'    //original,compressed  原图、压缩
	        },
	        sourceType:{
		        type:String,
		        default:'album,camera'    //album,camera  相册、相机
	        },
	        showDel:{
		        type:Boolean,
		        default:true
	        },
	        values:{
		        type:Array,
		        default(){return []}
	        },
	        inRef:{
	        	type:String,
                default:''
            },
	        uploadFileFnName:{
	        	type:String,
                default:''
            },
            selectNumber:{
	        	type:Number,
                default:1
            }
        },
        data(){
		    return {
		    	val:'',
			    nowValues:[],
			    showDelBtn:true
                // canvasStyle:''
            }
        },
        watch:{
	        values(prop){
		        this.nowValues = prop;
		        this.setNowValue();
	        }
        },
		mounted(){
			this.nowValues = this.values;
			this.setNowValue();

			this.showDelBtn = this.showDel;
			if(this.disabled){
				this.showDelBtn = false;
            }
        },
		methods: {
			setNowValue(){
				let oldValue = this.nowValues;
				let val = [];
				oldValue.map(rs=>{
					val.push(rs.src);
				});
				this.val = val.join(',');

				let t = this.inRef;
				this.$emit('mychange',{value:this.val,ref:t});
			},
			chooseImage(e){
				//判断点击的添加按钮还是图像本身
				let n = e.currentTarget.dataset.n,
					_this = this,
                    chooseNumber = (this.selectNumber > 9)? 9 : this.selectNumber;


				uni.chooseImage({
					count:chooseNumber,
					sizeType:this.sizeType.split(','),
					sourceType:this.sourceType.split(','),
					success:async function(data){
						data = data.tempFiles || [];
						for(let i=0,l=data.length;i<l;i++){
							let file = data[i],
								src = file.path,
								size = file.size;

							//配置咯oss上传参数的请求接口直接上传
							if(_this.uploadFileFnName){
								src = await _this.$parent[_this.uploadFileFnName](src);
								if(!src){
									return;
                                }
							}

							let oldValue = _this.nowValues || [];
							if(n || n==0){
								oldValue[n] = {src,size};
							}else{
								oldValue.push({src,size});
							}
							_this.nowValues = oldValue;
                        }
						_this.setNowValue();
					}
				});
			},
			showImage(e){
				let n = e.currentTarget.dataset.n,
					_this = this,
					imgObj = this.nowValues[n] || {},
					imgSrc = imgObj.src,
					allImages = [];
				this.nowValues.map(rs=>{
					allImages.push(rs.src);
				});

				if(imgSrc){
					this.openImage(allImages,imgSrc);
				}
			},
			del(e){
				let n = e.currentTarget.dataset.n;
				let oldValue = this.nowValues;

				oldValue.splice(n,1);
				this.nowValues = oldValue;
				this.setNowValue();
			},

			//设置value用
			setValue(value){
				if(!this.isReady){
					this.catchSetVal = value;
					return;
				}
				this.catchSetVal = '';


				this.val = value;

				let newValue = (value)? value.split(',') : [];
				let backVal = [];
				newValue.map(rs=>{
					backVal.push({
						src:rs,size:''
					})
				});
				this.nowValues = backVal;
				this.setNowValue();
			},

			getImageInfo(src){
				return new Promise((success,error)=>{
					uni.getImageInfo({
						src:src,
						success(rs){
							success({
								width:rs.width,
								height:rs.height
							});
						},
						fail(e){
							error(e);
						}
					})
				});
			},
			openImage(urls, nowShowSrc) {
				urls = urls || [];
				nowShowSrc = nowShowSrc || urls[0];
				uni.previewImage({
					urls: urls,
					showmenu: false,
					current: nowShowSrc
				});
			}

		}
	}
</script>

<style scoped>
    @import "../../publish/box.css";
    @import "./mixin/publish.css";


    .choose_btn{
        width:170rpx; height: 170rpx;
        font-size:120rpx; background: #f6f7f7;
        border:1rpx solid #ccc; color: #ccc;
        line-height: 150rpx; text-align: center;
        margin:0 20rpx 20rpx 0;
    }
    .imageItem{
        width:170rpx; height: 170rpx;
        border:1rpx solid #ccc;
        position: relative;
        margin:0 20rpx 20rpx 0;
        overflow: hidden;
    }
    .del{
        position: absolute;
        left:0; bottom:0;
        width:100%; height: 40rpx; text-align: center;
        color: #fff; font-size: 24rpx;
        background: rgba(0,0,0,0.5);
    }
    .input_body{
        border:none;
    }
    .image__{
        display: block;
        width: 100%; height: 100%;
        margin: 0;
        padding:0;
    }


    .__canvas__{
        position: fixed; top:9999rpx; left:9999rpx;
    }

</style>
