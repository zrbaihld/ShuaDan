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
	BaseURL='http://103.225.11.214/shiro/';
}

export default {
	// userRegist:  "/api/granUser/userRegist",
	userRegist:  "/api/dev/register",
	userlogin:  "/api/dev/login",
	userIndex:  "/api/dev/index",
	upiAccountAdd:  "/api/upiAccount/add",
	upiAccountEdit:  "/api/upiAccount/edit",
	upiAccountList:  "/api/upiAccount/getList",
	bankAccountAdd:  "/api/bankAccount/add",
	bankAccountgetList:  "/api/bankAccount/getList",
	imgUpload: BaseURL+ "/api/file/imgUpload",
	
	payoutOrderGet:  "/api/payoutOrder/get",
	payoutOrderGetPending:  "/api/payoutOrder/getPending",
	payoutOrderSuccess:  "/api/payoutOrder/success",
	payoutOrderFailed:  "/api/payoutOrder/failed",
	payoutOrderGetList:  "/api/payoutOrder/getList",
	
	incomeOrderGet:  "/api/incomeOrder/get",
	incomeOrderGetPending:  "/api/incomeOrder/getPending",
	incomeOrderSuccess:  "/api/incomeOrder/success",
	incomeOrderFailed:  "/api/incomeOrder/failed",
	incomeOrderGetList:  "/api/incomeOrder/getList",
	
	cashSubmit:  "/api/cash/submit",
	cashGetFee:  "/api/cash/getFee",
	cashGetList:  "/api/cash/getList",
	
	
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