<template>
  <div :class="'cover' + (display ? '' : ' hidden')" @click="hide">
    <div class="modal" @click="$event.stopPropagation()">
        <h2>{{ title }}</h2>
        {{ desc }}
    </div>
  </div>
</template>

<script>
export default {
    name: 'ModalWindow',
    data() {
        return {
            title: '',
            desc: '',
            display: this.display,
        }
    },
    methods: {
        show(title, desc) {
            this.title = title;
            this.desc = desc;
            this.display = true;
        },
        hide() {
            this.display = false;
        },
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
    border-radius: 14px;
    background: white;
    padding: 20px;
    overflow: scroll;
    position: fixed;
    top: 25%;
    left: 25%;
    width: 50%;
    height: 50%;
    z-index: 101;
}

.hidden {
    display: none;
}
</style>