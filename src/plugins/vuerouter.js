import Vue from 'vue';
import VueRouter from 'vue-router'

import RozetkaYml from '../components/rozetka/RozetkaYml';
Vue.use(VueRouter);
const routes = [
  { path: '/', component: RozetkaYml },
  { path: '/general', component: RozetkaYml },
  { path: '/categories', component: RozetkaYml },
  { path: '/offers', component: RozetkaYml },
  { path: '/currency', component: RozetkaYml }
];

const router = new VueRouter({
  routes // сокращённая запись для `routes: routes`
});

export default router;