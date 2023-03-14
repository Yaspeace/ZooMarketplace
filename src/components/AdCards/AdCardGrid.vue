<template>
  <div class="card-holder">
    <AdCard v-for="ad in ads" :key="ad.id" :ad="ad" :liked="false" />
  </div>
</template>

<script>
import AdCard from './AdCard.vue';

export default {
    name: "AdCardGrid",
    props: ["ads"],
    components: {
        AdCard,
    }
}
</script>

<style scoped>
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