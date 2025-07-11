<script setup>
import { computed, ref } from 'vue'
import { storeTransaction } from '/src/store/store'

const store = storeTransaction()

const dataArray = store.transaction

const lastTransaction = computed (() => {
    return dataArray.slice(-4).reverse()
})

</script>

<template>
<div class="flex justify-center">
    <div class="flex flex-col border-1 rounded-lg border-gray-300 w-130 h-95">
        <div class="flex flex-row justify-between p-7">
            <p class="font-bold text-xl">Transazioni Recenti</p>
            <RouterLink to="/transaction">Vedi Tutte</RouterLink>
        </div>
        <div class="flex flex-col m-5 gap-5">
            <div v-for="card in lastTransaction "
            :key="card.id"
            class="p-2 rounded-md m-2">
            <span class="flex flex-row justify-between h-10 m-10 items-center p-5" v-if="card.category === 'earning'">
                <div class="flex flex-row items-center gap-5">
                    <div class="bg-green-400 rounded-md w-10 h-10"></div>
                    <div class="flex flex-col m-0px text-container">
                        <p class="text-md sm:text-lg font-medium ">{{ card.description }}</p>
                        <p class="text-sm sm:text-md text-gray-500">{{ card.date }}</p>
                    </div>
                </div>
                <p class="font-bold sm:text-lg text-green-600 ">{{ `+ ${card.amount}€ ` }}</p>
            </span>
            <span class="flex flex-row items-center justify-between h-10 m-10 p-5" v-if="card.category === 'expense'">
                <div class="flex flex-row items-center gap-5">
                    <div class="bg-red-400 rounded-md w-10 h-10"></div>
                    <div class="flex flex-col m-0px text-container">
                        <p class="text-md sm:text-lg font-medium">{{ card.description }}</p>
                        <p class="text-sm sm:text-md text-gray-500">{{ card.date }}</p>
                    </div>
                </div>
                <p class="font-bold sm:text-lg text-red-600 ">{{ `- ${card.amount}€ ` }}</p>
            </span>
            <span class="flex flex-row items-center justify-between h-10 m-10 p-5" v-if="card.category === 'savings'">
                <div class="flex flex-row items-center gap-5 b-4">
                    <div class="bg-blue-400 rounded-md w-10 h-10"></div>
                    <div class="flex flex-col m-0px text-container">
                        <p class="text-md sm:text-lg font-medium"><br>{{ card.type }}</p>
                        <p class="text-sm sm:text-md text-gray-500">{{ card.date }}</p>
                    </div>
                </div>
                <p class="font-bold text-md sm:text-lg text-red-600 ">{{ `- ${card.amount}€ ` }}</p>
            </span>
            <span class="flex flex-row items-center justify-between h-10 m-10 p-5" v-if="card.category === 'refund-savings'">
                <div class="flex flex-row items-center gap-5">
                    <div class="bg-blue-400 rounded-md w-10 h-10"></div>
                    <div class="flex flex-col m-0px text-container">
                        <p class="text-md sm:text-lg font-medium">{{ card.type }}</p>
                        <p class="text-sm sm:text-md text-gray-500">{{ card.date }}</p>
                    </div>
                </div>
                <p class="font-bold sm:text-lg text-green-600 ">{{ ` ${Math.abs(card.amount)}€ ` }}</p>
            </span>
            </div>
        </div>
    </div>
</div>
</template>

<style scoped>
.text-container p{
    margin: 0px !important;
}
</style>