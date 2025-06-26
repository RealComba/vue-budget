<script setup>
import { storeTransaction } from '/src/store/store.js'; 
import { ref } from 'vue'

const transaction = ref()
const category = ref()
const store = storeTransaction()
const tsxType = ref()


const newTransaction = () => {
    if (!category.value || !transaction.value || !tsxType.value) {
        return console.log('error')
    }
    store.newTsx (category.value, transaction.value, tsxType.value)
    transaction.value = null
    tsxType.value = ''
}


</script>

<template>
    <div class="flex flex-row justify-center m-8 h-90">
        <div class="flex flex-col bg-gray-100 p-4 rounded-lg w-70 text-center gap-4">
            <label class="font-bold" for="amount">Importo Transazione</label>
            <input class="bg-gray-200 rounded-lg p-2 text-center" type="text" v-model.number="transaction">
            <label class="font-bold" for="categories">Tipologia Transazione</label>
            <select class="text-center p-2 bg-gray-200 rounded-lg"name="categories" id="transaction" v-model="category">
                <option value="expense">Spesa</option>
                <option value="earning">Entrata</option>
                <option value="savings">Risparmio</option>
            </select>
            <label class="font-bold" for="type">Descrizione Transazione</label>
            <input class="text-center p-2 bg-gray-200 rounded-lg" type="text" id="transaction-type" v-model="tsxType">
            <button class="bg-gray-200 p-2 rounded-lg font-bold "@click="newTransaction()">Add Transaction</button>
         </div>
    </div>
</template>

<style scoped>

</style>