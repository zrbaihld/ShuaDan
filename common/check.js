let checkForm =function(val,tips){
	if (val) {
		uni.showToast({
			title:tips,
			icon:"none"
		})
		return false
	}
	return true
}


export default checkForm