<template>
    <div class="main-wrapper">
        <Hat />

        <div class="main-content">
            <div class="ad-info shadow">
                <div style="text-align: center;">
                    <div class="imgs-wrapper">
                        <img class="ad-img" :src="$http.defaults.baseURL + imagePath"/>
                        <div class="imgs-carousel" v-if="subImages.length > 0">
                            <photo-carousel :srcs="subImages" style="width: 100%; height: 100%" :allow-add="false" />
                        </div>
                    </div>
                </div>

                <div class="title-wrapper">
                    <div class="card-title">{{ ad.title }}</div>

                    <div v-if="!isPhone && ad.account != $store.state.aid" class="phone-btn" @click="showPhone">
                        Показать телефон продавца
                    </div>
                    <div v-if="isPhone && ad.account != $store.state.aid" class="phone">{{ phone }}</div>
                    <div v-if="ad.account == $store.state.aid && $store.state.authorized" class="phone">
                        Просмотров: {{ ad.views }}
                    </div>
                </div>
                

                <div class="card-info-wrapper shadow">
                    <div>
                        <b>Дата публикации:</b> {{ ad.published == '' ? 'Не известна' : new Date(ad.published).toLocaleDateString('ru-RU') }}
                    </div>

                    <div>
                        <b>Категория:</b> <span>{{ (ad.category == 0 ? 'Не указана' : categoryName) }}</span>
                    </div>

                    <div>
                        <b>Порода:</b> <span>{{ (ad.breed == 0 ? 'Не указана' : breedName) }}</span>
                    </div>

                    <div>
                        <b>Возраст:</b> {{ ad.age }} {{ ageStr }}
                    </div>

                    <div>
                        <b>Адрес:</b> {{ ad.address }}
                    </div>

                    <div>
                        <b>Стоимость:</b> {{ ad.price }} р./шт.
                    </div>

                    <div class="ad-desc">
                        <b>Описание:</b> {{ ad.description }}
                    </div>
                </div>

                <div class="amounts-wrapper shadow">
                    <div class="amounts-row">
                        <div>Количество самцов: {{ ad.amountMale }}</div>
                        <div v-if="ad.account == $store.state.aid" class="amount-arrows">
                            <beauty-button look="primary" class="arrow-btn" @click="ad.amountMale = changeAmount(ad.amountMale, 1)">
                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 300 300" shape-rendering="geometricPrecision" text-rendering="geometricPrecision">
                                    <line x1="50" y1="-25" x2="-75" y2="50" transform="translate(105 137.5)" fill="none" stroke="currentColor" stroke-width="20"/>
                                    <line x1="-50" y1="-25" x2="75" y2="50" transform="translate(195 137.5)" fill="none" stroke="currentColor" stroke-width="20"/>
                                </svg>
                            </beauty-button>
                            <beauty-button look="primary" class="arrow-btn" @click="ad.amountMale = changeAmount(ad.amountMale, -1)">
                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 300 300" shape-rendering="geometricPrecision" text-rendering="geometricPrecision">
                                    <line x1="50" y1="-25" x2="-75" y2="50" transform="translate(220 137.5)" fill="none" stroke="currentColor" stroke-width="20"/>
                                    <line x1="-50" y1="-25" x2="75" y2="50" transform="translate(80 137.5)" fill="none" stroke="currentColor" stroke-width="20"/>
                                </svg>
                            </beauty-button>
                        </div>
                        <beauty-button v-if="ad.account == $store.state.aid" look="primary" text="Подтвердить" @click="saveAmounts" />
                    </div>
                    <div class="amounts-row" style="margin-top: 25px;">
                        <div>Количество самок: {{ ad.amountFemale }}</div>
                        <div v-if="ad.account == $store.state.aid" class="amount-arrows">
                            <beauty-button look="primary" class="arrow-btn" @click="ad.amountFemale = changeAmount(ad.amountFemale, 1)">
                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 300 300" shape-rendering="geometricPrecision" text-rendering="geometricPrecision">
                                    <line x1="50" y1="-25" x2="-75" y2="50" transform="translate(105 137.5)" fill="none" stroke="currentColor" stroke-width="20"/>
                                    <line x1="-50" y1="-25" x2="75" y2="50" transform="translate(195 137.5)" fill="none" stroke="currentColor" stroke-width="20"/>
                                </svg>
                            </beauty-button>
                            <beauty-button look="primary" class="arrow-btn" @click="ad.amountFemale = changeAmount(ad.amountFemale, -1)">
                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 300 300" shape-rendering="geometricPrecision" text-rendering="geometricPrecision">
                                    <line x1="50" y1="-25" x2="-75" y2="50" transform="translate(220 137.5)" fill="none" stroke="currentColor" stroke-width="20"/>
                                    <line x1="-50" y1="-25" x2="75" y2="50" transform="translate(80 137.5)" fill="none" stroke="currentColor" stroke-width="20"/>
                                </svg>
                            </beauty-button>
                        </div>
                        <beauty-button v-if="ad.account == $store.state.aid" look="primary" text="Подтвердить" @click="saveAmounts" />
                    </div>
                </div>
            </div>
            <div class="btns-right" v-if="ad.account != $store.state.aid">
                <beauty-button class="right-button" look="primary" text="Оставить отзыв" />
                <beauty-button class="right-button" look="secondary" text="Добавить в избранное" @click="addToFavorites" v-if="!ad.isLiked" />
                <beauty-button class="right-button" look="secondary" text="Убрать из избранного" @click="removeFromFavorites" v-else />
                <card-seller :accId="ad.account" class="card-seller" />
            </div>
            <div class="btns-right" v-else>
                <beauty-button class="right-button" look="primary" text="Редактировать" />
                <beauty-button class="right-button" look="secondary" text="Продвижение" @click="adPay" />
                <beauty-button v-if="ad.state == 0" class="right-button" look="primary" text="Опубликовать" @click="setAdState(1)" />
                <beauty-button v-else class="right-button" look="primary" text="Снять с публикации" @click="setAdState(0)" />
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
import PhotoCarousel from '@/components/PhotoCarousel.vue';
import CardSeller from '@/components/AdCards/CardSeller.vue';

export default {
    components: { 
        BeautyButton,
        Hat,
        CustomFooter,
        PhotoCarousel,
        CardSeller,
    },
    name: "OptCardView",
    props: {
        adId: Number|String,
    },
    data() {
        return {
            advertId: parseInt(this.adId),
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
            },
            ageStr: '',
            imagePath: '',
            breedName: '',
            categoryName: '',
            isPhone: false,
            phone: '+7(911)111-11-11',
            subImages: []
        }
    },
    created() {
        this.initAd();
    },
    methods: {
        initAd() {
            this.$http.get('/api/Cards/' + this.advertId)
                .then((resp) => {
                    this.ad = resp.data.object;
                    this.ageStr = 'мес.';
                    if(this.ad.age >= 12) {
                        this.ad.age = Math.round(this.ad.age / 12);
                        if(this.ad.age % 100 >= 11 && this.ad.age % 100 <= 14) {
                            this.ageStr = 'лет';
                        } else {
                            switch(this.ad.age % 10) {
                                case 1: this.ageStr = 'год'; break;
                                case 2:
                                case 3:
                                case 4:
                                    this.ageStr = 'года'; break;
                                default: this.ageStr = 'лет'; break;
                            }
                        }
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
        setImage(imgId) {
            this.$http.get('/api/Images/' + imgId)
                .then((imgResp) => this.imagePath = imgResp.data.object.route)
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
        changeAmount(amount, num) {
            amount += num;
            if(amount < 0) amount = 0;
            if(amount > 999999) amount = 999999;
            return amount;
        },
        saveAmounts() {
            this.$http.put('/api/Cards/' + this.ad.id, {
                amountMale: this.ad.amountMale,
                amountFemale: this.ad.amountFemale
            })
            .catch((err) => console.log(err));
        }
    },
}
</script>

<style scoped>
.card-info-wrapper {
    border-radius: 14px;
    background: var(--color-info-light);
    padding: 25px;
    display: flex;
    gap: 35px;
    flex-wrap: wrap;
}

.title-wrapper {
    display: flex;
    width: 100%;
    justify-content: space-between;
    padding: 0 5% 0 5%;
    box-sizing: border-box;
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
    height: 200px;
    width: 100%;
    max-width: 650px;
}

.card-title {
    font-weight: bold;
    font-size: 30px;
    word-wrap: break-word;
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

.right-button {
    height: 40px;
    width: 70%;
    font-size: 18px;
}

.card-seller {
    width: 70%;
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

.age-input {
    border-radius: 5px;
    background-color: white;
    width: 100%;
    height: 1.5em;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.amounts-wrapper {
    background: var(--color-info-light);
    border-radius: 14px;
    width: 100%;
    padding: 15px;
    box-sizing: border-box;
}

.amounts-row {
    display: flex;
    align-items: center;
    width: 100%;
    height: 2em;
    gap: 25px;
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
    .card-seller {
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