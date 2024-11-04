// let BaseURL = 'http://fdbk.fangguanyi.com/'

export let BaseURL = "/baseApi";

export let ImageUrl = "https://hdgy.fangguanyi.com";
// export let ImageUrl = "http://houseapp:12121";
if (process.env.NODE_ENV === 'development') {
	BaseURL='https://hdgy.fangguanyi.com/';
	// #ifdef H5
	BaseURL="/baseApi";
	// BaseURL="/localBaseApi/";
	// ImageUrl="http://houseapp:12121/";
	// #endif
} else {
	BaseURL='https://hdgy.fangguanyi.com/';
}

export default {
	// userRegist:  "/api/granUser/userRegist",
	userRegist:  "/api/dev/register",
	userlogin:  "/api/dev/login",
	userIndex:  "/api/dev/index",
	upiAccountAdd:  "/api/upiAccount/add",
	upiAccountEdit:  "/api/upiAccount/edit",
	upiAccountList:  "/api/upiAccount/getList",
	incomeOrderGet:  "/api/incomeOrder/get",
	getPending:  "/api/incomeOrder/getPending",
	bankAccountAdd:  "/api/bankAccount/add",
	
}
// upiAccountAdd{
	// userAccount:'',
	// upiAccount:'',
	// accountName:'',
// }
// upiAccountEdit{
	// userAccount:'',
	// upiAccount:'',
	// upiAccountId:'',
	// accountName:'',
	// accountStatus:'',
// }
// upiAccountList{
	// userAccount:'',
// }
// incomeOrderGet{
	// userAccount:'',
	// accountType:0/1,
// }
// getPending{
	// userAccount:'',
// }