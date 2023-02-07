import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";

Vue.config.productionTip = false;

Vue.prototype.$http = axios.create({
  baseURL: "http://w980379k.beget.tech/",
  withCredentials: true,
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
