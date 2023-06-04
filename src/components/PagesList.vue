<template>
  <div class="pages-wrapper">
    <div v-if="current > 1" class="page arrow" @click="changePage(current - 1)">←</div>
    <div v-for="i in pageNumbers" :key="i" class="page" :class="{'active': current == i}" @click="changePage(i)">{{ i }}</div>
    <div v-if="current < total" class="page arrow" @click="changePage(current + 1)">→</div>
  </div>
</template>

<script>
export default {
    name: 'PagesList',
    props: {
        // Всего страничек
        total: Number,
        
        // Текущая страничка
        current: Number,
        
        // Максимум отображаемых страничек
        range: {
            type: Number,
            default: 11
        }
    },
    computed: {
        pageNumbers: function() {
            const res = [];
            let subRangeLeft = Math.floor((this.range - 1) / 2);
            let subRangeRight = subRangeLeft + (this.range % 2 == 0 ? 1 : 0);
            let unshowedRight = subRangeRight - (this.total - this.current);
            if(unshowedRight > 0) subRangeLeft += unshowedRight;
            
            for(let i = this.current - subRangeLeft; i < this.current; ++i) {
                if (i > 0) {
                    res.push(i);
                } else {
                    subRangeRight += 1;
                }
            }

            res.push(this.current);

            for(let i = this.current + 1; i <= this.current + subRangeRight; ++i) {
                if (i <= this.total) res.push(i);
            }

            return res;
        }
    },
    methods: {
        changePage(page) {
            if(page != this.current) this.$emit('changePage', page);
        }
    }
}
</script>

<style scoped>
.pages-wrapper {
    display: flex;
    align-items: center;
    border-radius: 14px;
}

.pages-wrapper > *:first-child {
    border-top-left-radius: 14px;
    border-bottom-left-radius: 14px;
}

.pages-wrapper > *:last-child {
    border-top-right-radius: 14px;
    border-bottom-right-radius: 14px;
}

.page {
    background: white;
    border: 1px solid gray;
    cursor: pointer;
    transition: .3s;
    user-select: none;
    /* padding: 10px; */
    width: 2em;
    height: 2em;
    display: flex;
    justify-content: center;
    align-items: center;
}

.active, .page:hover {
    background: var(--color-primary);
    color: white;
}

.arrow {
    color: black;
    font-family: 'slick';
    vertical-align: middle;
}
</style>