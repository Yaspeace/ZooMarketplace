<template>
  <div class="home">
    <VueSlickCarousel v-bind="carouselSettings" class="carousel">
      <div v-for="i in 7" :key="i" class="one-more-tmp">
        <AdCard :ad="ad" :liked="false" class="tmp"/>
      </div>
      
      
      
      <template #prevArrow>
        <div class="custom-arrow-prev"></div>
      </template>
      <template #nextArrow>
        <div class="custom-arrow-next"></div>
      </template>
    </VueSlickCarousel>
    <BeautyButton text="Test" :type="1" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import BeautyButton from "@/components/BeautyButton.vue";
import AdCard from "@/components/AdCards/AdCard.vue";
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
  // optional style for arrows & dots
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

export default {
  name: "HomeView",
  data() {
    return {
      ad: {
        id: 1,
        title: "Кот-упорот",
        price: 500,
        description: "Тут должно быть описание, но мы с котом пили (вылерьяночку)",
        address: "г. Талдом, ул. Мышная, д. 11",
        date: new Date().toLocaleDateString('ru-RU'),
        imgId: 1
      },
      carouselSettings: {
        "focusOnSelect": true,
        "infinite": false,
        "speed": 500,
        "slidesToShow": 4,
        "slidesToScroll": 3,
        "touchThreshold": 5,
        "arrows": true,
      }
    }
  },
  components: {
    HelloWorld,
    BeautyButton,
    AdCard,
    VueSlickCarousel,
  },
};
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.tmp {
  width: 80%;
}

.one-more-tmp {
  display: flex !important;
  justify-content: center;
}

.carousel {
  width: 100%;
  background: rgb(233, 233, 93);
  padding: 15px;
  border-radius: 14px;
  box-shadow: inset rgba(189, 189, 189, 0.8) 0px 0px 20px 0px;
}

.custom-arrow-prev, .custom-arrow-next {
  color: black;
  font-size: 50px;
}

.custom-arrow-prev {
  left: -1px;
  z-index: 100;
}

.custom-arrow-next {
  right: 29px;
  z-index: 100;
}

.custom-arrow-prev:before, .custom-arrow-next:before {
  color: black;
  /*font-size: 50px;*/
  font-size: 100%;
}
</style>
