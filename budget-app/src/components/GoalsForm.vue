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
    store.closeGoalsForm('close')
    name.value = null
    firstAmount.value = null
    maxAmount.value = null
}

function closeGoal(event) {
    store.closeGoalsForm(event)
}

</script>

<template>
     <div class="flex flex-row justify-center m-8 h-105">
        <div class="flex flex-col bg-gray-100 p-4 rounded-lg w-80 gap-6"
        :class="store.dark ? 'bg-neutral-700' : 'bg-white'">
            <div class="flex flex-col gap-2">
                <div class="flex flex-row justify-between pb-2">
                    <p class="font-bold text-2xl">Nuovo Obiettivo</p>
                    <button @click="closeGoal('close')" class="flex justify-end font-bold text-lg">X</button>
                </div>
                <input class="rounded-lg p-2 font-bold border-1 border-gray-400" placeholder="Nome obiettivo" type="text" v-model="name">
            </div>
            <div class="flex flex-col gap-2">
                <label class="font-bold text-xl" for="categories">Importo di Partenza</label>
                <input class="rounded-lg p-2 font-bold border-1 border-gray-400" placeholder="0.00€" type="number" name="categories" id="transaction" v-model.number="firstAmount">
            </div>
            <div class="flex flex-col gap-2">
                <label class="font-bold text-xl" for="type">Importo da Raggiungere</label>
                <input class="rounded-lg p-2 font-bold border-1 border-gray-400" placeholder="0.00€" type="number" id="transaction-type" v-model.number="maxAmount">
            </div>
            <button class="bg-black text-white p-2 rounded-lg font-bold" @click="newGoal()">Aggiungi obiettivo</button>
        </div>
    </div>
</template>