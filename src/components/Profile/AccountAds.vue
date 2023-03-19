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
    <AdCardCarousel :ads="ads" :toShow="toShow" class="acc-ads-carousel" v-if="ads.length > 0" />
    <div v-else class="acc-no-ads">
        У вас пока нет {{ currentTab == 0 ? 'активных' : currentTab == 1 ? 'архивных' : 'закрытых' }} объявлений! 
    </div>
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
            ads: [],
            activeAds: [],
            archiveAds: [],
            soldAds: [],
            currentTab: 0,
            toShow: this.getShowingCardsNum(),
        }
    },
    created() {
        window.addEventListener('resize', this.resize);
        if(this.$store.state.aid > 0) {
            this.initAds(this.$store.state.aid);
        }
    },
    destroyed () {
        window.removeEventListener('resize', this.resize);
    },
    methods: {
        changeTab(num) {
            if(num == 0) {
                this.ads = this.activeAds;
            }
            if(num == 1) {
                this.ads = this.archiveAds;
            }
            if(num == 2) {
                this.ads = this.soldAds;
            }
            this.currentTab = num;
        },
        getShowingCardsNum() {
            if(window.innerWidth >= 1440) return 3;
            if(window.innerWidth >= 1000) return 2;
            return 1;
        },
        resize() {
            this.toShow = this.getShowingCardsNum();
        },
        initAds(aid) {
            this.activeAds = [];
            this.archiveAds = [];
            this.soldAds = [];
            this.ads = [];

            this.$http.get('/api/Cards?account=' + aid + '&state=' + 2)
                .then((resp) => {
                    this.activeAds = resp.data.results;
                    this.ads = this.activeAds;
                    this.currentTab = 0;
                })
                .catch((err) => console.log(err));

            this.$http.get('/api/Cards?account=' + aid + '&state=' + 0)
                .then((resp) => resp.data.results.forEach(x => this.archiveAds.push(x)))
                .catch((err) => console.log(err));
            this.$http.get('/api/Cards?account=' + aid + '&state=' + 1)
                .then((resp) => resp.data.results.forEach(x => this.archiveAds.push(x)))
                .catch((err) => console.log(err));
            this.$http.get('/api/Cards?account=' + aid + '&state=' + 3)
                .then((resp) => resp.data.results.forEach(x => this.archiveAds.push(x)))
                .catch((err) => console.log(err));
            
            this.$http.get('/api/Cards?account=' + aid + '&state=' + 4)
                .then((resp) => this.soldAds = resp.data.results)
                .catch((err) => console.log(err));
        }
    },
    watch: {
        '$store.state.aid': function(aid) {
            this.initAds(aid);
        },
    }
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

.acc-no-ads {
    background-color: var(--color-info-dark);
    border-bottom-left-radius: 14px;
    border-bottom-right-radius: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
}
</style>