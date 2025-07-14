<script setup>
import Header from '/src/components/Header.vue';
import Amount from '/src/components/Amount.vue';
import Recap from '/src/components/Recap.vue';
import Cards from '/src/components/Cards.vue';
import Buttons from '/src/components/Buttons.vue';
import Total from '/src/components/Total.vue';
import DarkButton from '../components/DarkButton.vue';
import { storeTransaction } from '../store/store';

const store = storeTransaction()

</script>

<template>
  <div :class="store.dark ? 'bg-neutral-800 text-white mt-0' : 'bg-white'">
    <DarkButton></DarkButton>
    <Header></Header>
    <Total></Total>
    <Buttons></Buttons>
    <Recap></Recap>
    <Amount></Amount>
    <Cards></Cards>
  </div>
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

div {
  margin: 0px;
}

@media (max-width: 395px) {
    .container {
        min-width: 395px;
    }
}
</style>