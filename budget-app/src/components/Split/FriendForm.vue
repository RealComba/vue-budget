<script setup>
import { userStore } from '../../store/userStore';
import { storeTransaction } from '../../store/store';
import { ref } from 'vue'

const store = userStore()
const darkStore = storeTransaction
const name = ref()
const mail = ref()
const phone = ref()

function close(){
    store.form(false)
}

function newFriend () {
    store.createMembers(name.value, mail.value, phone.value)
    store.form(false)
}

</script>

<template>
<div class="flex justify-center w-100">
  <div class="flex flex-col justify-center m-8  w-70 sm:w-100 ">
    <div class="flex flex-col bg-gray-100 p-4 rounded-lg w-85 gap-6" 
      :class="store.dark ? 'bg-neutral-700' : 'bg-white'">
      <div class="flex flex-col gap-2">
        <div class="flex flex-row justify-between pb-4">
          <p class="font-bold text-xl">Aggiungi Amico</p>
          <button @click="close()" class="flex justify-end font-bold text-lg">X</button>
        </div>
        <label for="name" class="font-semibold">Nome Completo</label>
        <input class="rounded-lg p-2 border-1 border-gray-400 text-gray-600 text-rg"
        :class="store.dark ? 'text-white' : 'text-black' " placeholder="(es. Mario Rossi)" required type="text" v-model="name">
        
        <label for="name" class="font-semibold">Email (opzionale)</label>
        <input type="email" class="rounded-lg p-2 border-1 border-gray-400 text-gray-600 text-rg"
        :class="store.dark ? 'text-white' : 'text-black' " placeholder="(es. mario.rossi@gmail.com)" id="" v-model="mail"></input>

        <label for="name" class="font-semibold">Telefono (opzionale)</label>
        <input type="number" class="rounded-lg p-2 border-1 border-gray-400 text-gray-600 text-rg"
        :class="store.dark ? 'text-white' : 'text-black' " placeholder="(es. +39 390 490 5690)" id="" v-model="phone"></input>

    <div class="flex flex-row justify-center gap-2 pt-4">
      <button class="p-3 margin-1 margin-gray-300 w-full border-1 border-gray-300 rounded-lg font-semibold" @click="close">Annulla</button>
      <button class="bg-black text-white rounded-lg p-3 w-full font-semibold" @click="newFriend">Aggiungi Amico</button>
    </div>
  </div>
  </div>
</div>
</div>
</template>