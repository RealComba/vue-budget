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
    store.closeForm('close')
}

function closeAdd(event) {
    store.closeForm(event)
}



</script>

<template>
    <div class="flex flex-row justify-center m-8 h-115 ">
        <div class="flex flex-col bg-gray-100 p-4 rounded-lg w-80 gap-6">
            <div class="flex flex-col gap-2">
                <div class="flex flex-row justify-between pb-2">
                    <p class="font-bold text-2xl">Nuova Transazione</p>
                    <button @click="closeAdd('close')" class="flex justify-end font-bold text-lg">X</button>
                </div>
                
                <label class="font-bold text-xl" for="amount">Inserisci Importo</label>
                <input class="rounded-lg p-2 h-12 text-base font-bold text-black border-1 border-gray-400 placeholder:font-semibold" placeholder="0.00€" type="number" v-model.number="transaction">
            </div>
            <div class="flex flex-col gap-2">
                <label class="font-bold text-xl" for="type">Descrizione Transazione</label>
                <input class="p-2 rounded-lg h-12 text-base border-gray-400 border-1 font-bold text-black placeholder:font-semibold" placeholder="Inserisci Descrizione" type="text" id="transaction-type" v-model="tsxType">
            </div>
            <div class="flex flex-col gap-2">
                <label class="font-bold text-xl" for="categories">Tipologia Transazione</label>
                <select class="p-2 rounded-lg h-12 text-base border-1 border-gray-400 font-bold placeholder:font-semibold" name="categories" id="transaction" v-model="category">
                    <option value="expense">Spesa</option>
                    <option value="earning">Entrata</option>
                    <!-- <option value="savings">Risparmio</option> -->
                </select>
            </div>
            <button class="bg-black text-white p-2 h-12 text-lg rounded-lg font-bold "@click="newTransaction()">Aggiungi Transazione</button>
         </div>
    </div>
</template>

<style scoped>

</style>