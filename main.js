import th from './lang/th.json'
import App from './App'

const messages = {
	th,
}

let i18nConfig = {
  locale: 'th',// 获取已设置的语言
  messages
}
// #ifndef VUE3
import Vue from 'vue'
import VueI18n from 'vue-i18n'

import store from './store'
import url from './common/url.js'
import check from './common/check.js'
// 全局挂载后使用
import http from '@/common/vmeitime-http/index.js'



import uView from '@/uni_modules/uview-ui'
Vue.use(uView)
// 如此配置即可
uni.$u.config.unit = 'rpx'

Vue.use(VueI18n)
const i18n = new VueI18n(i18nConfig)
Vue.config.productionTip = false


Vue.prototype.$api = http
Vue.prototype.$checkForm = check

Vue.prototype.$store = store
Vue.prototype.$url =url

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	i18n,
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import { createI18n } from 'vue-i18n'
const i18n = createI18n(i18nConfig)
export function createApp() {
  const app = createSSRApp(App)
  app.use(i18n)
  return {
    app
  }
}
// #endif