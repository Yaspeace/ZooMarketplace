<template>
    <div class="row">
        <div class="col-75">
            <div class="container">
                <div class="row">
                    <div class="col-50">
                        <h3>Оплата</h3>
                        <label for="cname">Имя на карте</label>
                        <input type="text" id="cname" name="cardname" placeholder="John More Doe">
                        <label for="ccnum">Номер карты</label>
                        <input type="text" id="ccnum" name="cardnumber" placeholder="1111-2222-3333-4444" v-mask="'####-####-####-####'">
                        <label for="expmonth">Срок действия</label>
                        <input type="text" id="expmonth" name="expmonth" placeholder="01/23" v-mask="'##/##'">

                        <label for="cvv">CVV</label>
                        <input type="text" id="cvv" name="cvv" placeholder="352" v-mask="'###'">
                    </div>

                    <div class="col-50">
                        <h3>Контактная информация</h3>
                        <label for="fname">Ваше имя (полное)</label>
                        <input type="text" id="fname" name="firstname" placeholder="Иванов Иван Иванович">
                        <label for="email">Почта</label>
                        <input type="text" id="email" name="email" placeholder="example@mail.ru">
                    </div>
                </div>
                <input type="submit" value="Оплатить" class="btn" @click="pay">
            </div>
        </div>
    </div>
</template>

<script>
import {mask} from 'vue-the-mask';

export default {
    name: "Payment",
    props: ['adId'],
    directives: {
        mask,
    },
    methods: {
        pay() {
            this.$http.put('/api/Cards/' + this.adId, {
                isPaid: true
            })
            .then(this.$router.back())
            .catch((err) => console.log(err));
        }
    }
}
</script>

<style scoped>
.row {
  display: -ms-flexbox; /* IE10 */
  display: flex;
  flex-direction: row;
  -ms-flex-wrap: wrap; /* IE10 */
  flex-wrap: wrap;
}

.col-25 {
  -ms-flex: 25%; /* IE10 */
  flex: 25%;
}

.col-50 {
  -ms-flex: 50%; /* IE10 */
  flex: 50%;
}

.col-75 {
  -ms-flex: 75%; /* IE10 */
  flex: 75%;
}

.col-25,
.col-50,
.col-75 {
  padding: 0 16px;
  box-sizing: border-box;
}

.container {
  background-color: #f2f2f2;
  padding: 5px 20px 15px 20px;
  border: 1px solid lightgrey;
  border-radius: 3px;
}

input[type=text] {
  width: 100%;
  margin-bottom: 20px;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

label {
  margin-bottom: 10px;
  display: block;
}

.icon-container {
  margin-bottom: 20px;
  padding: 7px 0;
  font-size: 24px;
}

.btn {
  background-color: #4CAF50;
  color: white;
  padding: 12px;
  margin: 10px 0;
  border: none;
  width: 100%;
  border-radius: 3px;
  cursor: pointer;
  font-size: 17px;
}

.btn:hover {
  background-color: #45a049;
}

span.price {
  float: right;
  color: grey;
}

/* Responsive layout - when the screen is less than 800px wide, make the two columns stack on top of each other instead of next to each other (and change the direction - make the "cart" column go on top) */
@media (max-width: 800px) {
  .row {
    flex-direction: column;
  }
  .col-25 {
    margin-bottom: 20px;
  }
}
</style>