<template>
  <div class="home">
    <Hat @search="search" />

    <div id="content">

      <div class="top-bar">
        <div class="sort-input" @click="showOptions = !showOptions">
          <div>Сортировать по: Дата публикации</div>
          <svg style="width: 25px;padding-left: 15px;" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 300 300" shape-rendering="geometricPrecision" text-rendering="geometricPrecision">
              <line x1="50" y1="-25" x2="-75" y2="50" transform="translate(220 137.5)" fill="none" stroke="currentColor" stroke-width="20"/>
              <line x1="-50" y1="-25" x2="75" y2="50" transform="translate(80 137.5)" fill="none" stroke="currentColor" stroke-width="20"/>
          </svg>
          <div class="options" :class="{'hidden': !showOptions }">
            <div>Дата публикации</div>
            <div>Сначала дешевле</div>
            <div>Сначала дороже</div>
          </div>
        </div>
        <div class="tab-btns">
          <div :class="{'active': curTab == 0}" @click="curTab = 0">Объявления</div>
          <div :class="{'active': curTab == 1}" @click="curTab = 1">Потеряшки</div>
          <div :class="{'active': curTab == 2}" @click="curTab = 2">Афиши</div>
        </div>
      </div>

      <AdCardCarousel v-if="paidAds.length > 0" :ads="paidAds" :toShow="toShow" class="carousel" />
      <AdCardGrid v-if="ads.length > 0" :ads="ads" style="padding-top: 50px;padding-bottom: 50px;" />
    </div>

    <CustomFooter />
    <div class="footer-img-wrapper">
        <img class="footer-img" src="@/assets/staticimages/footerimg.jpg"/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import BeautyButton from "@/components/BeautyButton.vue";
import Hat from '@/components/Hat.vue';
import CustomFooter from '@/components/CustomFooter.vue';
import AdCardCarousel from '@/components/AdCards/AdCardCarousel.vue';
import AdCardGrid from "@/components/AdCards/AdCardGrid.vue";
import ChatShortList from "@/components/Chats/ChatShortList.vue";

export default {
  name: "HomeView",
  data() {
    return {
      paidAds: [],
      ads: [],
      toShow: this.getShowingCardsNum(),
      curTab: 0,
      showOptions: false
    }
  },
  components: {
    HelloWorld,
    BeautyButton,
    Hat,
    CustomFooter,
    AdCardCarousel,
    AdCardGrid,
    ChatShortList,
  },
  created() {
    window.addEventListener('resize', this.resize);
    this.getPaidAds();
    this.getAds();
  },
  destroyed () {
    window.removeEventListener('resize', this.resize);
  },
  methods: {
    getPaidAds() {
      this.$http.get('/api/Cards?state=2&paid=true')
        .then((resp) => this.paidAds = resp.data.results)
        .catch((err) => console.log(err));
    },
    getAds() {
      this.$http.get('/api/Cards?state=2&paid=false')
        .then((resp) => this.ads = resp.data.results)
        .catch((err) => console.log(err));
    },
    search(searchStr) {
      this.$http.get('/api/Cards?state=2&paid=false&search=' + searchStr)
        .then((resp) => this.ads = resp.data.results)
        .catch((err) => console.log(err));
      this.$http.get('/api/Cards?state=2&paid=true&search=' + searchStr)
        .then((resp) => this.paidAds = resp.data.results)
        .catch((err) => console.log(err));
    },
    getShowingCardsNum() {
      if(window.innerWidth >= 1440) return 3;
      if(window.innerWidth >= 1000) return 2;
      return 1;
    },
    resize() {
      this.toShow = this.getShowingCardsNum();
    },
  }
};
</script>

<style scoped>
#content {
  min-height: 100vh;
  margin-top: 200px;
  background: white;
  padding: 8px;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.home {
  position: relative;
}

.carousel {
  width: 100%;
  /* background: rgb(233, 233, 93); */
  background: var(--color-secondary);
  padding: 15px;
  border-radius: 14px;
  box-shadow: inset rgba(189, 189, 189, 0.8) 0px 0px 20px 0px;
}

.footer-img-wrapper {
  width: 100%;
  height: 300px;
  position: fixed;
  bottom: 0px;
  left: 0px;
  z-index: -1;
  text-align: center;
  background: black;
}

.footer-img {
    width: 50%;
    max-width: 600px;
    height: 100%;
}

.chats {
  height: 100px;
  width: 500px;
}

.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 25px;
  box-sizing: border-box;
}

.sort-input {
  background: var(--color-secondary-dark);
  border-top-right-radius: 14px;
  border-top-left-radius: 14px;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  transition: .3s;
  position: relative;
}
.sort-input:hover {
  background: #6e6067;
}

.options {
  position: absolute;
  top: 55px;
  left: 0px;
  color: white;
  z-index: 200;
  background: var(--color-secondary-dark);
  padding: 10x;
  box-sizing: border-box;
  width: 100%;
  border-bottom-left-radius: 14px;
  border-bottom-right-radius: 14px;
}

.options > div {
  border-top: 1px solid white;
  padding: 6px;
  transition: .3s;
  text-align: center;
}

.options > div:hover {
  border-top: 1px solid white;
  padding: 6px;
  background: #6e6067;
}


.options > div:first-child {
  border-top: none;
}

.options > div:last-child {
  border-bottom-left-radius: 14px;
  border-bottom-right-radius: 14px;
}


.tab-btns {
  display: flex;
  justify-content: flex-end;
}

.tab-btns > div {
  background: var(--color-primary);
  color: white;
  padding: 10px;
  box-sizing: border-box;
  font-weight: bold;
  font-size: 1.2em;
  cursor: pointer;
  border-right: 3px solid var(--color-primary-light);
}

.tab-btns > div:last-child {
  border-right: none;
}

.tab-btns > div.active {
  font-size: 1.5em;
  background: var(--color-primary-dark);
}

.tab-btns > div:first-child {
  border-top-left-radius: 14px;
}

@media screen and (max-width: 700px) {
  .footer-img {
    width: 100%;
  }
}

@media screen and (max-width: 720px) {
  .top-bar {
    flex-direction: column-reverse;
    justify-content: flex-start;
    gap: 25px;
  }
}

@media screen and (max-width: 385px) {
  .tab-btns > div {
    font-size: 0.8em;
  }

  .tab-btns > div.active {
    font-size: 1em;
  }
}
</style>
