<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <BeautyButton text="Test" type="1" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import BeautyButton from "@/components/BeautyButton.vue";

export default {
  name: "HomeView",
  components: {
    HelloWorld,
    BeautyButton,
  },
};
</script>
