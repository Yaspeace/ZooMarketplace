<template>
    <div>
        <hat @search="seach" :mode="0" />

        <div class="content">
            <h1>Ваши избранные объявления</h1>
            <ad-card-grid :ads="likedAds" class="card-grid" />
        </div>

    </div>
</template>

<script>
import Hat from '@/components/Hat.vue';
import AdCardGrid from '@/components/AdCards/AdCardGrid.vue';

export default {
    name: 'Favorites',
    components: {
        Hat,
        AdCardGrid,
    },
    data() {
        return {
            likedAds: [],
        }
    },
    created() {
        this.$http.get('/api/FavoriteCards?account=' + this.$store.state.aid)
        .then((resp) => this.likedAds = resp.data.results)
        .catch((err) => console.log(err));
    },
    methods: {
        search(searchStr) {
            this.$http.get('/api/FavoriteCards?account=' + this.$store.state.aid + '&search=' + searchStr)
            .then((resp) => this.likedAds = resp.data.results)
            .catch((err) => console.log(err));
        }
    },
    watch: {
        '$store.state.aid': function(aid) {
            this.$http.get('/api/FavoriteCards?account=' + aid)
            .then((resp) => this.likedAds = resp.data.results)
            .catch((err) => console.log(err));
        }
    }
}
</script>

<style scoped>
.content {
    padding: 3%;
    padding-top: 250px;
}

.card-grid {
    padding-top: 20px;
}
</style>