<template>
  <div class="wrapper">
    <div class="row">
        <picture-input
            ref="pictureInput"
            class="img-input"
            accept="image/jpeg,image/png"
            :crop="false"
            :zIndex="1"
            :removable="true"
            :alertOnError="false"
            :custom-strings="{
                upload: 'Загрузите фото питомца',
                drag: 'Перетащите фото сюда',
                change: 'Изменить фото',
                remove: 'Удалить фото'
            }"
            @change="onImageChange"
        />
        <picture-input
            ref="pictureInput"
            class="img-input"
            accept="image/jpeg,image/png"
            :crop="false"
            :zIndex="1"
            :removable="true"
            :alertOnError="false"
            :custom-strings="{
                upload: 'Загрузите фото питомца',
                drag: 'Перетащите фото сюда',
                change: 'Изменить фото',
                remove: 'Удалить фото'
            }"
            @change="onImageChange"
        />
        <picture-input
            ref="pictureInput"
            class="img-input"
            accept="image/jpeg,image/png"
            :crop="false"
            :zIndex="1"
            :removable="true"
            :alertOnError="false"
            :custom-strings="{
                upload: 'Загрузите фото питомца',
                drag: 'Перетащите фото сюда',
                change: 'Изменить фото',
                remove: 'Удалить фото'
            }"
            @change="onImageChange"
        />
    </div>
    <div class="row">
        <div style="flex-grow: 1"><input placeholder="Заголовок" style="width: 100%;"/></div>
        <div><input placeholder="Цена" /></div>
    </div>
    <div class="row">
        <textarea
            placeholder="Описание"
            style="resize: none;width: 100%"
        >
        </textarea>
    </div>
  </div>
</template>

<script>
import PictureInput from 'vue-picture-input';

export default {
    name: 'SubCard',
    components: {
        PictureInput,
    },
    data() {
        return {
            image: null
        }
    },
    methods: {
        onImageChange(image) {
            if (image) {
                this.image = image;
            }
        }
    }
}
</script>

<style scoped>
.wrapper {
    border-radius: 14px;
    background: var(--color-info-light);
    display: flex;
    flex-direction: column;
    padding: 25px;
}

.row {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    margin-top: 5px;
    margin-bottom: 5px;
}

.img-input {
    width: 20%;
    aspect-ratio: 1/1;
    margin: 0;
}

input {
    border: none;
    border-radius: 5px;
    font-size: 18px;
    height: 1.5em;
}

input:focus {
    outline: none;
}
</style>