<template>
  <div class="home">
    <Hat @search="search" />

    <div id="content">

      <div class="top-bar">
        <div class="top-filters" style="">
          <div class="sort-input" @click="showOptions1 = !showOptions1">
            <div>Сортировать по: Дата публикации</div>
            <svg style="width: 25px;padding-left: 15px;" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 300 300" shape-rendering="geometricPrecision" text-rendering="geometricPrecision">
                <line x1="50" y1="-25" x2="-75" y2="50" transform="translate(220 137.5)" fill="none" stroke="currentColor" stroke-width="20"/>
                <line x1="-50" y1="-25" x2="75" y2="50" transform="translate(80 137.5)" fill="none" stroke="currentColor" stroke-width="20"/>
            </svg>
            <div class="options" :class="{'hidden': !showOptions1 }">
              <div>Дата публикации</div>
              <div>Сначала дешевле</div>
              <div>Сначала дороже</div>
            </div>
          </div>
          <div class="sort-input" @click="showOptions2 = !showOptions2">
            <div>Выбрать продавцов</div>
            <svg style="width: 25px;padding-left: 15px;" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 300 300" shape-rendering="geometricPrecision" text-rendering="geometricPrecision">
                <line x1="50" y1="-25" x2="-75" y2="50" transform="translate(220 137.5)" fill="none" stroke="currentColor" stroke-width="20"/>
                <line x1="-50" y1="-25" x2="75" y2="50" transform="translate(80 137.5)" fill="none" stroke="currentColor" stroke-width="20"/>
            </svg>
            <div class="options" :class="{'hidden': !showOptions2 }">
              <div v-for="x in accTypes" :key="x.id">
                <input type="checkbox" @click="$event.stopPropagation()" /><label>{{ x.name }}</label>
              </div>
            </div>
          </div>
        </div>
        
        <div class="tab-btns">
          <div :class="{'active': curTab == 0}" @click="changeTab(0)">Объявления</div>
          <div :class="{'active': curTab == 1}" @click="changeTab(1)">Потеряшки</div>
          <div :class="{'active': curTab == 2}" @click="changeTab(2)">Афиши</div>
        </div>
      </div>

      <AdCardCarousel v-if="paidAds.length > 0" :ads="paidAds" :toShow="toShow" class="carousel" />

      <pulse-loader v-if="isLoading" color="var(--color-primary)" class="spinner" />
      
      <AdCardGrid v-if="ads.length > 0" :ads="ads" style="padding-top: 50px;padding-bottom: 50px;" :total-ads="total" :ads-per-page="adsPerPage" @changePage="changePage" />
      <poster-grid v-if="curTab == 2" style="padding-top: 50px; padding-bottom: 50px; width: 100%;" />

      <div v-if="this.ads.length == 0 && this.paidAds.length == 0 && !isLoading">
        По вашему запросу не найдено ни одного объявления!
      </div>
    </div>

    <CustomFooter />
    <div class="footer-img-wrapper">
        <img class="footer-img" src="@/assets/staticimages/footerimg.jpg"/>
    </div>
  </div>
</template>

<script>
import BeautyButton from "@/components/BeautyButton.vue";
import Hat from '@/components/Hat.vue';
import CustomFooter from '@/components/CustomFooter.vue';
import AdCardCarousel from '@/components/AdCards/AdCardCarousel.vue';
import AdCardGrid from "@/components/AdCards/AdCardGrid.vue";
import ChatShortList from "@/components/Chats/ChatShortList.vue";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import PosterGrid from '@/components/Posters/PosterGrid.vue';

export default {
  name: "HomeView",
  data() {
    return {
      paidAds: [],
      ads: [],
      toShow: this.getShowingCardsNum(),
      curTab: 0,
      showOptions1: false,
      showOptions2: false,
      accTypes: [],
      isLoading: true,
      total: 0,
      adsPerPage: 12, // Должно быть 60
      searchStr: ''
    }
  },
  components: {
    BeautyButton,
    Hat,
    CustomFooter,
    AdCardCarousel,
    AdCardGrid,
    PosterGrid,
    ChatShortList,
    PulseLoader,
  },
  created() {
    window.addEventListener('resize', this.resize);
    this.getAds();
    this.getAccTypes();
  },
  destroyed () {
    window.removeEventListener('resize', this.resize);
  },
  methods: {
    getPaidAds(search) {
      let req = '/api/Cards?state=2&paid=true&limit=30&types=1,2,3,6';
      if(search && search.length > 0) req += '&search=' + search;
      this.$http.get(req)
        .then((resp) => this.paidAds = resp.data.results)
        .catch((err) => console.log(err))
        .finally(() => this.isLoading = false);
    },
    getAds(search = null, page = 1) {
      this.isLoading = true;
      this.getPaidAds(search);
      let req = `/api/Cards?state=2&limit=${this.adsPerPage}&start=${this.adsPerPage * (page - 1)}&types=1,2,3,6`;
      if(search && search.length > 0) req += '&search=' + search;
      this.$http.get(req)
        .then((resp) => {
          this.ads = resp.data.results;
          this.total = resp.data.total;
        })
        .catch((err) => console.log(err))
        .finally(() => this.isLoading = false);
    },
    getLaf(search = null, page = 1) {
      this.isLoading = true;
      this.getPaidAds();
      let req = `/api/Cards?state=2&limit=${this.adsPerPage}&start=${this.adsPerPage * (page - 1)}&types=4,5`;
      if(search && search.length > 0) req += '&search=' + search;
      this.$http.get(req)
      .then((resp) => {
        this.ads = resp.data.results;
        this.total = resp.data.total;
      })
      .catch((err) => console.log(err))
      .finally(() => this.isLoading = false);
    },
    search(searchStr) {
      this.searchStr = searchStr;
      if(this.curTab == 0) {
        this.getAds(searchStr);
      } else if (this.curTab == 1) {
        this.getLaf(searchStr);
      }
    },
    getShowingCardsNum() {
      if(window.innerWidth >= 1440) return 3;
      if(window.innerWidth >= 1000) return 2;
      return 1;
    },
    getAccTypes() {
        this.$http.get('/api/Account/Types')
        .then((resp) => this.accTypes = resp.data)
        .catch((err) => console.log(err));
    },
    resize() {
      this.toShow = this.getShowingCardsNum();
    },
    changeTab(tab) {
      this.ads = [];
      //this.paidAds = [];
      this.curTab = tab;
      if (tab == 0) {
        this.getAds(this.searchStr);
      } else if (tab == 1) {
        this.getLaf(this.searchStr);
      }
    },
    changePage(page) {
      if(this.curTab == 0) {
        this.getAds(this.searchStr, page);
      } else if (this.curTab == 1) {
        this.getLaf(this.searchStr, page)
      }
    }
  }
};
</script>

<style scoped>
#content {
  min-height: 100vh;
  /* margin-top: 200px; */
  background: var(--color-secondary-light);
  padding: 200px 8px 8px 8px;

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
.top-filters {
  display: flex;
  gap: 15px;
  align-items: center;
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

@media screen and (max-width: 720px) {
  .top-bar {
    flex-direction: column-reverse;
    justify-content: flex-start;
    gap: 25px;
  }

  .top-filters {
    flex-direction: column;
    gap: 7px;
  }

    .footer-img {
    width: 100%;
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
