<script setup>
import { storeTransaction } from "../store/store"

const store = storeTransaction()
</script>

<template>
    <div class="flex justify-center">
        <div class="flex flex-row gap-5 w-130">
            <div class="flex flex-row rounded-md p-2 pt-4 pb-4 sm:p-6 border-1 border-gray-300 w-full h-full gap-5 items-center"
            :class="(store.dark) ? 'bg-neutral-700 border-none' : 'bg-white' ">
                <div class="flex bg-green-200 rounded-md w-10 h-10 justify-center">
                    <img class="w-8" src="/Users/cont2/Downloads/interactive-vue-map-sunday/vue-budget/budget-app/src/svg/arrow-up-right-svgrepo-com.svg" alt="">
                </div>
                <div class="flex flex-col">
                <p :class="(store.dark) ? 'text-white' : 'text-gray-700' ">Entrate</p>
                <p class="font-bold text-lg"
                :class="(store.dark) ? 'text-green-400' : 'text-green-600'">{{  `€ ${Math.abs(store.earningsTotal)}` }}</p>
            </div>
            </div>
            <div class="flex flex-row rounded-md p-2 pt-4 pb-4 sm:p-6 border-1 border-gray-300 w-full h-full gap-5 items-center"
            :class="(store.dark) ? 'bg-neutral-700 border-none' : 'bg-white' ">
                <div class="flex bg-red-200 rounded-md w-10 h-10 justify-center">
                    <img class="w-8" src="/Users/cont2/Downloads/interactive-vue-map-sunday/vue-budget/budget-app/src/svg/arrow-down-right-svgrepo-com.svg" alt="">
                </div>
                <div class="flex flex-col">
                    <p :class="(store.dark) ? 'text-white' : 'text-gray-700'">Spese</p>
                    <p class="font-bold text-lg"
                    :class=" (store.dark) ? 'text-red-400' : 'text-red-600' ">{{ `€ ${store.expensesTotal}` }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>


</style>

