<template>
    <div class="cover" :class="{'hidden': !display}" @click="hide">
      <div class="window">
          <h2>Выберите формат объявления</h2>
          <beauty-button v-if="type == 2" class="btn" look="primary" text="Передержка" @click="emit('clickRetake')" />
          <beauty-button v-if="type == 3" class="btn" look="primary" text="Бронь" @click="emit('clickReserve')" />
          <beauty-button v-if="type == 4" class="btn" look="primary" text="Оптовое" @click="emit('clickOpt')" />
          <beauty-button class="btn" look="primary" text="Афиша" @click="emit('clickBill')" />
      </div>
    </div>
  </template>
  
  <script>
  import BeautyButton from '@/components/BeautyButton.vue';
  
  export default {
      name: 'CardType',
      props: {
        type: Number
      },
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
      top: 40%;
      position: fixed;
      display: flex;
      flex-direction: column;
      justify-content: center;
      box-sizing: border-box;
      padding-left: 5%;
      padding-right: 5%;
      padding-bottom: 10px;
      align-items: center;
      gap: 25px;
  }
  
  .btns {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
  }
  
  .btn {
      width: 60%;
  }
  </style>