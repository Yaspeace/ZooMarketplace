import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: '/login/:register',
    name: 'login',
    component: () => import('../views/LoginView.vue'),
    props: true
  },
  {
    path: '/account/:accId',
    name: 'account',
    component: () => import('../views/AccountView.vue'),
    props: true
  },
  {
    path: '/ad/:mode',
    name: 'ad',
    component: () => import('../views/Card.vue'),
    props: true
  },
  {
    path: '/ad/:mode/:adId',
    name: 'ad',
    component: () => import('../views/Card.vue'),
    props: true
  },
  {
    path: '/landing',
    name: 'landing',
    component: () => import('../views/Landing.vue')
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
