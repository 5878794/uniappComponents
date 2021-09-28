
<template>
    <view class="box_slc" style="height:100%;">
        <view class="box_hlc body">
            <view class="input_body box_hlc boxflex1" style="position: relative;" :class="disabledClass">

                <!--            判断是否有图标-->
                <image v-if="icon" class="icon_" :src="icon"></image>

                <view v-if="name" class="name">{{name}}</view>


                <view class="box_hcc show_text boxflex1">
                    <view
                            :style="textAlign__"
                            class="diandian boxflex1"
                            v-if="selectValue[selectIndex]"
                    >{{selectValue[selectIndex]}}</view>
                    <view
                            :style="textAlign__"
                            class="diandian boxflex1 placeholder_style"
                            v-else
                    >{{placeholder}}</view>
                    <block v-if="arrow">
                        <view class="unit">
                            <image class="arrow" :src="arrowImgSrc"></image>
                        </view>
                    </block>
                </view>


                <view v-if="unit" class="unit">{{unit}}</view>

                <picker
                        v-if="!disabled"
                        :disabled="disabled"
                        class="__input__ picker"
                        mode='selector'
                        header-text="请选择"
                        :range="selectValue"
                        :rule="rule"
                        :value="selectIndex"
                        @change="onSelect"
                >
                    <view class="temp__"></view>
                </picker>
            </view>
        </view>
        <!--    <view class="err">{{err}}</view>-->
    </view>
</template>


<script>
    import mixinFn from "./mixin/mixin";
    import imgData from './mixin/arrow';

	export default {
		mixins:[mixinFn],
        props:{
	        selectData:{
		        type:Array,
		        default:function(){
		        	return [];
                }
	        },
	        arrow:{
		        type:Boolean,
		        default:true
	        }
        },
        data(){
			return {
				selectValue:[],
				selectIndex:'',
                arrowImgSrc:imgData.arrow
            }
        },
        watch:{
	        selectData: function (params) {//  'params'是要监听的字段，（params）是已更新变化后的数据
		        this.init(this.selectData);
	        }
        },
		mounted(){
			this.init(this.selectData);
        },
		methods:{
	        init(data){
		        //处理select
		        let newData = [],
			        newKey = [],
			        selected = this.value,
			        selectIndex = '',
                    catchData = {};


		        data.map((rs,i)=>{
			        if(rs.key == selected){
				        selectIndex = i;
			        }
			        newData.push(rs.val.toString());
			        newKey.push(rs.key.toString());

			        catchData[rs.key] = rs;
		        });


		        this.selectValue = newData;
		        this.selectKey = newKey;
		        this.selectIndex = selectIndex;
		        this.val = selected;
		        this.catchData = catchData;

	        },

            //手动设置select选择项
            setSelectData(data){
	        	this.init(data);
            },

	        onSelect(e){
                this.selectIndex = e.detail.value;
		        let val = this.getValue();
                this.val = val;

                let backData = this.catchData[val];

                this.$emit('mychange',{value:val,data:backData,ref:this.inRef});
	        },

	        getValue(){
		        return this.selectKey[this.selectIndex];
	        },

	        setValue(value){
	        	let index = 0;
		        if(!value){

                }else{
			        index = this.selectKey.indexOf(value.toString());
                }

		        if(index == -1){return;}

                this.selectIndex = index;
		        let val = this.getValue();
                this.val = val;

		        let backData = this.catchData[val];
		        this.$emit('mychange',{value:val,data:backData,ref:this.inRef});
	        }
        }
	}
</script>

<style>
    @import "../../publish/box.css";
    @import "./mixin/publish.css";

    .arrow{
        width: 24rpx; height: 12rpx;
    }
    .__input__{
        display: flex;
    }
    .picker{
        position: absolute; left:0; top:0; right:0; bottom:0;
        z-index: 10; opacity: 0;
    }
    .temp__{
        position: absolute; left:0; top:0; right:0; bottom:0;
    }
</style>
