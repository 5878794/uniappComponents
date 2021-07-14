

/*code是指图片base64格式数据*/
//声明文件系统  只支持wx

 
let fn = function(base64Code){
	base64Code = base64Code.replace(/^data:image\/\w+;base64,/, "");
	const fs = uni.getFileSystemManager();
	//随机定义路径名称
	var times = new Date().getTime();
	var codeimg =  wx.env.USER_DATA_PATH +'/' + times + '.png';
	
	return new Promise(success=>{
		//将base64图片写入
		fs.writeFile({
		  filePath: codeimg,
		  data: base64Code,
		  encoding: 'base64',
		  success: (res) => {
		    //写入成功了的话，新的图片路径就能用了
			success(codeimg);
		  },
		  fail(e){
			  console.log(e)
		  }
		});
	})
}


export default fn;