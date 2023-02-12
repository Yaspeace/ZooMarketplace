<template>
  <div class="main-wrapper">
    <div>Мои предложения</div>
    <div class="offer-wrap">
      <div class="offer-text">Вы владелец питомника, приюта или фермерского подворья?</div>
      <div class="offer-lower">
        Вам однозначно сюда:
        <a href="#"> Перейти в бизнес-аккаунт </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main-wrapper {
  background: var(--secondary-grad);
  border-radius: 14px;
}

.offer-wrap {
  padding: 9px;
  font-weight: bold;
  font-size: 18px;
  text-align: left;
}
.offer-text{
  font-size: 18px;
  font-style: italic;
}

.offer-lower {
  margin-top: 1.5em;
}

a {
  text-decoration: underline;
  font-size: 17px;
  color: var(--nyashnie-letters);
}
</style>
