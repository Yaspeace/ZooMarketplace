<template>
  <div class="wrapper shadow">
    <photo-carousel :srcs="images" style="width: 45%;"/>
    <div style="width: 45%">
        <div class="row">
            <div style="font-weight: bold">{{ card.title }}</div>
            <div style="white-space: nowrap;"><b>Стоимость:</b> {{ card.price }} р.</div>
        </div>
        <div class="row">
            <div style="white-space: nowrap;"><b>Пол:</b> {{ sex }}</div>
            <div><b>Описание:</b> {{ card.description }}</div>
        </div>
    </div>
  </div>
</template>

<script>
import PhotoCarousel from '@/components/PhotoCarousel.vue';

export default {
    name: 'SubCardView',
    components: {
        PhotoCarousel
    },
    props: ['card'],
    computed: {
        images: function() {
            return this.card.images.map((x) => 'https://myshmarket.site' + x.route);
        },
        sex: function() {
            return this.card.sex == 0 ? 'Не определен' : this.card.sex == 1 ? 'Самец' : 'Самка';
        }
    }
}
</script>

<style scoped>
.wrapper {
    background: var(--color-info-light);
    border-radius: 14px;
    padding: 20px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
}

.row {
    display: flex;
    justify-content: space-between;
    gap: 20px;
    margin-top: 5px;
    margin-bottom: 5px;
    width: 100%;
}
</style>