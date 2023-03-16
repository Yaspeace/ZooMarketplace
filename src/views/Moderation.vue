<template>
  <div class="gen-wrapper">
    <div class="moder-start" v-if="!isModStart">
        <beauty-button look="primary" :text="'Начать модерацию' + chosenModeStr" class="btn-big" @click="startMod" :disabled="chosenMode == 0" />
    </div>
    <div v-else class="moder-cards">
        <div>ABOA</div>
        <div>ABOA</div>
        <div>ABOA</div>
        <div>ABOA</div>
        <div>ABOA</div>
        <div>ABOA</div>
    </div>
    <div class="moder-profile light-shadow">
        <div class="profile-item profile-avatar">
            <img src="@/assets/staticimages/image1.jpg" class="profile-avatar-img" />
            <h3>Иванов Иван Иванович</h3>
        </div>
        <div class="profile-item profile-item-li" @click="chooseMode(1)">
            Объявления
        </div>
        <div class="profile-item profile-item-li" @click="chooseMode(2)">
            Афиши
        </div>
        <div class="profile-item profile-item-li" @click="chooseMode(3)">
            Пользователи
        </div>
        <div class="moder-end-wrapper">
            <beauty-button look="secondary" text="Закончить" class="moder-end"  v-if="isModStart" @click="endMod" />
        </div>
    </div>
  </div>
</template>

<script>
import BeautyButton from '@/components/BeautyButton.vue';

export default {
    name: 'Moderation',
    components: {
        BeautyButton,
    },
    data() {
        return {
            chosenMode: 0,
            chosenModeStr: '',
            isModStart: false,
        }
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
    height: 100vh;
}

.moder-profile {
    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;
    background-color: var(--color-info-light);
    width: 350px;
}

.moder-start {
    display: flex;
    flex-grow: 1;
    height: 100%;
    justify-content: center;
    align-items: center;
}

.moder-cards {
    display: grid;
    grid-template-columns: repeat(3, 20%);
    justify-content: space-around;
    align-content: space-around;
    row-gap: 20px;
    flex-grow: 1;
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
    width: 80%;
}

.btn-big {
    padding: 20px;
}
</style>