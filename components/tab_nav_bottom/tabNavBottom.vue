

<template lang="pug">
    view
        view(class="box_h_space_c main" :style="bodyStyle")
            view(
                class="item box_scc"
                v-for="(item,index) in list"
                :style='itemStyle'
                :key="index"
                :data-data="item"
                @tap="itemClickFn"
            )
                block(v-if="item.selected")
                    image(class="icon" :src="item.selectedIconPath")
                    view(class="text" :style="textSelectStyle") {{item.text}}
                block(v-else)
                    image(class="icon" :src="item.iconPath")
                    view(class="text" :style="textStyle") {{item.text}}
        view(class="main_")
</template>

<script>
    export default {
        props:{
	        obj:{
	        	type:Object,
                default(){
	        		return {};
                }
            }
        },
        data(){
        	return {
                list:[],
		        textStyle:'',
		        textSelectStyle:'',
		        bodyStyle:''
            }
        },
        mounted(){
            this.init();
        },
        watch:{
        	obj(){
                this.init();
            }
        },
        methods:{
        	init(){
        	    this.list = this.obj.list || [];
        	    this.color = this.obj.color || '#ccc';
        	    this.selectedColor = this.obj.selectedColor || '#333';
        	    this.backgroundColor = this.obj.backgroundColor || '#fff';

        	    let width = 100/this.list.length;
        	    this.itemStyle = `width:${width}%;`;
        	    this.bodyStyle = `border-top:1rpx solid #eee;background-color:${this.backgroundColor};`;
        	    this.textStyle = `color:${this.color};`;
        	    this.textSelectStyle = `color:${this.selectedColor}`;

            },
	        itemClickFn(e){
        		let data = e.currentTarget.dataset.data,
                    href = data.pagePath;
                if(data.selected){
                	//当前页
                }else{
	                uni.redirectTo({
		                url:href
	                });
                }
            }
        }
    }
</script>


<style lang="less" scoped>
    @import "../../publish/box1";
    .main{
        width: 100%; height: 100rpx;
        .safe_bottom_padding();
        position: fixed; left:0; bottom:0;
    }
    .main_{
        width: 100%; height: 101rpx;
        .safe_bottom_padding();
    }
    .icon{
        display: block; width: 44rpx; height: 44rpx;
    }
    .text{
        font-size: 20rpx; padding-top:10rpx;
    }
</style>
