<template>
    <div class="cards-wrapper">
        <pages-list :total="pagesNum" :current="curPage" @changePage="curPage = $event;$emit('changePage', $event)" />
        <div class="card-holder">
            <small-card v-for="ad in ads" :key="ad.id" :ad="ad" />
        </div>
        <pages-list :total="pagesNum" :current="curPage" @changePage="curPage = $event;$emit('changePage', $event)" />
    </div>
</template>

<script>
import SmallCard from './SmallCard.vue';
import PagesList from '../PagesList.vue';

export default {
    name: "AdCardGrid",
    props: ["ads", 'totalAds', 'adsPerPage'],
    components: {
        SmallCard,
        PagesList,
    },
    data() {
        return {
            curPage: 1,
            pagesNum: Math.ceil(this.totalAds / this.adsPerPage)
        }
    }
}
</script>

<style scoped>
.cards-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
}

.card-holder {
    display: grid;
    grid-template-columns: repeat(4, 20%);
    justify-content: space-around;
    align-content: space-around;
    row-gap: 20px;
    width: 100%;
}

@media screen and (max-width: 2560px) {
    .card-holder {
        grid-template-columns: repeat(5, 18%);
    }
}

@media screen and (max-width: 1440px) {
    .card-holder {
        grid-template-columns: repeat(4, 20%);
    }
}

@media screen and (max-width: 768px) {
    .card-holder {
        grid-template-columns: repeat(3, 30%);
    }
}

@media screen and (max-width: 600px) {
    .card-holder {
        grid-template-columns: repeat(2, 40%);
    }
}

@media screen and (max-width: 425px) {
    .card-holder {
        grid-template-columns: 80%;
    }
}
</style>