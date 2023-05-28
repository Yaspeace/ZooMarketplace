<template>
  <div class="wrapper shadow" v-if="account != null">
    <div>{{ header }}:</div>
    <div class="info-wrapper" style="margin-top: 20px;">
        <div class="main-info">
            <img class="info-image" :src="'https://myshmarket.site' + account.avatar.route" />
            <div style="padding-left: 5%;">
                <div v-if="account.type == 1">{{ account.name }} {{ account.family }}</div>
                <div v-else>{{ account.organizationName }}</div>
                <div>Рейтинг: {{ account.rate }}</div>
            </div>
        </div>
        <div class="secondary-info">
            <div>{{ account.accountType.name }}</div>
        </div>
    </div>
    <beauty-button look="primary" text="Перейти в профиль" style="width: 100%;margin-top: 20px;" @click="$router.push('/account/' + account.id)" />
  </div>
</template>

<script>
import BeautyButton from '../BeautyButton.vue';

export default {
    name: 'CardSeller',
    components: {
        BeautyButton,
    },
    props: {
        accId: Number,
        header: {
            type: String,
            default: 'Продавец'
        }
    },
    data() {
        return {
            account: null
        }
    },
    created() {
        this.$http.get('/api/Account/' + this.accId)
        .then((resp) => this.account = resp.data)
        .catch((err) => console.log(err));
    }
}
</script>

<style scoped>
.wrapper {
    background: var(--color-info);
    border-radius: 14px;
    padding: 12px;
    box-sizing: border-box;
}

.info-wrapper {
    display: flex;
    justify-content: space-between;
}

.main-info {
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

.info-image {
    border-radius: 100%;
    width: 15%;
    aspect-ratio: 1/1;
    object-fit: cover;
}
</style>