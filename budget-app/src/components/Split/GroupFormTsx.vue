<script setup>
import { userStore } from '/src/store/userStore.js'
import { storeTransaction } from '/src/store/store';
import { ref, computed } from 'vue'

const darkStore = storeTransaction()
const store = userStore()
const name = ref()
const amount = ref()
const category = ref()
const description = ref()
const activePay = ref()
const input = ref([])

const activeGroupData = computed(() =>
  store.groupData.find(group => group.id === store.activeGroup)
)

function close() {
    darkStore.closeForm(false)
}

function data (id) {
  store.newTransaction(id, name.value, amount.value, category.value, description.value, activePay.value, input.value)
  darkStore.closeForm(false)
}

function active(name) {
    activePay.value = name
    console.log(activePay.value)   
    console.log(input.value)
}

</script>

<template>
    <div class="flex flex-col w-90 max-h-180 overflow-y-auto">
        <div class="flex bg-gray-100 rounded-lg w-full p-6">
            <div v-if="activeGroupData" class="flex flex-col w-full gap-2">
                <div class="flex flex-row justify-between w-full">
                    <p class="font-bold text-lg">Nuova Spesa - {{ activeGroupData.name }}</p>
                    <button @click="close">X</button>
                </div>
                <div class="flex flex-col justify-center gap-4">
                    <input class="border-1 border-gray-300 rounded-md h-10 p-4" type="text" name="" id="" placeholder="Titolo spesa (*es cena ristorante)" v-model="name">
                    <input class="border-1 border-gray-300 rounded-md h-10 p-4" type="number" name="" id="" placeholder="Importo €" v-model="amount">
                    <select class="p-2 rounded-lg h-12 text-base border-1 border-gray-300 placeholder:font-semibold"
                    :class="(store.dark) ? 'bg-neutral-600 border-none text-white' : 'bg-gray-100 text-neutral-500'" name="categories" id="transaction" v-model="category">
                        <option value="type" selected disabled>Seleziona Categoria</option>
                        <option value="alimentari">Alimentari 🍴</option>
                        <option value="trasporti">Trasporti 🚌</option>
                        <option value="intrattenimento">Intrattenimento 🎳</option>
                        <option value="salute">Salute 🚑</option>
                        <option value="sport">Sport ⚽️</option>
                        <option value="viaggi">Viaggi ✈️</option>
                        <option value="altro">Altre Spese 💶</option>
                    </select>
                </div>
                <textarea class="border-1 border-gray-300 rounded-md p-4 text-black h-20" name="" id="" placeholder="Descrizione (opzionale)" v-model="description"></textarea>
                <label class="pt-5 text-lg font-semibold" for="chi">Chi ha pagato?</label>
                <div v-for="member in activeGroupData.members">
                    <button @click="active(member.name)" class="font-bold border-gray-300 border-1 p-2 rounded-lg w-full text-start ease-in-out"
                    :class="activePay === member.name ? 'bg-neutral-800 text-white border-none transition-all' : 'bg-white'">{{ member.name }}</button>
                </div>
                <div class="flex flex-col gap-3">
                    <p class="pt-5 text-lg font-semibold">Dividi Tra</p>
                    <div v-for="member in activeGroupData.members" class="flex flex-row justify-between">
                        <p>{{ member.name }}</p>
                        <label class="switch">
                        <input type="checkbox" :value="member.name" v-model="input">
                        <span class="slider"></span>
                        </label>
                    </div>
                    <div class="flex flex-row gap-2 pt-5">
                        <button class="p-3 margin-1 margin-gray-300 w-full border-1 border-gray-300 rounded-lg font-bold" @click="close">Annulla</button>
                        <button class="bg-black text-white rounded-lg p-3 w-full font-bold" @click="data(activeGroupData.id)">Aggiungi Spesa</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<style scoped>
.switch {
  font-size: 17px;
  position: relative;
  display: inline-block;
  width: 46px;     /* Ridotto per proporzione */
  height: 24px;    /* Altezza ridotta */
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;
  transition: .4s;
  border-radius: 30px;
  border: 1px solid #ccc;
}

.slider:before {
  position: absolute;
  content: "";
  height: 20px;    /* Un po' meno dell'altezza del contenitore */
  width: 20px;
  border-radius: 50%;
  left: 2px;
  top: 1px;
  background-color: white;
  box-shadow: 0 2px 5px #999999;
  transition: .4s;
}

input:checked + .slider {
  background-color: #000;
  border: 1px solid transparent;
}

input:checked + .slider:before {
  transform: translateX(22px);  /* Spostamento adattato */
}

</style>