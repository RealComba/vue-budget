<script setup>
import { storeTransaction } from "/src/store/store.js"
import { ref } from "vue"

const store = storeTransaction()

function close() {
    store.closeGoalsForm('false')
}

function del() {
    store.deleteGoal()
    store.closeGoalsForm('false')
}

</script>

<template>
    <div class="flex flex-row justify-center m-8 h-45">
        <div class="flex flex-col bg-gray-100 p-4 rounded-lg w-140 gap-6">
            <div class="flex flex-col gap-2">
                <p class="font-bold text-xl">Elimina Obiettivo</p>
                <p>Sei sicuro di voler eliminare l'obiettivo "{{ store.goalActive.name }}"? I {{ store.goalActive.firstAmount }}€ risparmiati verranno aggiunti al tuo saldo principale</p>
            </div>
            <div class="flex flex-row-reverse gap-3">
                <button class="bg-black text-white p-2 rounded-lg font-bold w-30" @click="del()">Elimina</button>
                <button class="bg-white border-gray-400 text-black p-2 rounded-lg font-bold w-30" @click="close()">Annulla</button>

            </div>
        </div>
    </div>
</template>