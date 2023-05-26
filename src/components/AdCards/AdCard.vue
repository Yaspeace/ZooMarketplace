<template>
<div class="ad-card-wrapper shadow">
    <div class="ad-img-wrapper">
        <img class="ad-img" :src="this.$http.defaults.baseURL + imagePath"/>
        <div class="ad-date" v-if="this.ad.state != 4">
            {{ ad.date }}
        </div>
        <svg 
        @click="heartClick" :class="'ad-heart' + (ad.isLiked ? ' pressed' : '')" 
        v-if="showHeart" xmlns="http://www.w3.org/2000/svg" 
        xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 300 300" shape-rendering="geometricPrecision" text-rendering="geometricPrecision">
            <ellipse rx="31.7696" ry="27.3061" transform="matrix(1.888041 0 0 1.969489 105 112.796487)" stroke-width="0" fill="currentColor"/>
            <ellipse rx="31.7696" ry="27.3061" transform="matrix(1.888041 0 0 1.969489 195 112.796487)" stroke-width="0" fill="currentColor"/>
            <path d="M66.941277,138.750701C66.574271,196.433789,150,240.366176,150,240.366176s83.043854-43.932383,83.043854-101.615471" transform="matrix(1.258692 0 0 1.312997-38.80366-69.382772)" stroke-width="0.6" fill="currentColor"/>
        </svg>
        <div class="ad-rightbar" v-if="showEdit">
            <router-link :to="{name: 'ad', params: { mode: 'edit', adId: ad.id }}"><img class="ad-helpmepls" src="@/assets/staticimages/edit.png" /></router-link>
            <img class="ad-helpmepls" src="@/assets/staticimages/arrback.png" />
            <img class="ad-helpmepls" src="@/assets/staticimages/urn.png" />
        </div>
        <div class="ad-mainbar" v-if="this.ad.state == 4">
            Продано
        </div>
    </div>
    
    <div class="ad-main-txt" @click="goToCard">
        {{ad.title}}
    </div>
    <div class="ad-price-txt">
        Цена: <b>{{ad.price}}</b> р.
    </div>
    <div class="ad-address-txt">
        Адрес: <b>{{ad.address}}</b>
    </div>
    <!-- <div class="ad-desc">
        {{ad.description}}
    </div> -->
</div>
</template>

<script>
import Card from "./Card.js";

export default {
    name: "AdCard",
    props: {
        ad: Card
    },
    data() {
        return {
            showHeart: this.ad.state == 2 && this.ad.account != this.$store.state.aid,
            showEdit: this.ad.account == this.$store.state.aid && this.ad.state != 4,
            imagePath: '',
        }
    },
    created() {
        this.$http.get('/api/Images/' + this.ad.image)
            .then((resp) => this.imagePath = resp.data.object.route)
            .catch((err) => console.log(err));
    },
    methods: {
        heartClick() {
            if(!this.$store.state.authorized) {
                this.$router.push({name: 'login', params: {register: 'false'}});
            } else {
                if(this.ad.isLiked) {
                    this.$http.delete('/api/Favorites?account=' + this.$store.state.aid + '&ad=' + this.ad.id)
                    .then(() => this.ad.isLiked = false)
                    .catch((err) => console.log(err));
                } else {
                    this.$http.post('/api/Favorites', {
                        account: this.$store.state.aid,
                        ad: this.ad.id
                    })
                    .then(() => this.ad.isLiked = true)
                    .catch((err) => console.log(err));
                }
            }
        },
        goToCard() {
            this.$router.push({name: 'viewAd', params: { adId: this.ad.id } });
        }
    }
}
</script>

<style scoped>
.ad-card-wrapper {
    max-width: 400px;
    border: 5px solid rgb(167, 26, 248);
    border-radius: 14px;
    padding: 20px;
    box-sizing: border-box;
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    align-content: space-around;
    background: white;
    text-align: left;
}

.ad-img {
    width: 100%;
    max-width: 400px;
    aspect-ratio: 1/1;
    border: 3px solid gray;
    border-radius: 10px;
    box-sizing: border-box;
    object-fit: cover;
    background: #ddd;
}

.ad-img-wrapper {
    position: relative;
}

.ad-date {
    position: absolute;
    z-index: 100;
    background-color: rgba(126, 126, 126, 0.4);
    color: white;
    font-size: 14px;
    top: 2px;
    left: 3px;
    padding: 5px;
    font-weight: bold;
}

.ad-date:hover {
    background-color: rgba(126, 126, 126, 0.8);
}

.ad-heart {
    width: 50px;
    height: 50px;
    cursor: pointer;
    color: #aaa;
    position: absolute;
    top: 2px;
    right: 10px;
    z-index: 101;
    fill: #aaa;
    stroke: #aaa;
    transition: .3s;
}

.ad-rightbar {
    position: absolute;
    top: 0px;
    right: 0px;
    border-top-right-radius: 14px;
    background: rgba(126, 126, 126, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 101;
    padding: 5px;
}

.ad-heart:hover {
    color: #666;
}

.pressed {
    animation: liked .5s;
    color: rgb(230, 48, 48);
}

.pressed:hover {
    color: rgb(172, 45, 45);
}

.ad-helpmepls {
    width: 30px;
    height: 30px;
}

.ad-mainbar {
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    text-align: center;
    font-weight: bold;
    color: white;
    background-color: rgba(126, 126, 126, 0.8);
    border-top-left-radius: 14px;
    border-top-right-radius: 14px;
}

.ad-main-txt {
    text-overflow: ellipsis;
    width: 100%;
    overflow: hidden;
    font-weight: bold;
    font-size: 22px;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    display: -webkit-inline-box;
    cursor: pointer;
}

.ad-main-txt:hover {
    text-decoration: underline;
}

.ad-price-txt {
    font-size: 18px;
}

.ad-address-txt {
    max-width: 100%;
    word-wrap: break-word;
}

.ad-desc {
    text-overflow: ellipsis;
    width: 100%;
    overflow: hidden;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    display: -webkit-inline-box;
    word-wrap: break-word;
}

@keyframes liked {
    0% {
        width: 50px;
        height: 50px;
    }
    50% {
        width: 60px;
        height: 60px;
    }
    100% {
        width: 50px;
        height: 50px;
    }
}
</style>