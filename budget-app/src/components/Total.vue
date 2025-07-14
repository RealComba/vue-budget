<script setup>
import { storeTransaction } from "/src/store/store.js"

const store = storeTransaction()

</script>

<template>
<div class="flex justify-center">
    <div class="flex flex-row bg-blue-600 rounded-lg w-130 h-40 items-center justify-between">
        <div class="flex flex-col justify-center p-5 sm:p-10 gap-4">
            <div class="flex flex-col">
                <p class="text-blue-200 text-lg">Saldo totale</p>
                <p class="text-white text-3xl sm:text-4xl font-bold">{{ `€${ store.balance }` }}</p>
            </div>
            <div class="flex flex-col">
                <div v-if="store.totalValue < 0"class="flex flex-row items-center gap-2">
                    <img class="w-8 h-8" src="/img/arrow.png" alt="">
                    <p class="text-white text-sm">{{ `-€${ Math.abs(store.totalValue) } questo mese` }}</p>
                </div>
                <div v-else class="flex flex-row items-center gap-2 ">
                    <img class="w-6 h-6" src="/img/increase.png" alt="">
                    <p class="text-white text-sm sm:text-base">{{ `€${store.totalValue} questo mese `}}</p>
                </div>
            </div>
        </div>
        <div class="p-5 sm:p-10">
            <img v-if="(!store.dark)" class="w-10 h-10 sm:w-14 h-14" src="https://www.svgrepo.com/show/481069/cute-pig-line-drawing.svg" alt="">
            <img v-else class="w-10 h-10 sm:w-14 h-14" src="/Users/tommasocont/Desktop/vue-budget/budget-app/src/svg/cute-pig-line-drawing-svgrepo-com.svg" alt="">
        </div>
    </div>
</div>

</template>