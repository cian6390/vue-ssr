import Vue from 'vue';
import Router, { RouteConfig } from 'vue-router';

Vue.use(Router);

const routes: RouteConfig[] = [
  {
    name: 'home',
    path: '/',
    component: () =>
      import(
        /* webpackChunkName: "home-page" */
        '@/views/Home.vue'
      )
  },
  {
    name: 'product',
    path: '/products/:handle',
    component: () =>
      import(
        /* webpackChunkName: "product-page" */
        '@/views/Product.vue'
      )
  }
];

export function createRouter() {
  return new Router({
    mode: 'history',
    routes
  });
}
