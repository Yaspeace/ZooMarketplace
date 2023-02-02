<template>
  <div id="app">
    <Hat />
    <div id="content">
      <nav>
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
      </nav>
      <router-view />
    </div>
    <CustomFooter />
    <div class="footer-img-wrapper">
        <img class="footer-img" src="@/assets/staticimages/footerimg.jpg"/>
    </div>
  </div>
</template>

<script>
import Hat from './components/Hat.vue';
import CustomFooter from './components/CustomFooter.vue';

export default {
  components: {
    Hat,
    CustomFooter,
  }
}
</script>

<style lang="scss">
@import url(https://fonts.googleapis.com/css?family=Didact+Gothic|Comfortaa:400,700&subset=latin,cyrillic);

body {
  padding: 0px;
  margin: 0px;
}

#app {
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  position: relative;
}

#content {
  min-height: 100vh;
  margin-top: 200px;
  background: white;
  padding: 8px;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
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
