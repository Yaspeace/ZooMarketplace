<template>
    <div class="mod-card-wrapper shadow">
        <div class="mod-card-img-wrapper">
            <img :src="$http.defaults.baseURL + imagePath" class="mod-card-img" @click="imgClick" />
        </div>
        
        <div class="mod-card-title" @click="titleClick">
            {{ ad.title }}
        </div>

        <div class="mod-card-low-wrapper">
            <div class="mod-card-price">
                Цена: {{ ad.price }} р.
            </div>

            <div class="mod-btns">
                <beauty-button look="accept" text="Опубликовать" class="moder-btn btn-upper" @click="allowAd" />
                <beauty-button look="reject" text="Вернуть" class="moder-btn btn-upper" @click="denyAd" />
            </div>
            <div class="mod-btns">
                <beauty-button look="warning" text="Блок пользователя" class="moder-btn" @click="blockUser" />
            </div>
        </div>
    </div>
</template>

<script>
import BeautyButton from '../BeautyButton.vue';

export default {
    name: "ModerCard",
    props: ['ad'],
    components: {
        BeautyButton,
    },
    created() {
        this.$http.get('/api/Images/' + this.ad.image)
        .then((resp) => this.imagePath = resp.data.object.route)
        .catch((err) => console.log(err));
    },
    data() {
        return {
            imagePath: '',
        }
    },
    methods: {
        titleClick() {
            this.$emit('titleClick');
        },
        imgClick() {
            this.$emit('imgClick');
        },
        allowAd() {
            this.$http.put('/api/Cards/' + this.ad.id, {
                state: 2
            })
            .then((resp) => this.$emit('allow', resp.data.object))
            .catch((err) => console.log(err));
        },
        denyAd() {
            this.$http.put('/api/Cards/' + this.ad.id, {
                state: 0
            })
            .then((resp) => this.$emit('deny', resp.data.object))
            .catch((err) => console.log(err));
        },
        blockUser() {
            this.$http.put('/api/Account/' + this.ad.account, {
                warnReason: 3
            })
            .then(() => this.$emit('afterBlock', this.ad))
            .catch((err) => console.log(err));
        }
    }
}
</script>

<style scoped> 
.mod-card-wrapper {
    background: white;
    border-radius: 14px;
    border: 5px solid gray;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}

.mod-card-img-wrapper {
    height: calc(60% - 2.5em);
    text-align: center;
}

.mod-card-img {
    height: 100%;
    aspect-ratio: 1/1;
    object-fit: cover;
    max-width: 400px;
    border-radius: 14px;
    border: 5px solid gray;
    cursor: pointer;
    box-sizing: border-box;
}

.mod-card-low-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    height: 25%;
}

.mod-btns {
    display: flex;
    flex-direction: row;
    width: 90%;
    justify-content: space-around;
    margin-top: 10px;
    margin-bottom: 10px;
}

.btn-upper {
    width: 45%;
}

.mod-card-title {
    font-weight: bold;
    font-size: 24px;
    cursor: pointer;
    width: 100%;
    height: 2.5em;
    text-align: center;

    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    display: -webkit-inline-box;
    overflow: hidden;
}

.mod-card-title:hover {
    text-decoration: underline;
}

@media screen and (max-width: 1780px) {
    .moder-btn {
        font-size: 18px;
    }
}
</style>