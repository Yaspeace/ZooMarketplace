<template>
  <div class="test-wrapper">
    <div style="background-color: blue;">
      Test1
    </div>
    <div style="width: 75%;">
      <VueSlickCarousel style="background-color: red;">
        <div v-for="i in 10" :key="i" style="width: 30px;">SomeText{{ i }}</div>
      </VueSlickCarousel>
    </div>
  </div>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'

export default {
  name: "TestView",
  components: {
    VueSlickCarousel,
  },
}
</script>

<style scoped>
.test-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
}
</style>
