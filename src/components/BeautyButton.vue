<template>
  <button :class="'btn btn-primary btn-' + look + (disabled ? ' disabled btn-' + look + '-disabled' : '')" v-on:click="$emit('click', $event)" >
    <slot>{{ text }}</slot>
  </button>
</template>

<script>
export default {
  name: "BeautyButton",
  props: {
    text: String,
    look: String,
    disabled: Boolean,
  },
};
</script>

<style scoped>
.btn {
  padding: 10px;
  border-radius: 12px;
  font-weight: bold;
  font-size: 20px;
  text-decoration: none;
  color: black;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.9);
  white-space: nowrap;
  cursor: pointer;
  display: block;
  text-align: center;
  width: fit-content;
  user-select: none;
  border: none;
}

.btn-primary {
  /* background: linear-gradient(to top right, #5e02a0, #685ac7); */
  background: linear-gradient(to top right, #452c8a, #735ff7);
}

.btn-primary:hover {
  background: linear-gradient(to top right, #250164, #322491);
}

.btn-primary:active {
  background:#6A5ACD;
  /*padding: 8px;*/
  /*font-size: 19px;*/
  color: #252531;
}

.btn-secondary {
  background: linear-gradient(to top right, #008080, #25cac2);
}

.btn-secondary:hover {
  background: linear-gradient(to top right, #014747, #1da29c);
}

.btn-secondary:active {
  background: #14a19a;
  /*padding: 8px;*/
  /*font-size: 19px;*/
  color: #252531;
}

.btn-accept {
  background: linear-gradient(to top right, #028d47, #3ae93a );
}

.btn-accept:hover {
  background: linear-gradient(to top right, #015a2e, #238823);
}

.btn-accept:active {
  background: #3caa3c;
  /*padding: 8px;*/
  /*font-size: 19px;*/
  color: #252531;
}

.btn-reject {
  background: linear-gradient(to top right, #ff0000, #f8b706);
}

.btn-reject:hover {
  background: linear-gradient(to top right, #b40c0c, #fda744);
}

.btn-reject:active {
  background: #ff4500;
  /*padding: 8px;*/
  /*font-size: 19px;*/
  color: #252531;
}
 
.btn-warning {
  background: linear-gradient(to top right, #ff0000, #fd6428);
}

.btn-warning:hover {
  background: linear-gradient(to top right, #c21919, #d11b14);
}

.btn-warning:active {
  background: #ff0000;
  /*padding: 8px;*/
  /*font-size: 19px;*/
  color: #252531;
}

.disabled {
  user-select: none;
  color: #3b3b3b;
  pointer-events: none;
}

.btn-primary-disabled {
  background: linear-gradient(to top right, #5626cf, #4843c7);
}

.btn-secondary-disabled {
  background: linear-gradient(to top right, #02b0b3, #6bc8ca);
}

.btn-accept-disabled {
  background: linear-gradient(to top right, #2e8a5c, #ace9ac);
}

.btn-reject-disabled {
  background: linear-gradient(to top right, #fd7171, #eecc6e);
}
.btn-warning-disabled {
  background: linear-gradient(to top right, #fd6c6c, #f5a687);
}

</style>
