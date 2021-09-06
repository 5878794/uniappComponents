
<template>
    <view class="box_slc" style="height:100%;">
        <view class="box_hlc body">
            <view class="input_body box_hlc boxflex1" :class="disabledClass">

                <!--            判断是否有图标-->
                <image v-if="icon" class="icon_" :src="icon"></image>

                <view v-if="name" class="name boxflex1">{{name}}</view>

                <switch
                        :checked="checked"
                        :disabled="disabled"
                        type="switch"
                        :color="color"
                        @change="onchange">

                </switch>


<!--                <view v-if="unit" class="unit">{{unit}}</view>-->

            </view>
        </view>
        <!--    <view class="err">{{err}}</view>-->
    </view>
</template>


<script>
	import mixinFn from './mixin/mixin';
	export default {
		mixins:[mixinFn],
		props:{
			checked:{
				type:Boolean,
				default:false
			},
			disabled:{
				type:Boolean,
				default:false
			},
			color:{
				type:String,
				default:'#04BE02'
			}
		},
		data(){
			return {
                val:''
			}
		},
        watch:{
		    checked(){
		    	this.init();
            }
        },
		mounted(){
            this.init();
		},
		methods:{
			init(){
			    this.val = this.checked;
            },
			onchange(e){
				let state = e.detail.value;
				this.val = state;
			},
			setValue(value){
				value = (typeof value == "boolean")? value : false;
				this.val = value;
			}
		}
	}
</script>

<style>
    @import "../../publish/box.css";
    @import "./mixin/publish.css";



</style>
