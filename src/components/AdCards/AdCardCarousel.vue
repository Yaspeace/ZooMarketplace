<template>
    <VueSlickCarousel v-bind="carouselSettings">
        <div v-for="ad in ads" :key="ad" class="carousel-ad-wrapper">
          <AdCard :ad="ad" :liked="false" class="carousel-ad"/>
        </div>
        <template #prevArrow>
          <div class="custom-arrow-prev"></div>
        </template>
        <template #nextArrow>
          <div class="custom-arrow-next"></div>
        </template>
      </VueSlickCarousel>
</template>

<script>
import AdCard from './AdCard.vue';
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

export default {
    name: "AdCardCarousel",
    props: ["ads"],
    components: {
        AdCard,
        VueSlickCarousel,
    },
    data() {
        return {
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
}
</script>

<style scoped>
.carousel-ad-wrapper {
  display: flex !important;
  justify-content: center;
}

.carousel-ad {
  width: 80%;
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
  font-size: 35px;
}
</style>