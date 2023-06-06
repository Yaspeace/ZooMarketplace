<template>
    <model-list-select 
        :list="options"
        v-model="modelVal"
        :option-value="optionValue"
        :custom-text="customText"
        :placeholder="placeholder"
        @searchchange="searchchange"
        style="width: 100%; height: 100%"
    />
</template>

<script>
import { ModelListSelect } from 'vue-search-select';
import "vue-search-select/dist/VueSearchSelect.css";

export default {
    name: 'Autocomplete',
    props: [
        'value',
        'options',
        'optionValue',
        'delay',
        'customText',
        'placeholder'
    ],
    components: {
        ModelListSelect,
    },
    computed: {
        modelVal: {
            get() {
                return this.value;
            },
            set(val) {
                this.$emit('input', val);
            }
        }
    },
    data() {
        return {
            canSearchChange: true,
            lastSearchStr: '',
            curSearchStr: '',
        }
    },
    methods: {
        searchchange(search) {
            if(!search || search.length <= 3) return;

            this.curSearchStr = search;

            if(this.canSearchChange) {
                this.canSearchChange = false;
                this.lastSearchStr = search;
                this.$emit('searchchange', search);
                
                setTimeout(() => {
                    this.canSearchChange = true;
                    if (this.lastSearchStr != this.curSearchStr) {
                        this.searchchange(this.curSearchStr);
                    }
                }, this.delay * 1000);
            }
        }
    }
}
</script>

<style>

</style>