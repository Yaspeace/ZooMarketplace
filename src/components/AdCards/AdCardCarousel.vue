<template>
    <VueSlickCarousel v-bind="carouselSettings">
        <div v-for="ad in ads" :key="ad.id" class="carousel-ad-wrapper">
          <small-card :ad="ad" class="carousel-ad" :key="ad.id" />
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
import VueSlickCarousel from 'vue-slick-carousel';
import 'vue-slick-carousel/dist/vue-slick-carousel.css';
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css';
import SmallCard from './SmallCard.vue';

export default {
    name: "AdCardCarousel",
    props:{
      ads: Array,
      toShow: Number
    },
    components: {
        VueSlickCarousel,
        SmallCard,
    },
    data() {
        return {
            carouselSettings: {
                "focusOnSelect": true,
                "infinite": false,
                "speed": 500,
                "slidesToShow": this.toShow,
                "slidesToScroll": 1,
                "touchThreshold": 5,
                "arrows": true,
                //'rows': this.rowsNum
            }
        }
    },
    watch: {
      toShow: function(newVal, oldVal) {
        this.carouselSettings.slidesToShow = newVal;
      }
    },
    computed: {
      rowsNum: function() {
        if(this.toShow == 1) {
          return 1;
        }

        if(this.toShow == 2) {
          if(this.ads.length <= 2) {
            return 1;
          } else {
            return 2;
          }
        }

        if(this.ads.length <= this.toShow) {
          return 1;
        } else if(this.ads.length <= 2 * this.toShow) {
          return 2;
        } else {
          return 3;
        }
      }
    }
}
</script>

<style scoped>
.carousel-ad-wrapper {
  display: flex !important;
  justify-content: center;
}

.carousel-ad {
  width: 80%;
  margin-bottom: 20px;
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