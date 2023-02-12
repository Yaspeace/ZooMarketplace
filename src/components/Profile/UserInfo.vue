<template>
  <div class="main shadow">
    <div class="upper">
        <AccountList class="acc-list" :userId="account.user" />
        <Offer class="offer" />
    </div>
    
    <div>
        <img src="@/assets/staticimages/free-icon-statistics-7147801.png" width="50" />
        Моя статистика
    </div>
    <div>Мои объявления</div>
  </div>
</template>

<script>
import AccountList from './AccountList.vue';
import Offer from './Offer.vue';

export default {
    name: 'UserInfo',
    props: ['account'],
    components: {
        AccountList,
        Offer,
    },
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
    padding: 20px;
    box-sizing: border-box;
}

.upper {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}

.acc-list {
    width: 40%;
}

.offer {
    width: 40%;
}
</style>