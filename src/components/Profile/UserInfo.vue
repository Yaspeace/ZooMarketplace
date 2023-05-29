<template>
  <div class="main shadow">
    <payments ref="payments" :accId="$store.state.aid" />

    <div class="upper" v-if="isSelf">
        <AccountList class="acc-list" :userId="account.user" />
        <offer v-if="$store.state.type == 1" class="offer" />
        <business-offer v-else :subEnd="account.subEnd" :subId="account.subId" class="offer" />
    </div>
    
    <div class="mid-btns" v-if="isSelf">
        <div class="mid-btn" @click="$refs.payments.show()">
            <img src="@/assets/staticimages/free-icon-statistics-7147801.png" />
            Мои реквизиты
        </div>
        <router-link to="/moderation" class="mid-btn moderation-btn" v-if="isModer" >
            Модерация
        </router-link>
    </div>
    
    
    <AccountAds class="ads" :isSelf="isSelf" :accId="account.id" />

    <card-tabs v-if="isSelf" class="ads" header="Забронированные" :tabs="reservedTab" />
  </div>
</template>

<script>
import AccountList from './AccountList.vue';
import Offer from './Offer.vue';
import BusinessOffer from './BusinessOffer.vue';
import AccountAds from './AccountAds.vue';
import CardTabs from '../AdCards/CardTabs.vue';
import Payments from './Payments.vue';

export default {
    name: 'UserInfo',
    props: ['account', 'isSelf'],
    components: {
        AccountList,
        Offer,
        BusinessOffer,
        AccountAds,
        CardTabs,
        Payments,
    },
    data() {
        return {
            isModer: false,
            reservedTab: [{
                name: 'Бронь',
                emptyStr: 'Нет забронированных',
                ads: []
            }],
            showPayments: false
        }
    },
    created() {
        this.$http.get('/api/Session/Roles?user=' + this.account.user)
        .then((roles) => this.isModer = roles.data.results.some(x => x.name == 'Moderator'))
        .catch((err) => console.log(err));
    }
}
</script>

<style scoped>
.main {
    background-color: #b2b6d2;
    border-radius: 14px;
    text-align: center;
    padding: 30px 7% 30px 7%;
    box-sizing: border-box;
}

.upper {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
}

.acc-list {
    width: 40%;
}

.offer {
    width: 40%;
    align-self: stretch;
}

.mid-btns {
    display: flex;
    flex-direction: row;
    width: 100%;
    gap: 5%;
}

.mid-btn {
    background: var(--color-info-light);
    padding: 10px 0px 10px 0px;
    border: 1px solid var(--color-primary);
    margin-top: 20px;
    font-weight: bold;
    font-size: 24px;
    cursor: pointer;
    transition: .3s;
    flex-grow: 1;
    display: block;
    text-decoration: none;
}

.mid-btn img {
    height: 1.5em;
    vertical-align: middle;
}

.mid-btn:hover {
    background: var(--color-info-dark);
}

.ads {
    margin-top: 20px;
}

@media screen and (max-width: 900px) {
    .moderation-btn {
        display: none;
    }
}

@media screen and (max-width: 740px) {
    .upper {
        flex-direction: column;
        align-items: center;
        gap: 20px;
    }

    .acc-list, .offer {
        width: 100%;
    }
}
</style>