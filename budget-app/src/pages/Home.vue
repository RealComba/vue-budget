<script setup>
import Header from '/src/components/Header.vue';
import Amount from '/src/components/Amount.vue';
import Recap from '/src/components/Recap.vue';
import Cards from '/src/components/Cards.vue';
import Buttons from '/src/components/Buttons.vue';
import Total from '/src/components/Total.vue';
import { ref } from 'vue'
import { storeTransaction } from '../store/store';

const store = storeTransaction()

function darkMode(param) {
  store.dark = !store.dark
  console.log(store.dark)
}

</script>

<template>
    <button class="rounded-full bg-black text-white" @click="darkMode('active')">Dark</button>
    <Header></Header>
    <Total></Total>
    <Buttons></Buttons>
    <Recap></Recap>
    <Amount></Amount>
    <Cards></Cards>
</template>

<style scoped>
*{
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 10px;
}

.amount {
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */
  height: 100%;
}

@media (max-width: 395px) {
    .container {
        min-width: 395px;
    }
}
</style>