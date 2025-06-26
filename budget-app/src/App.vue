<script setup>
import Header from './components/Header.vue';
import Amount from './components/Amount.vue';
import Recap from './components/Recap.vue';
import Form from './components/Form.vue'
import Cards from './components/Cards.vue';
import Goals from './components/Goals.vue';

</script>

<template>
  <Header></Header>
  <div class="flex flex-row justify-center">
  <Goals></Goals>
  <Form></Form>
  </div>
<div class="flex justify-center">
<div class="amount">
  <Recap></Recap>
  <Amount></Amount>
  <Cards></Cards>
</div>
</div>
</template>

<style scoped>
*{
  margin: 10px;
}
.amount {
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */
  height: 100%;
}

</style>