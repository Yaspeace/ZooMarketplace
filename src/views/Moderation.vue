<template>
<div>
    <div class="gen-wrapper" v-if="isHadPerms === true">
        <modal-window ref="cardDescModal" />
        <modal-image-view ref="imgModal" />

        <div class="moder-start" v-if="!isModStart">
            <beauty-button look="primary" :text="'Начать модерацию' + chosenModeStr" class="btn-big" @click="startMod" :disabled="chosenMode == 0" />
        </div>
        
        <div v-if="isModStart && chosenMode == 1" class="moder-cards">
            <moder-card v-for="ad in ads" :key="ad.id" 
                :ad="ad"
                @titleClick="adTitleClick(ad)"
                @imgClick="adImgClick(ad)"
                @allow="removeFromArr(ad)"
                @deny="removeFromArr(ad)"
            />
        </div>
        <div v-if="isModStart && chosenMode == 3" class="moder-cards">
            <moder-user-card v-for="acc in accounts" :key="acc.id"
                :card="acc"
                @imgClick="adImgClick"
            />
        </div>


        <div :class="'moder-profile shadow' + (isModStart ? ' collapsed' : '')">
            <router-link class="profile-item profile-avatar" v-if="!isModStart" to="/account">
                <img :src="$store.state.avatar" class="profile-avatar-img" />
                <h3>{{ account.family }} {{ account.name }}</h3>
            </router-link>
            <div :class="getModeClassName(1)" @click="chooseMode(1)" v-if="!isModStart && isAds">
                Объявления
            </div>
            <div :class="getModeClassName(2)" @click="chooseMode(2)" v-if="!isModStart && isPosters">
                Афиши
            </div>
            <div :class="getModeClassName(3)" @click="chooseMode(3)" v-if="!isModStart && isUsers">
                Пользователи
            </div>
            <div class="moder-end-wrapper">
                <beauty-button look="secondary" text="Закончить" class="moder-end" v-if="isModStart" @click="endMod" />
            </div>
        </div>
    </div>
    <div class="gen-err-wrap" v-if="isHadPerms === false">
        <h2>Недостаточно прав!</h2>
    </div>
</div>
</template>

<script>
import BeautyButton from '@/components/BeautyButton.vue';
import ModerCard from '@/components/Moderation/ModerCard.vue';
import ModalWindow from '@/components/Modals/ModalWindow.vue';
import ModalImageView from '@/components/Modals/ModalImageView.vue';
import ModerUserCard from '@/components/Moderation/ModerUserCard.vue';

export default {
    name: 'Moderation',
    components: {
        BeautyButton,
        ModerCard,
        ModalWindow,
        ModalImageView,
        ModerUserCard,
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
            isHadPerms: null,
            account: {
                id: 0,
                name: '',
                family: '',
            },
            isAds: false,
            isPosters: false,
            isUsers: false,
            accounts: [],
        }
    },
    created() {
        this.checkPermissions();        
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
            this.pushToArr(6);
            this.isModStart = true;
        },
        endMod() {
            this.ads = [];
            this.isModStart = false;
        },
        adTitleClick(ad) {
            this.$refs.cardDescModal.show(ad.title, ad.description);
        },
        adImgClick(ad) {
            this.$http.get('/api/Images/' + ad.image)
                .then((resp) => this.$refs.imgModal.show(this.$http.defaults.baseURL + resp.data.object.route))
                .catch((err) => console.log(err));
        },
        pushToArr(limit) {
            let tmpArr = [];
            this.ads.forEach((ad) => tmpArr.push(ad));

            if (this.chosenMode == 1) {
                this.$http.get('/api/Cards?state=1&limit=' + limit)
                .then((resp) => {
                    if(resp.data.results.length > 0) {
                        resp.data.results.forEach(x => tmpArr.push(x));
                        this.ads = tmpArr;
                    }
                })
                .catch((err) => console.log(err));
            } else {
                this.$http.get('/api/Account?warnReason=1,2,3&limit=' + limit)
                .then((resp) => this.accounts = resp.data)
                .catch((err) => console.log(err));
            }
        },
        removeFromArr(ad) {
            this.ads = this.ads.filter(x => x.id != ad.id);
            if(this.ads.length == 0) this.isModStart = false;
        },
        removeAcc(acc) {
            this.accounts = this.accounts.filter((x) => x.id != acc.id);
            if(this.accounts.length == 0) this.isModStart = false;
        },
        checkPermissions() {
            this.$http.get('/api/Authorize')
            .then((resp) => {
                this.$http.get('/api/Session/Roles?user=' + resp.data.object.id)
                .then((rolesResp) => {
                    this.isHadPerms = rolesResp.data.results.some(x => x.name == 'Moderator');
                    if(this.isHadPerms) {
                        this.initAccount();
                    }
                })
                .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
        },
        initAccount() {
            this.$http.get('/api/Account/' + this.$store.state.aid)
            .then((resp) => {
                this.account = resp.data;
                this.$http.get('/api/Session/Roles?user=' + this.account.user)
                .then((roles) => {
                    this.isAds = roles.data.results.some(x => x.name == 'AdsModerator');
                    this.isPosters = roles.data.results.some(x => x.name == 'PosterModerator');
                    this.isUsers = roles.data.results.some(x => x.name == 'UserModerator');
                })
                .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
        },
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
    grid-template-columns: repeat(4, 22%);
    grid-template-rows: repeat(3, 50%);
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
        grid-template-columns: repeat(3, 30%);
        grid-template-rows: repeat(3, 50%);
    }
}

.gen-err-wrap {
    width: 100vw;
    height: 100vh;
    background-color: var(--color-info);
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>