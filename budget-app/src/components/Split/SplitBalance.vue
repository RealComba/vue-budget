<script setup>
import { userStore } from '../../store/userStore';
import { computed } from 'vue'


function getTsxInfo(id) {

}

const store = userStore()
const colors = ["bg-red-500", "bg-pink-500", "bg-purple-500", "bg-violet-500", "bg-indigo-500", "bg-blue-500", "bg-sky-500", "bg-cyan-500", "bg-teal-500", "bg-green-500", "bg-lime-500", "bg-yellow-500", "bg-amber-500", "bg-orange-500", "bg-rose-500", "bg-neutral-500", "bg-zinc-500", "bg-gray-500", "bg-slate-500", "bg-stone-500"]


</script>

<template>
<div class="flex justify-center">
    <div class="flex flex-col w-120 justify-between items-center gap-5">
        <div class="flex flex-row bg-blue-50 rounded-lg border-1 border-gray-300 w-120 justify-between p-8">
            <p class="text-center text-sm"><span class="text-3xl text-blue-600 font-extrabold">{{ store.groupTransaction.filter(t => t.buyer === 'Tu').length }}</span><br>Pagamenti da Ricevere</p>
            <p class="text-center text-sm"><span class="text-3xl text-green-600 font-extrabold">{{  }}</span><br>Pagamenti Ricevuti</p>
            <p class="text-center text-sm"><span class="text-3xl text-purple-600 font-extrabold">{{ store.groupTransaction.filter(t => t.paid === true && t.buyer !== 'Tu').length }}</span><br> Spese Saldate</p>
        </div>
        <div v-for="(group, idx) in store.groupData" :key="group.id" class="border-1 border-gray-300 rounded-lg">
            <div class="flex flex-col">
                <div class="flex flex-row p-8 w-120 items-center gap-5">
                    <div class="rounded-full p-2 w-5 h-5"
                    :class="colors[idx % colors.length]"></div>
                    <p class="text-lg font-bold">{{ group.name }}</p>
                    <p class="bg-gray-100 rounded-xl pl-3 pr-3 text-sm font-semibold">{{ store.groupTransaction.filter(t => t.buyer === 'Tu').length }} da ricevere</p>
                </div>
                <div v-for="transaction in store.groupTransaction" :key="transaction.id" class="flex flex-row pl-8">
                    <div v-for="member in transaction.members" :key="member.name" class="bg-gray-200 p-2">
                        <p v-if="transaction.buyer === 'Tu' && member !== 'Tu'">{{` ${member} deve a Tu` }}</p>
                    </div>  
                </div>
            </div>
        </div>
    </div>
</div>
</template>