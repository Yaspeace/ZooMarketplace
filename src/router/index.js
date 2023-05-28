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
    path: '/busireg',
    name: 'busireg',
    component: () => import('../views/BusinessRegisterView.vue')
  },
  {
    path: '/account/:accId?',
    name: 'account',
    component: () => import('../views/AccountView.vue'),
    props: true
  },
  {
    path: '/ad-create/:mode',
    name: 'createAd',
    component: () => import('../views/Card/CardCreate.vue'),
    props: true
  },
  {
    path: '/ad-view/:adId',
    name: 'viewAd',
    component: () => import('../views/Card/CardView.vue'),
    props: true
  },
  {
    path: '/opt-ad-create',
    name: 'createOptAd',
    component: () => import('../views/Card/OptCardCreate.vue')
  },
  {
    path: '/opt-ad-view/:adId',
    name: 'viewOptAd',
    component: () => import('../views/Card/OptCardView.vue'),
    props: true
  },
  {
    path: '/lost-and-found-view/:adId',
    name: 'viewLafAd',
    component: () => import('../views/Card/LostAndFoundView.vue'),
    props: true
  },
  {
    path: '/lost-and-found-create',
    name: 'createLafAd',
    component: () => import('../views/Card/LostAndFoundCreate.vue')
  },
  {
    path: '/poster-create',
    name: 'createPoster',
    component: () => import('../views/Card/PosterCreate.vue')
  },
  {
    path: '/poster-view/:id',
    name: 'viewPoster',
    component: () => import('../views/Card/PosterView.vue'),
    props: true,
  },
  {
    path: '/ad/:mode',
    name: 'adCreate',
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
  {
    path: '/pay/:adId',
    name: 'payment',
    component: () => import('../components/Payments/Payment.vue'),
    props: true
  },
  {
    path: '/moderation',
    name: 'moderation',
    component: () => import('../views/Moderation.vue')
  },
  {
    path: '/favorites',
    name: 'favorites',
    component: () => import('../views/Favorites.vue')
  },
  {
    path: '/chat/:chatId?',
    name: 'chat',
    component: () => import('../views/ChatView.vue'),
    props: true
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
