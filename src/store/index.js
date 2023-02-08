import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    authorized: false,
    avatar: "",
  },
  getters: {},
  mutations: {
    login(state, avatar) {
      state.authorized = true;
      state.avatar = avatar;
    },
    logout(state) {
      state.authorized = false;
      state.avatar = "";
    },
  },
  actions: {
    checkLogin({commit}) {
      Vue.prototype.$http.get('/api/Session/Account')
        .then((acc) => {
          let image;
          Vue.prototype.$http.get('/api/Images/' + acc.data.object.image)
            .then((img) => image = 'https://' + img.data.object.host + img.data.object.route)
            .catch(() => image = '@/assets/staticimages/image1.jpg')
            .finally(() => commit('login', image));
        })
        .catch((err) => {
          if(err.response && err.response.status == 401) {
            commit('logout');
          }
        });
    },
    async login({commit}, payload) {
      return Vue.prototype.$http.put('/api/Authorize', payload)
        .then(() => {
          let image;
          Vue.prototype.$http.get('/api/Session/Account')
            .then((acc) => {
              Vue.prototype.$http.get('/api/Images/' + acc.data.object.image)
              .then((img) => image = 'https://' + img.data.object.host + img.data.object.route)
              .catch(() => image = '@/assets/staticimages/image1.jpg')
              .finally(() => commit('login', image));
            });
        });
    }
  },
  modules: {},
});
