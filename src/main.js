import Vue from 'vue';

// import Cookies from 'js-cookie';

import 'normalize.css/normalize.css'; // a modern alternative to CSS resets

import Element from 'element-ui';
import './styles/element-variables.scss';
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import '@/styles/index.scss'; // global css

import App from './App';
import store from './store';
import router from './router';

import './icons'; // icon
import './permission'; // permission control

import * as filters from './filters'; // global filters
Vue.use(Element, {
  i18n: (key, value) => i18n.t(key, value)
})

// 引入插件和语言包
import VueI18n from 'vue-i18n';
import zh from '@/i18n/zh';
import en from '@/i18n/en';
import hk from '@/i18n/hk';
Vue.use(VueI18n);
// 实例化vue-i18n
const i18n = new VueI18n({

  // 从本地存储中取，如果没有默认为中文，
  // 这样可以解决切换语言后，没记住选择的语言，刷新页面后还是默认的语言
  locale: localStorage.getItem('lang') || 'zh',
  messages: {
    'zh': Object.assign(zh, zhLocale), // 中文语言包
    'en': Object.assign(en, enLocale), // 英文语言包
    'hk': hk // 英文语言包
  }
});

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  i18n,
  router,
  store,
  render: h => h(App)
});
