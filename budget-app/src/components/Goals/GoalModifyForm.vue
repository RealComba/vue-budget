<script setup>
import { storeTransaction } from "/src/store/store.js"
import { ref } from "vue"

const store = storeTransaction()

const name = ref(store.goalActive.name)
const max = ref(store.goalActive.maxAmount)

function close (){
    store.closeGoalsForm('close')
}

function edit() {
    if (!name.value) return
    if (store.goalActive.firstAmount >= max.value) return
    store.modifyGoal(name.value , max.value)
    store.closeGoalsForm('close')
} 

</script>

<template>
     <div class="flex flex-row justify-center m-8 h-90">
        <div class="flex flex-col bg-gray-100 p-4 rounded-lg w-85 gap-6">
            <div class="flex flex-col gap-2">
                <div class="flex flex-row justify-between pb-4">
                    <p class="font-bold text-xl">Modifica Obiettivo</p>
                    <button @click="close()" class="flex justify-end font-bold text-lg">X</button>
                </div>
                <label class="font-bold text-xl pb-2" for="goal">Nome Obiettivo</label>
                <input class="rounded-lg p-2 font-semibold text-black border-1 border-gray-400 text-gray-600 text-rg" placeholder="" type="text" v-model="name">
                <label class="font-bold text-xl pt-2" for="goalName">Obiettivo (€)</label>
                <input class="rounded-lg p-2 font-semibold text-black border-1 border-gray-400 text-gray-600 text-rg" type="number" id="" v-model="max">
            </div>
            <button class="bg-black text-white p-2 rounded-lg font-bold" @click="edit()">Salva</button>
        </div>
    </div>
</template>