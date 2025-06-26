<script setup>
import { storeTransaction } from "/src/store/store.js"
import { computed } from "vue"

// const { totalValue } = totalTransaction()
const store = storeTransaction()

  function randomColor() {
    const colors = [
      'bg-red-500',
      'bg-blue-500',
      'bg-green-500',
      'bg-yellow-500',
      'bg-purple-500',
      'bg-pink-500',
      'bg-indigo-500',
      'bg-teal-500'
    ];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  }

function getPercent(goal) {
    return Math.round((goal.firstAmount/goal.maxAmount) * 100)
}

const lastGoal = computed(() => {
    return store.goals.slice(-3).reverse()
})

</script>

<template>
<div class="flex justify-center">
    <div class="flex flex-col border-1 rounded-lg border-gray-300 w-130 h-95">
        <div class="flex flex-row justify-between pl-7 pr-7 pt-5 pb-3">
            <p class="font-bold text-xl">I Tuoi Obiettivi</p>
            <a href="">Vedi Tutti</a>
        </div>
        <div v-for="(goal, idx) in lastGoal" :key="goal.id">
            <div class="flex flex-row justify-between pr-7 pl-7 p-3 items-center">
                <div class="flex flex-row gap-3 items-center">
                    <div class="rounded-full p-2 w-4 h-4"
                    :class="randomColor()"></div>
                    <div class="flex flex-col">
                        <p class="font-bold">{{ goal.name }}</p>
                        <p class="text-gray-400">{{ `€${goal.firstAmount}` }} di {{ `€${goal.maxAmount}` }}</p>
                    </div>
                </div>
                <p class="font-bold text-lg">{{ getPercent(goal) }}%</p>
            </div>
            <div class="pl-7 pr-7 pb-2">
                <div class="rounded-full bg-gray-100 relative p-1.25 bg-black w-full">
                    <div class="rounded-full p-1.25 bg-black absolute top-0 left-0 rounded-r-sm"
                    :style = "{ width: getPercent(goal) + '%' }">
                    </div> 
                </div>
            </div>
        </div>
    </div>
</div>
<!-- <p>{{ store.totalValue }}</p> -->
</template>

<style scoped>

</style>




