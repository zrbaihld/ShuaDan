// #ifndef VUE3
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
// #endif

// #ifdef VUE3
import { createStore } from 'vuex'
const store = createStore({
// #endif
	state: {
		token: '',
		adminInfo: {},
	},
	mutations: {
		login(state, loginInfo) {
			state.token = loginInfo.logonToken;
			uni.setStorageSync("token",loginInfo.logonToken);
			state.adminInfo = loginInfo;
			uni.setStorageSync("adminInfo",loginInfo);
		},
		logout(state) {
			state.token = ''
			state.adminInfo = {}
			uni.setStorageSync("token",'');
			uni.setStorageSync("adminInfo",'');
		},
	},
	getters: {
		token: state => {
			if (state.token) {
				return state.token
			}
			return uni.getStorageSync("token");
		},
		adminInfo: state => {
			if (state.adminInfo&&state.adminInfo.id) {
				return state.adminInfo
			}
			return uni.getStorageSync("adminInfo");
		},
		aid: state => {
			if (state.adminInfo&&state.adminInfo.id) {
				return state.adminInfo.id
			}
			if (uni.getStorageSync("adminInfo")) {
				return uni.getStorageSync("adminInfo").id
			}
			return '';
		},
	},
	actions: {
	}
})

export default store
