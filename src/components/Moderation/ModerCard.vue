<template>
    <div class="mod-card-wrapper shadow">
        <img src="@/assets/staticimages/image1.jpg" class="mod-card-img" />
        
        <div class="mod-card-title">
            {{ ad.title }}
        </div>

        <div class="mod-card-price">
            Цена: {{ ad.price }}
        </div>

        <div class="mod-btns">
            <beauty-button look="primary" text="Опубликовать" class="moder-btn" style="width: 40%" />
            <beauty-button look="secondary" text="Вернуть" class="moder-btn" style="width: 40%" />
        </div>
        <div class="mod-btns">
            <beauty-button look="warning" text="Блок пользователя" class="moder-btn" />
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

    },
    data() {
        return {
            imagePath: '',
        }
    },
    methods: {

    }
}
</script>

<style scoped> 
.mod-card-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: white;
    border-radius: 14px;
    border: 5px solid gray;
    box-sizing: border-box;
}

.mod-card-img {
    width: 50%;
    aspect-ratio: 1/1;
    object-fit: cover;
    max-width: 400px;
    border-radius: 14px;
    border: 5px solid gray;
    cursor: pointer;
}

.mod-btns {
    display: flex;
    flex-direction: row;
    width: 90%;
    justify-content: space-around;
    margin-top: 10px;
    margin-bottom: 10px;
}

.mod-card-title {
    font-weight: bold;
    font-size: 24px;
    cursor: pointer;
}

.mod-card-title:hover {
    text-decoration: underline;
}

@media screen and (max-width: 1780px) {
    .moder-btn {
        font-size: 18px;
    }
}

@media screen and (max-width: 1650px) {
    .moder-btn {
        font-size: 16px;
    }
}

@media screen and (max-width: 1480px) {
    .moder-btn {
        font-size: 10px;
    }
}

</style>