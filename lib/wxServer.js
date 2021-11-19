// 微信获取 用户信息  appId  phone
//uniapp配置云函数方法 https://blog.csdn.net/weixin_43159783/article/details/109555860



// html:
// <view @tap="testGetAppId">获取appId</view>
// <view @tap="testGetUserInfo">获取用户信息</view>
// <button open-type="getPhoneNumber" @getphonenumber="testGetPhone">授权手机号码</button>

//js:
// import wxServer from "../../lib/wxServer";
//
// methods:{
//     async testGetAppId(){
//         let info = await wxServer.getAppId();
//         console.log(info)
//     },
//     async testGetUserInfo(){
//         let info = await wxServer.getUserInfo();
//         console.log(info)
//     },
//     async testGetPhone(e){
//         let info = await wxServer.getPhone(e);
//         console.log(info)
//     }
// }






//云函数调用的包装
//需要调用哪个云函数，直接写到server的key上，函数内为传递的参数。
//代理自动处理函数成wx的云函数调用

//调用方法
// let server = require('../../lib/server');



let serverFn = new Proxy({}, {
    get(target, key, resiver) {
        return function (e) {
            return new Promise((success, error) => {
                let data = {};
                if(key == 'getPhone'){
                    data = {
                        weRunData: wx.cloud.CloudID(e.detail.cloudID),
                    }
                }


                wx.cloud.callFunction({
                    name: key,
                    data:data,
                    success(res){
                        if (res.errMsg == 'cloud.callFunction:ok'){
                            success(res.result);
                        }else{
                            error(res.errMsg);
                        }
                    },
                    fail(err){
                        console.log(err)
                        throw err.message;
                    }
                })
            })
        }
    }
});

//必须在点击事件中执行
let getUserInfo = function() {
    return new Promise((success,error)=>{
        uni.getUserProfile({
            desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
            success: (res) => {
                success(res.userInfo);
            },
            fail(e) {
                console.log(e);
                error('用户拒绝授权!');
            }
        });
    })
};

let getPhone = async function(e){
    let data = await serverFn.getPhone(e);
    return data.moblie;
};

let getAppId = async function(){
    return await serverFn.login();
};


export default {
    getUserInfo,getPhone,getAppId
};
