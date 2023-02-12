<template>
    <div :class="'nav' + (scrolling ? '' : ' nav-header-visible')">
        <div class="sub-nav">
            <div class="nav-header">
                <router-link to="/">
                    <img src="@/assets/staticimages/mmlogo.png" class="nav-logo-img" />
                </router-link>
            </div>

            <div class="nav-header-title">
              <span class="nav-header-title-txt">От кота до бегемота &mdash; каждому нужна забота! Инвестируй в пушистое счастье!</span>
            </div>

            <div class="nav-empty-upper"></div>
        </div>

        <div class="sub-nav">

            <div class="nav-title">
                <router-link to="/"> МЫШЬ-МАРКЕТ</router-link>
            </div>

            <div class="nav-icons">
                <div class="nav-icon-wrapper">
                    <svg class="nav-icon icon-default" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 300 300" shape-rendering="geometricPrecision" text-rendering="geometricPrecision">
                        <ellipse rx="150" ry="150" transform="translate(150 150)" fill="#d2dbed" stroke-width="0"/>
                        <line x1="0" y1="-91.980459" x2="0" y2="108.316756" transform="translate(150 142.226971)" fill="none" stroke="currentColor" stroke-width="40"/>
                        <line x1="-100.148607" y1="-0.19756" x2="100.148607" y2="0.19756" transform="translate(149.988721 150.19756)" fill="none" stroke="currentColor" stroke-width="40"/>
                    </svg>
                    Добавить
                </div>
                <div class="nav-icon-wrapper">
                    <svg class="nav-icon icon-default" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 300 300" shape-rendering="geometricPrecision" text-rendering="geometricPrecision">
                    <ellipse rx="150" ry="150" transform="translate(150 150)" fill="#d2dbed" stroke-width="0"/>
                    <rect width="170.6634" height="117.626466" rx="20" ry="20" transform="matrix(.859378 0 0 0.973217 76.667814 79.12995)" fill="currentColor" stroke-width="0" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M161.191733,193.606026c23.256932,32.025978,35.637036,29.727148,35.637036,29.727148v-29.727148" transform="translate(4.637646-.374163)" fill="currentColor" stroke="#3f5787" stroke-width="0.6"/>
                    </svg>
                Чаты
                </div>
                <div class="nav-icon-wrapper">
                    <svg class="nav-icon icon-default" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 300 300" shape-rendering="geometricPrecision" text-rendering="geometricPrecision">
                    <ellipse rx="150" ry="150" transform="translate(150 150)" fill="#d2dbed" stroke-width="0"/>
                    <ellipse rx="3.940806" ry="4.463504" transform="matrix(3.40997 0 0 2.939076 150 46.276537)" fill="currentColor"/>
                    <rect width="147.658617" height="119.637226" rx="49" ry="49" transform="translate(77.000939 46.276537)" fill="currentColor"/>
                    <line x1="-100.01291" y1="0.251922" x2="100.012911" y2="-0.251922" transform="translate(149.961495 199.964434)" fill="none" stroke="currentColor" stroke-width="3"/>
                    <path d="M49.948585,200.216356c0,0,27.536507-50.216356,27.536507-80.079724c44.461044,0,102.238123,0,146.699167,0c0,29.863368,26.63173,79.827802,26.63173,79.827802" transform="translate(.000001 0)" fill="currentColor" stroke="#3f5787" stroke-width="0.6"/>
                    <ellipse rx="44.202643" ry="22.294627" transform="matrix(.580086 0 0 1 150 200.216356)" fill="currentColor"/>
                    </svg>
                Уведомления
                </div>
                <div class="nav-icon-wrapper">
                    <svg class="nav-icon icon-red" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 300 300" shape-rendering="geometricPrecision" text-rendering="geometricPrecision">
                    <ellipse rx="150" ry="150" transform="translate(150 150)" fill="#d2dbed" stroke-width="0"/>
                    <ellipse rx="31.769648" ry="27.306144" transform="matrix(1.5 0 0 1.5 105 125)" fill="currentColor" stroke-width="0"/>
                    <ellipse rx="31.769648" ry="27.306144" transform="matrix(1.5 0 0 1.5 195 125)" fill="currentColor" stroke-width="0"/>
                    <path d="M57.345528,125C56.978522,182.683088,150,240.366176,150,240.366176s92.654472-57.683088,92.654472-115.366176" fill="currentColor" stroke="#3f5787" stroke-width="0.6"/>
                    </svg>
                Избранные
                </div>
            </div>

            <div class="nav-avatar">
              <img v-if="$store.state.authorized" class="nav-avatar-img" :src="$store.state.avatar" v-on:click="getAccInfo"/>
              <router-link v-else :to="{ name: 'login', params: { register: 'false' } }" class="text-main underline enter-text">Войти</router-link>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    name: "DefaultHat",
    data() {
        return {
            scrolling: Boolean = false,
            account: {
                id: Number,
                img: String,
            },
        }
    },
    created () {
        window.addEventListener('scroll', this.handleScroll);
    },
    destroyed () {
        window.removeEventListener('scroll', this.handleScroll);
    },
    methods: {
        handleScroll() {
            this.scrolling = window.scrollY != 0;
        },
        getAccInfo() {
            this.$http.get('/api/Authorize')
                .then((responce) => {
                    this.account = responce.object;
                });
        }
    }
}
</script>
  
<style scoped>
.enter-text {
    font-size: 24px;
}
.nav {
    position: fixed;
    top: -100px;
    left: 0px;
    width: 100%;
    height: 200px;
    z-index: 200;
    transition: .5s;
    display: flex;
    flex-direction: column;
    background: linear-gradient(to top, rgb(77, 110, 192), rgb(114, 149, 202));
}

.sub-nav {
    height: 50%;
    display: flex;
    flex-direction: row;
}

.nav-empty-upper {
    width: 25%;
}

.nav-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 25%;
}

.nav-logo-img {
    width: 100px;
    height: 100px;
}

.nav-center {
width: 50%;
display: flex;
flex-direction: column;
}

.nav-header-title {
    font-weight: bolder;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    width: 50%;
}

.nav-header-title-txt {
    background: rgb(147, 181, 233);
    border-radius: 7px;
    padding: 10px;
}

.nav-title {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 26px;
    font-weight: 900;
    font-family: 'Comfortaa', cursive;
    flex-grow: 1;
    white-space: nowrap;
    width: 25%;
}

.nav-icons {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 50%;
}

.nav-icon-wrapper {
width: 13%;
display: flex;
flex-direction: column;
align-items: center;
}

.nav-icon {
    width: 50%;
    cursor: pointer;
    transition: .3s;
    color: #3f5787;
}

.icon-default:hover {
    color: #25314b;
}

.icon-red:hover {
    color:rgb(172, 45, 45);
}

.nav-avatar {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 25%;
}

.nav-avatar-img {
    width: 65px;
    height: 65px;
    border-radius: 200px;
    border: 7px solid #d2dbed;
    object-fit: cover;
    cursor: pointer;
}

@media screen and (max-width: 425px) {
    .nav {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        top: -110px;
    }

    .nav-logo-img {
        width: 80px;
        height: 80px;
    }

    .nav-avatar, .nav-icons, .nav-header-title {
        display: none;
    }
}

.nav-header-visible {
    top: 0px;
}
</style>