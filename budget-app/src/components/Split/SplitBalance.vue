<script setup>
import { userStore } from '../../store/userStore';
import { computed, transformVNodeArgs } from 'vue'



const store = userStore()
const colors = ["bg-red-500", "bg-pink-500", "bg-purple-500", "bg-violet-500", "bg-indigo-500", "bg-blue-500", "bg-sky-500", "bg-cyan-500", "bg-teal-500", "bg-green-500", "bg-lime-500", "bg-yellow-500", "bg-amber-500", "bg-orange-500", "bg-rose-500", "bg-neutral-500", "bg-zinc-500", "bg-gray-500", "bg-slate-500", "bg-stone-500"]


function paid(memberName, transactionId) {
  const member = store.members.find(m => m.name === memberName);
  if (member) {
    const transaction = member.transactions.find(t => t.id === transactionId);
    if (transaction) {
      transaction.paid = true;
      store.paidTransaction(transactionId)
    }
  }
  console.log(store.members)
}

</script>

<template>
<div class="flex justify-center">
    <div class="flex flex-col w-120 justify-between items-center gap-5">
        <div class="flex flex-row bg-blue-50 rounded-lg border-1 border-gray-300 w-120 justify-between p-8">
            <p class="text-center text-sm"><span class="text-3xl text-blue-600 font-extrabold">{{ store.groupTransaction.filter(t => t.buyer === 'Tu').length }}</span><br>Da Ricevere</p>
            <p class="text-center text-sm"><span class="text-3xl text-green-600 font-extrabold">{{ store.groupTransaction.filter(t => t.buyer === true && t.paid === false).length }}</span><br>Pagamenti Ricevuti</p>
            <p class="text-center text-sm"><span class="text-3xl text-purple-600 font-extrabold">{{ store.groupTransaction.filter(t => t.paid === true && t.buyer !== 'Tu').length }}</span><br> Spese Saldate</p>
        </div>
        <div v-for="(group, idx) in store.groupData" :key="group.id" class="border-1 border-gray-300 rounded-lg pb-4">
            <div class="flex flex-col">
                <div class="flex flex-row w-120 items-center gap-5 pb-4 p-6">
                    <div class="rounded-full p-2 w-5 h-5"
                        :class="colors[idx % colors.length]"></div>
                        <p class="text-lg font-bold">{{ group.name }}</p>
                        <p class="bg-gray-100 rounded-xl pl-3 pr-3 text-sm font-semibold">{{ store.groupTransaction.filter(t => t.buyer === 'Tu' && t.groupId === group.id).length }} da ricevere</p>
                    </div>
                <div v-for="transaction in store.groupTransaction.filter(t => t.buyer === 'Tu' && t.groupId === group.id)" :key="transaction.id" class="flex flex-col">
                    <div class="p-2 pl-4 pr-4" v-for="memberName in transaction.members.filter(m => m !== 'Tu')" :key="memberName">
                        <div class="bg-blue-50 rounded-lg flex flex-row justify-between items-center p-4 w-full">
                            <p class="initial bg-gray-300 p-2 w-10 h-10 rounded-full text-center">
                                {{ memberName.split(' ').map(w => w[0]).join('').toUpperCase() }}
                            </p>
                            <p>{{ memberName }} deve a Tu <br> <span class="text-gray-500 text-sm">Da spese condivise</span></p>
                            <div class="flex flex-col items-center gap-2">
                                <p class="text-green-500 font-bold text-xl">{{ (transaction.amount / transaction.members.length).toFixed(2) }}€</p>
                                <button v-if="store.members.find(m => m.name === memberName)?.transactions.find(t => t.id === transaction.id && !t.paid)" class="bg-white pl-3 pr-3 rounded-lg h-8 border-1 border-gray-300 flex items-center gap-2" @click="paid(memberName, transaction.id)">
                                    <img src="https://www.svgrepo.com/show/522268/send-email.svg" alt="email" class="w-4 h-4" />
                                    Ricevuti
                                </button>
                                <p v-else class="text-green-500">Ricevuto!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<style scoped>
.card {
    margin: 15px;
}

</style>