import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";

Vue.config.productionTip = false;

Vue.prototype.$http = axios.create({
  baseURL: "http://w980379k.beget.tech/",
});

Vue.prototype.$http.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  //if(error && error.response && error.response.status == 401) {
    //Vue.prototype.$router.push({ name: 'login', params: { register: 'false' } });
  //}
  return Promise.reject(error);
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
