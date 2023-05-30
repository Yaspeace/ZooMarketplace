<template>
  <div class="main">
    <div class="filters-wrapper">
        <div>
            <h3>Радиус поиска</h3>
            <div><input type="checkbox" /><label>По Белгороду</label></div>
            <div><input type="checkbox" /><label>По региону</label></div>
            <div><input type="checkbox" /><label>По России</label></div>
        </div>

        <div>
            <h3>Категория животного</h3>
            <div class="filters-block">
                <div v-for="x in categories" :key="x.id">
                    <input type="checkbox" /><label>{{ x.name }}</label>
                </div>
            </div>
        </div>

        <div>
            <h3>Порода</h3>
            <div class="filters-block">
                <div v-for="x in breeds" :key="x.id">
                    <input type="checkbox" /><label>{{ x.name }}</label>
                </div>
            </div>
        </div>

        <div>
            <h3>Цель поиска</h3>
            <div class="filters-block">
                <div v-for="x in adTypes" :key="x.id">
                    <input type="checkbox" /><label>{{ x.name }}</label>
                </div>
            </div>
        </div>

        <div>
            <h3>Пол</h3>
            <div class="filters-block">
                <div><input type="radio" :value="0" v-model="sex" /><label>Не важно</label></div>
                <div><input type="radio" :value="1" v-model="sex" /><label>Самец</label></div>
                <div><input type="radio" :value="2" v-model="sex" /><label>Самка</label></div>
            </div>
        </div>

        <div>
            <h3>Возраст</h3>
            <div>От <input v-model="ageFrom" size="4" v-mask="'###'"/> лет</div>
            <div>До <input v-model="ageTo" size="4" v-mask="'###'"/> лет</div>
        </div>

        <div>
            <h3>Стоимость</h3>
            <div>От <input v-model="ageFrom" size="4" v-mask="'######'"/> р</div>
            <div>До <input v-model="ageTo" size="4" v-mask="'######'"/> р</div>
        </div>
    </div>

    <beauty-button look="secondary" text="Очистить" style="font-size: 12pt;padding: 6px;margin-top: 10px;" />
  </div>
</template>

<script>
import BeautyButton from '../BeautyButton.vue';
import {mask} from 'vue-the-mask';

export default {
    name: 'FiltersModals',
    components: {
        BeautyButton,
    },
    directives: {
        mask,
    },
    data() {
        return {
            categories: [],
            breeds: [],
            adTypes: [],
            sex: 0,
            ageFrom: '',
            ageTo: '',
        }
    },
    created() {
        this.getCategories();
        this.getBreeds();
        this.getAdTypes();
    },
    methods: {
        getCategories() {
            this.$http.get('/api/Categories')
            .then((resp) => this.categories = resp.data.results)
            .catch((err) => console.log(err));
        },
        getBreeds() {
            this.$http.get('/api/Breeds')
            .then((resp) => this.breeds = resp.data.results)
            .catch((err) => console.log(err));
        },
        getAdTypes() {
            this.$http.get('/api/Types')
            .then((resp) => this.adTypes = resp.data.results)
            .catch((err) => console.log(err));
        },
    }
}
</script>

<style scoped>
.main {
    background: white;
    border-radius: 14px;
    padding: 20px;
    box-sizing: border-box;
}

.filters-wrapper {
    display: flex;
    flex-wrap: wrap;
    gap: 25px;
}

.filters-block {
    max-height: calc(5 * 1.5em);
    overflow: auto;
}
</style>