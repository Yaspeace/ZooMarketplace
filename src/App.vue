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
  </div>
</template>

<script>
import Hat from './components/Hat.vue';

export default {
  components: {
    Hat
  }
}
</script>

<style lang="scss">
@import url(https://fonts.googleapis.com/css?family=Didact+Gothic|Comfortaa:400,700&subset=latin,cyrillic);

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
</style>
