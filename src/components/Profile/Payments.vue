<template>
    <div class="payments-main" :class="{'hidden': !isShown}" @click="hide">
        <payment v-if="showPayment" style="width: 65%;" @done="$event.stopPropagation(); addCard($event.cardData)" @cancel="$event.stopPropagation(); showPayment = false" />
        <div v-if="showChoose" class="main-content" style="min-width: 20%;">
            <div>Вы уверены?</div>
            <div style="display: flex;justify-content: center;gap:40px;">
                <beauty-button look="primary" text="Да" @click="$event.stopPropagation(); remove(curIndex)" />
                <beauty-button look="secondary" text="Нет" @click="$event.stopPropagation(); showChoose = false" />
            </div>
        </div>
        <div v-if="!showPayment && !showChoose" class="main-content" style="min-width: 30%;" @click="$event.stopPropagation()">
            <div>Мои способы оплаты</div>
            <div class="payment-item shadow" v-for="(card, i) in cards" :key="card">
                <div>Карта {{ card }}</div>
                <div class="icon-remove" @click="$event.stopPropagation(); curIndex = i; showChoose = true;">&#10006;</div>
            </div>
            <beauty-button look="primary" text="Добавить" @click="$event.stopPropagation(); showPayment = true;" style="margin-top: 15px;" />
        </div>
    </div>
</template>

<script>
import { removeByIndex } from '@/js/arrays';
import BeautyButton from '../BeautyButton.vue';
import Payment from '../Payments/Payment.vue';
import { append } from '@/js/arrays';

export default {
    name: 'Payments',
    components: {
        BeautyButton,
        Payment,
    },
    props: ['accId'],
    data() {
        return {
            isShown: false,
            showPayment: false,
            showChoose: false,
            curIndex: 0,
            cards: [],
        }
    },
    created() {
        this.$http.get(`/api/PaymentTypes?account=${this.accId}`)
        .then((resp) => this.cards = resp.data.map((x) => this.mapCard(x).number))
        .catch((err) => console.log(err));
    },
    methods: {
        show() {
            this.isShown = true;
        },
        hide() {
            this.isShown = false;
        },
        remove(i) {
            this.cards = removeByIndex(this.cards, i);
            this.showChoose = false;
        },
        addCard(cardData) {
            cardData.account = this.$store.state.aid;
            this.$http.post('/api/PaymentTypes', cardData)
            .then((resp) => {
                this.cards = append(this.cards, num);
            })
            .catch((err) => console.error(err))
            .finally(() => this.showPayment = false);
        },
        mapCard(card) {
            card.number = [...card.number].map((x, i) => /\d/.test(x) && i < card.number.length - 4 ? '*' : x).join('');
            return card;
        }
    }
}
</script>

<style scoped>
.payments-main {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 501;
}

.main-content {
    background: var(--color-info-light);
    border-radius: 14px;
    padding: 15px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.payment-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;
    width: 100%;
    padding: 10px;
    background: var(--color-info);
    border-radius: 14px;
}

.icon-remove {
    font-size: 18pt;
    transition: .3s;
    cursor: pointer;
}

.icon-remove:hover {
    color: red;
}

.hidden {
    display: none;
}
</style>