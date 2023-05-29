<template>
<div class="main-wrapper">
    <DefaultHat />

    <div v-if="loaded" class="content">
        <div class="content-left">
            <Profile :account="this.account" class="profile" :isSelf="isSelf" />
            <beauty-button v-if="isSelf" look="secondary" text="Выйти из аккаунта" style="width: 100%;" @click="logout" />
        </div>
        <UserInfo :account="this.account" class="user-info" :isSelf="isSelf" />
    </div>
</div>
</template>

<script>
import DefaultHat from '@/components/DefaultHat.vue';
import Profile from '@/components/Profile/Profile.vue';
import UserInfo from '@/components/Profile/UserInfo.vue';
import BeautyButton from '@/components/BeautyButton.vue';

export default {
    name: "AccountView",
    props: {
        accId: String | null,
    },
    components: {
        DefaultHat,
        Profile,
        UserInfo,
        BeautyButton,
    },
    data() {
        return {
            account: {
                id: 0,
                name: "",
                family: "",
                rate: 0,
                image: this.$store.state.avatar,
            },
            loaded: false,
            isSelf: this.accId == null || this.accId == '',
        }
    },
    created() {
        if(this.accId == null || this.accId == '') {
            this.initSelfAcc();
        } else {
            this.initOtherAcc(this.accId);
        }
    },
    methods: {
        logout() {
            this.$store.dispatch('logout');
            this.$router.push('/');
        },
        initSelfAcc() {
            this.loaded = false;
            this.$http.get('/api/Session/Account')
            .then((resp) => {
                this.account = resp.data.object;
                this.loaded = true;
            })
            .catch((err) => console.log(err));
        },
        initOtherAcc(aid) {
            this.loaded = false;
            this.$http.get('/api/Account/' + aid)
            .then((resp) => {
                this.account = resp.data;
                this.loaded = true;
            })
            .catch((err) => console.log(err));
        }
    },
    watch: {
        '$store.state.aid': function() {
            if(this.accId == null || this.accId <= 0) {
                this.initSelfAcc();
            } else {
                this.initOtherAcc(this.accId);
            }
        }
    }
}
</script>

<style scoped>
.main-wrapper {
    background-color: var(--color-info-light);
    min-height: 100vh;
}

.content {
    padding: 50px;
    padding-top: 250px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    gap: 30px;
}

.user-info {
    width: 75%;
}

.content-left {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
}

@media screen and (max-width: 1065px) {
    .content {
        flex-direction: column;
        align-items: center;
    }

    .content-left {
        flex-direction: column;
    }

    .content-left, .profile {
        width: 100%;
    }

    .user-info {
        width: 100%;
    }
}

@media screen and (max-width: 500px) {
    .content {
        padding: 220px 10px 10px 10px;
    }
}
</style>