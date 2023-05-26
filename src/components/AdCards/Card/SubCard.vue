<template>
  <div class="wrapper">
    <div class="row">
        <photo-carousel :srcs="images" style="width: 100%;" :allow-add="true" @imageAdd="addImage" />
    </div>
    <div class="row">
        <div style="flex-grow: 1"><input placeholder="Заголовок" style="width: 100%;" v-model="title" /></div>
        <div><input placeholder="Стоимость" v-mask="'#######'" v-model="price" /></div>
    </div>
    <div class="row">
        <model-list-select
            :list="sexes"
            v-model="sex"
            option-value="id"
            :custom-text="(item) => item.name"
            placeholder="Пол..."
            style="width: 20%">
        </model-list-select>
        <textarea
            placeholder="Описание"
            style="resize: none;flex-grow: 1;"
            v-model="description"
        >
        </textarea>
    </div>
  </div>
</template>

<script>
import PictureInput from 'vue-picture-input';
import {mask} from 'vue-the-mask';
import PhotoCarousel from '@/components/PhotoCarousel.vue';
import {append} from '@/js/arrays.js';
import { ModelListSelect } from 'vue-search-select';

export default {
    name: 'SubCard',
    components: {
        PictureInput,
        PhotoCarousel,
        ModelListSelect,
    },
    directives: {
        mask,
    },
    data() {
        return {
            title: '',
            description: '',
            price: 0,
            images: [],
            sex: 0,
            sexes: [
                {
                    id: 0,
                    name: 'Не определен'
                },
                {
                    id: 1,
                    name: 'Самец'
                },
                {
                    id: 2,
                    name: 'Самка'
                }
            ],
        }
    },
    methods: {
        onImageChange(image) {
            if (image) {
                this.image = image;
            }
        },
        addImage(image) {
            this.images = append(this.images, image);
        },
        getValue() {
            return {
                title: this.title,
                description: this.description,
                price: this.price,
                sex: this.sex,
                images: this.images
            };
        }
    }
}
</script>

<style scoped>
.wrapper {
    border-radius: 14px;
    background: var(--color-info-light);
    display: flex;
    flex-direction: column;
    padding: 25px;
}

.row {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    margin-top: 5px;
    margin-bottom: 5px;
}

.img-input {
    width: 20%;
    aspect-ratio: 1/1;
    margin: 0;
}

input {
    border: none;
    border-radius: 5px;
    font-size: 18px;
    height: 1.5em;
}

input:focus {
    outline: none;
}
</style>