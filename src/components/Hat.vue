<template>
  <div :class="'nav' + (scrolling ? '' : ' nav-header-visible')">
        <router-link to="/" class="nav-header"> 
            <img src="@/assets/staticimages/mmlogo.png" class="nav-logo-img" />
            <div class="nav-title">
                МЫШЬ-МАРКЕТ
            </div>
        </router-link>
        <div class="nav-header-title">
            <span class="nav-header-title-txt">От кота до бегемота &mdash; каждому нужна забота! Инвестируй в пушистое счастье!</span>
        </div>
        <div class="nav-city">
            <img class="nav-pin" src="@/assets/staticimages/pin.png"/> <span class="nav-city-name">Белгород</span>
        </div>

        <div class="nav-search">
            <div id="search-form" class="nav-search-bar" method="get" action="[[~[[*id]]]]">
                <input class="nav-search-input" placeholder="Поиск" maxlength="200" v-model="searchStr" />
                
                <svg @click="searchClick" id="search-submit" class="nav-search-button" viewBox="0 0 24 24" fill="none">
                    <path d="M13.3891 13.3891L19 19M9.5 15C12.5376 15 15 12.5376 15 9.5C15 6.46243 12.5376 4 9.5 4C6.46243 4 4 6.46243 4 9.5C4 12.5376 6.46243 15 9.5 15Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            
                <svg class="nav-filter-btn" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" shape-rendering="geometricPrecision" text-rendering="geometricPrecision">
                    <line x1="-114.957155" y1="0" x2="110.080323" y2="0" transform="translate(114.957155 103.927009)" fill="none" stroke-width="40"/>
                    <line x1="-103.13" y1="0" x2="103.13" y2="0" transform="translate(408.87 103.927009)" fill="none" stroke-width="40"/>
                    <circle r="37.42" transform="translate(262.457478 103.927009)" fill="none" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/>
                    <circle r="37.42" transform="translate(127.765183 256)" fill="none" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/>
                    <circle r="37.42" transform="translate(408.87 397.460167)" fill="none" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/>
                    <line x1="-185.725" y1="0" x2="185.725" y2="0" transform="translate(185.725 397.460167)" fill="none" stroke-width="40"/>
                    <line x1="-45.172591" y1="0" x2="45.172592" y2="0" transform="translate(45.172592 256)" fill="none" stroke-width="40"/>
                    <line x1="173.407408" y1="0" x2="-173.407409" y2="0" transform="translate(338.592592 256)" fill="none" stroke-width="40"/>
                    <line x1="-32.855" y1="0" x2="32.855" y2="0" transform="translate(479.145 397.460167)" fill="none" stroke-width="40"/>
                </svg>
            </div>
        </div>
        <div class="nav-icons">
            <svg class="nav-icon icon-default" @click="addAd" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 300 300" shape-rendering="geometricPrecision" text-rendering="geometricPrecision">
                <ellipse rx="150" ry="150" transform="translate(150 150)" fill="#d2dbed" stroke-width="0"/>
                <line x1="0" y1="-91.980459" x2="0" y2="108.316756" transform="translate(150 142.226971)" fill="none" stroke="currentColor" stroke-width="40"/>
                <line x1="-100.148607" y1="-0.19756" x2="100.148607" y2="0.19756" transform="translate(149.988721 150.19756)" fill="none" stroke="currentColor" stroke-width="40"/>
            </svg>
            <svg class="nav-icon icon-default" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 300 300" shape-rendering="geometricPrecision" text-rendering="geometricPrecision">
                <ellipse rx="150" ry="150" transform="translate(150 150)" fill="#d2dbed" stroke-width="0"/>
                <rect width="170.6634" height="117.626466" rx="20" ry="20" transform="matrix(.859378 0 0 0.973217 76.667814 79.12995)" fill="currentColor" stroke-width="0" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M161.191733,193.606026c23.256932,32.025978,35.637036,29.727148,35.637036,29.727148v-29.727148" transform="translate(4.637646-.374163)" fill="currentColor" stroke="#3f5787" stroke-width="0.6"/>
            </svg>
            <svg class="nav-icon icon-default" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 300 300" shape-rendering="geometricPrecision" text-rendering="geometricPrecision">
                <ellipse rx="150" ry="150" transform="translate(150 150)" fill="#d2dbed" stroke-width="0"/>
                <ellipse rx="3.940806" ry="4.463504" transform="matrix(3.40997 0 0 2.939076 150 46.276537)" fill="currentColor"/>
                <rect width="147.658617" height="119.637226" rx="49" ry="49" transform="translate(77.000939 46.276537)" fill="currentColor"/>
                <line x1="-100.01291" y1="0.251922" x2="100.012911" y2="-0.251922" transform="translate(149.961495 199.964434)" fill="none" stroke="currentColor" stroke-width="3"/>
                <path d="M49.948585,200.216356c0,0,27.536507-50.216356,27.536507-80.079724c44.461044,0,102.238123,0,146.699167,0c0,29.863368,26.63173,79.827802,26.63173,79.827802" transform="translate(.000001 0)" fill="currentColor" stroke="#3f5787" stroke-width="0.6"/>
                <ellipse rx="44.202643" ry="22.294627" transform="matrix(.580086 0 0 1 150 200.216356)" fill="currentColor"/>
            </svg>
            <svg @click="goToFavorites" class="nav-icon icon-red" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 300 300" shape-rendering="geometricPrecision" text-rendering="geometricPrecision">
                <ellipse rx="150" ry="150" transform="translate(150 150)" fill="#d2dbed" stroke-width="0"/>
                <ellipse rx="31.769648" ry="27.306144" transform="matrix(1.5 0 0 1.5 105 125)" fill="currentColor" stroke-width="0"/>
                <ellipse rx="31.769648" ry="27.306144" transform="matrix(1.5 0 0 1.5 195 125)" fill="currentColor" stroke-width="0"/>
                <path d="M57.345528,125C56.978522,182.683088,150,240.366176,150,240.366176s92.654472-57.683088,92.654472-115.366176" fill="currentColor" stroke="#3f5787" stroke-width="0.6"/>
            </svg>
        </div>
        <div class="nav-avatar">
            <router-link v-if="$store.state.authorized" :to="{ name: 'account', params: { accId: $store.state.aid } }">
                <img class="nav-avatar-img" :src="$store.state.avatar" />
            </router-link>
            <router-link v-else :to="{ name: 'login', params: { register: 'false' } }" class="text-main underline enter-text">
                Войти
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: "Hat",
    data() {
        return {
            scrolling: Boolean = false,
            account: {
                id: this.$store.state.id,
                img: this.$store.state.avatar,
            },
            searchStr: '',
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
                    console.log(this.account);
                });
        },
        addAd() {
            if(this.$store.state.authorized) {
                this.$router.push({ name: 'ad', params: { mode: 'create' } });
            } else {
                this.$router.push({ name: 'login', params: { register: 'false' } });
            }
        },
        searchClick() {
            this.$emit('search', this.searchStr);
        },
        goToFavorites() {
            this.$router.push('/favorites');
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
    display: grid;
    grid-template-areas:
    "A A A A   B B B B   B B B B"
    "A A A A   B B B B   B B B B"
    "A A A A   E E E D   D D C C"
    "F F F F   F F F D   D D C C";
    background: linear-gradient(to top, rgb(77, 110, 192), rgb(114, 149, 202));
    justify-items: stretch;
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: repeat(4, 1fr);
}

.nav-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    grid-area: A;
}

.nav-logo-img {
    width: 100px;
    height: 100px;
}

.nav-header-title {
    grid-area: B;
    font-weight: bolder;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
}

.nav-header-title-txt {
    background: var(--color-primary-contrast);
    border-radius: 7px;
    padding: 10px;
}

.nav-city {
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    grid-area: E;
    overflow: hidden;
    white-space: nowrap;
}

.nav-city-name {
    text-decoration: underline;
    font-size: 20px;
    cursor: pointer;
    max-width: calc(100% - 20px);
    overflow: hidden;
    text-overflow: ellipsis;
}

.nav-pin {
    height: 20px;
}

.nav-title {
    display: flex;
    align-items: flex-end;
    font-size: 26px;
    font-weight: 900;
    font-family: 'Comfortaa', cursive;
    flex-grow: 1;
    white-space: nowrap;
    text-decoration: none;
}

.nav-search {
    grid-area: F;
    display: flex;
    align-items: center;
    padding: 0px 10px 0px 10px;
}

.nav-search-bar {
    background: white;
    border: 2px solid rgb(211, 211, 211);
    border-radius: 7px;
    padding: 0px 10px 0px 10px;
    width: 100%;
    box-shadow: rgba(126, 126, 126, 0.4) 3px 3px 5px;
    font-size: 18px;
    display: flex;
    align-items: center;
    height: 65%;
}

.nav-search-input {
    width: calc(100% - 24px - 24px);
    border: none;
    font-size: 18px;
}

.nav-search-input:focus {
    outline: none;
}

.nav-search-button {
    width: 24px; 
    height: 24px;
    stroke: black;
    transition: 1s;
    cursor: pointer;
}

.nav-search-button:hover {
    stroke: gray;
}

.nav-icons {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    grid-area: D;
}

.nav-icon {
    height: 50%;
    cursor: pointer;
    transition: .3s;
    color: #3f5787;
    display: block;
}

.icon-default:hover {
    color: #25314b;
}

.icon-red:hover {
    color:rgb(172, 45, 45);
}

.nav-filter-btn {
    width: 24px;
    height: 24px;
    transition: 1s;
    cursor: pointer;
    stroke: black;
}

.nav-filter-btn:hover {
    stroke: gray;
}

.nav-avatar {
    display: flex;
    align-items: center;
    justify-content: center;
    grid-area: C;
}

.nav-avatar-img {
    width: 80px;
    height: 80px;
    border-radius: 200px;
    border: 7px solid #d2dbed;
    object-fit: cover;
    cursor: pointer;
}

@media screen and (max-width: 426px) {
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

    .nav-search {
        height: 50px;
    }

    .nav-search-input {
        font-size: 24px;
    }

    .nav-city {
        padding-right: 10px;
    }
}

.nav-header-visible {
    top: 0px;
}
</style>