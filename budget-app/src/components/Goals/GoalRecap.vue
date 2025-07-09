<script setup>
import { storeTransaction } from "/src/store/store.js"

const store = storeTransaction()

</script>

<template>
<div class="flex justify-center p-2">
    <div class="flex flex-row bg-green-600 rounded-lg w-120 h-55 items-center justify-between">
        <div class="flex flex-col justify-center pl-5 sm:pl-10 gap-4">
            <p class="text-green-200 text-lg">Progresso Totale</p>
            <p v-if="!store.totFirstAmount" class="text-white text-4xl font-bold" >0%</p>
            <p v-else class="text-white text-4xl font-bold">{{ ` ${Math.round((store.totFirstAmount/store.totMaxAmount) * 100)}% ` }}</p>
            <div class="rounded-full bg-gray-100 relative p-1.25 bg-black w-50 sm:w-80">
                <div class="rounded-full p-1.25 bg-black absolute top-0 left-0 rounded-r-sm"
                    :style = "{ width: Math.round((store.totFirstAmount/store.totMaxAmount) * 100) + '%' }">
                </div> 
            </div>
            <p class="text-green-200 text-md ">{{ `€${store.totFirstAmount} di €${store.totMaxAmount}` }}</p>
        </div>
        <div class="pr-5 pl-5 sm:p-10">
            <svg width="50px" height="50px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M8 4C5.79086 4 4 5.79086 4 8C4 10.2091 5.79086 12 8 12C10.2091 12 12 10.2091 12 8C12 5.79086 10.2091 4 8 4ZM6 8C6 6.89543 6.89543 6 8 6C9.10457 6 10 6.89543 10 8C10 9.10457 9.10457 10 8 10C6.89543 10 6 9.10457 6 8Z" fill="#000000"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0ZM2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8Z" fill="#000000"/>
            </svg>
        </div>
    </div>
</div>

</template>