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

  /*----COLORMAP----*/
  --color-primary: rgb(77, 110, 192);
  --color-primary-light: rgb(114, 149, 202);
  --color-primary-dark: #3f5787;
  --color-primary-contrast: rgb(147, 181, 233);

  --color-secondary: #b2b6d2;
  --color-secondary-light: #ebdfe5;
  --color-secondary-dark: #9b8791;

  
  --color-info-light: #d2dbed;
  --color-info: #b1c1e2;
  --color-info-dark: #96a1b8;

  --secondary-grad: linear-gradient(to bottom left, var(--color-secondary-light), var(--color-info-light) );

  --nyashnie-letters: #f80657;
}

a {
  color: unset;
  // text-decoration: none;
}

#app {
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.underline {
    text-decoration: underline;
}

.text-main {
    color: white;
    font-size: 18px;
    font-weight: bold;
}

.shadow {
  box-shadow: 0px 6px 10px rgba(126, 126, 126, 0.719);
}

.text-cut {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
