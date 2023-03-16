<template>
  <div>
    <div class="acc-ads-header">
        Мои объявления
    </div>
    <div class="tabs">
        <div :class="'tab' + (currentTab == 0 ? ' tab-current' : '')" @click="changeTab(0)">Активные</div>
        <div :class="'tab' + (currentTab == 1 ? ' tab-current' : '')" @click="changeTab(1)">Архив</div>
        <div :class="'tab' + (currentTab == 2 ? ' tab-current' : '')" @click="changeTab(2)">Продано</div>
    </div>
    <AdCardCarousel :ads="[ad, ad, ad, ad, ad, ad]" :toShow="this.toShow" class="acc-ads-carousel" />
  </div>
</template>

<script>
import AdCardCarousel from '../AdCards/AdCardCarousel.vue';

export default {
    name: 'AccountAds',
    components: {
        AdCardCarousel,
    },
    data() {
        return {
            ad: {
                id: 1,
                title: "Кот-упорот",
                price: 500,
                description: "Тут должно быть описание, но мы с котом пили (вылерьяночку)",
                address: "г. Талдом, ул. Мышная, д. 11",
                date: new Date().toLocaleDateString('ru-RU'),
                imgId: 1
            },
            ads: [],
            currentTab: 0,
            toShow: this.getShowingCardsNum(),
        }
    },
    created() {
        window.addEventListener('resize', this.resize);
    },
    destroyed () {
        window.removeEventListener('resize', this.resize);
    },
    methods: {
        changeTab(num) {
            this.currentTab = num;
        },
        getShowingCardsNum() {
            if(window.innerWidth >= 1440) return 3;
            if(window.innerWidth >= 1000) return 2;
            return 1;
        },
        resize() {
            this.toShow = this.getShowingCardsNum();
            console.log(this.toShow);
        },
    },
}
</script>

<style scoped>
.acc-ads-header {
    background: var(--secondary-grad);
    padding: 10px 0px 10px 0px;
}

.tabs {
    display: flex;
    flex-direction: row;
    height: 2.5em;
}

.tab {
    flex-grow: 1;
    border: 1px solid gray;
    background: var(--color-info);
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
}

.tab-current {
    background: var(--color-info-light);
    color: var(--nyashnie-letters);
    font-weight: bold;
}

.acc-ads-carousel {
    background-color: var(--color-info-dark);
    border-bottom-left-radius: 14px;
    border-bottom-right-radius: 14px;
    padding: 15px 0px 15px 0px;
}
</style>