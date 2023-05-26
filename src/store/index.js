import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    authorized: false,
    avatar: "",
    aid: 0,
    isBusiness: false,
  },
  getters: {},
  mutations: {
    login(state, payload) {
      state.authorized = true;
      state.avatar = payload.avatar;
      state.aid = payload.aid;
      state.isBusiness = payload.isBusiness;
    },
    logout(state) {
      state.authorized = false;
      state.avatar = "";
      state.aid = 0;
      state.isBusiness = false;
    },
  },
  actions: {
    async checkLogin({commit}) {
      try {
        let acc = (await Vue.prototype.$http.get('/api/Session/Account')).data.object;
        commit('login', {
          avatar: `https://${acc.avatar.host}${acc.avatar.route}`,
          aid: acc.id,
          isBusiness: acc.type > 1
        });
      } catch (error) {
        commit('logout');
        console.log(error);
      }
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
                .finally(() => commit('login', {
                  avatar: image,
                  aid: acc.data.object.id,
                  isBusiness: acc.data.object.type > 1
                }));
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
