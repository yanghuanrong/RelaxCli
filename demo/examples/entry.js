import Vue from 'vue';
import App from './App.vue';
import router from './route.config';

import UI from '../src/index.js';
import '../src/relax.less';

import Demo from './components/index';
import './demo-style/index.less';

Vue.config.productionTip = false;
Vue.use(UI);
Vue.use(Demo);

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
