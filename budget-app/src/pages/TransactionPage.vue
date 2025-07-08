<script setup>
import Amount from '../components/Amount.vue'
import { storeTransaction } from '../store/store'

const store = storeTransaction()

const dataArray = store.transaction.reverse()

function addGoal() {
    store.closeGoalsForm('active')
}

</script>

<template>
<div class="flex flex-row justify-center">
    <div class="flex flex-row w-120 justify-between items-center pt-10">
    <div class="flex flex-col gap-2">
        <p class="font-bold text-4xl">Tutte le Transazioni</p>
        <p class="text-gray-600">Cronologia Completa</p>
    </div>
    <button class=" w-10 h-10 text-center bg-black text-white rounded-md" @click="addGoal"></button>
    </div>
    
</div>
<div class="flex flex-col items-center">
        <div class="flex flex-col w-150 p-10 gap-5">
        <Amount></Amount>   
<div class="flex flex-col border-1 rounded-lg border-gray-300 w-130 h-full min-h-100">
    <div class="flex flex-row justify-between p-7">
        <p class="font-bold text-xl">Transazioni Recenti</p>
        <RouterLink to="/transaction">Vedi Tutte</RouterLink>
    </div>
    <div class="flex flex-col m-5 gap-5 pb-4">
        <div v-for="card in dataArray "
        :key="card.id"
        class="p-2 rounded-md w-full m-2">
        <span class="flex flex-row justify-between h-10 m-10 items-center p-5" v-if="card.category === 'earning'">
                <div class="flex flex-row items-center gap-5">
                    <div class="bg-green-400 rounded-md w-10 h-10">
                    </div>
                <div class="flex flex-col m-0px text-container">
                    <p class="text-lg font-medium ">{{ card.type }}</p>
                    <p class="text-md text-gray-500">{{ card.date }}</p>
                </div>
                </div>
                <p class="font-bold text-lg text-green-600 ">{{ `+ ${card.amount}€ ` }}</p>
        </span>
       <span class="flex flex-row items-center justify-between h-10 m-10 p-5" v-if="card.category === 'expense'">
                <div class="flex flex-row items-center gap-5">
                <div class="bg-red-400 rounded-md w-10 h-10">
                </div>
                <div class="flex flex-col m-0px text-container">
                    <p class="text-lg font-medium">{{ card.type }}</p>
                    <p class="text-md text-gray-500">{{ card.date }}</p>
                </div>
                </div>
                <p class="font-bold text-lg text-red-600 ">{{ `- ${card.amount}€ ` }}</p>
        </span>
        <span class="flex flex-row items-center justify-between h-10 m-10 p-5" v-if="card.category === 'savings'">
                <div class="flex flex-row items-center gap-5">
                <div class="bg-blue-400 rounded-md w-10 h-10">
                </div>
                <div class="flex flex-col m-0px text-container">
                    <p class="text-lg font-medium">{{ card.type }}</p>
                    <p class="text-md text-gray-500">{{ card.date }}</p>
                </div>
                </div>
                <p class="font-bold text-lg text-red-600 ">{{ `- ${card.amount}€ ` }}</p>
        </span>
                <span class="flex flex-row items-center justify-between h-10 m-10 p-5" v-if="card.category === 'refund-savings'">
                <div class="flex flex-row items-center gap-5">
                <div class="bg-blue-400 rounded-md w-10 h-10">
                </div>
                <div class="flex flex-col m-0px text-container">
                    <p class="text-lg font-medium">{{ card.type }}</p>
                    <p class="text-md text-gray-500">{{ card.date }}</p>
                </div>
                </div>
                <p class="font-bold text-lg text-green-600 ">{{ ` ${Math.abs(card.amount)}€ ` }}</p>
        </span>
        </div>
    </div>
</div>
</div>
</div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s;
}
.fade-enter-from, .fade-leave-to {
    opacity: 0;
}
</style>