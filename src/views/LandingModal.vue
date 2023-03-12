<template>
  <div class="main-wrapper">
    <h2>{{ subType.name }}</h2>
    {{ subType.description }}
  </div>
</template>

<script>
export default {
    name: "LandingModal",
    props: ['subType']
}
</script>

<style>
.main-wrapper {
    border-radius: 14px;
    background: white;
    padding: 20px;
}
</style>