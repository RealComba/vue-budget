<script setup>
import Amount from '../components/Amount.vue'
import Form from '../components/TransactionForm.vue'
import { computed } from 'vue'
import { storeTransaction } from '../store/store'
import { useRouter } from  'vue-router'

const router = useRouter()
const store = storeTransaction()

const dataArray = store.transaction

const reversedArray = computed (() => {
    return [...dataArray].reverse()
})

function addTransaction() {
    store.closeForm('active')
}


</script>

<template>
<div class="flex flex-col justify-center p-2 gap-4">
    <div class="flex flex-row justify-center">
        <div class="flex flex-row w-120 justify-between items-center pt-10">
            <img class="w-8" src="https://www.svgrepo.com/show/510041/left-arrow.svg" @click="router.push({ path:'/'})" alt="">
            <div class="flex flex-col gap-2">
                <p class="font-bold text-2xl sm:text-4xl">Tutte le Transazioni</p>
                <p class="text-gray-600">Cronologia Completa</p>
            </div>
            <button class=" w-10 h-10 text-center bg-black text-white rounded-md" @click="addTransaction">+</button>
        </div>
    </div>
    <Amount></Amount>  
    <div class="flex justify-center">
        <div class="flex flex-col border-1 rounded-lg border-gray-300 w-130 min-h-100">
            <div class="flex flex-row justify-between p-7">
                <p class="font-bold text-xl">Cronologia</p>
            </div>
            <div class="flex flex-col m-5 gap-5 pb-4">
                <div v-for="card in reversedArray "
                :key="card.id"
                class="p-2 rounded-md w-full m-2">
                <span class="flex flex-row justify-between h-10 m-10 items-center p-5" v-if="card.category === 'earning'">
                <div class="flex flex-row items-center gap-5">
                    <div class="flex bg-green-200 rounded-md w-10 h-10 justify-center">
                        <img class="w-8" src="/Users/tommasocont/Desktop/vue-budget/budget-app/src/svg/arrow-up-right-svgrepo-com.svg" alt="">
                    </div>
                    <div class="flex flex-col m-0px text-container">
                        <p class="text-md sm:text-lg font-medium ">{{ card.description }}</p>
                        <p class="text-sm sm:text-md text-gray-500">{{ card.date }}</p>
                    </div>
                </div>
                <p class="font-bold sm:text-lg text-green-600 ">{{ `+ ${card.amount}€ ` }}</p>
            </span>
            <span class="flex flex-row items-center justify-between h-10 m-10 p-5" v-if="card.category === 'expense'">
                <div class="flex flex-row items-center gap-5">
                    <div class="flex bg-red-200 rounded-md w-10 h-10 justify-center">
                        <img class="w-8" src="/Users/tommasocont/Desktop/vue-budget/budget-app/src/svg/arrow-down-right-svgrepo-com.svg" alt="">
                    </div>
                    <div class="flex flex-col m-0 text-container">
                        <p class="text-md sm:text-lg font-medium">{{ card.description }}</p>
                        <p class="text-sm sm:text-md text-gray-500">{{ card.date }}</p>
                    </div>
                </div>
                <p class="font-bold sm:text-lg text-red-600 ">{{ `- ${card.amount}€ ` }}</p>
            </span>
            <span class="flex flex-row items-center justify-between h-10 m-10 p-5" v-if="card.category === 'savings'">
                <div class="flex flex-row items-center gap-5 h-10">
                    <div class="flex bg-blue-400 rounded-md w-10 h-10 justify-center">
                        <img class="w-6" src="/Users/tommasocont/Desktop/vue-budget/budget-app/src/svg/target-svgrepo-com.svg" alt="">
                    </div>
                    <div class="flex flex-col m-0 text-container">
                        <p class="text-md sm:text-lg font-medium">{{ card.type }}</p>
                        <p class="text-sm sm:text-md text-gray-500">{{ card.date }}</p>
                    </div>
                </div>
                <p class="font-bold text-md sm:text-lg text-red-600 ">{{ `- ${card.amount}€ ` }}</p>
            </span>
            <span class="flex flex-row items-center justify-between h-10 m-10 p-5" v-if="card.category === 'refund-savings'">
                <div class="flex flex-row items-center gap-5">
                    <div class="flex bg-blue-400 rounded-md w-10 h-10 justify-center">
                        <img class="w-6" src="/Users/tommasocont/Desktop/vue-budget/budget-app/src/svg/target-svgrepo-com.svg" alt="">
                    </div>
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
        <transition name="fade">
        <div v-if="store.showForm === 'active' " class="fixed inset-0 z-50 flex items-center justify-center">
            <div class="absolute inset-0 bg-black/60 "></div>
            <div class="relative z-10">
                <Form></Form>
            </div>
        </div>
    </transition>
</div> 
</template>

<style scoped>

@media (max-width: 395px) {
    .container {
        min-width: 395px;
        overflow-x: auto;
    }
}

.fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s;
}
.fade-enter-from, .fade-leave-to {
    opacity: 0;
}
</style>