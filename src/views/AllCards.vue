<template>
    <div>
        <hat @search="search" :mode="0" />

        <div class="content">
            <h1>{{ header }}</h1>

            <ad-card-grid v-if="isCards" :ads="cards" :adsPerPage="cardsPerPage" :totalAds="totalCards" />
            <poster-grid v-if="isPosters" :ads="cards" :adsPerPage="cardsPerPage" :totalAds="totalCards" />
        </div>

        <custom-footer />
        <div class="footer-img-wrapper">
            <img class="footer-img" src="@/assets/staticimages/footerimg.jpg"/>
        </div>
    </div>
</template>

<script>
import Hat from '@/components/Hat.vue';
import CustomFooter from '@/components/CustomFooter.vue';
import AdCardGrid from '@/components/AdCards/AdCardGrid.vue';
import PosterGrid from '@/components/Posters/PosterGrid.vue';

export default {
    name: 'AllCards',
    props: ['mode', 'submode'],
    components: {
        Hat,
        CustomFooter,
        AdCardGrid,
        PosterGrid,
    },
    data() {
        return {
            isCards: this.mode == 'ads',
            isPosters: this.mode == 'posters',
            searchStr: '',
            cards: [],
            totalCards: 0,
            cardsPerPage: this.mode == 'ads' ? 60 : 12,
            curPage: 1
        }
    },
    created() {
        if (this.isCards) {
            this.getCards();
        } else if (this.isPosters) {
            this.getPosters();
        }
    },
    computed: {
        header: function() {
            switch(this.mode) {
                case 'ads':
                    let res = 'Ваши ';
                    switch(this.submode) {
                        case 'active': res += 'активные объявления'; break;
                        case 'archive': res += 'архивные объявления'; break;
                        case 'sold': res += 'закрытые объявления'; break;
                        case 'reserved': res += 'забронированные объявления'; break;
                        default: res += 'объявления'; break;
                    }
                    return res;
                case 'posters':
                    return 'Ваши активные афиши';
                default:
                    return '';
            }
        }
    },
    methods: {
        getCards(page = 1) {
            let req = `/api/Cards?limit=${this.cardsPerPage}&start=${this.cardsPerPage * (page - 1)}&account=${this.$store.state.aid}`;
            switch(this.submode) {
                case 'active': req += '&state=2'; break;
                case 'archive': req += '&state=0,1,3'; break;
                case 'sold': req += '&state=4'; break;
                case 'reserved': break;
            }

            if(this.searchStr && this.searchStr.trim().length > 0) {
                req += '&search=' + this.searchStr;
            }

            this.$http.get(req)
            .then((resp) => {
                this.cards = resp.data.results;
                this.totalCards = resp.data.total;
            })
            .catch((err) => console.log(err));
        },
        getPosters() {
            this.cards = [];
            this.totalCards = 4;
        },
        search(s) {
            this.searchStr = s;
            if(this.isCards) {
                this.getCards();
            } else if (this.isPosters) {
                this.getPosters();
            }
        }
    }
}
</script>

<style scoped>
.content {
    padding: 250px 10px 10px 10px;
    min-height: 100vh;
    background: white;
}

.footer-img-wrapper {
  width: 100%;
  height: 300px;
  position: fixed;
  bottom: 0px;
  left: 0px;
  z-index: -1;
  text-align: center;
  background: black;
}

.footer-img {
    width: 50%;
    max-width: 600px;
    height: 100%;
}
</style>