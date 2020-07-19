import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import VueResource from 'vue-resource';
import VueLodash from 'vue-lodash';
import lodash from 'lodash';

Vue.config.productionTip = true;
Vue.use(VueResource);
Vue.use(VueLodash, { name: 'custom' , lodash: lodash })
new Vue({
  render: h => h(App),
  vuetify,
}).$mount('#app');
