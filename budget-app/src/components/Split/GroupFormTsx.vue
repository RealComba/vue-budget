<script setup>
import { userStore } from '/src/store/userStore.js'
import { storeTransaction } from '/src/store/store';
import { ref } from 'vue'

const darkStore = storeTransaction()
const store = userStore()
const name=ref()
const desc = ref()
const members = ref([])

function close() {
    store.form(false)
}

function data () {
  store.newGroup(name.value, desc.value, members.value)
  store.form(false)
}

</script>

<template>
    <div class="flex flex-col w-85">
        <div class="flex bg-gray-100 rounded-lg w-full p-6 h-120">
            <div v-for="group in store.groupData" class="flex flex-col w-full gap-6">
                <div class="flex flex-row justify-between w-full">
                    <p class="font-bold text-lg">Nuova Spesa - {{ group.name }}</p>
                    <button>X</button>
                </div>
                <div class="flex flex-col justify-center gap-4">
                    <input class="border-1 border-gray-300 rounded-md h-10 p-4" type="text" name="" id="" placeholder="Titolo spesa (*es cena ristorante)">
                    <input class="border-1 border-gray-300 rounded-md h-10 p-4" type="number" name="" id="" placeholder="Importo €">
                    <select class="p-2 rounded-lg h-12 text-base border-1 border-gray-300 placeholder:font-semibold"
                    :class="(store.dark) ? 'bg-neutral-600 border-none text-white' : 'bg-gray-100 text-neutral-500'" name="categories" id="transaction" >
                        <option value="type" selected disabled>Seleziona Categoria</option>
                        <option value="alimentari">Alimentari 🍴</option>
                        <option value="trasporti">Trasporti 🚌</option>
                        <option value="intrattenimento">Intrattenimento 🎳</option>
                        <option value="salute">Salute 🚑</option>
                        <option value="sport">Sport ⚽️</option>
                        <option value="viaggi">Viaggi ✈️</option>
                        <option value="altro">Altre Spese 💶</option>
                    </select>
                    <textarea class="border-1 border-gray-300 rounded-md h-10 p-4 text-neutral-500" name="" id="" placeholder="Descrizione (opzionale)">
                    </textarea>
                </div>
            </div>
        </div>
    </div>

</template>