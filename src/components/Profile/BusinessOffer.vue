<template>
    <div class="main-wrapper">
        <div>Ваша подписка:</div>
        <div v-if="subId == 0" class="offer-wrap">
            <div>У вас ещё нет подписки!</div>
            <beauty-button look="primary" text="Приобрести!" />
        </div>
        <div v-if="subId > 0 && sub" class="offer-wrap">
            <div class="sub-name">{{ sub.name }}</div>
            <div class="flex-horizontal">
                <div>Действует до {{ dateEnd }}</div>
                <div>{{ sub.price }}</div>
            </div>
            <beauty-button look="primary" text="Продлить!" />
            <a>Отказаться</a>
            <!--<div class="offer-text">Вы владелец питомника, приюта или фермерского подворья?</div>
            <div class="offer-lower">
                Вам однозначно сюда:
                <router-link to="/landing"> Предложения для бизнеса </router-link>
            </div>-->
        </div>
    </div>
</template>

<script>
import BeautyButton from '../BeautyButton.vue';

export default {
    name: 'BusinessOffer',
    components: {
        BeautyButton,
    },
    props: ['subId', 'subEnd'],
    data() {
        return {
            sub: null,
            dateEnd: new Date(this.subEnd).toLocaleDateString('ru-RU'),
        }
    },
    created() {
        this.$http.get(`/api/Subtypes/${this.subId}`)
        .then((resp) => {
            this.sub = this.mapSub(resp.data.object);
        })
        .catch((err) => console.log(err));
    },
    methods: {
        mapSub(sub) {
            if(sub.price == 0) {
                sub.price = 'бесплатно';
            } else {
                sub.price = (sub.price / sub.months) + ' р/мес.';
            }
            return sub;
        }
    }
}
</script>


<style scoped>
.main-wrapper {
    background: var(--secondary-grad);
    border-radius: 14px;
}

.offer-wrap {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    padding: 15px;
    box-sizing: border-box;
    gap: 20px;
}
.offer-text{
    font-size: 18px;
    font-style: italic;
}

.offer-lower {
    margin-top: 1.5em;
}

.sub-name {
    color: var(--nyashnie-letters);
    font-weight: bold;
    font-size: 1.5em;
}

a {
    text-decoration: underline;
    font-size: 17px;
    color: var(--nyashnie-letters);
    cursor: pointer;
}

a:hover {
    color: gray;
}

a:active {
    color: white;
}

.flex-horizontal {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
    gap: 10px;
    padding: 0px 10px;
    box-sizing: border-box;
}
</style>