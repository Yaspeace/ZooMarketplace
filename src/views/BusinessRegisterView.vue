<template>
    <div class="relative">
        <div :class="'cover' + (covered ? '' : ' invisible')"></div>
        <div class="inner-wrapper">
            <h1>Регистрация бизнес-аккаунта</h1>
            <div class="login">
                <h3>Контактные данные</h3>
                <input
                    v-model="family.value"
                    class="login-input" 
                    type="text" 
                    placeholder="Фамилия контактного лица"
                    :class="{'invalid': family.invalid}"
                    @focus="family.invalid = false;family.errors = []"
                    v-tooltip.right="{
                        content: family.errors.length > 0 ? family.errors.join(', ') : null,
                        shown: family.errors.length > 0,
                        triggers: [],
                    }"
                />
                <input
                    v-model="name.value"
                    class="login-input" 
                    type="text" 
                    placeholder="Имя контактного лица"
                    :class="{'invalid': name.invalid}"
                    @focus="name.invalid = false;name.errors = []"
                    v-tooltip.right="{
                        content: name.errors.length > 0 ? name.errors.join(', ') : null,
                        shown: name.errors.length > 0,
                        triggers: [],
                    }"
                />

                <h3>Данные организации</h3>
                <v-select v-if="register"
                    :options="accountTypes"
                    style="width: 100%;"
                    placeholder="Вид аккаунта"
                    label="name"
                    v-model="accountType.value"
                    @search="getAccountTypes"
                    class="select-input"
                    :class="{'invalid': accountType.invalid}"
                    @focus="accountType.invalid = false;accountType.errors = []"
                    v-tooltip.right="{
                        content: accountType.errors.length > 0 ? accountType.errors.join(', ') : null,
                        shown: accountType.errors.length > 0,
                        triggers: [],
                    }"
                ></v-select>
                <input
                    v-model="organizationName.value"
                    class="login-input"
                    placeholder="Наименование организации"
                    :class="{'invalid': organizationName.invalid}"
                    @focus="organizationName.invalid = false;organizationName.errors = []"
                    v-tooltip.right="{
                        content: organizationName.errors.length > 0 ? organizationName.errors.join(', ') : null,
                        shown: organizationName.errors.length > 0,
                        triggers: [],
                    }"
                />
                <input
                    v-model="inn.value"
                    class="login-input"
                    placeholder="ИНН организации"
                    :class="{'invalid': inn.invalid}"
                    @focus="inn.invalid = false;inn.errors = []"
                    v-tooltip.right="{
                        content: inn.errors.length > 0 ? inn.errors.join(', ') : null,
                        shown: inn.errors.length > 0,
                        triggers: [],
                    }"
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
    import { append } from '@/js/arrays.js';
    
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
                name: {
                    value: '',
                    invalid: false,
                    errors: []
                },
                family: {
                    value: '',
                    invalid: false,
                    errors: []
                },
                inn: {
                    value: '',
                    invalid: false,
                    errors: []
                },
                organizationName: {
                    value: '',
                    invalid: false,
                    errors: []
                },
                accountType: {
                    value: null,
                    invalid: false,
                    errors: []
                },
                accountTypes: [],
                covered: false
            }
        },
        created() {
            this.getAccountTypes('', (val) => {});
        },
        methods: {
            getAccountTypes(search, loading) {
                loading(true);
                this.$http.get(`/api/Account/Types?search=${search}`)
                .then((resp) => this.accountTypes = resp.data.filter((x) => x.id != 1))
                .catch((err) => console.log(err))
                .finally(() => loading(false));
            },
            async register() {
                if(!this.validate()) return;

                let userId = 0;
                try {
                    let acc = await this.$http.get('/api/Session/Account');
                    userId = acc.data.object.user;
                } catch (err) {
                    console.log(err);
                }

                if(userId == 0) return;

                this.$http.post('/api/Account/BuisRegister', {
                    name: this.name.value,
                    family: this.family.value,
                    inn: this.inn.value,
                    organizationName: this.organizationName.value,
                    type: this.accountType.value.id,
                    user: userId,
                    image: 1,
                })
                .then((resp) => {
                    this.$store.commit('login', {
                        avatar: 'https://myshmarket.site' + resp.data.object.avatar.route,
                        aid: resp.data.object.id
                    });
                    this.$router.push('/account/' + this.$store.state.aid);
                })
                .catch((err) => console.log(err));

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
            validate() {
                this.clearErrors();
                let valid = true;
                valid &= this.validateString(this.name);
                valid &= this.validateString(this.family);
                valid &= this.validateString(this.inn);
                valid &= this.validateString(this.organizationName);
                valid &= this.validateObject(this.accountType);
                return valid;
            },
            validateString(control) {
                if(control.value.trim().length == 0) {
                    control.invalid = true;
                    control.errors = append(control.errors, 'Заполните поле');
                    return false;
                }

                return true;
            },
            validateObject(control) {
                if(control.value == null || control.value.id <= 0) {
                    control.invalid = true;
                    control.errors = append(control.errors, 'Заполните поле')
                    return false;
                }

                return true;
            },
            clearErrors() {
                this.name.errors = [];
                this.family.errors = [];
                this.organizationName.errors = [];
                this.inn.errors = [];
                this.accountType.errors = [];
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
    
    .login input, .select-input {
      text-align: center;
      height: 40px;
      border-radius: 15px;
      width: 100%;
      max-width: 300px;
    }
    
    .login-input {
      border: 1px solid black;
    }

    .invalid {
        border-color: red;
    }
    </style>