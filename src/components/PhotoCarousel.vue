<template>
    <VueSlickCarousel v-bind="carouselSettings">
        <div class="custom-img-wrapper" v-for="src in srcs" :key="src" >
            <div>
                <img :src="src" class="custom-item custom-item-img" />
            </div>
        </div>
        <div class="custom-img-wrapper" v-if="allowAdd">
            <div>
                <picture-input
                    class="custom-item"
                    accept="image/jpeg,image/png"
                    :removable="true"
                    :crop="false"
                    :zIndex="1"
                    :custom-strings="{
                        upload: 'Загрузите фото питомца',
                        drag: 'Перетащите фото сюда',
                        change: 'Изменить фото',
                        remove: 'Удалить фото'
                    }"
                />
            </div>
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
import PictureInput from 'vue-picture-input';

export default {
    name: 'PhotoCarousel',
    components: {
        VueSlickCarousel,
        PictureInput,
    },
    props: {
        srcs: Array,
        allowAdd: Boolean,
    },
    data() {
        return {
            carouselSettings: {
                "focusOnSelect": true,
                "infinite": false,
                "speed": 500,
                "slidesToShow": 3,
                "slidesToScroll": 1,
                "touchThreshold": 5,
                "arrows": true
            }
        }
    }
}
</script>

<style scoped>
.custom-arrow-prev, .custom-arrow-next {
  color: black;
}

.custom-arrow-prev {
  left: -35px;
  z-index: 100;
}

.custom-arrow-next {
  right: -25px;
  z-index: 100;
}

.custom-arrow-prev:before, .custom-arrow-next:before {
  color: black;
  font-size: 35px;
}

.custom-img-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.custom-img-wrapper > div {
    object-fit: cover;
    aspect-ratio: 1/1;
    width: 90%;
    background-color: var(--color-primary);
    display: flex;
    justify-content: center;
    align-items: center;
}

.custom-item {
    width: 90%;
    height: 90%;
}

.custom-item-img {
    user-select: none;
    object-fit: cover;
    pointer-events: none;
}
</style>