<template>
  <div class="main">
    <hat />

    <div class="main-content">
        <div class="poster-wrapper shadow">
            <photo-carousel :srcs="images" style="width: 100%;" />

            <beauty-button v-if="isSubscribed" look="primary" text="Отписаться от события" />
            <beauty-button v-else look="primary" text="Подписаться на событие" />

            <h2>{{ poster.title }}</h2>
            <div>Уровень: {{ types.find((x) => x.id == poster.type).name }}</div>
            <div>Адрес: {{ poster.address }}</div>
            <div>Дата проведения: {{ poster.dateBegin.toLocaleDateString('ru-RU') }} - {{ poster.dateEnd.toLocaleDateString('ru-RU') }}</div>
            <div>Время проведения: {{ `${poster.dateBegin.getHours()}:${poster.dateBegin.getMinutes()}` }}
                - {{ `${poster.dateEnd.getHours()}:${poster.dateEnd.getMinutes()}` }}</div>
            <card-seller :accId="poster.account" header="Организатор" style="width: 100%; max-width: 500px;background: var(--color-info-light)" />
            <div style="width: 100%;text-align: left;">{{ poster.description }}</div>
        </div>
    </div>

    <custom-footer />
    <div class="footer-img-wrapper">
        <img class="footer-img" src="@/assets/staticimages/footerimg.jpg"/>
    </div>
  </div>
</template>

<script>
import PhotoCarousel from '@/components/PhotoCarousel.vue';
import Hat from '@/components/Hat.vue';
import CustomFooter from '@/components/CustomFooter.vue';
import BeautyButton from '@/components/BeautyButton.vue';
import CardSeller from '@/components/AdCards/CardSeller.vue';

export default {
    name: 'PosterView',
    components: {
        Hat,
        CustomFooter,
        PhotoCarousel,
        BeautyButton,
        CardSeller,
    },
    props: {
        id: String | Number
    },
    data() {
        return {
            poster: {
                id: this.id,
                title: 'Выставка собак',
                type: 2,
                address: 'ул. Пупкина-Залупкина, д.1, кв. 5',
                dateBegin: new Date(),
                dateEnd: new Date(),
                account: 5,
                description: 'ывдажл оыв аоывждл аоывл оаывждла оыжвл оажывдлоаывоа дылвоа дылво дылво д аыов адл ыавоадвыло адлыво'
            },
            account: null,
            images: [
                'https://myshmarket.site/assets/images/default_account.png',
                'https://myshmarket.site/assets/images/uploaded/image38.png'
            ],
            isSubscribed: false,
            types: [
                {
                    id: 1,
                    name: 'Городское'
                },
                {
                    id: 2,
                    name: 'Региональное'
                },
                {
                    id: 3,
                    name: 'Всероссийское'
                },
                {
                    id: 4,
                    name: 'Международное'
                }
            ],
        }
    },
    created() {

    },
    methods: {
        getAccount() {
            this.$http.get('/api/Account/' + this.poster.account)
            .then((resp) => this.account = resp.data)
            .catch((err) => console.log(err));
        }
    }
}
</script>

<style scoped>
.main {
    position: relative;
}

.main-content {
    display: flex;
    flex-direction: row;
    justify-content: center;
    min-height: 100vh;
    background-color: var(--color-info-light);
    padding: 8px;
    padding-top: 250px;
    font-size: 20px;
}

.poster-wrapper {
    background-color: var(--color-info);
    height: fit-content;
    width: 95%;

    border-radius: 14px;
    padding: 20px;
    box-sizing: border-box;

    display: flex;
    flex-direction: column;
    gap: 20px;
    justify-content: flex-start;
    align-items: center;
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