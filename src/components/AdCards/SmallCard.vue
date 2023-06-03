<template>
  <div class="card-wrapper">
    <ad-card v-if="!isLaf" :ad="ad" class="the-card" />
    <laf-card v-else :ad="ad" class="the-card" />
  </div>
</template>

<script>
import AdCard from '@/components/AdCards/AdCard.vue';
import LafCard from './LafCard.vue';

export default {
    name: 'SmallCard',
    props: ['ad'],
    components: {
        AdCard,
        LafCard
    },
    data() {
        return {
            isLaf: this.ad.type == 4 || this.ad.type == 5
        }
    }
}
</script>

<style scoped>
.the-card {
    width: 100%;
    height: 100%;
}
</style>