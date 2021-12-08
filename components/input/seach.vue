<!--
    android有兼容问题  刷新有问题不能居中显示文字
    目前是居左显示

    项目名：智慧农业_农户端
    文件名：seach  组件
    创建人：bens
    时间：2021-12-08 5:02 下午
    编辑器:WebStorm
-->



<template lang="pug">
    view(class="box_hcc _body" @tap="bodyFn")
        image(:src="icon" class="search")
        input(
            ref='input1'
            :focus='focusState'
            class="input boxflex1"
            :placeholder="placeholder"
            :value='val'
            type="text"
            @input="onInput"
            @confirm="searchFn"
            @focus="focusFn"
            @blur="blurFn"
            :style="inputStyle"
        )
        view(class="temp")
            view(class='temp_text' style="display:inline-block;") {{val}}

</template>

<script>
    let searchIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAWBJREFUOE+l0zEvQ1EUB/D/uR19AIOticVKLIie27eI2AkJJSabiUFUDCbxBRgMxGQwSEXfOy+NwUAk5jJZDGU23HvkJW3z2r4OTe94c+7vnHvPuYQhFw15Hj1ArVabcM5tAphV1XEAD0QUMvNFVrIOIAzDsjHmkIjeAVx57+tEtARgI4Gcc+tBEHynoTYQhuGYMebLe39ULBbL6aAoiiaJ6BjADzOvZQIicgZghpmns0ptIi8AVpj5phXTrkBE3gBUmHm/38PGcfzhva9Ya3d6gCiKGgC2rbW3/QAReVbVhrV2MQu4JqI/Zi71A5IkxpjLQqGwm3WFLQDnqjplrX3tRpod2gMQMPNTD5BsiEgFgFfVgzQSx/GCqt5ndahjDqrV6mgulzsFsEpEn6r6CyCvqiOqepLMSDeSOcoisqyqc0SUB1B3zt0FQfDYGrQ0MvBfaCLzzMzJtQcGuh93aOAfCmuiEfG/1asAAAAASUVORK5CYII=';

    export default {
    	props:{
            placeholder:{
	            type:String,
	            default:''
            },
            icon:{
            	type:String,
                default: searchIcon
            },
            value:{
            	type:String,
                default:''
            }
        },
        data(){
    		return {
			    focusState:false,
			    inputStyle:'',
                val:''
            }
        },
        watch:{
    	    value(val){
    	    	this.val = val;
		        this.setInputCenter();
            }
        },
        mounted(){
    		this.val = this.value;
        },
	    updated(){
    		// if(!this.focusState){
			//     this.setInputCenter();
            // }
        },
        methods:{
    		//输入触发
	        onInput(e){
                this.val = e.detail.value;
                this.$emit('inputFn',this.val);
            },
            //点击软键盘搜索 触发
	        searchFn(e){
                this.$emit('searchFn',this.val);
            },
	        focusFn(){
	        	// this.focusState = true;
	        	// this.inputStyle = 'flex:1 1 0 !important;min-width: 0;';
            },
	        blurFn(){
                // this.setInputCenter();
                // this.focusState = false;
            },
	        async setInputCenter(){
		        // let minWidth = await this.getDomWidth();
		        // this.inputStyle = `width:${minWidth}px;`;
            },
	        bodyFn(){
	        	// this.focusState = true;
            },
            getDomWidth(){
	        	return new Promise((success)=>{
			        let query = uni.createSelectorQuery().in(this);
			        query.select('.temp_text').boundingClientRect();
			        query.exec(data => {
				        data = data[0] || data;
				        //不晓得为啥会小一点。。。
				        success(data.width+10);
			        });
                })
            },
            getTextLength(str){
	            let totalLength = 0;
	            let list = str.split("");
	            for(let i = 0; i < list.length; i++) {undefined
		            let s = list[i];
		            if (s.match(/[\u0000-\u00ff]/g)) { //半角
			            totalLength += 1;
		            } else if (s.match(/[\u4e00-\u9fa5]/g)) { //中文
			            totalLength += 2;
		            } else if (s.match(/[\uff00-\uffff]/g)) { //全角
			            totalLength +=2;
		            }
	            }
	            return totalLength;
            }
        }
    }
</script>


<style lang="less" scoped>
    ._body{
        width: 100%; height: 100%; font-size: 28rpx; position: relative;
        overflow-x: hidden;
        .search{
            display: block; width: 40rpx; height: 40rpx;
            min-width:40rpx;
        }
        .input{
            display: block; margin: 0 20rpx;
            transition: all .3s ease;
        }
        .temp{
            position: absolute; width: 750rpx;
            left:750rpx; top:0;
        }
    }
</style>
