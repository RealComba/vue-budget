<script setup>
import Amount from '../components/Amount.vue'
import Form from '../components/TransactionForm.vue'
import { computed } from 'vue'
import { storeTransaction } from '../store/store'
import { useRouter } from  'vue-router'
import DarkButton from '../components/DarkButton.vue'

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
<div class="flex flex-col justify-center p-2 gap-4"
 :class="store.dark ? 'bg-neutral-800 text-white' : 'bg-white'">
 <DarkButton></DarkButton>  
    <div class="flex flex-row justify-center">
        <div class="flex flex-row w-120 justify-between items-center">
         <svg  class="w-8 rounded-lg "
         :fill="store.dark ? 'white' : 'black'" @click="router.push({ path:'/'})" alt=""  viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M11.7071 4.29289C12.0976 4.68342 12.0976 5.31658 11.7071 5.70711L6.41421 11H20C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H6.41421L11.7071 18.2929C12.0976 18.6834 12.0976 19.3166 11.7071 19.7071C11.3166 20.0976 10.6834 20.0976 10.2929 19.7071L3.29289 12.7071C3.10536 12.5196 3 12.2652 3 12C3 11.7348 3.10536 11.4804 3.29289 11.2929L10.2929 4.29289C10.6834 3.90237 11.3166 3.90237 11.7071 4.29289Z">
            </path> 
            </g>
        </svg> 
            <div class="flex flex-col gap-2">
                <p class="font-bold text-2xl sm:text-4xl">Tutte le Transazioni</p>
                <p :class="store.dark ? 'text-white' : 'text-gray-600' ">Cronologia Completa</p>
            </div>
            <button class=" w-10 h-10 text-center text-2xl rounded-md"
            :class="store.dark ? 'bg-blue-800 text-white' : 'bg-black text-white'"  @click="addTransaction">+</button>
        </div>
    </div>
    <Amount></Amount>  
    <div class="flex justify-center">
        <div class="flex flex-col border-1 rounded-lg border-gray-300 w-130 min-h-100"
        :class="store.dark ? 'bg-neutral-700 text-white border-none' : 'bg-white'">
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
                        <p class="text-sm sm:text-md"
                        :class="(store.dark) ? 'text-slate-300' : 'text-gray-500' ">{{ card.date }}</p>
                    </div>
                </div>
                <p class="font-bold sm:text-lg"
                :class="(store.dark) ? 'text-green-400' : 'text-green-600'">{{ `+ ${card.amount}€ ` }}</p>
            </span>
            <span class="flex flex-row items-center justify-between h-10 m-10 p-5" v-if="card.category === 'expense'">
                <div class="flex flex-row items-center gap-5">
                    <div class="flex bg-red-200 rounded-md w-10 h-10 justify-center">
                        <img class="w-8" src="/Users/tommasocont/Desktop/vue-budget/budget-app/src/svg/arrow-down-right-svgrepo-com.svg" alt="">
                    </div>
                    <div class="flex flex-col m-0 text-container">
                        <p class="text-md sm:text-lg font-medium">{{ card.description }}</p>
                        <p class="text-sm sm:text-md"
                        :class="(store.dark) ? 'text-slate-300' : 'text-gray-500' ">{{ card.date }}</p>
                    </div>
                </div>
                <p class="font-bold sm:text-lg"
                :class="(store.dark) ? 'text-red-400' : 'text-red-600'">{{ `- ${card.amount}€ ` }}</p>
            </span>
            <span class="flex flex-row items-center justify-between h-10 m-10 p-5" v-if="card.category === 'savings'">
                <div class="flex flex-row items-center gap-5 h-10">
                    <div class="flex bg-blue-400 rounded-md w-10 h-10 justify-center">
                        <img class="w-6" src="/Users/tommasocont/Desktop/vue-budget/budget-app/src/svg/target-svgrepo-com.svg" alt="">
                    </div>
                    <div class="flex flex-col m-0 text-container">
                        <p class="text-md sm:text-lg font-medium">{{ card.type }}</p>
                        <p class="text-sm sm:text-md"
                        :class="(store.dark) ? 'text-slate-300' : 'text-gray-500' ">{{ card.date }}</p>
                    </div>
                </div>
                <p class="font-bold text-md sm:text-lg"
                :class="(store.dark) ? 'text-red-400' : 'text-red-600'">{{ `- ${card.amount}€ ` }}</p>
            </span>
            <span class="flex flex-row items-center justify-between h-10 m-10 p-5" v-if="card.category === 'refund-savings'">
                <div class="flex flex-row items-center gap-5">
                    <div class="flex bg-blue-400 rounded-md w-10 h-10 justify-center">
                        <img class="w-6" src="/Users/tommasocont/Desktop/vue-budget/budget-app/src/svg/target-svgrepo-com.svg" alt="">
                    </div>
                    <div class="flex flex-col m-0px text-container">
                        <p class="text-md sm:text-lg font-medium">{{ card.type }}</p>
                        <p class="text-sm sm:text-md"
                        :class="(store.dark) ? 'text-slate-300' : 'text-gray-500' ">{{ card.date }}</p>
                    </div>
                </div>
                <p class="font-bold sm:text-lg"
                :class="(store.dark) ? 'text-green-400' : 'text-green   -600'">{{ ` ${Math.abs(card.amount)}€ ` }}</p>
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

html {
  background-color: rgb(255, 255, 255);
  color: black;
  margin: 0;
  padding: 0;
  min-height: 100%;
}

html.black {
  background-color: rgb(40, 40, 40);
  color: white;
  margin: 0;
  padding: 0;
  min-height: 100%;
}

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