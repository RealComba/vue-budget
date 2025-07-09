<script setup>
import Header from '/src/components/Header.vue';
import Amount from '/src/components/Amount.vue';
import Recap from '/src/components/Recap.vue';
import Cards from '/src/components/Cards.vue';
import Buttons from '/src/components/Buttons.vue';
import Total from '/src/components/Total.vue';


</script>

<template>
    <div class="container">
    <Header></Header>
    <Total></Total>
    <div class="flex flex-row justify-center">
        <Buttons></Buttons>
    </div>
          <Recap></Recap>
          <Amount></Amount>
          <Cards></Cards>
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

@media (max-width: 395px) {
    .container {
        min-width: 395px;
        overflow-x: auto;
    }
}
</style>