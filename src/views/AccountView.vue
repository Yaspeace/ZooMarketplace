<template>
<div>
    <DefaultHat />

    <div v-if="loaded" class="content">
        <Profile :account="this.account" class="profile" />
        <UserInfo :account="this.account" class="user-info" />
    </div>
</div>
</template>

<script>
import DefaultHat from '@/components/DefaultHat.vue';
import Profile from '@/components/Profile/Profile.vue';
import UserInfo from '@/components/Profile/UserInfo.vue';

export default {
    name: "AccountView",
    props: {
        accId: Number,
    },
    components: {
        DefaultHat,
        Profile,
        UserInfo,
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
    }
}
</script>

<style scoped>
.content {
    margin-top: 200px;
    padding: 50px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 20px;
}

.user-info {
    flex-grow: 1;
}
</style>