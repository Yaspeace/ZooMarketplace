<template>
    <VueSlickCarousel v-bind="carouselSettings">
        <img v-for="src in srcs" :key="src" :src="src" class="custom-item" />
        <template #prevArrow>
            <div class="custom-arrow-prev"></div>
        </template>
        <template #nextArrow>
            <div class="custom-arrow-next"></div>
        </template>
    </VueSlickCarousel>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

export default {
    name: 'PhotoCarousel',
    components: {
        VueSlickCarousel,
    },
    props: ['srcs'],
    data() {
        return {
            carouselSettings: {
                "focusOnSelect": true,
                "infinite": false,
                "speed": 500,
                "slidesToShow": 3,
                "slidesToScroll": 3,
                "touchThreshold": 5,
                "arrows": true,
            }
        }
    }
}
</script>

<style scoped>
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

.custom-item {
    user-select: none;
    object-fit:contain;
    pointer-events: none;
    aspect-ratio: 1/1;
    background-color: gray;
}
</style>