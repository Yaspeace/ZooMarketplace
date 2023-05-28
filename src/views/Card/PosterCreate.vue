<template>
    <div class="main-wrapper">
        <Hat />

        <div class="main-content">
            <div class="ad-info shadow">
                <div style="text-align: center;width: 100%">
                    <div class="imgs-wrapper" style="width: 100%">
                        <div class="imgs-carousel">
                            <photo-carousel :srcs="subImages" style="width: 100%; height: 100%" :allow-add="true" @imageAdd="addSubImage" />
                        </div>
                    </div>
                </div>

                <input placeholder="Заголовок..." class="ad-title-input" v-model="poster.title" />

                <model-list-select
                    :list="types"
                    v-model="poster.type"
                    option-value="id"
                    :custom-text="(type) => type.name"
                    placeholder="Тип мероприятия..."
                    class="list-sel">
                </model-list-select>

                <div class="card-price-inp">
                    Адрес:
                    <input v-model="poster.address" class="card-inp"/>
                </div>
                
                <div class="card-price-inp">
                    Дата проведения:
                    <date-picker v-model="poster.dates" :range="true"/>
                </div>

                <div class="card-price-inp">
                    Время проведения:
                    <date-picker v-model="poster.times" :range="true" type="time" :time-picker-options="{start: '00:00', step:'00:30' , end: '23:30', format: 'HH:mm' }"/>
                </div>

                <textarea rows="8" class="ad-desc-input" placeholder="Описание..." v-model="poster.description"></textarea>
            </div>
            <div class="btns-right">
                <beauty-button class="right-button" look="primary" text="Сохранить" @click="saveAd(0)" />
                <beauty-button class="right-button" look="secondary" text="Сохранить и опубликовать" @click="saveAd(1)"  />
                <beauty-button class="right-button" look="primary" text="Выйти без сохранения" @click="cardCancel" />
            </div>
        </div>

        <CustomFooter />
        <div class="footer-img-wrapper">
            <img class="footer-img" src="@/assets/staticimages/footerimg.jpg"/>
        </div>
    </div>
</template>

<script>
import Hat from '@/components/Hat.vue';
import CustomFooter from '@/components/CustomFooter.vue';
import BeautyButton from '@/components/BeautyButton.vue';
import PictureInput from 'vue-picture-input';
import { ModelListSelect } from 'vue-search-select';
import "vue-search-select/dist/VueSearchSelect.css"
import {mask} from 'vue-the-mask';
import PhotoCarousel from '@/components/PhotoCarousel.vue';
import { append } from '@/js/arrays';
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';

export default {
    components: { 
        BeautyButton,
        PictureInput,
        Hat,
        CustomFooter,
        ModelListSelect,
        PhotoCarousel,
        DatePicker,
    },
    name: "PosterCreate",
    directives: {
        mask,
    },
    data() {
        return {
            poster: {
                id: 0,
                title: '',
                description: '',
                type: 0,
                address: '',
                dates: [],
                times: [],
            },
            image: '',
            breeds: [],
            categories: [],
            subcats: [],
            currentCategory: 0,
            curSubCategory: 0,
            hasSubcategories: false,
            subImages: [],
            subcards: [],
            types: [
                {
                    id: 1,
                    name: 'Городское'
                },
                {
                    id: 2,
                    name: 'Региональное'
                },
                {
                    id: 3,
                    name: 'Всероссийское'
                },
                {
                    id: 4,
                    name: 'Международное'
                }
            ],
        }
    },
    created() {
    },
    methods: {
        onImageChange(image) {
            if (image) {
                this.image = image;
            }
        },
        setSubcategories(catId) {
            this.$http.get('/api/Categories', { params: { parentId: catId } })
                .then((resp) => {
                    this.subcats = resp.data.results;
                    this.hasSubcategories = resp.data.total != 0;
                    if(!this.hasSubcategories) {
                        this.setBreeds(catId);
                    }
                })
                .catch((err) => console.log(err));
        },
        setBreeds(catId) {
            this.$http.get('/api/Breeds', { params: { categoryId: catId } })
                .then((resp) => this.breeds = resp.data.results)
                .catch((err) => console.log(err));
        },
        cardCancel() {
            this.$router.back();
        },
        saveAd(newState) {
            /*if(this.$refs.ageSelect.selectedIndex == 1) this.ad.age *= 12;
            this.ad.state = newState;
            this.ad.category = this.curSubCategory == 0 ? this.currentCategory : this.curSubCategory;
            this.$http.post('/api/Cards', this.ad)
                .then((resp) => {
                    if(this.$refs.subcardComponents && this.$refs.subcardComponents.length > 0) {
                        this.$refs.subcardComponents.forEach((subCard) => {
                            this.saveSubAd(resp.data.object.id, subCard.getValue());
                        });
                    }
                    this.saveAdImages(resp.data.object.id, [this.image, ...this.subImages])
                    this.$router.back();
                })
                .catch((err) => console.log(err));*/
            console.log(this.poster.dateBegin);
        },
        saveAdImages(adId, srcs) {
            srcs.forEach((src, index) => {
                this.$http.put('/api/Images', {image: src})
                .then((resp) => 
                    this.$http.post('/api/Card/Images', {
                        image: resp.data.object.id,
                        advertisment: adId,
                        isMain: index == 0
                    })
                    .catch((err) => console.log(err)))
                .catch((err) => console.log(err));
            })
        },
        addSubImage(image) {
            this.subImages = append(this.subImages, image);
        },
    },
}
</script>

<style scoped>
.main-wrapper {
    position: relative;    
}

.main-content {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    min-height: 100vh;
    background-color: var(--color-info-light);
    padding: 8px;
    padding-top: 250px;

    font-size: 20px;
}

.ad-info {
    background-color: var(--color-info);
    height: fit-content;
    width: 70%;

    border-radius: 14px;
    padding: 20px;
    box-sizing: border-box;

    display: flex;
    flex-direction: column;
    gap: 20px;
    justify-content: flex-start;
    align-items: center;
}

.btns-right {
    padding: 10px;
    padding-top: 100px;
    flex-grow: 1;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    gap: 20px;
    align-items: center;
}

.imgs-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 15px;
}

.imgs-carousel {
    height: 200px;
    width: 100%;
    max-width: 650px;
}

.ad-title-input {
    width: 80%;
    border: none !important;
    border-radius: 5px;
    font-size: 18px;

    max-width: 500px;
    height: 1.5em;
}

.ad-title-input:focus {
    outline: none;
}

.ad-desc-input {
    width: 80%;
    border: none !important;
    border-radius: 5px;
    resize: none;
    max-width: 500px;
}

.right-button {
    height: 40px;
    width: 70%;
    font-size: 18px;
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

.list-sel {
    max-width: 500px;
}

.card-inp {
    border: none !important;
    border-radius: 5px;
}

.card-price-inp {
    display: flex;
    flex-direction: row;
    width: 100%;
    max-width: 500px;
    justify-content: space-between;
    gap: 5px;
    height: 1.5em;
}

.card-price-inp input {
    flex-grow: 1;
    height: 100%;
    padding-left: 10px;
}

@media screen and (max-width: 700px) {
  .footer-img {
    width: 100%;
  }
}

@media screen and (max-width: 1230px) {
    .btns-right {
        padding-left: 5px;
        padding-right: 5px;
    }
    .right-button {
        width: 100%;
    }
    
}

@media screen and (max-width: 768px) {
    .main-content {
        flex-direction: column;
        padding-left: 4%;
        padding-right: 4%;
        gap: 10px;
    }

    .ad-info {
        width: 100%;
    }

    .btns-right {
        padding: 0px;
    }
    
}

@media screen and (max-width: 600px) {
    .main-content {
        font-size: 14px;
    }
}

</style>