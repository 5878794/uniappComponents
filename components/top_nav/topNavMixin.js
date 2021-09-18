


//背景图设置时增加的滚动条监听事件
//触发top-nav的滚动监听函数


export default {
	onPageScroll(e){
		let scrollTop = e.scrollTop;

		let topDom = this.$refs.top_nav;
		topDom.onScroll(scrollTop);
	}
};
