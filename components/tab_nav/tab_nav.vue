

<template>
    <scroll-view
        class="body"
        :scroll-x="true"
        :scroll-with-animation="true"
    >
        <view class="main box_hlc">
            <view
                class="item notbreak"
                :style="itemStyles[index]"
                v-for="(item,index) in list"
                :key="index"
                :data-n="index"
                @tap="clickFn"
            >
                <view class="_item notbreak">
                    <text>{{item}}</text>
                    <view v-if="showNumber[index]" class="number">{{showNumber[index]}}</view>
                </view>
            </view>
        </view>
    </scroll-view>
</template>


<script>

    export default {
    	props:{
		    list:{ //tab导航的内容
		    	type:Array,
                default(){
		    		return [];
                }
            },
		    showNumber:{ //显示的数字
		    	type:Array,
                default(){
		    		return [];
                }
            },
		    selectStyle:{ //选中的样式
		    	type:String,
                default:'color:red;'
            },
		    itemStyle:{ //导航的样式
		    	type:String,
                default:'font-size:32rpx; color:#333;'
            },
		    numberStyle:{ //数字的样式
		    	type:String,
                default:'color:#fff;background:red;'
            },
		    scrollX:{ //是否横向滚动
		    	type:Boolean,
                default:false
            }
        },
        data(){
    		return {
			    itemStyles:[] //导航样式
            }
        },
	    watch:{
    		list(){
    			console.log('list watch')
    			this.setStyle()
            }
        },
        mounted(){
    		this.n = 0;
    		this.setStyle();
        },
        methods:{
	        setStyle(){
			    let l = this.list.length,
				    w = 100/l;

			    this.itemWidth = `min-width:${w}%;`;

			    if(this.scrollX){
				    this.itemWidth = '';
                }

		        this.chooseItem();


            },
            chooseItem(n){
	        	n = n || this.n;
	            this.itemCss = `${this.itemWidth} ${this.itemStyle}`;
	            this.itemSelectCss= `${this.itemWidth} ${this.selectStyle}`;

	            let arr = [],
                    l = this.list.length;

	            for(let i=0;i<l;i++){
		            if(i==n){
			            arr.push(this.itemSelectCss);
		            }else{
			            arr.push(this.itemCss);
		            }
	            }
	            this.itemStyles = arr;
            },
	        clickFn(e){
                let n = e.currentTarget.dataset.n;
                this.n = n;
                this.chooseItem(n);

                this.$emit('clickFn',n);
            }
        }
    }
</script>



<style scoped>
    @import "../../publish/box.css";

    .body{
        display: block; width: 100%; box-sizing: border-box;
        height: 100%;
    }
    .main{
        height: 100%;
    }
    .item{
        padding:0 20rpx; box-sizing: border-box;
        font-size: 32rpx;
        text-align: center;
    }
    ._item{
        position: relative; display: inline-block;
    }
    .number{
        position: absolute; top:-15rpx; left:90%;
        display: inline-block; padding:0 5rpx;
        box-sizing: border-box; height: 34rpx;
        line-height: 34rpx; min-width:34rpx;
        text-align: center;
        font-size:24rpx; color: #fff; background:red;
        border-radius:100%;
    }

</style>
