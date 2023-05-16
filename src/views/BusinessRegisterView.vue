<template>
    <div class="relative">
        <div :class="'cover' + (covered ? '' : ' invisible')"></div>
        <div class="inner-wrapper">
            <h1>Регистрация бизнес-аккаунта</h1>
            <div class="login">
                <h3>Контактные данные</h3>
                <input
                    v-model="phone" 
                    v-mask="'+7(###) ###-##-##'" 
                    class="login-input" 
                    type="text" 
                    placeholder="Контактный телефон"
                />
                <input
                    v-model="family"
                    class="login-input" 
                    type="text" 
                    placeholder="Фамилия контактного лица"
                />
                <input
                    v-model="name"
                    class="login-input" 
                    type="text" 
                    placeholder="Имя контактного лица"
                />

                <h3>Данные организации</h3>
                <v-select v-if="register"
                    :options="accountTypes"
                    style="width: 100%;"
                    placeholder="Вид аккаунта"
                    label="name"
                    v-model="accountType"
                    @search="getAccountTypes"
                    class="select-input"
                ></v-select>
                <h3>Конфиденциальные данные</h3>
                <input 
                    v-model="password" 
                    class="login-input" 
                    type="password" 
                    placeholder="Пароль"
                />
                <input
                    v-model="passwordCheck"  
                    class="login-input" 
                    type="password" 
                    placeholder="Повторите пароль"
                />
                <BeautyButton 
                    text="Зарегистрировать аккаунт!" 
                    look="primary" 
                    style="width: 100%;max-width: 300px;margin-top: 10px;" 
                    @click="register"
                />
            </div>
        </div>
    </div>    
    </template>
    
    <script>
    import BeautyButton from '@/components/BeautyButton.vue';
    import {mask} from  "vue-the-mask";
    import vSelect from "vue-select";
    import 'vue-select/dist/vue-select.css';
    
    export default {
        name: 'LoginView',
        components: {
            BeautyButton,
            vSelect,
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
                inn: '',
                organizationName: '',
                accountType: null,
                accountTypes: [],
                covered: false
            }
        },
        created() {
            this.getAccountTypes('', this.toggleLoading);
        },
        methods: {
            getAccountTypes(search, loading) {
                loading(true);
                this.$http.get(`/api/Account/Types?search=${search}`)
                .then((resp) => this.accountTypes = resp.data)
                .catch((err) => console.log(err))
                .finally(() => loading(false));
            },
            register() {
                /*if(this.password == this.passwordCheck) {
                    this.covered = true;
                    this.$http.post('/api/Authorize', {
                        name: this.name,
                        family: this.family,
                        phone: this.phone,
                        password: this.password,
                        passwordCheck: this.passwordCheck
                    })
                    .then(() => {
                        this.$router.push({ name: 'login', params: { register: 'false' } });
                    })
                    .finally(() => this.covered = false);
                }*/
            },
            toggleLoading(val) {
                val = !val;
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
      gap: 15px;
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