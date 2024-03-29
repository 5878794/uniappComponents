

import checkFn from './inputCheck';

export default {
	props:{
		icon:{
			type: String,
			default: ''
		},
		placeholder:{
			type: String,
			default: ''
		},
		err:{
			type: String,
			default: ''
		},
		name:{
			type: String,
			default: ''
		},
		rule:{
			type: String,
			default: ''
		},
		value:{
			type: [String,Number],
			default: ''
		},
		disabled:{
			type:Boolean,
			default:false
		},
		textAlign:{
			type:String,
			default:'right'
		},
		unit:{
			type:String,
			default:''
		},
		inRef:{
			type:String,
			default:''
		},
		maxlength:{     //只有digit加咯该属性
			type:[Number,String],
			default:-1
		}
	},
	data(){
		return {
			textAlign__:'',
			disabledClass:'',
			placeholder1:'',
			val:''
		}
	},
	watch:{
		value(val){
			this.val = val;
		}
	},
	updated(){
		this.isReady = true;
		if(this.catchSetVal){
			this.setValue(this.catchSetVal);
		}
	},

	mounted(){
		this.placeholder1 = this.placeholder;
		this.val = this.value;
		this.textAlign__ = (this.textAlign == 'left')? 'text-align:left;' : 'text-align:right;';

		this.disabledFn();
	},
	methods: {
		onInput(e){
			this.val = e.detail.value;
			this.$emit('mychange',{value:e.detail.value,ref:this.inRef});
		},

		setValue(value){
			if(!this.isReady){
				this.catchSetVal = value;
				return;
			}
			this.catchSetVal = '';

			this.val = value;
		},

		disabledFn: function () {//  'params'是要监听的字段，（params）是已更新变化后的数据
			let params = this.disabled;
			if(params){
				this.disabledClass = 'disabledClass';
				this.placeholder = '';
			}else{
				this.disabledClass = '';
				this.placeholder = this.placeholder1;
			}
		},

		check(){
			return new Promise((success,error)=>{
				if(checkFn(this.val,this.rule)){
					success(this.val);
				}else{
					error(this.err);
				}
			});
		}
	}
};






