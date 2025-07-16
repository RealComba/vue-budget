<script setup>
import { userStore } from '/src/store/userStore.js'
import { storeTransaction } from '/src/store/store';
import { ref } from 'vue'

const store = storeTransaction()
const userstore = userStore()
const name=ref()
const desc = ref()
const members = ref([])

function close() {
    userstore.form(false)
}

function data () {
  userstore.newGroup(name.value, desc.value, members.value)
  userstore.form(false)
}

</script>

<template>
<div class="flex justify-center w-100">
  <div class="flex flex-col justify-center m-8  w-70 sm:w-100 ">
    <div class="flex flex-col bg-gray-100 p-4 rounded-lg w-85 gap-6" 
      :class="store.dark ? 'bg-neutral-700' : 'bg-white'">
      <div class="flex flex-col gap-2">
        <div class="flex flex-row justify-between pb-4">
          <p class="font-bold text-xl">Nuovo Gruppo</p>
          <button @click="close()" class="flex justify-end font-bold text-lg">X</button>
        </div>
        <input class="rounded-lg p-2 font-semibold border-1 border-gray-400 text-gray-600 text-rg"
        :class="store.dark ? 'text-white' : 'text-black' " placeholder="Nome Gruppo (*es vacanza Roma)" required type="text" v-model="name">
    
        <textarea class="rounded-lg p-2 font-semibold border-1 border-gray-400 text-gray-600 text-rg"
        :class="store.dark ? 'text-white' : 'text-black' " placeholder="descrizione" id="" v-model="desc"></textarea>

          <div class="flex flex-col gap-5">
            <p class="font-bold">Seleziona membri</p>
            <div v-for="member in userstore.members" :key="member.name" >
              <div class="flex flex-row items-center gap-2">
                <input type="checkbox" :value="member.name" v-model="members"/>
                <p class="p-1.5 bg-gray-100 rounded-full align-center text-center text-sm w-8 h-8">{{ member.initials }}</p>
                <p>{{ member.name }}</p>
              </div>
            </div>  
          </div>
      </div>
    <div class="flex flex-row justify-center gap-2">
      <button class="p-3 margin-1 margin-gray-300 w-full border-1 border-gray-300 rounded-lg" @click="close">Annulla</button>
      <button class="bg-black text-white rounded-lg p-3 w-full" @click="data()">Crea Gruppo</button>
    </div>
  </div>
</div>
</div>

</template>