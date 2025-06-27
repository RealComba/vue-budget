<script setup>
import { storeTransaction } from "/src/store/store.js"

const store = storeTransaction()



</script>

<template>
     <div class="flex flex-row justify-center m-8 h-105">
        <div class="flex flex-col bg-gray-100 p-4 rounded-lg w-80 gap-6">
            <div class="flex flex-col gap-2">
                <button @click="closeGoal('close')" class="flex justify-end font-bold text-lg">X</button>
                <label class="font-bold text-xl" for="amount">{{`Aggiungi a ${goal}`}}</label>
                <input class="rounded-lg p-2 font-bold text-black border-1 border-gray-400" placeholder="Nome obiettivo" type="text" v-model="name">
            </div>
            <div class="flex flex-col gap-2">
                <label class="font-bold text-xl" for="categories">Importo di Partenza</label>
                <input class="rounded-lg p-2 font-bold text-black border-1 border-gray-400" placeholder="0.00€" type="number" name="categories" id="transaction" v-model.number="firstAmount">
            </div>
            <div class="flex flex-col gap-2">
                <label class="font-bold text-xl" for="type">Importo da Raggiungere</label>
                <input class="rounded-lg p-2 font-bold text-black border-1 border-gray-400" placeholder="0.00€" type="number" id="transaction-type" v-model.number="maxAmount">
            </div>
            <button class="bg-black text-white p-2 rounded-lg font-bold" @click="newGoal()">Aggiungi obiettivo</button>
        </div>
    </div>
</template>


