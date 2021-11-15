
//银行卡格式化函数 带*号



let addSpace = function (text) {
	let textNumber = 4;     //4个一组

	let l = text.length;
	l = (l%textNumber == 0)? l/textNumber : parseInt(l/textNumber)+1;

	let newText = [];
	for(let i=0;i<l;i++){
		if(l>4){
			if(l-i<=2){
				newText.push(text.substr(i*textNumber,textNumber));
			}else{
				newText.push('*'.repeat(textNumber));
			}
		}else{
			if(l-i<=1){
				newText.push(text.substr(i*textNumber,textNumber));
			}else{
				newText.push('*'.repeat(textNumber));
			}
		}
	}

	return newText.join(' ');

};



export default addSpace;
