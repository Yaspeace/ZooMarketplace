<template>
  <div class="main shadow">
    <div class="upper">
        <div>Мои аккаунты</div>
        <div>Продвижение объявлений</div>
    </div>
    
    <div>Моя статистика</div>
    <div>Мои объявления</div>
  </div>
</template>

<script>
export default {
    name: 'UserInfo',
    props: ['account'],
    data() {
        return {

        }
    },
}
</script>

<style scoped>
.main {
    background-color: #b2b6d2;
    border-radius: 14px;
    text-align: center;
}

.upper {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}
</style>