<template>
    <div class="mod-card-wrapper shadow">
        <div class="mod-card-img-wrapper">
            <img :src="$http.defaults.baseURL + card.avatar.route" class="mod-card-img" @click="$emit('imgClick', card)" />
        </div>
        
        <div class="mod-card-title">
            {{ card.family }} {{ card.name }}
        </div>

        <div style="text-align: center">
            {{ card.warnReason == 1 ? 'Проверка ИНН' : card.warnReason == 2 ? 'Жалоба в чате' : 'Жалоба модератора' }}
        </div>

        <div class="mod-card-low-wrapper">
            <div class="mod-btns">
                <beauty-button look="accept" text="Снять жалобы" class="moder-btn" @click="reset" />
                <beauty-button look="warning" text="Заблокировать" class="moder-btn" @click="block" />
            </div>
            <div class="mod-btns">
                <beauty-button look="reject" text="Уведомить" class="moder-btn" @click="block" />
            </div>
        </div>
    </div>
</template>

<script>
import BeautyButton from '../BeautyButton.vue';

export default {
    name: 'ModerUserCard',
    props: ['card'],
    components: {
        BeautyButton,
    },
    methods: {
        reset() {
            console.log('reset');
        },
        block() {
            console.log('block');
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

.moder-btn {
    width: 45%;
    font-size: 14px !important;
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