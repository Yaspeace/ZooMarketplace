<template>
    <div class="main row" @click="$event.stopPropagation()">
        <div class="col-75">
            <div class="container">
                <div class="row">
                    <div class="col-50">
                        <h3>Реквизиты банковской карты</h3>
                        <label for="ccnum">Номер карты*</label>
                        <input 
                          type="text" 
                          placeholder="1111-2222-3333-4444" 
                          v-mask="'####-####-####-####'" 
                          v-on:input="focusNext($event, 19, $refs.months, cardData.number)" 
                          v-model="cardData.number.value" 
                          :class="cardData.number.isValid? '' : 'invalid'">
                        <label for="expmonth">Срок действия*</label>
                        <input 
                          ref="months" 
                          type="text" 
                          placeholder="01/23" 
                          v-mask="'##/##'" 
                          v-on:input="focusNext($event, 5, $refs.cvv, cardData.months)" 
                          v-model="cardData.months.value"
                          :class="cardData.months.isValid? '' : 'invalid'">
                        <label for="cvv">CVV*</label>
                        <input 
                          ref="cvv" 
                          type="text" 
                          placeholder="352" 
                          v-mask="'###'" 
                          v-on:input="focusNext($event, 3, $refs.name, cardData.cvv)" 
                          v-model="cardData.cvv.value"
                          :class="cardData.cvv.isValid? '' : 'invalid'">
                        <label for="cname">Имя на карте</label>
                        <input 
                          ref="name" 
                          type="text" 
                          placeholder="JOHN DEERE" 
                          v-on:input="toUpper($event)" 
                          v-model="cardData.name.value"
                          :class="cardData.name.isValid? '' : 'invalid'">
                    </div>
                </div>
                <div class="row" style="width: 100%;justify-content: space-between;">
                  <input type="submit" value="Подтвердить" class="btn" @click="pay" />
                  <input type="submit" value="Отмена" class="btn" @click="$emit('cancel', $event)" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mask} from 'vue-the-mask';

export default {
    name: "Payment",
    data() {
      return {
        namePrevVal: '',
        namePrevSelStart: 0,
        cardData: {
          number: {
            value: '',
            isValid: true
          },
          months: {
            value: '',
            isValid: true
          },
          cvv: {
            value: '',
            isValid: true
          },
          name: {
            value: '',
            isValid: true
          },
        },
      }
    },
    directives: {
        mask,
    },
    methods: {
        pay(event) {
          let isValid = true;
          if(this.cardData.number.value.length != 19) {
            this.cardData.number.isValid = false;
            isValid = false;
          }

          if(this.cardData.months.value.length != 5) {
            this.cardData.months.isValid = false;
            isValid = false;
          }

          if(this.cardData.cvv.value.length != 3) {
            this.cardData.cvv.isValid = false;
            isValid = false;
          }

          if(isValid) {
            event.cardData = {
              number: this.cardData.number.value,
              months: this.cardData.months.value,
              cvv: this.cardData.cvv.value,
              name: this.cardData.name.value
            };
            this.$emit('done', event);
          }
        },
        toUpper(e) {
          // Check if value is number
          let isValid = this.cardData.name.value.match(/^[a-zA-Z ]*$/);

          if (isValid) {
            // preserve input state
            this.cardData.name.value = this.cardData.name.value.toUpperCase();
            this.namePrevVal = this.cardData.name.value;
            this.namePrevSelStart = e.target.selectionStart;
          } else {
            // restore previous valid input state.
            // we have to fire one more Input event in  order to reset cursor position.
            this.cardData.name.value = this.namePrevVal;
            e.target.selectionStart = this.namePrevSelStart;
            e.target.selectionEnd = this.namePrevSelStart;
            e.target.dispatchEvent(new InputEvent('input'));
          }
        },
        focusNext(e, toFocus, elem, field) {
          field.isValid = true;
          if(e.target.value.length == toFocus) {
            elem.focus();
          }
        },
        makeValid(field) {
          field.isValid = true;
        }
    }
}
</script>

<style scoped>
.main {
  padding-top: 50px;
  box-sizing: border-box;
}
.row {
  display: -ms-flexbox; /* IE10 */
  display: flex;
  flex-direction: row;
  -ms-flex-wrap: wrap; /* IE10 */
  flex-wrap: wrap;
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
  transition: .5s;
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
  width: 40%;
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

.invalid {
  border-color: red !important;
}
</style>