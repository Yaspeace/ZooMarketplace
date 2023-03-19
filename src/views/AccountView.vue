<template>
<div class="main-wrapper">
    <DefaultHat />

    <div v-if="loaded" class="content">
        <div class="content-left">
            <Profile :account="this.account" class="profile" />
            <beauty-button look="secondary" text="Выйти из аккаунта" style="width: 100%;" @click="logout" />
        </div>
        <UserInfo :account="this.account" class="user-info" />
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
        accId: String,
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
        }
    },
    created() {
        this.$http.get('/api/Account/' + this.accId)
            .then((resp) => {
                this.account = resp.data.object;
                this.loaded = true;
            })
            .catch((err) => console.log(err));
    },
    methods: {
        logout() {
            this.$store.dispatch('logout');
            this.$router.push('/');
        }
    }
}
</script>

<style scoped>
.main-wrapper {
    background-color: var(--color-info-light);
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
        padding: 10px;
    }
}
</style>