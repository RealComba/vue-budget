<script setup>
import { storeTransaction } from "/src/store/store.js"
import { ref } from "vue"

const store = storeTransaction()
const newAmount = ref(0)

function addAmount (){
    if (!Number.isFinite(newAmount.value)) return
    if (newAmount.value > (store.goalActive.maxAmount - store.goalActive.firstAmount)) return
    store.newAmount(newAmount)
    store.closeForm(false)
    console.log(store.earningsTotal)
}

</script>

<template>
     <div class="flex flex-row justify-center m-8 h-80">
        <div class="flex flex-col bg-gray-100 p-4 rounded-lg w-85 gap-6 fixed">
            <div class="flex flex-col gap-2">
                <div class="flex flex-row justify-between">
                    <label class="font-bold text-xl pb-2" for="amount">Importo da aggiungere a "{{ store.goalActive.name }}"</label>
                    <button @click="addAmount()" class="flex justify-end font-bold text-lg">X</button>
                </div>
                <input class="rounded-lg p-4 font-extrabold text-black border-1 border-gray-400 text-center text-gray-600 text-2xl" placeholder="0.00€" type="number" v-model="newAmount">
            </div>
            <div class="flex flex-col bg-gray-200 rounded-md gap-3 p-2">
                <div class="flex flex-row pl-3 pr-3 justify-between">
                    <p>Progresso Attuale:</p>
                    <p class="font-bold"> €{{ parseInt(store.goalActive.firstAmount) }} / €{{ parseInt(store.goalActive.maxAmount) }}</p> 
                </div>
                <div v-if="newAmount" class="flex flex-row pl-3 pr-3 text-green-600 justify-between">
                    <p>Dopo l'aggiunta:</p>
                    <p class="font-bold"> €{{ parseInt(store.goalActive.firstAmount + newAmount) }}</p>
                </div>
            </div>
            <div class="">
                <button class="bg-black text-white p-2 rounded-lg font-bold w-full" @click="addAmount()">Aggiungi €{{ parseInt(newAmount || 0 )}}</button>
            </div>
        </div>
    </div>
</template>