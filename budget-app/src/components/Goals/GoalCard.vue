<script setup>
import { storeTransaction } from "/src/store/store.js"
import { ref } from "vue"

const store = storeTransaction()
const newAmount = ref(100)

function getPercent(goal) {
    return Math.round((goal.firstAmount/goal.maxAmount) * 100)
}

function addMoney(goalId) {
    store.addGoalAmount(goalId, newAmount.value)
}

</script>

<template>
<div class="flex justify-center flex-col items-center gap-5">
    <div v-for="(goal) in store.goals" :key="goal.id">
        <div class="border-1 rounded-md border-gray-300 w-120 p-10">
            <div class="flex flex-row justify-between items-center">
                <div class="flex flex-row items-center gap-5">
                    <div class="rounded-full p-2 w-5 h-5 bg-blue-700"></div>
                    <div class="flex flex-col">
                        <p class="font-semibold text-lg">{{ goal.name }}</p>
                        <p class="text-md text-gray-500">{{ `Mancano €${goal.maxAmount - goal.firstAmount}` }}</p>
                    </div>
                </div>
                <p class="font-bold text-xl">{{ getPercent(goal) }}%</p>
            </div>
            <div class="pt-6">
                <div class="rounded-full bg-gray-100 relative p-2 bg-black w-full">
                    <div class="rounded-full p-2 bg-black absolute top-0 left-0 rounded-r-sm"
                        :style = "{ width: getPercent(goal) + '%' }">
                    </div> 
                </div>
            </div>
            <div class="flex flex-row justify-between ">
                <p class="pt-4 text-md text-gray-500 ">{{ `€${goal.firstAmount}` }}</p>
                <p class="pt-4 text-md text-gray-500 ">{{ `€${goal.maxAmount}` }}</p>
            </div>
            <div class="flex flex-row pt-4 gap-2">
                <button class="w-70 border-1 rounded-md border-gray-200 p-1 font-semibold hover:bg-gray-100" @click="addMoney(goal.id)">+ Aggiungi</button>
                <button class="w-15 border-1 rounded-md border-gray-200 p-1 font-semibold hover:bg-gray-100" >Md</button>
                <button class="w-15 border-1 rounded-md border-gray-200 p-1 text-black font-semibold hover:bg-gray-100 ">X</button>
            </div>
        </div>
    </div>
</div>

</template>