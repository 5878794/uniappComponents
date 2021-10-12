


export default {
    onReachBottom(e){
        let pageScrollLoadObj = this.$refs.pageScrollLoad;
        pageScrollLoadObj.loadFn();
    }
};
