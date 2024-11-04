import http from './interface'
import {
	BaseURL
} from '@/common/url.js'
import store from '../../store/index.js'
import url from '../../common/url.js'
/**
 * 将业务所有接口统一起来便于维护
 * 如果项目很大可以将 url 独立成文件，接口分成不同的模块
 * 
 */

// 单独导出(测试接口) import {test} from '@/common/vmeitime-http/'
http.config.baseUrl = BaseURL
//设置请求前拦截器
http.interceptor.request = (config) => {
	let data = JSON.parse(JSON.stringify(config.data))
	// data['token']=store.getters.token
	// data['token']=uni.getStorageSync("token")
	if (!data['userAccount']) {
		data['userAccount']=store.getters.aid
	}
	
	// data['userAccount']=store.getters.aid
	Object.keys(data).forEach(key => {
		if (data[key] == null || data[key] == 'undefined') {
			data[key] = ""
		}
	})
	config.data = data
	config.header = {
		token:store.getters.token,
	}
	console.log(config,'config');

}
//设置请求结束后拦截器
http.interceptor.response = (response) => {
	//判断返回状态 执行相应操作
	uni.hideLoading();
	if (response.statusCode == 200) {
		
		if (response.data.code==36) {
			if (response.config.url.indexOf(url.login)==-1) {
				store.commit('logout')
				uni.reLaunch({
					url: '/pages/login/login',
					fail: (err) => {
						console.log(err);
					}
				})
			}
			uni.showToast({
				title: response.data.msg,
				icon: "none"
			})
			return response.data;
		}
		
		if (response.data.code == "0") {
			return response.data;
		} else {
			uni.showToast({
				title: response.data.msg,
				icon: "none"
			})
			return response.data;
		}

	} else {
		uni.showToast({
			title: "请求异常",
			icon: "none"
		})
		return response.data;
	}

}
// 默认全部导出  import api from '@/common/vmeitime-http/'
export default http
