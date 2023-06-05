<template>
  <div class="main">
    <div class="filters-wrapper">
        <div>
            <h3>Радиус поиска</h3>
            <div><input type="checkbox" /><label>По Белгороду</label></div>
            <div><input type="checkbox" /><label>По региону</label></div>
            <div><input type="checkbox" /><label>По России</label></div>
        </div>

        <div v-if="mode != 2">
            <h3>Категория животного</h3>
            <div class="filters-block">
                <div v-for="x in categories" :key="x.id">
                    <input type="checkbox" /><label>{{ x.name }}</label>
                </div>
            </div>
        </div>

        <div v-if="mode != 2">
            <h3>Порода</h3>
            <div class="filters-block">
                <div v-for="x in breeds" :key="x.id">
                    <input type="checkbox" /><label>{{ x.name }}</label>
                </div>
            </div>
        </div>

        <div v-if="mode != 2">
            <h3>Цель поиска</h3>
            <div class="filters-block">
                <div v-for="x in adTypes" :key="x.id">
                    <input type="checkbox" /><label>{{ x.name }}</label>
                </div>
            </div>
        </div>

        <div v-if="mode != 2">
            <h3>Пол</h3>
            <div class="filters-block">
                <div><input type="radio" :value="0" v-model="sex" /><label>Не важно</label></div>
                <div><input type="radio" :value="1" v-model="sex" /><label>Самец</label></div>
                <div><input type="radio" :value="2" v-model="sex" /><label>Самка</label></div>
            </div>
        </div>

        <div v-if="mode != 2">
            <h3>Возраст</h3>
            <div>От <input v-model="ageFrom" size="4" v-mask="'###'"/> лет</div>
            <div>До <input v-model="ageTo" size="4" v-mask="'###'"/> лет</div>
        </div>

        <div v-if="mode == 0">
            <h3>Стоимость</h3>
            <div>От <input v-model="ageFrom" size="4" v-mask="'######'"/> р</div>
            <div>До <input v-model="ageTo" size="4" v-mask="'######'"/> р</div>
        </div>

        <div v-if="mode == 1">
            <h3>Потеряшки</h3>
            <div><input type="checkbox" :value="0" v-model="withoutChip" /><label>Без чипа/клейма</label></div>
        </div>

        <div v-if="mode == 2">
            <h3>Уровень мероприятия</h3>
            <div v-for="x in levels" :key="x.id">
                <input type="checkbox" /><label>{{ x.name }}</label>
            </div>
        </div>

        <div v-if="mode == 2">
            <h3>На дату</h3>
            <date-picker v-model="posterDate" />
        </div>
    </div>

    <beauty-button look="secondary" text="Очистить" style="font-size: 12pt;padding: 6px;margin-top: 10px;" />
  </div>
</template>

<script>
import BeautyButton from '../BeautyButton.vue';
import {mask} from 'vue-the-mask';
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';

export default {
    name: 'FiltersModals',
    props: ['mode'],
    components: {
        BeautyButton,
        DatePicker,
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
            withoutChip: false,
            levels: [
                {
                    id: 1,
                    name: 'Городское'
                },
                {
                    id: 2,
                    name: 'Региональное'
                },
                {
                    id: 3,
                    name: 'Всероссийское'
                },
                {
                    id: 4,
                    name: 'Международное'
                }
            ],
            posterDate: null,
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
            .then((resp) => {
                let types = resp.data.results;
                if(this.mode == 0) {
                    this.adTypes = types.filter((x) => x.id != 4 && x.id != 5);
                } else {
                    this.adTypes = types.filter((x) => x.id == 4 || x.id == 5);
                }
                
            })
            .catch((err) => console.log(err));
        },
    },
    watch: {
        mode: function() {
            this.getCategories();
            this.getBreeds();
            this.getAdTypes();
        }
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