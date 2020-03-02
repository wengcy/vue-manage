import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios';
import ElementUI from 'element-ui';
import VueI18n from 'vue-i18n';

import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    count: "1",
  },
})

let plugins = {
    install(Vue, options) {
		Vue.prototype.myI18n = function (value) {
			let count =this.$t('i18n.'+value);
			return count;
		}
    }
}

import { messages } from './components/common/i18n';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题
import './assets/css/icon.css';
import './components/common/directives';
import "babel-polyfill";

Vue.config.productionTip = false
Vue.use(VueI18n);

Vue.use(plugins)
Vue.use(ElementUI, {
    size: 'small'
});
Vue.prototype.$axios = axios;

const i18n = new VueI18n({
    locale: 'zh',
    messages
})

export default new Vue({
    router,
    i18n,
	store,
    render: h => h(App)
}).$mount('#app')