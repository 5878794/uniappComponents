

<!--banner 无限循环(大数据量)  组件  -->
<!--原理通过计算swiper指针和数据指针  动态变更swiper的data-->



<template lang="pug">
    swiper(
        class="swiper"
        :indicator-dots="false"
        :autoplay="false"
        :circular="true"
        :vertical="false"
        :interval="5000"
        :duration="500"
        :current="0"
        @change="changeFn"
    )
        swiper-item(
            class="swiper_item"
            v-for="(item,index) in showList"
            :key="index"
        )
            component-item(
                class='item__'
                :obj="item"
            )
</template>

<script>
    import componentItem from './component_item';
    export default {
        components:{componentItem},
        props:{
            list:{type:Array,default(){return []}}
        },
        watch:{
        	list(){
        		this.init();
            }
        },
        data(){
        	return {
        		showList:[]
            }
        },
        mounted(){
        	this.showNumber = 3;  //必须3
            this.init();
        },
        methods:{
            init(){
	            //初始显示3个
	            let data = [];
	            for(let i=0,l=this.showNumber;i<l;i++){
	            	data.push(this.list[i]);
	            }
	            this.showList = data;


	            this.oldSwiperIndex = 0;  //当前swiper指针
	            this.oldDataIndex = 0; //当前数据指针
            },
	        changeFn(e){
            	let nowSwiperIndex = e.detail.current,
		            nowDataIndex,
                    //判断翻页前  上一页和下一页的swiper的index
                    [swiperNextIndex,swiperPerIndex] = this.getNextSwiperIndex(this.oldSwiperIndex);

            	//判断是向前翻还是向后
                if(nowSwiperIndex == swiperNextIndex){
                	//向后翻
                    nowDataIndex = this.oldDataIndex+1;
                    nowDataIndex = (nowDataIndex>=this.list.length)? 0 : nowDataIndex;
                }else{
                	//向前翻
	                nowDataIndex = this.oldDataIndex-1;
	                nowDataIndex = (nowDataIndex<0)? this.list.length-1 : nowDataIndex;
                }

                this.oldDataIndex = nowDataIndex;
                this.oldSwiperIndex = nowSwiperIndex;


                //获取翻页后  下一页和上一页的swiper的index
                [swiperNextIndex,swiperPerIndex] = this.getNextSwiperIndex(nowSwiperIndex);
                //获取翻页后 下一页和上一页的data的index
                let [dataNextIndex,dataPerIndex] = this.getNextDataIndex(nowDataIndex);

                let backData = [];
		        backData[swiperNextIndex] = this.list[dataNextIndex];
		        backData[swiperPerIndex] = this.list[dataPerIndex];
		        backData[nowSwiperIndex] = this.list[nowDataIndex];
		        this.showList = backData;

            },
            //获取当前swiper下一个和上一个的指针
	        getNextSwiperIndex(index){
            	let maxSwiperIndex = this.showNumber,
                    next = index+1,
                    per = index-1;

            	next = (next>=maxSwiperIndex)? 0 : next;
            	per = (per<0)? maxSwiperIndex-1 : per;

            	return [next,per];
            },
            //获取当前data下一个和上一个的指针
	        getNextDataIndex(index){
		        let maxDataIndex = this.list.length,
			        next = index+1,
			        per = index-1;

		        next = (next>=maxDataIndex)? 0 : next;
		        per = (per<0)? maxDataIndex-1 : per;

		        return [next,per];
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "../../publish/box1";
    .swiper{
        display: block; width: 100%; height: 100%;
    }
    .item__{
        display: block; width: 100%; height: 100%;
    }
    .swiper_item{
        display: block; width: 100%; height: 100%;
    }
</style>
