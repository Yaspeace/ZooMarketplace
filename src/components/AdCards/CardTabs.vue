<template>
    <div>
        <div class="acc-ads-header">
            {{ header }}
        </div>
        <div class="tabs" v-if="tabs.length > 1">
            <div v-for="(tab, i) in tabs" :key="tab.name"
                class="tab"
                :class="{'tab-current': currentTab == i}"
                @click="changeTab(i)"
            >{{ tab.name }}</div>
        </div>

        <div v-if="tabs[currentTab].ads.length > 0" class="acc-cards">
            <AdCardCarousel 
                :ads="tabs[currentTab].ads"
                :toShow="toShow"
            />
            <div class="go-to-all-btn" @click="$router.push(tabs[currentTab].route)">Показать все</div>
        </div>

        <div v-else class="acc-no-ads">{{ tabs[currentTab].emptyStr }}</div>
    </div>
</template>

<script>
import AdCardCarousel from '../AdCards/AdCardCarousel.vue';

export default {
    name: 'AccountAds',
    components: {
        AdCardCarousel,
    },
    props: [
        'header',
        'tabs' // array of objects with "name", "emptyStr", "route" and "ads"
    ],
    data() {
        return {
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
            this.$emit('changeTab', num);
        },
        getShowingCardsNum() {
            if(window.innerWidth >= 1440) return 3;
            if(window.innerWidth >= 1000) return 2;
            return 1;
        },
        resize() {
            this.toShow = this.getShowingCardsNum();
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

.acc-no-ads {
    background-color: var(--color-info-dark);
    border-bottom-left-radius: 14px;
    border-bottom-right-radius: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
}

.acc-cards {
    background-color: var(--color-info-dark);
    border-bottom-left-radius: 14px;
    border-bottom-right-radius: 14px;
    padding: 15px 0px 0px 0px;
}

.go-to-all-btn {
    text-align: center;
    padding: 10px;
    cursor: pointer;
    border: 1px solid grey;
    border-bottom-right-radius: 14px;
    border-bottom-left-radius: 14px;
    background: var(--color-info-light);
    transition: .3s;
}

.go-to-all-btn:hover {
    background: var(--color-info);
}
</style>