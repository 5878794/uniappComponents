

<template>
    <view>
        <block
            v-for="(item,index) in list"
            :key="index"
        >
            <text v-if="item.type=='text'">{{item.text}}</text>
            <text v-else :style="phoneTextColor" :data-tel="item.text" @tap="telFn">{{item.text}}</text>
        </block>
    </view>
</template>


<script>
    export default {
    	props:{
    		text:{
			    type:String,
			    default:''
            },
            phoneColor:{
    			type:String,
                default:'#6B74EB'
            }
        },
        data(){
    	    return {
    	    	list:[],
		        phoneTextColor:''
            }
        },
        watch:{
    	    text(){
    	    	this.handlerText();
            }
        },
        mounted(){
    		this.phoneTextColor = 'color:'+this.phoneColor+';';
	        this.handlerText();
        },
        methods:{
	        handlerText(){
	        	let text = this.text,
                    reg = new RegExp(/((\d{5,11})|((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})))/,'g'),
                    tel = text.match(reg) || [],
	        	    tel1 = tel.join('|'),
	        	    reg1 = new RegExp(tel1,'g');
	        	text = text.split(reg1);

	        	let newText = [];
	        	text.map((rs,i)=>{
	        		if(rs){
				        newText.push({text:rs,type:'text'});
                    }
	        		if(tel[i]){
				        newText.push({text:tel[i],type:'tel'});
                    }
                });

	        	this.list = newText;
            },
	        telFn(e){
	        	let tel = e.currentTarget.dataset.tel;
		        uni.makePhoneCall({
			        phoneNumber: tel
		        });
            }
        }
    }
</script>



<style scoped>

</style>
