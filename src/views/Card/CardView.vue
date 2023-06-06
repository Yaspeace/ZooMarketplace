<template>
    <div class="main-wrapper">
        <Hat />

        <div class="main-content">
            <div class="ad-info shadow">
                <h2>{{ type.name }}</h2>
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

                    <div v-if="!ad.subCards || ad.subCards.length == 0">
                        <b>Пол:</b> {{ sexes.find(x => x.id == ad.sex).name }}
                    </div>

                    <div>
                        <b>Возраст:</b> {{ ad.age }} {{ ageStr }}
                    </div>

                    <div v-if="!ad.subCards || ad.subCards.length == 0">
                        <b>Стоимость{{ ad.type == 6 ? ' услуги' : '' }}:</b> {{ ad.price }} р.
                    </div>

                    <div class="ad-desc">
                        <b>Описание:</b> {{ ad.description }}
                    </div>
                </div>

                <sub-card-view v-for="subCard in ad.subCards" :key="subCard.id" :card="subCard" style="width: 100%" />
            </div>
            <div class="btns-right" v-if="ad.account != $store.state.aid">
                <beauty-button class="right-button" look="primary" text="Добавить в избранное" @click="addToFavorites" v-if="!ad.isLiked" />
                <beauty-button class="right-button" look="primary" text="Убрать из избранного" @click="removeFromFavorites" v-else />
                <beauty-button class="right-button" look="secondary" text="Написать сообщение" @click="startChat" />
                <beauty-button v-if="ad.type == 3" class="right-button" look="secondary" text="Забронировать" />
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
import SubCardView from '@/components/AdCards/Card/SubCardView.vue';

export default {
    components: { 
        BeautyButton,
        Hat,
        CustomFooter,
        PhotoCarousel,
        CardSeller,
        SubCardView,
    },
    name: "CardView",
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
                subCards: []
            },
            ageStr: '',
            imagePath: '',
            breedName: '',
            categoryName: '',
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
            isPhone: false,
            phone: '+7(911)111-11-11',
            subImages: [],
            type: {
                id: 0,
                name: 'Не определено',
                enumName: ''
            },
            chatId: 0
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
                    this.getChat();
                    this.initType(this.ad.type);
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
        initType(typeId) {
            this.$http.get('/api/Types/' + typeId)
            .then((resp) => this.type = resp.data.object)
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
            if(this.ad.subCards.length > 0) {
                this.subImages = this.ad.subCards.map((x) => 'https://myshmarket.site' + x.images[0].route);
            } else {
                this.$http.get('/api/Images', {params: {ad: this.ad.id, isMain: false}})
                .then((resp) => this.subImages = resp.data.results.map((x) => 'https://myshmarket.site' + x.route))
                .catch((err) => console.log(err));
            }
        },
        getChat() {
            this.$http.get('/api/Chats?ad=' + this.ad.id)
            .then((resp) => {
                if(resp.data && resp.data.results && resp.data.results.length > 0) {
                    this.chatId = resp.data.results[0].id;
                }
            })
            .catch((err) => console.log(err));
        },
        startChat() {
            if(this.chatId == 0) {
                this.$http.post('/api/Chats', { accounts: [this.$store.state.aid, this.ad.account], ad: this.ad.id })
                .then((resp) => {
                    this.$router.push('/chat/' + resp.data.object.id);
                })
                .catch((err) => console.log(err));
            } else {
                this.$router.push('/chat/' + this.chatId);
            }
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