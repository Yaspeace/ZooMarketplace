<template>
  <div class="home">
    <div class="tmp">
      <AdCard :ad="ad" :liked="false" />
    </div>
    <BeautyButton text="Test" :type="1" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import BeautyButton from "@/components/BeautyButton.vue";
import AdCard from "@/components/AdCards/AdCard.vue";

export default {
  name: "HomeView",
  data() {
    return {
      ad: {
        id: 1,
        title: "Кот-упорот",
        price: 500,
        description: "Тут должно быть описание, но мы с котом пили (вылерьяночку)",
        address: "г. Талдом, ул. Мышная, д. 11",
        date: new Date().toLocaleDateString('ru-RU')
      }
    }
  },
  components: {
    HelloWorld,
    BeautyButton,
    AdCard,
  },
};
</script>

<style scoped>
.tmp {
  width: 320px;
}
</style>
