<template>
  <div class="laf-wrapper shadow" :class="styleName">
    <div class="card-head" :class="'color-' + styleName">{{ ad.type == 4 ? 'Потерялся!' : 'Найден!' }}</div>
    <img class="card-img" :src="'https://myshmarket.site' + ad.mainImage.route" />
    
    <div class="laf-title" @click="$router.push('/lost-and-found-view/' + ad.id)"><b>{{ ad.title }}</b></div>
    <div>№ чипа/клейма: <b>{{ ad.number }}</b></div>
  </div>
</template>

<script>
export default {
    name: 'LafCard',
    props: ['ad'],
    data() {
        return {
            styleName: ''
        }
    },
    created() {
        this.$http.get('/api/Types/' + this.ad.type)
        .then((resp) => this.styleName = resp.data.object.enumName.toLowerCase())
        .catch((err) => console.log(err));
    }
}
</script>

<style>
.laf-wrapper {
    max-width: 400px;
    border: 5px solid grey;
    border-radius: 14px;
    padding: 20px;
    box-sizing: border-box;
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    align-content: space-around;
    background: white;
    text-align: left;

    font-size: 18px;
}

.lost {
    border: 5px solid red;
}

.found {
    border: 5px solid green;
}

.color-lost {
    color: red;
}

.color-found {
    color: green;
}

.card-head {
    width: 100%;
    text-align: center;
    font-weight: bold;
    font-size: 22px;
}

.card-img {
    width: 100%;
    max-width: 400px;
    aspect-ratio: 1/1;
    border: 3px solid gray;
    border-radius: 10px;
    box-sizing: border-box;
    object-fit: cover;
    background: #ddd;
}

.laf-title {
    font-size: 22px;
    cursor: pointer;
}

.laf-title:hover {
    text-decoration: underline;
}
</style>