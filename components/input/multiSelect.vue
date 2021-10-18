
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
                            v-if="showText"
                    >{{showText}}</view>
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
                        :disabled="disabled"
                        class="__input__ picker"
                        mode='multiSelector'
                        header-text="请选择"
                        :range="selectValue"
                        :rule="rule"
                        :value="nowValue"
                        @change="onSuccess"
                        @columnchange="onSelect"
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
		        default:[]
	        },
	        arrow:{
		        type:Boolean,
		        default:true
	        }
        },
        data(){
			return {
				selectValue:[],
				nowValue:'',
				showText:'',
                arrowImgSrc:imgData.arrow
            }
        },
        watch:{
	        selectData: function (params) {//  'params'是要监听的字段，（params）是已更新变化后的数据
		        this.init();
	        }
        },
		mounted(){
			this.init();
        },
		methods:{
	        init(){
                this.isCascade();
	        },
			//级联菜单初始化
			isCascade(){
				//处理select
				let selected = this.value, //  0,0,0
					selectIndex = [],           //原声控件显示层级的序号 数组
					//数据组的层级必须一致
					selectNumber = this.getSelectNumber();


				selected = (selected!='')? selected.split(',') : new Array(selectNumber);

				//获取selectIndex数组
				selectIndex = this.getSelectIndex(selected,selectNumber);

				let selectArray = this.getSelectArray(selectIndex),
					selectText = this.getSelectText(selectIndex);


				if(this.value == ''){
					this.selectValue = selectArray;
					this.nowValue = new Array(selectNumber);
					this.showText = '';
					return;
                }

                this.selectValue = selectArray;
                this.nowValue = selectIndex;
                this.showText = selectText;

                this.onSuccess({
	                detail:{
	                	value:selectIndex
                    }
                });
			},

			//获取数据的长度，每个数据组层级必须一致
			getSelectNumber(){
				let data = this.selectData,
					n = 1;

				while(data[0] && data[0].children && data[0].children.length != 0){
					n++;
					data = data[0].children;
				}

				return n;
			},
			//key值数组转序号数组
			getSelectIndex(selected,selectNumber){
				let data = this.selectData,
					back = [],
					nowData = data;
				if(data.length == 0){
					return [];
				}

				for(let i=0,l=selectNumber;i<l;i++){
					let val = selected[i],
						temp = 0;

					if(!val && val !=0){
						back.push(0);
						temp = 0;
					}else{
						let backLength = back.length;
						nowData.map((rs,i)=>{
							if(rs.key == val){
								back.push(i);
								temp = i;
							}
						});

						//未找到对应值，默认选择第一个
						if(backLength == back.length){
							back.push(0);
						}
					}

					nowData = nowData[temp].children || [];
				}

				return back;
			},
			//处理成控件当前需要的数据结构
			getSelectArray(indexs){
				let back = [],
					data = this.selectData;

				if(data.length == 0){
					return [];
				}

				//取第一层
				let lv1 = [];
				data.map(rs=>{
					lv1.push(rs.val);
				});
				back.push(lv1);


				//取后面的层
				let nowData = data;
				for(let i=0,l=indexs.length-1;i<l;i++){
					let tempI = indexs[i] || 0;
					nowData = nowData[tempI].children || [];
					let lv = [];
					nowData.map(rs=>{
						lv.push(rs.val);
					});
					back.push(lv);
				}

				return back;
			},
			//获取显示的文字
			getSelectText(indexs){
				let data = this.selectData,
					back = [];
				indexs.map(rs=>{
					back.push(data[rs].val);
					data = data[rs].children || [];
				});

				return back.join(' ');
			},


			onSelect(e){
				let data = e.detail,
					col = data.column,
					val = data.value,
					nowIndex = this.nowValue;

				nowIndex[col] = val;

                //之后的选择全部默认为第一个
                for(let i=col+1,l=nowIndex.length;i<l;i++){
                    nowIndex[i] = 0;
                }

                this.setValue1(nowIndex);

			},


			setValue1(indexs){
				let selectArray = this.getSelectArray(indexs),
					selectText = this.getSelectText(indexs);

				this.selectValue = selectArray;
				this.nowValue = indexs;
				this.showText = selectText;

			},


			//index反查key
			getSelectKey(indexs){
				let data = this.selectData,
					back = [];

				indexs.map(rs=>{
					back.push(data[rs].key);
					data = data[rs].children;
				});

				return back;

			},

			onSuccess(e){
				let data = e.detail.value;
                let keys = this.getSelectKey(data),
                    val = keys.join(',');

                this.val = val;
                this.setValue1(data);

                let text = this.showText;
                text = text.split(' ').join(',');
                this.$emit('mychange',{value:val,text:text});


			},

			setValue(value){
				value = value.split(',');

                let selectNumber = this.getSelectNumber(),
                    selectIndex = this.getSelectIndex(value,selectNumber);

                this.setValue1(selectIndex);
			}

        }
	}
</script>

<style scoped>
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
