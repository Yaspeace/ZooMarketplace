<template>
<div class="relative">
    <div :class="'cover' + (covered ? '' : ' invisible')"></div>
    <div class="inner-wrapper">
        <h1 v-if="getBool(register)">Регистрация</h1>
        <h1 v-else>Вход</h1>
        <div class="login">
            <input 
                v-if="getBool(register)"
                v-model="name"
                class="login-input" 
                type="text" 
                placeholder="Ваше имя"
            /><br>
            <input 
                v-if="getBool(register)"
                v-model="family"
                class="login-input" 
                type="text" 
                placeholder="Ваша фамилия"
            /><br>
            <input 
                v-model="phone" 
                v-mask="'+7(###) ###-##-##'" 
                class="login-input" 
                type="text" 
                :placeholder="(getBool(register) ? 'Введите ваш т' : 'Т') + 'елефон'"
            /><br>
            <input 
                v-model="password" 
                class="login-input" 
                type="password" 
                :placeholder="(getBool(register) ? 'Придумайте п' : 'П') + 'ароль'"
            /><br>
            <input 
                v-if="getBool(register)"
                v-model="passwordCheck"  
                class="login-input" 
                type="password" 
                placeholder="Повторите пароль"
            /><br>
            <BeautyButton 
                :text="getBool(register) ? 'Зарегистрироваться!' : 'Войти!'" 
                look="primary" 
                style="width: 100%;max-width: 300px;" 
                @click="loginOrRegister"
            />
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
            name: "",
            family: "",
            phone: "",
            password: "",
            passwordCheck: "",
            covered: false
        }
    },
    methods: {
        getBool(value) {
            return value === 'true';
        },
        async logIn() {
            this.covered = true;
            await this.$store.dispatch('login', {
                phone: this.phone,
                password: this.password
            });
            this.covered = false;
            this.$router.push({ name: 'home' });
        },
        registerUser() {
            if(this.password == this.passwordCheck) {
                this.covered = true;
                this.$http.post('/api/Authorize', {
                    name: this.name,
                    family: this.family,
                    phone: this.phone,
                    password: this.password,
                    passwordCheck: this.passwordCheck
                })
                .then(() => {
                    this.$router.push({ name: 'home' });
                })
                .finally(() => this.covered = false);
            }
        },
        loginOrRegister() {
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
  align-content: center;
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