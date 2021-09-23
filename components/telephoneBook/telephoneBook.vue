<template>
	<view class='box_sct _main'>
		<input
			class="_search"
			type="text"
			placeholder="中文可输入拼音首字母搜索"
			@input="inputFn"
		/>
		<view class="box_hlt boxflex1 _scroll_main">
			<scroll-view
				class="_body boxflex1"
				:scroll-y="true"
				:scroll-into-view="itemId"
				:scroll-with-animation="true"
				:show-scrollbar="false"
				:enhanced="true"
				@scroll="scrollFn"
				id="scroll"
			>
				<view id="scroll_body">
					<block v-for="(item,index) in list" :key="index">
						<view v-if="!item.type" class="_item box_hlc" :data-data="item" @tap="itemClickFn">
							<image :src="item.icon" class="_img"></image>
							<view class="_name boxflex1 diandian">{{item.name}}</view>
						</view>
						<view v-else class="_title box_hlc" :id="item.name">{{item.name}}</view>
					</block>
				</view>

			</scroll-view>
			<view
				class="_body_py box_sct"
			>
				<view
					v-for="(item,index) in PY"
					:key='index'
					:data-name="item"
					class="_py box_hcc"
					:class="select[index]"
					hover-class="hover"
					@tap="showPFn"
				>
					{{item}}
				</view>
			</view>
			<view
				class="_fd_title"
				:style="fdStyle"
			>{{fdName}}</view>
		</view>

	</view>
</template>

<script>
	import pingying from './pingying';
	Array.prototype.sortByChine= function(key){
		this.sort(function(a,b){
			a = a[key].toString();
			b = b[key].toString();


			return a.localeCompare(b,'en');
		});

		return this;
	};

	export default {
		props:{
			showSearch:{
				type:Boolean,
				default:true,
				itemId:''
			},
			showSelect:{
				type:Boolean,
				default:true
			},
			data:{
				type:Array,
				default(){
					return [];
				}
			}
		},
		data(){
			return {
				list:[],
				PY:[],
				itemId:'',
				select:[],
				fdName:'',
				fdStyle:''
			}
		},
		watch:{
			async data(){
				this.handlerData();

				let bodyOffset = await this.getDomStyle('scroll');
				this.bodyTop = bodyOffset.top;
			},
			list(){
				let _this = this;
				this.$nextTick(function(){
					_this.initPYTopValue().then(r=>{
						// console.log(_this.tops)
					});
				});
			}
		},

		async mounted(){
			this.scrollTop = 0;
			this.tops = [];
			if(this.data.length ==0){return;}
			this.handlerData();

			let bodyOffset = await this.getDomStyle('scroll');
			this.bodyTop = bodyOffset.top;
		},
		methods:{
			getDomStyle(id){
				return new Promise((success)=>{
					let query = uni.createSelectorQuery().in(this);
					query.select('#'+id).boundingClientRect();
					query.exec(data => {
						data = data[0] || data;
						success(data);
					});
				});
			},

			handlerData(){
				let data = this.data || [],
					py = {},
					re = new RegExp("^[a-zA-Z]+$");

				data.map(rs=>{
					let name = rs.name;
					if(name){
						if(re.test(name)){
							//英文
							let s = name.substr(0,1);
							s = s.toLocaleUpperCase();
							rs.qp = name;
							rs.jp = name;
							rs.s = s;
							if(!py[s]){
								py[s] = [];
							}
							py[s].push(rs);
						}else{
							//中文
							let	qp = pingying.getQP(name),
								jp = pingying.getJP(name),
								s = jp.substr(0,1);
							s = s.toLocaleUpperCase();

							rs.qp = qp;
							rs.jp = jp;
							rs.s = s;

							if(!py[s]){
								py[s] = [];
							}
							py[s].push(rs);
						}
					}
				});


				let sPy = [],
					newData = [];
				for(let [key,val] of Object.entries(py)){
					sPy.push(key);
					newData.push({
						name:key,
						val:val
					})
				}
				sPy.sort();

				this.baseData = newData;


				this.list = this.sortData(newData);
				this.PY = sPy;
				this.select = this.setChoosePY(sPy);

				this.fdName = this.PY[0];
			},


			//英文单词通过空格获取单词首字母 简拼
			getEnglishFirstStr(str){
				str = str || '';
				str = str.split(' ');
				let back = [];
				str.map(rs=>{
					back.push(rs.substr(0,1))
				});
				return back.join('');
			},
			//排序
			sortData(data){
				data.sortByChine('name');

				let backData = [];
				data.map(rs=>{
					backData.push({
						type:'title',
						name:rs.name
					});
					let childArr = rs.val.sortByChine('name');
					backData = backData.concat(childArr);
				});


				return backData;
			},

			//输入检索
			inputFn(e){
				let val = e.detail.value,
					backData = [],
					tempPy = [],
					checkFn = function(obj,searchVal){
						searchVal = (searchVal)? searchVal : searchVal.toLocaleLowerCase();
						return (
							(
								obj.name  &&
								obj.name.toLocaleLowerCase().indexOf(searchVal)>-1
							) ||
							(
								obj.jp &&
								obj.jp.toLocaleLowerCase().indexOf(searchVal)>-1
							)

						);
					};

				this.baseData.map(rs=>{
					let name = rs.name,
						list = rs.val,
						temp = [];
					list.map(item=>{
						if(checkFn(item,val)){
							temp.push(item);
						}
					});
					if(temp.length != 0){
						backData.push({
							name:name,
							val:temp
						});
						tempPy.push(name);
					}
				});

				this.list = this.sortData(backData);
				this.PY = tempPy;
			},

			//点击字母 滚动到指定位置
			showPFn(e){
				let val = e.currentTarget.dataset.name;

				this.itemId = val;
			},

			//设置初始选中字母
			setChoosePY(data){
				let l = data.length,
					temp = new Array(l);
				temp[0] = 'select';
				return temp;
			},

			rem2px(num){
				return num / 750 * uni.getSystemInfoSync().windowWidth
			},

			//设置初始位置高度
			async initPYTopValue(){

				let tops = [],
					data = this.list,
					domHeight = '';

				for(let i=0,l=data.length;i<l;i++){
					let thisItem = data[i];
					if(thisItem.type == 'title'){
						let name = thisItem.name,
							style = await this.getDomStyle(name);
						domHeight = style.height;
						tops.push(style.top - this.bodyTop + this.scrollTop);
					}
				}
				this.titleHeight = domHeight;
				this.tops = tops;
			},
			//滚动事件
			scrollFn(e){
				let top = e.detail.scrollTop,
					pyNumber = this.PY.length,
					newArray = new Array(pyNumber),
					tops = this.tops,
					n=newArray.length-1;

				this.scrollTop = top;

				for(let i=0,l=tops.length;i<l;i++){
					let nowTop = tops[i];

					if(nowTop-this.titleHeight<=top && top<=nowTop){
						let t = top-(nowTop-this.titleHeight);
						this.fdStyle = 'transform:translateY('+-t+'px)'
					}else{
						this.fdStyle = 'transform:translateY(0);'
					}

					if(nowTop > top){
						n = i-1;
						break;
					}
				}
				n = (n<0)? 0 : n;

				newArray[n] = 'select';
				this.select = newArray;
				this.fdName = this.PY[n];

			},
			itemClickFn(e){
				let data =e.currentTarget.dataset.data;
				this.$emit('myclick',data);
			}

		}
	}
</script>



<style scoped>
	@import "../../publish/box.css";

	._main{
		width: 100%; height: 100%; position: relative;
	}
	._search{
		width: 640rpx; height: 70rpx; margin: 20rpx auto;
		display: block; border-radius: 20rpx;
		border:1rpx solid #ccc; padding: 0 20rpx;
		font-size: 28rpx;
		background: #fff;
	}
	._scroll_main{
		position: absolute; left:0; right:0; bottom:0; top: 110rpx;
		overflow: hidden;
	}
	._body{
		display: block; width: auto; overflow: hidden;
		position: absolute; left:40rpx; top: 0; bottom:0; right: 90rpx;
	}
	._body_py{
		width: 90rpx;
		padding: 40rpx 0 80rpx 0; box-sizing: border-box;
		position: absolute; right:0; top:0; bottom:0;
	}
	._item{
		width: 100%; height: 100rpx; margin: 0 auto;
		border-bottom:1rpx solid #efefef;
		box-sizing: border-box;
	}
	._img{
		display: block; width: 60rpx; height: 60rpx;
		margin-right: 40rpx;
	}
	._py{
		width: 100%; font-size: 24rpx;
		color: #333;
	}
	._title{
		width: 620rpx;
		height: 50rpx;
		margin: 40rpx auto 10rpx auto;
		background: #efefef;
		text-indent: 1em;
		position: relative;
		z-index: 10;
	}
	._title:first-child{
		margin-top: 0;
	}
	.hover{
		opacity: 0.7;
	}
	.select{
		color: red;
	}
	.hidden{
		display: none;
	}
	._fd_title{
		position: absolute; left:40rpx; top:0;
		width: 620rpx; height: 50rpx; background: #efefef;
		text-indent: 1em; z-index: 20;
	}

</style>
