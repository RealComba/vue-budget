<script setup>
import { storeTransaction } from "../store/store"

const store = storeTransaction()
</script>

<template>
    <div class="flex flex-row gap-5">
        <div class="flex flex-row rounded-md p-6 border-1 border-gray-300 w-full h-full gap-5 items-center">
            <div class="bg-green-400 rounded-md w-10 h-10"></div>
            <div class="flex flex-col">
            <p class="text-gray-700">Entrate</p>
            <p class="text-green-600 font-bold text-lg">{{  `€ ${store.earningsTotal}` }}</p>
        </div>
        </div>
        <div class="flex flex-row rounded-md p-6 border-1 border-gray-300 w-full h-full gap-5 items-center">
            <div class="bg-red-400 rounded-md w-10 h-10"></div>
            <div class="flex flex-col">
                <p class="text-gray-700">Spese</p>
                <p class="text-red-600 font-bold text-lg">{{ `€ ${store.expensesTotal}` }}</p>
            </div>
        </div>
    </div>
</template>

<style scoped>


</style>

