<script setup>
import { storeTransaction } from '../store/store';
import Chart from '../components/Barcharts.vue';
import Cake from '../components/Cake.vue';
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import DarkButton from '../components/DarkButton.vue'
import Graph from '../components/Graph.vue'

const store = storeTransaction()
const show = ref('graph')
const router = useRouter()


const higherAmount = computed(() => {
    const amount = store.groupedLabel.map(g => g.value)
    const nmax = amount.length > 0 ? Math.max(...amount) : 0
    const name = store.groupedLabel.filter(g => g.value === nmax).map(g => g.label)
    return {
        nmax,
        name,
    }

})  

function active(param) {
    show.value = param
}
</script>


<template>
    <DarkButton></DarkButton>
    <div class="flex justify-center">
        <div class="flex flex-col items-center max-w-140 w-full px-4">
            <div class="container flex flex-col justify-center p-2 pl-4 gap-4">
                <div class="flex flex-row justify-center">
                    <div class="flex flex-row w-120 items-center pt-10 gap-10">
                       <svg  class="w-8 rounded-lg "
                        :fill="store.dark ? 'white' : 'black'" @click="router.push({ path:'/'})" alt=""  viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M11.7071 4.29289C12.0976 4.68342 12.0976 5.31658 11.7071 5.70711L6.41421 11H20C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H6.41421L11.7071 18.2929C12.0976 18.6834 12.0976 19.3166 11.7071 19.7071C11.3166 20.0976 10.6834 20.0976 10.2929 19.7071L3.29289 12.7071C3.10536 12.5196 3 12.2652 3 12C3 11.7348 3.10536 11.4804 3.29289 11.2929L10.2929 4.29289C10.6834 3.90237 11.3166 3.90237 11.7071 4.29289Z">
                            </path> 
                            </g>
                        </svg> 
                        <div class="flex flex-col gap-2">
                            <p class="font-bold text-2xl sm:text-4xl">Analytics</p>
                            <p :class="store.dark ? 'text-white' : 'text-gray-600'">Le tue statistiche finanziarie</p>
                        </div>
                    </div>
                </div>
                <div class="flex flex-row justify-center items-center w-full gap-4">
                    <div class="flex flex-col border-1 border-gray-300 text-center p-5 w-full h-full rounded-lg gap-1"
                    :class="store.dark ? 'bg-neutral-700 border-none' : 'bg-white'">
                        <p class="font-extrabold text-green-600 text-3xl">€{{ store.totFirstAmount }}</p>
                        <p class="text-sm"
                        :class="store.dark ? 'text-white' : 'text-gray-600'">Risparmi Totali</p>
                        <p class="text-green-600 text-sm">{{ ` ${Math.round((store.totalSavings/store.balance) * 100)}% del saldo totale ` }}</p>
                    </div>
                    <div class="flex flex-col border-1 border-gray-300 text-center p-5 w-full h-full rounded-lg gap-1"
                    :class="store.dark ? 'bg-neutral-700 border-none' : 'bg-white'">
                        <p class="text-blue-500 font-extrabold text-3xl">€{{ (store.totMaxAmount - store.totFirstAmount) }}</p>
                        <p class="text-sm"
                        :class="store.dark ? 'text-white' : 'text-gray-600'">Importo da saldare</p>
                        <p class="text-sm text-blue-500 ">{{ `${Math.round(100 - (store.totFirstAmount/store.totMaxAmount) * 100 || 0)}% ancora da saldare` }}</p>
                    </div>
                </div>
                <div class="flex flex-row items-center rounded-lg text-center justify-evenly w-100% p-1"
                :class="store.dark ? 'bg-neutral-700' : 'bg-gray-100 border-1 border-gray-300'">
                    <!-- <button @click="active('build')" class="p-2 rounded-md"
                    :class="show === 'build' ? 'bg-white' : 'bg-gray-100' ">Progresso</button> -->
                    <button
                @click="active('exp')"
                class="rounded-md p-2"
                :class="{
                    'bg-white text-black': show === 'exp' && !store.dark,
                    'bg-gray-100 text-black': show !== 'exp' && !store.dark,
                    'bg-neutral-500': show === 'exp' && store.dark,
                    'bg-neutral-700': show !== 'exp' && store.dark
                }"
                >
                Spese
                </button>
                    <button @click="active('goal')" class="rounded-md p-2"
                :class="{
                    'bg-white text-black': show === 'goal' && !store.dark,
                    'bg-gray-100 text-black': show !== 'goal' && !store.dark,
                    'bg-neutral-500': show === 'goal' && store.dark,
                    'bg-neutral-700': show !== 'goal' && store.dark
                }"
                >
                Obiettivi
                </button>
                <button @click="active('graph')" class="rounded-md p-2"
                :class="{
                    'bg-white text-black': show === 'graph' && !store.dark,
                    'bg-gray-100 text-black': show !== 'graph' && !store.dark,
                    'bg-neutral-500': show === 'graph' && store.dark,
                    'bg-neutral-700': show !== 'graph' && store.dark
                }"
                >
                Movimenti
                </button>
                </div>
                <div class="flex flex-col p-4 sm:p-10 border-1 border-gray-300 rounded-lg shadow w-full gap-4" 
                :class="store.dark ? 'bg-neutral-700 border-none' : 'bg-white'">
                    <div v-if="show === 'goal'"class="flex flex-row gap-2 items-center">
                        <svg width="20px" height="20px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M8 4C5.79086 4 4 5.79086 4 8C4 10.2091 5.79086 12 8 12C10.2091 12 12 10.2091 12 8C12 5.79086 10.2091 4 8 4ZM6 8C6 6.89543 6.89543 6 8 6C9.10457 6 10 6.89543 10 8C10 9.10457 9.10457 10 8 10C6.89543 10 6 9.10457 6 8Z" fill="#000000"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0ZM2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8Z" fill="#000000"/>
                        </svg>
                        <p class="font-bold text-xl">Progresso Obiettivi</p>
                    </div>
                    <div v-if="show === 'exp'"class="flex flex-row gap-2 items-center">
                        <img class="w-7" src="/Users/tommasocont/Desktop/vue-budget/budget-app/src/svg/cake-graphic-svgrepo-com.svg" alt="">
                        <p class="font-bold text-xl">Spese per Categoria</p>
                    </div>
                    <div v-if="show === 'goal'">
                        <div class="position-relative min-w-90">
                            <Chart></Chart>
                        </div>
                    </div>
                    <div v-else-if="show === 'exp'">
                        <div class="position-relative min-w-90">
                            <Cake></Cake>
                        </div>
                    </div>
                    <div v-else-if="show === 'graph'">
                        <div class="position-relative min-w-90 min-h-70">
                            <Graph></Graph>
                        </div>
                    </div>
                    <div class="flex flex-row justify-center" v-else>
                        <p class="font-bold text-xl">In Costruzione :)</p>
                    </div>
                </div>
                <div v-if="show === 'goal' "v-for="goal in store.goals" :key="goal.id" class="flex flex-col rounded-lg border-1 border-gray-300 p-6 gap-3"
                :class="store.dark ? 'bg-neutral-700 border-none' : 'bg-white'">
                    <div class="flex flex-row justify-between">
                        <p class="font-bold text-xl">{{ goal.name }}</p>
                        <p class="font-bold text-xl">{{ `${Math.round((goal.firstAmount/goal.maxAmount) * 100)}%` }}</p>
                    </div>
                    <div class="rounded-full bg-gray-100 relative p-1.25 bg-black">
                        <div class="rounded-full p-1.25 bg-black absolute top-0 left-0 rounded-r-sm"
                            :class="(goal.firstAmount === goal.maxAmount) ? 'bg-green-600' : 'bg-black'"
                            :style = "{ width: Math.round((goal.firstAmount/goal.maxAmount) * 100) + '%' }">
                        </div> 
                    </div>
                    <p :class="store.dark ? 'text-white' : 'text-gray-600'">{{ `€${goal.firstAmount} / €${goal.maxAmount}` }}</p>
                </div>
                <div v-if="show === 'exp'" class="flex flex-row w-full justify-center gap-4">
                    <div class="flex flex-col rounded-lg border-1 border-gray-300 p-5 gap-1 w-full items-center"
                    :class="store.dark ? 'bg-neutral-700 border-none' : 'bg-white'">
                        <p class="font-extrabold text-red-500 text-2xl">€{{  store.expensesTotal }}</p>
                        <p class="text-sm">Spese Totali</p>
                        <p class="text-red-500 text-sm text-center">-5% mese scorso</p>
                    </div>
                    <div class="flex flex-col rounded-lg border-1 border-gray-300 p-5 w-full items-center gap-1"
                    :class="store.dark ? 'bg-neutral-700 border-none' : 'bg-white'">
                        <p class="text-orange-500 font-extrabold text-2xl">€{{ higherAmount.nmax }}</p>
                        <p class="text-sm">Categoria Top</p>
                        <p class="text-sm">{{ higherAmount.name.join() }}</p>
                    </div>
                </div>
            </div>
        </div>    
    </div>
</template>

<style scoped>
@media (max-width: 390px) {
    .container {
        min-width: 390px;
        overflow-x: auto;
    }
}
</style>
