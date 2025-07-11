<script setup>
import { storeTransaction } from '../store/store';
import Chart from '../components/Barcharts.vue';
import Cake from '../components/Cake.vue';
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const store = storeTransaction()
const show = ref()
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
    <div class="flex justify-center">
        <div class="flex flex-col items-center max-w-140 w-full px-4">
            <div class="container flex flex-col justify-center p-2 pl-4 gap-4">
                <div class="flex flex-row justify-center">
                    <div class="flex flex-row w-120 items-center pt-10 gap-10">
                        <img class="w-8" src="https://www.svgrepo.com/show/510041/left-arrow.svg" @click="router.push({ path:'/'})" alt="">
                        <div class="flex flex-col gap-2">
                            <p class="font-bold text-2xl sm:text-4xl">Analytics</p>
                            <p class="text-gray-600">Le tue statistiche finanziarie</p>
                        </div>
                    </div>
                </div>
                <div class="flex flex-row justify-center items-center w-full gap-4">
                    <div class="flex flex-col border-1 border-gray-300 text-center p-5 w-full h-full rounded-lg gap-1">
                        <p class="font-extrabold text-green-600 text-3xl">€{{ store.totFirstAmount }}</p>
                        <p class="text-gray-600 text-sm">Risparmi Totali</p>
                        <p class="text-green-600 text-sm">{{ ` ${Math.round((store.totalSavings/store.balance) * 100)}% del saldo totale ` }}</p>
                    </div>
                    <div class="flex flex-col border-1 border-gray-300 text-center p-5 w-full h-full rounded-lg gap-1">
                        <p class="text-blue-600 font-extrabold text-3xl">€{{ (store.totMaxAmount - store.totFirstAmount) }}</p>
                        <p class="text-sm text-gray-600  ">Importo da saldare</p>
                        <p class="text-sm text-blue-600 ">{{ `${Math.round(100 - (store.totFirstAmount/store.totMaxAmount) * 100 || 0)}% ancora da saldare` }}</p>
                    </div>
                </div>
                <div class="flex flex-row items-center bg-gray-100 rounded-lg text-center justify-evenly w-100% p-1">
                    <!-- <button @click="active('build')" class="p-2 rounded-md"
                    :class="show === 'build' ? 'bg-white' : 'bg-gray-100' ">Progresso</button> -->
                    <button @click="active('exp')" class="active:bg-white rounded-md p-2"
                    :class="show === 'exp' ? 'bg-white' : 'bg-gray-100'">Spese</button>
                    <button @click="active('goal')" class="active:bg-white rounded-md p-2"
                    :class="show === 'goal' ? 'bg-white' : 'bg-gray-100'">Obiettivi</button>
                    <!-- <button @click="active('flux')" class="active:bg-white rounded-md p-2"
                    :class="show === 'flux' ? 'bg-white' : 'bg-gray-100'">Flussi</button> -->
                </div>
                <div class="flex flex-col p-4 sm:p-10 border-1 border-gray-300 rounded-lg shadow w-full gap-4">
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
                        <Chart/>
                    </div>
                    <div v-else-if="show === 'exp'">
                        <div class="position-relative min-w-90">
                            <Cake></Cake>
                        </div>
                    </div>
                    <div class="flex flex-row justify-center" v-else>
                        <p class="font-bold text-xl">In Costruzione :)</p>
                    </div>
                </div>
                <div v-if="show === 'goal' "v-for="goal in store.goals" :key="goal.id" class="flex flex-col rounded-lg border-1 border-gray-300 p-6 gap-3">
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
                    <p class="text-gray-600">{{ `€${goal.firstAmount} / €${goal.maxAmount}` }}</p>
                </div>
                <div v-if="show === 'exp'" class="flex flex-row w-full justify-center gap-4">
                    <div class="flex flex-col rounded-lg border-1 border-gray-300 p-5 gap-1 w-full items-center">
                        <p class="font-extrabold text-red-500 text-2xl">€{{  store.expensesTotal }}</p>
                        <p class="text-sm">Spese Totali</p>
                        <p class="text-red-500 text-sm text-center">-5% mese scorso</p>
                    </div>
                    <div class="flex flex-col rounded-lg border-1 border-gray-300 p-5 w-full items-center gap-1">
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
