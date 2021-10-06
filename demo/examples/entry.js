import Vue from 'vue';
import App from './App.vue';
import router from './route.config';

import UI from '../src/index.js';
import '../src/relax.less';

Vue.config.productionTip = false;
Vue.use(UI);

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
