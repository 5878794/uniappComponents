<!--内部循环组件  每个项目需要单独做-->



<template lang="pug">
    view(class="banner_list box_sct" :data-n="index" :data-data="obj")
        image(class="img" :src="obj.src" mode="aspectFill")
        view(class="title") {{obj.name}}
        view(class="box_hlc" style="width:100%;")
            view(class="no") 编号:{{obj.no}}
            view(class="price boxflex1") ￥{{obj.price}}/只
</template>


<script>
    export default {
    	props:{
    		obj:{type:Object,default(){return {}}}
        }
    }
</script>


<style lang="less" scoped>
    @import "../../publish/box1";

    .banner_list{
        width: 100%; height: 100%;
    }
    .img{
        display: block; width: 100%; height: 80%;
    }
    .title{
        font-size: 36rpx; font-weight: bold; color: #333;
        text-align: center; margin: 40rpx 0;
    }
    .no{
        font-size: 28rpx; color: #ccc;
    }
    .price{
        font-weight: bold; font-size: 32rpx; color: red;
        text-align: right;
    }
</style>
