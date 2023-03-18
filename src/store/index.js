import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    authorized: false,
    avatar: "",
    aid: 0,
  },
  getters: {},
  mutations: {
    login(state, payload) {
      state.authorized = true;
      state.avatar = payload.avatar;
      state.aid = payload.aid;
    },
    logout(state) {
      state.authorized = false;
      state.avatar = "";
      state.aid = 0;
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
            .finally(() => commit('login', { avatar: image, aid: acc.data.object.id }));
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
                .finally(() => commit('login', { avatar: image, aid: acc.data.object.id }));
            });
        });
    },
    logout({commit}) {
      Vue.prototype.$http.delete('/api/Authorize')
        .then(() => commit('logout'))
        .catch((err) => console.log(err));
    }
  },
  modules: {},
});
