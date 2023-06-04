<template>
  <div class="grid-wrapper">
    <pages-list :current="curPage" :total="1" />

    <div class="poster-grid">
        <poster-card v-for="poster in posters" :key="poster.id" :poster="poster" />
    </div>

    <pages-list :current="curPage" :total="1" />
  </div>
</template>

<script>
import PagesList from '../PagesList.vue';
import PosterCard from './PosterCard.vue';

export default {
    name: 'PosterGrid',
    components: {
        PagesList,
        PosterCard,
    },
    data() {
        return {
            posters: [
                {
                    id: 1,
                    title: 'Всероссийская выставка-продажа РКФ среди доберманов',
                    dateBegin: '2023-04-01T10:00:00',
                    dateEnd: '2023-05-01T18:00:00',
                    address: 'г. Барнаул, ТРЦ "Орион"',
                    image: {
                        route: '/assets/images/uploaded/image53.png'
                    },
                    account: {
                        type: 3
                    }
                },
                {
                    id: 2,
                    title: 'Всероссийская выставка-продажа РСХФ среди крупного рогатого скота',
                    dateBegin: '2023-04-01T10:00:00',
                    dateEnd: '2023-05-01T19:00:00',
                    address: 'г. Воронеж, подворье "Коровки"',
                    image: {
                        route: '/assets/images/uploaded/image54.png'
                    },
                    account: {
                        type: 4
                    }
                },
                {
                    id: 3,
                    title: 'Выставка-раздача "День счастливой собаки и довольного кота"',
                    dateBegin: '2023-04-01T10:00:00',
                    dateEnd: '2023-05-01T19:00:00',
                    address: 'г. Белгород, парк Победы',
                    image: {
                        route: '/assets/images/uploaded/image55.png'
                    },
                    account: {
                        type: 2
                    }
                },
                {
                    id: 4,
                    title: 'Благотворительный вечер "Покорми и обогрей"',
                    dateBegin: '2023-04-01T10:00:00',
                    dateEnd: '2023-05-01T19:00:00',
                    address: 'г. Белгород, парк Победы',
                    image: {
                        route: '/assets/images/uploaded/image56.png'
                    },
                    account: {
                        type: 2
                    }
                }
            ],
            curPage: 1
        }
    }
}
</script>

<style scoped>
.grid-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
}

.poster-grid {
    display: flex;
    flex-direction: column;
    align-content: center;
    gap: 20px;
    width: 75%;
}
</style>