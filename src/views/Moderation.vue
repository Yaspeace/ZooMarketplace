<template>
    <div class="gen-wrapper">
        <div class="moder-start" v-if="!isModStart">
            <beauty-button look="primary" :text="'Начать модерацию' + chosenModeStr" class="btn-big" @click="startMod" :disabled="chosenMode == 0" />
        </div>
        <div v-else class="moder-cards">
            <moder-card v-for="(ad, index) in ads" :key="index" :ad="ad" />
        </div>
        <div :class="'moder-profile shadow' + (isModStart ? ' collapsed' : '')">
            <div class="profile-item profile-avatar" v-if="!isModStart">
                <img src="@/assets/staticimages/image1.jpg" class="profile-avatar-img" />
                <h3>Иванов Иван Иванович</h3>
            </div>
            <div :class="getModeClassName(1)" @click="chooseMode(1)" v-if="!isModStart">
                Объявления
            </div>
            <div :class="getModeClassName(2)" @click="chooseMode(2)" v-if="!isModStart">
                Афиши
            </div>
            <div :class="getModeClassName(3)" @click="chooseMode(3)" v-if="!isModStart">
                Пользователи
            </div>
            <div class="moder-end-wrapper">
                <beauty-button look="secondary" text="Закончить" class="moder-end" v-if="isModStart" @click="endMod" />
            </div>
        </div>
    </div>
</template>

<script>
import BeautyButton from '@/components/BeautyButton.vue';
import ModerCard from '@/components/Moderation/ModerCard.vue';

export default {
    name: 'Moderation',
    components: {
        BeautyButton,
        ModerCard,
    },
    data() {
        return {
            chosenMode: 0,
            chosenModeStr: '',
            isModStart: false,
            ad: {
                id: 0,
                title: 'Тут какой-то ооооооооочень длинный текст заголовка этого дурацкого объявления аааааааааааааааааааааааааааааааааааа',
                description: 'Тестестест',
                price: 25,
                image: 1,
            },
            ads: [],
        }
    },
    created() {
        this.ads = [this.ad, this.ad, this.ad, this.ad, this.ad, this.ad];
    },
    methods: {
        chooseMode(i) {
            this.chosenMode = this.chosenMode == i ? 0 : i;
            switch(this.chosenMode) {
                case 1:
                    this.chosenModeStr = ' (объявления)';
                    break;
                case 2:
                    this.chosenModeStr = ' (афиши)';
                    break;
                case 3:
                    this.chosenModeStr = ' (пользователи)';
                    break;
                default:
                    this.chosenModeStr = '';
                    break;
            }
        },
        getModeClassName(i) {
            return 'profile-item profile-item-li' + (this.chosenMode == i ? ' profile-item-active' : '');
        },
        startMod() {
            this.isModStart = true;
        },
        endMod() {
            this.isModStart = false;
        }
    }
}
</script>

<style scoped>
.gen-wrapper {
    background-color: var(--color-info);
    display: flex;
    flex-direction: row;
    min-height: 100vh;
}

.moder-profile {
    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;
    background-color: var(--color-info-light);
    width: 350px;
    transition: .5s;
}

.collapsed {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;
    position: absolute;
    top: 0px;
    right: 0px;
    width: 225px;
    height: 60px;
}

.moder-start {
    display: flex;
    flex-grow: 1;
    justify-content: center;
    align-items: center;
}

.moder-cards {
    display: grid;
    grid-template-columns: repeat(3, 30%);
    grid-template-rows: repeat(2, 50%);
    justify-content: space-around;
    align-content: space-between;
    row-gap: 10px;
    flex-grow: 1;
    padding: 80px 0px 10px 0px;
}

.profile-item {
    border-bottom: 1px solid gray;
    padding-top: 5%;
    padding-bottom: 5%;
    text-align: center;
}

.profile-item-li {
    cursor: pointer;
    transition: .3s;
}

.profile-item-active {
    background-color: var(--color-info-dark);
}

.profile-item-li:hover {
    background-color: var(--color-info-dark);
}


.profile-avatar {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
}

.profile-avatar-img {
    border-radius: 100%;
    width: 100px;
    height: 100px;
    object-fit: cover;
}

.moder-end-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    padding-top: 20px;
    padding-bottom: 20px;
}

.moder-end {
    font-size: 14px;
}

.btn-big {
    padding: 20px;
}

@media screen  and (max-width: 1650px) {
    .moder-cards {
        grid-template-columns: repeat(2, 45%);
        grid-template-rows: repeat(3, 75vh);
    }
}
</style>