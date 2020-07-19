import Vue from 'vue';
import Vuex from 'vuex';

import general from './moduls/general';
import categories from './moduls/categories';
import currencies from './moduls/currencies';
import offers from './moduls/offers';
import states from './moduls/states';

Vue.use(Vuex);
const store = new Vuex.Store({
  modules: {
    general,
    categories,
    currencies,
    offers,
    states,
  },
  state: {},
  mutations: {},
});

export default store;