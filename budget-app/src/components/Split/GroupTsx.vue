<script setup>
import { storeTransaction } from "/src/store/store.js"
import { userStore } from "../../store/userStore"
import { computed } from 'vue'

const darkStore = storeTransaction()
const store = userStore()

function payId(id) {
    store.pay(id)
}


</script>

<template>
    <div v-for="(transaction) in store.groupTransaction" :key="transaction.id">
        <div class="flex justify-center p-2">
            <div class="border-1 rounded-md border-gray-300 w-120 sm:p-2"
                :class="store.dark ? 'bg-neutral-700 border-none' : 'bg-white'">
                <div class="flex flex-col justify-between p-2">
                    <div class="flex flex-col p-2">
                        <div class="flex flex-row gap-5 justify-between items-center">
                            <div class="flex flex-row justify-between items-center gap-5" :class="transaction.paid === false ? '' : 'opacity-50'">
                                <div class="bg-blue-200 rounded-lg w-10 h-10" :class="transaction.paid === false ? 'bg-blue-200' : 'bg-green-200'"></div>
                                <div class="flex flex-col">
                                    <p class="font-semibold text-lg">{{ transaction.name }}</p>
                                    <p class="text-base w-65"
                                    :class="store.dark ? 'text-gray-300' : 'text-gray-500'">{{ store.groupData.find(g => g.id === transaction.groupId).name }} - {{ transaction.date }}</p>
                                </div>
                            </div>
                            <div class="flex flex-col text-center" :class="transaction.paid === false ? '' : 'opacity-50'">
                                <p class="font-bold text-2xl">€{{ transaction.amount }}</p>
                                <p class="text-md text-gray-500">{{ (transaction.amount/transaction.members.length).toFixed(2) }}€ a testa</p>
                            </div>
                        </div>
                        <div class="flex flex-row gap-2 pt-3 justify-between" :class="transaction.paid === false ? '' : 'opacity-[3]'">
                            <div class="flex flex-row">
                                <p class="text-gray-500">Pagato da: <span class="font-semibold">{{ transaction.buyer }}</span></p>
                            </div>
                            <p v-if="transaction.paid === false" class="bg-gray-100 rounded-2xl p-1.5 text-center text-sm font-semibold w-25">in sospeso</p>
                            <p v-else class="bg-green-500 rounded-2xl p-1.5 text-center text-sm font-semibold w-25 text-white">Pagato</p>
                        </div>
                        <p v-if="transaction.description" class="text-gray-500 w-80">descrizione: {{ transaction.description }}</p>
                        <div class="flex justify-between pt-2">
                            <div class="flex flex-row pt-2 gap-1">
                                <p v-for="initial in transaction.initials" class="p-1 rounded-full text-gray-600 bg-gray-100 w-8 h-8 text-center">{{ initial }}</p>
                            </div>
                            <button v-if="transaction.buyer !== 'Tu' && transaction.paid === false" class="flex flex-row p-2 border-gray-200 rounded-lg border-1 w-20 sm:w-25 justify-evenly" 
                             @click="payId(transaction.id)"><img class="w-4"src="https://www.svgrepo.com/show/218150/confirm.svg" alt="">Salda</button>
                        </div>
                    </div> 
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>