<template>
  <div class="home">
    <Hat @search="search" />

    <div id="content">
      <AdCardCarousel v-if="paidAds.length > 0" :ads="paidAds" :toShow="4" class="carousel" />
      <AdCardGrid v-if="ads.length > 0" :ads="ads" />
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

export default {
  name: "HomeView",
  data() {
    return {
      paidAds: [],
      ads: [],
      ad: {
        id: 1,
        title: "Кот-упорот",
        price: 500,
        description: "Тут должно быть описание, но мы с котом пили (вылерьяночку)",
        address: "г. Талдом, ул. Мышная, д. 11",
        date: new Date().toLocaleDateString('ru-RU'),
        imgId: 1,
        state: 2,
        account: 1,
      },
    }
  },
  components: {
    HelloWorld,
    BeautyButton,
    Hat,
    CustomFooter,
    AdCardCarousel,
    AdCardGrid,
  },
  created() {
    this.getPaidAds();
    this.getAds();
  },
  methods: {
    getPaidAds() {
      this.$http.get('/api/Cards?paid=true')
        .then((resp) => this.paidAds = resp.data.results)
        .catch((err) => console.log(err));
    },
    getAds() {
      this.$http.get('/api/Cards?paid=false')
        .then((resp) => this.ads = resp.data.results)
        .catch((err) => console.log(err));
    },
    search(searchStr) {
      this.$http.get('/api/Cards?paid=false&search=' + searchStr)
        .then((resp) => this.ads = resp.data.results)
        .catch((err) => console.log(err));
      this.$http.get('/api/Cards?paid=true&search=' + searchStr)
        .then((resp) => this.paidAds = resp.data.results)
        .catch((err) => console.log(err));
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
</style>
