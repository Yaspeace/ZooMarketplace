<template>
  <div class="poster-wrapper shadow" :class="typeStr" @click="$router.push('/poster-view/1')">
    <img class="poster-card-img" :src="'https://myshmarket.site' + poster.image.route" />
    
    <div class="poster-card-info">
      <div class="poster-title">
        {{ poster.title }}
      </div>
      <div style="align-self: flex-end; text-align: right">
        <div>
          {{ poster.address }}
        </div>
        <div>
          {{ new Date(poster.dateBegin).toLocaleDateString('ru-RU') }} - {{ new Date(poster.dateEnd).toLocaleDateString('ru-RU') }} 
          ({{ getTime(poster.dateBegin) }} - {{ getTime(poster.dateEnd) }})
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PosterCard',
  props: ['poster'],
  methods: {
    getTime(date) {
      return new Date(date).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit'});
    }
  },
  computed: {
    typeStr: function() {
      switch(this.poster.account.type) {
        case 2: return 'free';
        case 3: return 'non-free';
        case 4: return 'selhos';
        default: return '';
      }
    }
  }
}
</script>

<style scoped>
.poster-wrapper {
    display: flex;
    border: 5px solid rgb(234, 0, 255);
    border-radius: 14px;
    padding: 15px;
    box-sizing: border-box;
    gap: 20px;
    font-size: 26px;
    background: white;
    cursor: pointer;
}

.free {
  border: 5px solid #735ff7;
}

.non-free {
  border: 5px solid #3c0fb9;
}

.selhos {
  border: 5px solid #322491;
}

.poster-card-img {
    width: 20%;
    aspect-ratio: 1/1;
    object-fit: cover;
    border: 3px solid gray;
    border-radius: 10px;
    background: #ddd;
}

.poster-card-info {
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0px 20px;
}

.poster-title {
  font-weight: bold;
  font-size: 36px;
  align-self: flex-start;
}

.poster-title:hover {
  text-decoration: underline;
}
</style>