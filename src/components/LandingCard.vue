<template>
    <div class="ad-card-wrapper shadow">
        <div class="ad-img-wrapper">
            <img class="ad-img" :src="imagePath"/>
        </div>
        
        <div class="ad-main-txt">
            {{subType.name}}
        </div>
        <div class="ad-price-txt">
            Стоимость: <b>{{subType.price}}</b> р. / {{ subType.months == 999 ? 'бессрочно' : (subType.months + ' мес.') }}
        </div>
        <div class="row-more">
            <div class="ad-more" @click="moreClick">
                Подробнее...
            </div>
        </div>
        
    </div>
    </template>
    
    <script>
    export default {
        name: "LandingCard",
        props: ['subType'],
        data() {
            return {
                imagePath: ''
            }
        },
        created() {
            this.$http.get('/api/Images/' + this.subType.image)
                .then((resp) => this.imagePath = 'https://' + resp.data.object.host + resp.data.object.route)
                .catch((err) => console.log(err));
        },
        methods: {
            moreClick() {
                this.$emit('moreClick', this.subType);
            }
        }
    }
    </script>
    
    <style scoped>
    .ad-card-wrapper {
        max-width: 400px;
        border: 5px solid rgb(219, 71, 96);
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

    .ad-more {
        background: rgb(255, 82, 111);
        cursor: pointer;
        width: fit-content;
        padding: 10px;
        border-radius: 5px;
        color: white;
        font-weight: bold;
    }

    .row-more {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
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