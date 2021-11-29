


export default {
    onLoad(){
        this.pageIndex = 1;
        this.pageSize = 20;
    },
    onReachBottom(e){
        let pageScrollLoadObj = this.$refs.pageScrollLoad;
        pageScrollLoadObj.loadFn();
    },
    methods:{
        async startPageLoad(fnName,dataKeyName,pageIndex){
            this.getListFn__ = fnName;
            this.listDataName__ = dataKeyName;
            this.pageIndex = pageIndex || 1;
            await this.pageLoadFn__();
        },
        pageScrollLoad__(){
            let obj = this.$refs.pageScrollLoad,
                nowPage = this.pageIndex+1;

            this.pageLoadFn__(nowPage).then(rs=>{

            }).catch(e=>{
                obj.loadMoreError();
            });
        },
        async pageLoadFn__(pageIndex){
            pageIndex = pageIndex || this.pageIndex;

            let data = await this[this.getListFn__]();

            let dataLength = data.length;
            if(pageIndex == 1){
                //新掺入
                this[this.listDataName__] = data;
            }else{
                this[this.listDataName__] = this[this.listDataName__].concat(data);
            }



            let obj = this.$refs.pageScrollLoad;

            if(dataLength == this.pageSize){
                obj.loadMoreEnd();
                obj.startEventListener();
            }else{
                obj.noMoreData();
            }

            this.pageIndex = pageIndex;

        }
    }

};
