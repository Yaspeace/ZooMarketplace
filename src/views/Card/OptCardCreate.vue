<template>
    <div class="main-wrapper">
        <Hat />

        <div class="main-content">
            <div :class="'ad-info shadow'">
                <div style="text-align: center;width: 100%">
                    <div class="imgs-wrapper" style="width: 100%">
                        <picture-input
                            ref="pictureInput"
                            class="ad-img-input"
                            accept="image/jpeg,image/png"
                            :crop="false"
                            :zIndex="1"
                            :removable="true"
                            :alertOnError="false"
                            :custom-strings="{
                                upload: 'Загрузите фото питомца',
                                drag: 'Перетащите фото сюда',
                                change: 'Изменить фото',
                                remove: 'Удалить фото'
                            }"
                            @change="onImageChange"
                        />
                        <div class="imgs-carousel">
                            <photo-carousel :srcs="subImages" style="width: 100%; height: 100%" :allow-add="true" @imageAdd="addSubImage" />
                        </div>
                    </div>
                    
                </div>

                <input placeholder="Заголовок..." class="ad-title-input" v-model="ad.title" />

                <textarea rows="5" class="ad-desc-input" placeholder="Описание..." v-model="ad.description"></textarea>

                <model-list-select
                    :list="categories"
                    v-model="currentCategory"
                    option-value="id"
                    :custom-text="(cat) => cat.name"
                    placeholder="Категория..."
                    class="list-sel">
                </model-list-select>

                <model-list-select
                    :list="subcats"
                    v-model="curSubCategory"
                    option-value="id"
                    :custom-text="(cat) => cat.name"
                    placeholder="Подкатегория..."
                    :isDisabled="subcats.length == 0"
                    class="list-sel">
                </model-list-select>

                <model-list-select
                    :list="breeds"
                    v-model="ad.breed"
                    option-value="id"
                    :custom-text="(item) => item.name"
                    placeholder="Порода..."
                    :isDisabled="breeds.length == 0"
                    class="list-sel">
                </model-list-select>

                <autocomplete
                    :options="addressOptions"
                    v-model="ad.address"
                    option-value="value"
                    :custom-text="(item) => item.value"
                    placeholder="Адрес..."
                    class="list-sel"
                    :delay="5"
                    @searchchange="getAddressOptions"
                />

                <div class="platform shadow" style="width: 100%; max-width: 500px;">
                    <div style="display: flex" class="amount-wrapper">
                        <div>Количество самцов:</div>
                        <input class="amount-input" v-mask="'######'" v-model="ad.amountMale" size="6" />
                        <div class="amount-arrows">
                            <beauty-button look="primary" class="arrow-btn" @click="ad.amountMale += 1">
                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 300 300" shape-rendering="geometricPrecision" text-rendering="geometricPrecision">
                                    <line x1="50" y1="-25" x2="-75" y2="50" transform="translate(105 137.5)" fill="none" stroke="currentColor" stroke-width="20"/>
                                    <line x1="-50" y1="-25" x2="75" y2="50" transform="translate(195 137.5)" fill="none" stroke="currentColor" stroke-width="20"/>
                                </svg>
                            </beauty-button>
                            <beauty-button look="primary" class="arrow-btn" @click="ad.amountMale -= 1">
                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 300 300" shape-rendering="geometricPrecision" text-rendering="geometricPrecision">
                                    <line x1="50" y1="-25" x2="-75" y2="50" transform="translate(220 137.5)" fill="none" stroke="currentColor" stroke-width="20"/>
                                    <line x1="-50" y1="-25" x2="75" y2="50" transform="translate(80 137.5)" fill="none" stroke="currentColor" stroke-width="20"/>
                                </svg>
                            </beauty-button>
                        </div>
                    </div>
                    <div class="amount-wrapper" style="display: flex;margin-top: 10px;">
                        <div>Количество самок:</div>
                        <input class="amount-input" v-mask="'######'" v-model="ad.amountFemale" size="6" />
                        <div class="amount-arrows">
                            <beauty-button look="primary" class="arrow-btn" @click="ad.amountFemale += 1">
                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 300 300" shape-rendering="geometricPrecision" text-rendering="geometricPrecision">
                                    <line x1="50" y1="-25" x2="-75" y2="50" transform="translate(105 137.5)" fill="none" stroke="currentColor" stroke-width="20"/>
                                    <line x1="-50" y1="-25" x2="75" y2="50" transform="translate(195 137.5)" fill="none" stroke="currentColor" stroke-width="20"/>
                                </svg>
                            </beauty-button>
                            <beauty-button look="primary" class="arrow-btn" @click="ad.amountFemale -= 1">
                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 300 300" shape-rendering="geometricPrecision" text-rendering="geometricPrecision">
                                    <line x1="50" y1="-25" x2="-75" y2="50" transform="translate(220 137.5)" fill="none" stroke="currentColor" stroke-width="20"/>
                                    <line x1="-50" y1="-25" x2="75" y2="50" transform="translate(80 137.5)" fill="none" stroke="currentColor" stroke-width="20"/>
                                </svg>
                            </beauty-button>
                        </div>
                    </div>
                </div>

                <div style="width: 100%;max-width: 500px;">
                    Возраст:
                    <div class="age-input">
                        <input v-model="ad.age" v-mask="'###'" />
                        <select ref="ageSelect">
                            <option value="0">Месяцев</option>
                            <option value="1">Лет</option>
                        </select>
                    </div>
                </div>

                <div class="card-price-inp">
                    Стоимость (за шт.):
                    <input v-model="ad.price" v-mask="'#######'" class="card-inp"/> р.
                </div>
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
import CardSeller from '@/components/AdCards/CardSeller.vue';
import { append } from '@/js/arrays';
import CardAmounts from '@/components/AdCards/Card/CardAmounts.vue';
import Autocomplete from '@/components/Autocomplete.vue';
import axios from 'axios';

export default {
    components: { 
        BeautyButton,
        PictureInput,
        Hat,
        CustomFooter,
        ModelListSelect,
        PhotoCarousel,
        CardSeller,
        CardAmounts,
        Autocomplete,
    },
    name: "OptCardCreate",
    directives: {
        mask,
    },
    data() {
        return {
            ad: {
                id: 0,
                title: '',
                description: '',
                price: 0,
                published: '',
                state: 0,
                views: 0,
                sex: 0,
                age: 0,
                isPaid: false,
                account: this.$store.state.aid,
                type: 0,
                breed: 0,
                category: 0,
                image: 0,
                isLiked: false,
                amountMale: 0,
                amountFemale: 0,
                address: '',
            },
            image: '',
            breeds: [],
            categories: [],
            subcats: [],
            currentCategory: 0,
            curSubCategory: 0,
            hasSubcategories: false,
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
            subImages: [],
            subcards: [],
            addressOptions: [],
        }
    },
    created() {
        this.$http.get('/api/Categories', { params: { parentId: 0 } })
            .then((resp) => this.categories = resp.data.results)
            .catch((err) => console.log(err));
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
            if(this.$refs.ageSelect.selectedIndex == 1) this.ad.age *= 12;
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
                .catch((err) => console.log(err));
        },
        saveSubAd(parentId, subAd) {
            this.$http.post('/api/Cards', {
                title: subAd.title,
                description: subAd.description,
                price: subAd.price,
                sex: subAd.sex,
                parent: parentId
            })
            .then((resp) => this.saveAdImages(resp.data.object.id, subAd.images))
            .catch((err) => console.log(err));
        },
        addSubAd() {
            this.subcards = append(this.subcards, this.subcards.length);
        },
        removeSub(index) {
            let tmpArr = [];
            for(let i = 0; i < index; i++) tmpArr.push(this.subcards[i]);
            for(let i = index + 1; i < this.subcards.length; i++) tmpArr.push(this.subcards[i]);
            this.subcards = tmpArr;
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
        getAddressOptions(search) {
            axios.post('https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address',
                {
                    query: search
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": "Token 5145892da167bd20ebfc23dbcfe43f22604a188b"
                    }
                }
            )
            .then((resp) => this.addressOptions = resp.data.suggestions)
            .catch((err) => console.log(err));
        }
    },
    watch: {
        currentCategory: function(newVal, oldVal) {
            this.curSubCategory = 0;
            this.subcats = [];
            this.setSubcategories(newVal);
        },
        curSubCategory: function(newVal, oldVal) {
            this.curBreed = 0;
            this.breeds = [];
            if(this.hasSubcategories && newVal > 0) {
                this.setBreeds(newVal);
            }
        },
    },
}
</script>

<style scoped>
input:focus {
    outline: none;
}

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

.platform {
    background: var(--color-info-light);
    border-radius: 14px;
    padding: 20px;
    box-sizing: border-box;
}

.lalign {
    align-items:initial;
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
    /* padding: 0px 5% 0px 5%; */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 15px;
    /* max-width: 650px; */
}

.ad-img {
    width: 100%;
    max-width: 650px;
    max-height: 650px;
    aspect-ratio: 1/0.7;
    object-fit: cover;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
}

.imgs-carousel {
    height: 200px;
    width: 100%;
    max-width: 650px;
}

.ad-img-input {
    width: 80%;
    /* aspect-ratio: 1/1; */
    max-width: 550px;
    max-height: 550px;
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

.amount-input {
    border: none !important;
    border-radius: 5px;
    height: 2em;
    max-width: 6em;
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

.age-input {
    border-radius: 5px;
    background-color: white;
    width: 100%;
    height: 1.5em;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.age-input input {
    border: none !important;
    height: 100%;
    padding: 0px;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    flex-grow: 1;
    padding-left: 10px;
}

.age-input input:focus {
    outline: none;
}

.age-input select {
    outline: none !important;
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

.icon-trash {
    width: 25px;
    height: 25px;
    cursor: pointer;
}

.amount-wrapper {
    display: flex;
    align-items: center;
    height: 2em;
    gap: 10px;
}

.amount-arrows {
    display: flex;
    flex-direction:column;
    justify-content: space-around;
    width:7%;
    height: 100%;
}

.arrow-btn {
    height: 35%;
    width: 100%;
    padding:0px 5px;
    font-size:initial
}

.arrow-btn > svg {
    height: 100%;
    aspect-ratio: 1/1;
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