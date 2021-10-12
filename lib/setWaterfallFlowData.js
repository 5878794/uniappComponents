
//瀑布流动态插入计算
//布局成几个列，分别计算高度后插入

// @page:obj-> this  //页面对象
// @data:array  //要插入的数据
// @ids:array   //列的id  同时也是绑定的数据对象

//html
// 	<view class="list1" id="list1">
	// 	<index-item
	//          class="item"
	//          v-for="(item,index) in list1"
	// 	        :key="index"
	//          :data="item"
	//          hover-class="hover"
	// 	></index-item>
// 	</view>
// 	<view class="list1" id="list2">
// 	<index-item
//          class="item"
//          v-for="(item,index) in list2"
// 	        :key="index"
//          :data="item"
//          hover-class="hover"
// 	></index-item>
// 	</view>
// js
// await setWaterfallFlowData.setData(this,data,['list1','list2']);


export default {
	//入口函数
	async setData(page,data,ids){
		if(!ids){return data}
		if(ids.length<2){return data}

		for(let i=0,l=data.length;i<l;i++){
			let id = await this.getInsertCol(page,ids);

			page[id].push(data[i]);

			await this.uiRefreshEnd(page);
		}
	},
	//获取要插入的列id
	async getInsertCol(page,ids){
		let height = [];
		for(let i=0,l=ids.length;i<l;i++){
			let h = await this.getDomHeight(page,ids[i]);
			height.push(h);
		}
		let min = Math.min.apply(null,height),
			n = height.indexOf(min),
			id = ids[n];

		return id;
	},
	//计算dom的高度
	getDomHeight(page,id){
		return new Promise(success=>{
			let query = uni.createSelectorQuery().in(page);
			query.select('#'+id).boundingClientRect();
			query.exec(data => {
				data = data[0] || data;
				success(data.height)
			});
		});
	},
	//等待界面刷新
	uiRefreshEnd(page){
		return new Promise(success=>{
			page.$nextTick(function(){
				success();
			})
		})
	}
};





