<template>
    <div class="main-wrapper">
        <Hat />

        <div class="main-content">
            <div class="ad-info">
                <img v-if="this.isView" class="ad-img" :src="this.$http.defaults.baseURL + 'assets/images/image' + ad.imgId + '.jpg'"/>
                <picture-input v-if="this.isCreate"
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

                <input v-if="!this.isView" placeholder="Заголовок..." class="ad-title-input" />
                <div v-else class="ad-title">
                    {{ this.ad.title }}
                </div>

                <div class="ad-desc" v-if="this.isView">
                    {{ this.ad.description }}
                </div>
                <textarea v-if="this.isEdit" rows="3" class="ad-desc-input" placeholder="Описание..." v-model="this.ad.description"></textarea>
                <textarea v-if="this.isCreate" rows="3" class="ad-desc-input" placeholder="Описание..."></textarea>

                <model-list-select v-if="!this.isView"
                    :list="this.categories"
                    v-model="currentCategory"
                    option-value="id"
                    :custom-text="(cat) => cat.name"
                    placeholder="Категория...">
                </model-list-select>

                <model-list-select v-if="!this.isView"
                    :list="this.subcats"
                    v-model="curSubCategory"
                    option-value="id"
                    :custom-text="(cat) => cat.name"
                    placeholder="Подкатегория..."
                    :isDisabled="this.subcats.length == 0">
                </model-list-select>

                <model-list-select v-if="!this.isView"
                    :list="this.breeds"
                    v-model="this.ad.breed"
                    option-value="id"
                    :custom-text="(item) => item.name"
                    placeholder="Порода..."
                    :isDisabled="this.breeds.length == 0">
                </model-list-select>

                <model-list-select v-if="!this.isView"
                    :list="this.sexes"
                    v-model="this.ad.sex"
                    option-value="id"
                    :custom-text="(item) => item.name"
                    placeholder="Пол...">
                </model-list-select>

                <div class="card-btns-bot" v-if="!isView">
                    <BeautyButton look="primary" text="Сохранить" @click="saveAd" />
                    <BeautyButton look="secondary" text="Отмена" @click="cardCancel"/>
                </div>
                
            </div>
            <div class="btns-right">
                <BeautyButton look="primary" text="Оставить отзыв" />
                <BeautyButton look="secondary" text="Добавить в избранное" />
                <beauty-button look="primary" text="Профиль продавца" />
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
import Card from '@/components/AdCards/Card.js';
import BeautyButton from '@/components/BeautyButton.vue';
import PictureInput from 'vue-picture-input';
import { ModelListSelect } from 'vue-search-select';
import "vue-search-select/dist/VueSearchSelect.css"

export default {
    components: { 
        BeautyButton,
        PictureInput,
        Hat,
        CustomFooter,
        ModelListSelect,
    },
    name: "Card",
    props: {
        mode: String,
        adId: Number,
    },
    data() {
        return {
            isView: this.mode == 'view',
            isEdit: this.mode == 'edit',
            isCreate: this.mode == 'create',
            ad: Card,
            breedName: String,
            categoryName: String,
            breeds: [],
            categories: [],
            subcats: [],
            currentCategory: 0,
            curSubCategory: 0,
            curBreed: 0,
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
        }
    },
    created() {
        if(!this.isCreate) {
            this.$http.get('/api/Ads/' + this.adId)
            .then((resp) => this.ad = resp.data.object)
            .catch((err) => console.log(err));
        } else {
            this.ad = new Card();
            this.$http.get('/api/Categories', { params: { parentId: 0 } })
                .then((resp) => this.categories = resp.data.results)
                .catch((err) => console.log(err));
        }
    },
    methods: {
        initAd() {
            this.$http.get('/api/Ads/' + this.adId)
                .then((resp) => {
                    this.ad = resp.data.object;
                    this.initBreed(this.ad.breed);
                })
                .catch((err) => console.log(err));
        },
        initBreed(breedId) {
            this.$http.get('/api/Breeds/' + breedId)
                .then((resp) => { 
                    this.breedName = resp.data.object.name;
                    this.initCategory(resp.data.object.category);
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
        cardCancel() {
            this.$router.back();
        },
        saveAd() {

        },
        addOrUpdateAd(data) {
            let func = isCreate ? this.$http.post : this.$http.put;
            func('/api/Ads', data)
                .then(this.$router.back())
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
.main-wrapper {
    position: relative;
}

.main-content {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    min-height: 100vh;
    margin-top: 200px;
    background: white;
    padding: 8px;
}

.ad-info {
    border: 1px solid black;
    border-radius: 14px;
    padding: 20px;
    box-sizing: border-box;
    width: 40%;

    display: flex;
    flex-direction: column;
    gap: 20px;
    justify-content: flex-start;
    align-items: center;
}

.btns-right {
    padding: 10px;
    width: 40%;
}

.ad-img {
    width: 80%;
    max-width: 600px;
    aspect-ratio: 1/1;
}

.ad-img-input {
    width: 80%;
    aspect-ratio: 1/1;
}

.ad-title {
    font-weight: bold;
}

.ad-title-input {
    width: 80%;
    border: 1px solid gray;
    border-radius: 5px;
    font-size: 18px;
}

.ad-desc-input {
    width: 80%;
    border: 1px solid gray;
    border-radius: 5px;
    resize: none;
}

.card-btns-bot {
    height: 50px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 15%;
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