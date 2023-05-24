<template>
    <div class="main-wrapper">
        <Hat />

        <div class="main-content">
            <div :class="'ad-info shadow' + (isView ? ' lalign' : '')">
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
                        <div class="imgs-carousel" v-if="mode == 'one'">
                            <photo-carousel :srcs="subImages" style="width: 100%; height: 100%" :allow-add="true" />
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

                <model-list-select
                    v-if="mode == 'one'"
                    :list="sexes"
                    v-model="ad.sex"
                    option-value="id"
                    :custom-text="(item) => item.name"
                    placeholder="Пол..."
                    class="list-sel">
                </model-list-select>

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

                <div v-if="mode == 'one'" class="card-price-inp">
                    Стоимость:
                    <input v-model="ad.price" v-mask="'#######'" class="card-inp"/> р.
                </div>

                <div v-for="sub in subcards" :key="sub" style="width: 100%;display:flex;align-items: center;gap: 15px;">
                    <sub-card  style="flex-grow: 1" />
                    <img src="@/assets/staticimages/urn.png" class="icon-trash" />
                </div>
                <beauty-button v-if="mode == 'many'" look="primary" text="Добавить подобъявление" @click="addAd" />
                
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
import SubCard from '@/components/AdCards/Card/SubCard.vue';
import { append } from '@/js/arrays';

export default {
    components: { 
        BeautyButton,
        PictureInput,
        Hat,
        CustomFooter,
        ModelListSelect,
        PhotoCarousel,
        CardSeller,
        SubCard,
    },
    name: "CardCreate",
    props: {
        mode: String,
    },
    directives: {
        mask,
    },
    data() {
        return {
            advertId: parseInt(this.adId),
            isView: this.mode == 'view',
            isEdit: this.mode == 'edit',
            isCreate: this.mode == 'create',
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
            },
            ageStr: '',
            imagePath: '',
            breedName: '',
            categoryName: '',
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
            isImageChanged: false,
            isPhone: false,
            phone: '+7(911)111-11-11',
            subImages: [],
            subcards: [],
        }
    },
    created() {
        if(this.isCreate || this.isEdit) {
            this.$http.get('/api/Categories', { params: { parentId: 0 } })
                .then((resp) => this.categories = resp.data.results)
                .catch((err) => console.log(err));
        }

        if(!this.isCreate) {
            this.initAd();
        }
    },
    methods: {
        initAd() {
            this.$http.get('/api/Cards/' + this.advertId)
                .then((resp) => {
                    this.ad = resp.data.object;
                    console.log(this.ad.account);
                    this.ageStr = 'мес.';
                    if(this.ad.age >= 12) {
                        this.ad.age /= 12;
                        this.ageStr = 'лет';
                    };
                    this.initBreed(this.ad.breed);
                    this.initCategory(this.ad.category);
                    this.setImage(this.ad.image);
                    this.getSubImages();
                })
                .catch((err) => console.log(err));
        },
        initBreed(breedId) {
            this.$http.get('/api/Breeds/' + breedId)
                .then((resp) => { 
                    this.breedName = resp.data.object.name;
                })
                .catch((err) => console.log(err));
        },
        initCategory(catId) {
            this.$http.get('/api/Categories/' + catId)
                .then((resp) => this.categoryName = resp.data.object.name)
                .catch((err) => console.log(err));
        },
        onImageChange(image) {
            if (image) {
                this.image = image;
            }
            this.isImageChanged = true;
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
        setImage(imgId) {
            this.$http.get('/api/Images/' + imgId)
                .then((imgResp) => this.imagePath = imgResp.data.object.route)
                .catch((err) => console.log(err));
        },
        cardCancel() {
            this.$router.back();
        },
        saveAd(newState) {
            if(this.isImageChanged) {                
                this.$http.post('/api/Images', {
                    image: this.$refs.pictureInput.file
                }, { headers: { 'Content-Type': 'multipart/form-data' }})
                    .then((resp) => {
                        this.ad.image = resp.data.object.id;
                        this.addOrUpdateAd(this.ad, newState);
                    })
                    .catch((err) => console.log(err));
            } else {
                this.addOrUpdateAd(this.ad, newState);
            }
        },
        addOrUpdateAd(ad, newState) {
            let func = this.isCreate ? this.$http.post : this.$http.put;
            if(this.$refs.ageSelect.selectedIndex == 1) ad.age *= 12;
            ad.state = newState;
            ad.category = this.curSubCategory == 0 ? this.currentCategory : this.curSubCategory;
            func('/api/Cards', ad)
                .then(this.$router.back())
                .catch((err) => console.log(err));
        },
        setAdState(state) {
            this.$http.put('/api/Cards/' + this.ad.id, {
                state: state
            })
            .then((resp) => this.ad.state = resp.data.object.state)
            .catch((err) => console.log(err));
        },
        adPay() {
            this.$router.push({name: 'payment', params: {adId: this.ad.id} });
        },
        addToFavorites() {
            this.$http.post('/api/Favorites', {
                account: this.$store.state.aid,
                ad: this.ad.id
            })
            .then(() => this.ad.isLiked = true)
            .catch((err) => console.log(err));
        },
        removeFromFavorites() {
            this.$http.delete('/api/Favorites?account=' + this.$store.state.aid + '&ad=' + this.ad.id)
            .then(() => this.ad.isLiked = false)
            .catch((err) => console.log(err));
        },
        showPhone() {
            this.$http.get('/api/Account/' + this.ad.account)
            .then((resp) => {
                this.phone = resp.data.phone;
                this.isPhone = true;
                this.$http.put('/api/Cards/' + this.ad.id, {
                    views: this.ad.views + 1
                })
                .then((resp) => this.views = resp.data.object.views)
                .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
        },
        getSubImages() {
            this.$http.get('/api/Images', {params: {ad: this.ad.id, isMain: false}})
            .then((resp) => this.subImages = resp.data.results.map((x) => 'https://myshmarket.site' + x.route))
            .catch((err) => console.log(err));
        },
        addAd() {
            this.subcards = append(this.subcards, this.subcards.length);
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
    /* border: 1px solid black;
    width: 70%; */
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

.lalign {
    align-items:initial;
}

.btns-right {
    padding: 10px;
    padding-top: 100px;
    /* width: 20%; */
    flex-grow: 1;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    gap: 20px;
    align-items: center;
}

.imgs-wrapper {
    /* aspect-ratio: 1/1; */
    padding: 0px 5% 0px 5%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 15px;
    max-width: 650px;
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
    /* aspect-ratio: 1/0.25; */
    height: 200px;
    width: 100%;
    max-width: 650px;
}

.carousel {
    width: 100%;
    height: 100%;
}

.ad-img-input {
    width: 80%;
    aspect-ratio: 1/1;
    max-width: 650px;
    max-height: 650px;
}

.card-title {
    font-weight: bold;
    font-size: 30px;
    padding-left: 1%;
    word-wrap: break-word;
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

.phone-btn {
    text-decoration: underline;
    font-size: 1.2em;   
    cursor: pointer;
}

.phone {
    font-size: 26px;
    font-weight: bold;
}

.ad-desc-input {
    width: 80%;
    border: none !important;
    border-radius: 5px;
    resize: none;
    max-width: 500px;
}

.card-btns-bot {
    height: 50px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 15%;
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

.ad-desc {
    word-wrap: break-word;
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

    .card-title {
        font-size: 20px;
    }
}

</style>