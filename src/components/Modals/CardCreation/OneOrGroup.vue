<template>
  <div class="cover" :class="{'hidden': !display}" @click="hide">
    <div class="window">
        <h2>Выберите формат объявления</h2>
        <div>Сколько вы хотите продать животных?</div>
        <div class="btns">
            <beauty-button class="btn" look="primary" text="Одно" @click="emit('clickOne')" />
            <beauty-button class="btn" look="primary" text="Несколько" @click="emit('clickMany')" />
        </div>
    </div>
  </div>
</template>

<script>
import BeautyButton from '@/components/BeautyButton.vue';

export default {
    name: 'OneOrGroup',
    components: {
        BeautyButton,
    },
    data() {
        return {
            display: false
        }
    },
    methods: {
        show() {
            this.display = true;
        },
        hide() {
            this.display = false;
        },
        emit(action) {
            this.$emit(action);
        }
    }
}
</script>

<style scoped>
.window {
    background: white;
    border-radius: 14px;
    z-index: 101;
    width: 30%;
    left: 35%;
    height: 20%;
    top: 40%;
    position: fixed;
    display: flex;
    flex-direction: column;
    justify-content: center;
    box-sizing: border-box;
    padding-left: 5%;
    padding-right: 5%;
    align-items: center;
}

.btns {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
}

.btn {
    width: 45%;
}
</style>