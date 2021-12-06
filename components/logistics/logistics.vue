<!--
    项目名：智慧农业_用户端
    文件名：logistics
    创建人：bens
    时间：2021-12-06 4:05 下午
    编辑器:WebStorm
-->



<template lang="pug">
    view(class="logistics_")
        view(class="title_") {{title}}
        view(v-for="(item,index) in list" :key="index" class="item_ box_slt")
            view(class="row1_") {{item.time}}
            text-show-phone(class="row2_" :text="item.status")
            //第一个显示图标 后面显示点
            image(v-if="index==0" class="icon1_" :src="icon")
            view(v-else class="dian_")

            //最后一个补的一段连接线
            view(v-if="list.length-1 == index && index != 0" class="bc_line_")
</template>

<script>
	import textShowPhone from "../textShowPhone/textShowPhone";
    export default {
    	components:{textShowPhone},
        props:{
    	    title:{type:String},
            icon:{type:String},
            list:{type:Array}
        },
        mixins:[],
        data(){
    		return {}
        },
        methods:{

        }
    }
</script>


<style lang="less" scoped>
    @import "../../publish/box1";
    .logistics_{
        width: 100%;
        .title_{
            font-size: 28rpx; color: #333; font-weight: bold;
            margin-bottom: 20rpx;
        }
        .item_{
            margin:0 15rpx;
            position: relative;
            box-sizing: border-box;
            &:last-child .row1_,
            &:last-child .row2_{
                border: none;
            }
        }
        .dian_{
            width:14rpx; height:14rpx; background:#9598A2;
            border-radius:14rpx;
            position: absolute; left: -6rpx; top: 8rpx;
        }
        .icon1_{
            position:absolute; width: 32rpx; height: 32rpx;
            left:-15rpx; top: 0; z-index:10; display: block;
        }
        .row1_{
            padding-left:40rpx; box-sizing: border-box;
            width: 100%; font-size:24rpx; color:#333;
            padding-bottom:8rpx; border-left:2rpx solid #9598A2;
        }
        .row2_{
            padding-left:40rpx; box-sizing: border-box;
            width:100%; font-size:20rpx; color:#333;
            padding-bottom:32rpx; border-left:2rpx solid #9598A2;
        }
        .bc_line_{
            position: absolute;
            width: 2rpx; height: 10rpx; background: #9598A2;
            left:0; top: 0;
        }
    }
</style>
