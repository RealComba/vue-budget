<script setup>
import { computed } from 'vue'
import { storeTransaction } from "../store/store"
import ArrowUp from "../svg/arrow-up-right-svgrepo-com.svg"
import ArrowDown from "../svg/arrow-down-right-svgrepo-com.svg"

const store = storeTransaction()

const inputs = computed(() => [
  {
    label: 'Entrate',
    value: store.earningsTotal,
    icon: ArrowUp,
    bgColor: 'bg-green-200',
    textColor: 'text-green-600',
    darkTextColor: 'text-green-400'
  },

  {
    label: 'Spese',
    value: store.expensesTotal,
    icon: ArrowDown,
    bgColor: 'bg-red-200',
    textColor: 'text-red-600',
    darkTextColor: 'text-red-400'
  }
])
</script>

<template>
    <div class="flex justify-center">
        <div class="flex flex-row gap-5 w-130">
            <div v-for="input in inputs"
            :key="input.label"  
            class="flex flex-row rounded-md p-2 pt-4 pb-4 sm:p-6 border-1 border-gray-300 w-full h-full gap-5 items-center"
            :class="(store.dark) ? 'bg-neutral-700 border-none' : 'bg-white' ">
            <div :class="`flex ${input.bgColor} rounded-md w-10 h-10 justify-center`">
              <img class="w-8" :src="input.icon" alt="">
            </div>
            <div class="flex flex-col">
                <p :class="(store.dark) ? 'text-white' : 'text-gray-700' ">{{ input.label }}</p>
                <p class="font-bold text-lg"
                :class="(store.dark) ? input.darkTextColor : input.textColor">{{  `€ ${Math.abs(input.value)}` }}</p>
            </div>
            </div>
        </div>
    </div>
</template>

<style scoped>


</style>

