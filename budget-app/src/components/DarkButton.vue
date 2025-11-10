<script setup>
import { storeTransaction } from '../store/store';

const store = storeTransaction()

function darkMode() {
  store.dark = !store.dark
  console.log(store.dark)
  document.documentElement.classList.toggle('black', store.dark)
}

</script>

<template>
<div class="wrapper">
  <label class="switch">
    <input type="checkbox" name="theme_switch" @click="darkMode()">
    <span class="slider"></span>
   </label>
   </div>
</template>


<style scoped>

.switch {
    position: relative;
    display: inline-block;
    width: 68px;
    height: 38px;
    margin: 5px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  top: 30px;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: grey;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: 34px;
}

@keyframes going-dark {
  100% {
    -webkit-transform: translateX(28px);
  }
}

@keyframes going-light {
  0% {
    -webkit-transform: translateX(28px);
  }
  100% {
    -webkit-transform: translateX(0px);
  }
}

.slider:before {
  position: absolute;
  content: '';
  height: 24px;
  width: 24px;
  left: 8px;
  bottom: 7px;
  background-color: white;
  border-radius: 50%;
  -webkit-animation: going-light 0.4s cubic-bezier(0.57, 1.52, 0.64, 1) normal;
  -webkit-transition: 0.4s;
  animation: going-light 0.4s cubic-bezier(0.57, 1.52, 0.64, 1) normal;
  transition: 0.4s;
}

input:checked + .slider:before {
  background-color: white;
  -webkit-animation: going-dark 0.4s cubic-bezier(0.57, 1.52, 0.64, 1) forwards;
  -webkit-transition: all 0.4s;
  animation: going-dark 0.4s cubic-bezier(0.57, 1.52, 0.64, 1) forwards;
  transition: all 0.4s;
}

</style>