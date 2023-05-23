<template>
    <div class="acc-list-root">
        Мои аккаунты
        <div class="list-wrapper">
            <PulseLoader v-if="accounts.length == 0" class="spinner" color="#3f5787" />
            
            <div v-else class="acc-list">
                <div v-for="acc in accounts" :key="acc.id"
                class="acc-list-item"
                :class="{'chosen': acc.id == $store.state.aid}"
                @click="logAccount(acc)"
                >
                    <img :src="'https://myshmarket.site' + acc.avatar.route" class="acc-round acc-img" />
                    <div class="acc-item-text text-cut">
                        {{ acc.name }} {{ acc.family }}
                    </div>
                </div>
                <div class="acc-list-item" @click="$router.push('/busireg')">
                    <svg class="acc-round" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 300 300" shape-rendering="geometricPrecision" text-rendering="geometricPrecision"><ellipse rx="150" ry="150" transform="matrix(.983765 0 0 0.98354 150 150)" fill="none" stroke="#000" stroke-width="5"/><line x1="0" y1="-91.980459" x2="0" y2="108.316756" transform="matrix(1 0 0 0.802039 150 143.843946)" fill="none" stroke="#000" stroke-width="30"/><line x1="-100.148607" y1="-0.19756" x2="100.148607" y2="0.19756" transform="matrix(.798474 0 0-1 149.988721 150.19756)" fill="none" stroke="#000" stroke-width="30"/></svg>
                    <div class="acc-item-text text-cut">
                        Добавить бизнес-аккаунт
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

export default {
    name: "AccountList",
    props: ["userId"],
    components: {
        PulseLoader,
    },
    data() {
        return {
            accounts: []
        }
    },
    created() {
        this.$http.get('/api/Account?userId=' + this.userId)
            .then((resp) => this.accounts = resp.data)
            .catch((err) => console.log(err));
    },
    methods: {
        logAccount(acc) {
            this.$http.post('/api/Session/Account?accountId=' + acc.id)
            .then(() => this.$store.commit('login', {
                avatar: 'https://myshmarket.site' + acc.avatar.route,
                aid: acc.id
            }))
            .catch((err) => console.log(err));
        }
    }
}
</script>

<style scoped>
.acc-list-root {
    background: var(--secondary-grad);
    border-radius: 14px;
}

.list-wrapper {
    position: relative;
}

.spinner {
    top: 1em;
    left: 50%;
    width: 100%;
    height: 30px;
}

.acc-list-item {
    border-bottom: 1px solid gray;
    min-height: 40px;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 10px;
    transition: .3s;
    cursor: pointer;
}

.acc-list-item:last-child {
    border-bottom: none;
    border-bottom-left-radius: 14px;
    border-bottom-right-radius: 14px;
}

.acc-list-item:hover, .acc-list-item.chosen {
    background: var(--color-info-dark);
}

.acc-round {
    width: 2em;
    height: 2em;
}

.acc-img {
    border-radius: 100%;
}

.acc-item-text {
    font-weight: bold;
    padding-left: 10px;
}
</style>