<template>
    <div :class="'cover' + (display ? '' : ' hidden')" @click="hide">
      <img :src="imagePath" class="modal" />
    </div>
  </template>
  
  <script>
  export default {
      name: 'ModalImageView',
      data() {
          return {
              imagePath: '',
              display: false,
          }
      },
      methods: {
          show(imagePath) {
              this.imagePath = imagePath;
              this.display = true;
          },
          hide() {
              this.display = false;
          }
      }
  }
  </script>
  
  <style scoped>
  .cover {
      background-color: rgba(0, 0, 0, 0.5);
      position: fixed;
      top: 0px;
      left: 0px;
      width: 100vw;
      height: 100vh;
      z-index: 100;
  }
  
  .modal {
      position: fixed;
      top: 17.5%;
      left: 17.5%;
      width: 65%;
      height: 65%;
      z-index: 101;
      object-fit: contain;
      user-select: none;
  }
  
  .hidden {
      display: none;
  }
  </style>