<template>
  <div id="app">
      <router-view />
  </div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch('checkLogin');

    this.$http.interceptors.response.use(
      (response) => {
        return response;
      }, 
      (error) => {
        if(error && error.response && error.response.status == 401) {
          console.log(error);
          this.$router.push({ name: 'login', params: { register: 'false' } });
        }
        return Promise.reject(error);
      }
    );
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
  /*color: #2c3e50;*/
}

.underline {
    text-decoration: underline;
}

.text-main {
    color: white;
    font-size: 18px;
    font-weight: bold;
}
</style>
