<script setup>
import { storeTransaction } from "/src/store/store.js"
import { ref } from "vue"

const store = storeTransaction()
const name = ref()
const firstAmount = ref()
const maxAmount = ref()

function newGoal () {
     if (!name.value || !firstAmount.value || !maxAmount.value) {
        return console.log('error')
    }
    if (firstAmount.value > maxAmount.value) return
    
    store.Goals(name.value, firstAmount.value, maxAmount.value)
    name.value = null
    firstAmount.value = null
    maxAmount.value = null
}

</script>

<template>
     <div class="flex flex-row justify-center m-8 h-90">
        <div class="flex flex-col bg-gray-100 p-4 rounded-lg w-70 text-center gap-4">
            <label class="font-bold" for="amount">Nome Obiettivo</label>
            <input class="bg-gray-200 rounded-lg p-2 text-center" type="text" v-model="name">

            <label class="font-bold" for="categories">Importo di Partenza</label>
            <input class="text-center p-2 bg-gray-200 rounded-lg"name="categories" id="transaction" v-model.number="firstAmount">

            <label class="font-bold" for="type">Importo da Raggiungere</label>
            <input class="text-center p-2 bg-gray-200 rounded-lg" type="text" id="transaction-type" v-model.number="maxAmount">

            <button class="bg-gray-200 p-2 rounded-lg font-bold "@click="newGoal()">Aggiungi obiettivo</button>
         </div>
    </div>
</template>