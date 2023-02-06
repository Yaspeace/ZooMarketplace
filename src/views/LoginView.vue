<template>
<div class="relative">
    <div :class="'cover' + (covered ? '' : ' invisible')"></div>
    <div class="inner-wrapper">
        <h1 v-if="getBool(register)">Регистрация</h1>
        <h1 v-else>Вход</h1>
        <div class="login">
            <form class="login-form" v-on:submit="loginOrRegister">
                <input v-model="login" v-mask="'+7(9##) ###-##-##'" class="login-input" type="text" :placeholder="(getBool(register) ? 'Введите ваш т' : 'Т') + 'елефон'"/><br>
                <input v-model="password" class="login-input" type="password" :placeholder="(getBool(register) ? 'Придумайте п' : 'П') + 'ароль'"/><br>
                <input v-model="passwordCheck" v-if="getBool(register)" class="login-input" type="password" placeholder="Повторите пароль"/><br>
                <BeautyButton type="submit" :text="getBool(register) ? 'Зарегистрироваться!' : 'Войти!'" look="primary" style="width: 100%;max-width: 300px;" />
            </form>
            <p v-if="!getBool(register)" class="mt-3">
                Ещё не зарегистрированы?
                <router-link :to="{ name: 'login', params: { register: 'true' } }">
                    Регистрация
                </router-link>
            </p>
        </div>
    </div>
</div>    
</template>

<script>
import BeautyButton from '@/components/BeautyButton.vue';
import {mask} from  "vue-the-mask";

export default {
    name: 'LoginView',
    props: {
        register: String
    },
    components: {
        BeautyButton,
    },
    directives: {
        mask,
    },
    data() {
        return {
            phone: "",
            password: "",
            passwordCheck: "",
            covered: false
        }
    },
    methods: {
        getBool(value) {
            return value == 'true';
        },
        logIn() {
            this.covered = true;
            this.$http.post('/Account/login', null, {
                params: {
                    login: this.login,
                    password: this.password
                }
            })
            .then(() => {
                this.covered = false;
                this.$router.push({ name: 'home' });
            })
            .catch(() => this.covered = false);
        },
        registerUser() {
            if(this.password == this.passwordCheck) {
                this.covered = true;
                this.$http.post('/Account/register', null, {
                    params: {
                        phone: this.phone,
                        password: this.password
                    }
                })
                .then(() => {
                    this.$router.push({ name: 'home' });
                })
                .finally(() => this.covered = false);
            }
        },
        loginOrRegister(event) {
            event.preventDefault();
            if(this.getBool(this.register)) {
                this.registerUser();
            } else {
                this.logIn();
            }
        }
    }
}
</script>

<style scoped>
.invisible {
    opacity: 0;
    transition: .3s;
}
.relative {
    position: relative;
}
.cover {
    background: rgba(0, 0, 0, 0.8);
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 1000;
    pointer-events: none;
}

.login {
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 40%;
}

.login-form {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.inner-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.login input {
  text-align: center;
  height: 40px;
  border-radius: 15px;
  width: 100%;
  max-width: 300px;
}

.login-input {
  border: 1px solid black;
}
</style>