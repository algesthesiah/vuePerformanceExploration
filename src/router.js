import Vue from 'vue';
import VueRouter from 'vue-router';
import Demo1 from './components/Demo1';
import Demo2 from './components/Demo2';
import Demo3 from './components/Demo3';
import Demo4 from './components/Demo4';
import Demo5 from './components/Demo5';
import Demo6 from './components/Demo6';

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/demo-1',
      name: 'Demo1',
      component: Demo1,
    },
    {
      path: '/demo-2',
      name: 'Demo2',
      component: Demo2,
    },
    {
      path: '/demo-3',
      name: 'Demo3',
      component: Demo3,
    },
    {
      path: '/demo-4',
      name: 'Demo4',
      component: Demo4,
    },
    {
      path: '/demo-5',
      name: 'Demo5',
      component: Demo5,
    },
    {
      path: '/demo-6',
      name: 'Demo6',
      component: Demo6,
    },
  ],
});
