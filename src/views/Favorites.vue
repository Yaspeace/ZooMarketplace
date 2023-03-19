<template>
    <div>
        <hat @search="seach" />

        <div class="content">
            <h1>Ваши избранные объявления</h1>
            <ad-card-grid :ads="ads" class="card-grid" />
        </div>

    </div>
</template>

<script>
import Hat from '@/components/Hat.vue';
import AdCardGrid from '@/components/AdCards/AdCardGrid.vue';
import { FavoritesService } from '@/services/FavoritesService';

export default {
    name: 'Favorites',
    components: {
        Hat,
        AdCardGrid,
    },
    data() {
        return {
            likedAds: [],
            favoritesService: new FavoritesService(this.$http),
        }
    },
    created() {
        this.favoritesService.get(this.$store.state.aid)
        .then((resp) => this.likedAds = resp.data.results)
        .catch((err) => console.log(err));
    },
    methods: {
        search(searchStr) {
            this.favoritesService.search(this.$store.state.aid, searchStr)
            .then((resp) => this.likedAds = resp.data.results)
            .catch((err) => console.log(err));
        }
    }
}
</script>

<style scoped>
.content {
    padding-top: 250px;
}

.card-grid {
    padding-top: 20px;
}
</style>