<script setup>
import { userStore } from '/src/store/userStore.js'
import { ref } from 'vue'

const store = userStore()
const name=ref()
const desc = ref()
const input = ref([])

function close() {
    store.form(false)
}

function data () {

}

</script>

<template>
<div class="flex justify-center bg-gray-400">
    <div class="flex flex-col items-center w-100 h-80 ">
        <input type="text" placeholder="Nome gruppo" v-model="name">
        <input type="text" placeholder="Descrizione gruppo" name="" id="" v-model="desc">
        <div class="flex flex-row gap-5">
             <label>
          <input type="checkbox" value="Antonio" v-model="input" />
          Antonio
        </label>

        <label>
          <input type="checkbox" value="Lorenzo" v-model="input" />
          Lorenzo
        </label>

        <label>
          <input type="checkbox" value="Mattia" v-model="input" />
          Mattia
        </label>
      </div>
        <div class="flex flex-row">
            <button class="p-3 margin-1 margin-gray-300" @click="close">Annulla</button>
            <button class="bg-black text-white rounded-lg p-3">Crea Gruppo</button>
        </div>
    </div>
</div>

<p>{{ name }}</p>
<p> {{ desc }}</p>
<p> {{ input }}</p>
</template>