<template>
    <div class="amounts-wrapper">
        <div class="amounts-row">
            <div v-if="isView">Количество самцов: {{ amountMale }}</div>
            <input v-else class="amount-input" v-mask="'######'" v-model="amountMale" size="6" />
            
            <div v-if="isSelf" class="amount-arrows">
                <beauty-button look="primary" class="arrow-btn" @click="amountMale = changeAmount(amountMale, 1)">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 300 300" shape-rendering="geometricPrecision" text-rendering="geometricPrecision">
                        <line x1="50" y1="-25" x2="-75" y2="50" transform="translate(105 137.5)" fill="none" stroke="currentColor" stroke-width="20"/>
                        <line x1="-50" y1="-25" x2="75" y2="50" transform="translate(195 137.5)" fill="none" stroke="currentColor" stroke-width="20"/>
                    </svg>
                </beauty-button>
                <beauty-button look="primary" class="arrow-btn" @click="amountMale = changeAmount(amountMale, -1)">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 300 300" shape-rendering="geometricPrecision" text-rendering="geometricPrecision">
                        <line x1="50" y1="-25" x2="-75" y2="50" transform="translate(220 137.5)" fill="none" stroke="currentColor" stroke-width="20"/>
                        <line x1="-50" y1="-25" x2="75" y2="50" transform="translate(80 137.5)" fill="none" stroke="currentColor" stroke-width="20"/>
                    </svg>
                </beauty-button>
            </div>
            <beauty-button v-if="isSelf" look="primary" text="Подтвердить" @click="saveAmounts" />
        </div>
        <div class="amounts-row" style="margin-top: 25px;">
            <div v-if="isView">Количество самок: {{ amountFemale }}</div>
            <input v-else class="amount-input" v-mask="'######'" v-model="amountFemale" size="6" />
            
            <div v-if="isSelf" class="amount-arrows">
                <beauty-button look="primary" class="arrow-btn" @click="amountFemale = changeAmount(amountFemale, 1)">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 300 300" shape-rendering="geometricPrecision" text-rendering="geometricPrecision">
                        <line x1="50" y1="-25" x2="-75" y2="50" transform="translate(105 137.5)" fill="none" stroke="currentColor" stroke-width="20"/>
                        <line x1="-50" y1="-25" x2="75" y2="50" transform="translate(195 137.5)" fill="none" stroke="currentColor" stroke-width="20"/>
                    </svg>
                </beauty-button>
                <beauty-button look="primary" class="arrow-btn" @click="amountFemale = changeAmount(amountFemale, -1)">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 300 300" shape-rendering="geometricPrecision" text-rendering="geometricPrecision">
                        <line x1="50" y1="-25" x2="-75" y2="50" transform="translate(220 137.5)" fill="none" stroke="currentColor" stroke-width="20"/>
                        <line x1="-50" y1="-25" x2="75" y2="50" transform="translate(80 137.5)" fill="none" stroke="currentColor" stroke-width="20"/>
                    </svg>
                </beauty-button>
            </div>
            <beauty-button v-if="isSelf" look="primary" text="Подтвердить" @click="saveAmounts" />
        </div>
    </div>
</template>

<script>
import BeautyButton from '@/components/BeautyButton.vue';
import {mask} from 'vue-the-mask';

export default {
    name: 'CardAmounts',
    props: {
        cardId: Number,
        initAmountMale: Number,
        initAmountFemale: Number,
        isView: Boolean,
        isSelf: Boolean,
    },
    components: {
        BeautyButton,
    },
    directives: {
        mask,
    },
    data() {
        return {
            amountMale: this.initAmountMale,
            amountFemale: this.initAmountFemale
        }
    },
    methods: {
        changeAmount(amount, num) {
            amount += num;
            if(amount < 0) amount = 0;
            if(amount > 999999) amount = 999999;
            return amount;
        },
        saveAmounts() {
            this.$http.put('/api/Cards/' + this.cardId, {
                amountMale: this.amountMale,
                amountFemale: this.amountFemale
            })
            .then((resp) => {
                this.amountMale = resp.data.object.amountMale;
                this.amountFemale = resp.data.object.amountFemale;
            })
            .catch((err) => console.log(err));
        }
    }
}
</script>

<style scoped>
.amounts-wrapper {
    padding: 15px;
    box-sizing: border-box;
}

.amounts-row {
    display: flex;
    align-items: center;
    width: 100%;
    height: 2em;
    gap: 25px;
}

.amount-input {
    border: none !important;
    border-radius: 5px;
    height: 2em;
    max-width: 6em;
}

.amount-arrows {
    display: flex;
    flex-direction:column;
    justify-content: space-around;
    width:7%;
    height: 100%;
}

.arrow-btn {
    height: 35%;
    width: 100%;
    padding:0px 5px;
    font-size:initial
}

.arrow-btn > svg {
    height: 100%;
    aspect-ratio: 1/1;
}
</style>