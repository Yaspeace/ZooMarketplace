<template>
<div class="ad-card-wrapper shadow">
    <div class="ad-img-wrapper">
        <img class="ad-img" :src="this.$http.defaults.baseURL + 'assets/images/image' + ad.imgId + '.jpg'"/>
        <div class="ad-date">
            {{ ad.date }}
        </div>
        <svg v-on:click="heartClick" :class="'ad-heart' + (isLiked ? ' pressed' : '')" id="e8BIuW2R4E61" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 300 300" shape-rendering="geometricPrecision" text-rendering="geometricPrecision">
            <ellipse rx="31.7696" ry="27.3061" transform="matrix(1.888041 0 0 1.969489 105 112.796487)" stroke-width="0" fill="currentColor"/>
            <ellipse rx="31.7696" ry="27.3061" transform="matrix(1.888041 0 0 1.969489 195 112.796487)" stroke-width="0" fill="currentColor"/>
            <path d="M66.941277,138.750701C66.574271,196.433789,150,240.366176,150,240.366176s83.043854-43.932383,83.043854-101.615471" transform="matrix(1.258692 0 0 1.312997-38.80366-69.382772)" stroke-width="0.6" fill="currentColor"/>
        </svg>
    </div>
    
    <div class="ad-main-txt">
        {{ad.title}}
    </div>
    <div class="ad-price-txt">
        Цена: <b>{{ad.price}}</b> р.
    </div>
    <div class="ad-address-txt">
        Адрес: <b>{{ad.address}}</b>
    </div>
    <div class="ad-desc">
        {{ad.description}}
    </div>
</div>
</template>

<script>
import Card from "./Card.js";

export default {
    name: "AdCard",
    props: {
        ad: Card,
        liked: Boolean
    },
    data() {
        return {
            isLiked: this.liked
        }
    },
    methods: {
        heartClick() {
            this.isLiked = !this.isLiked;
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

.ad-main-txt {
    text-overflow: ellipsis;
    width: 100%;
    overflow: hidden;
    font-weight: bold;
    font-size: 22px;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    display: -webkit-inline-box;
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