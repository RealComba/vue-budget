<script setup>
import { storeTransaction } from "/src/store/store.js"

const store = storeTransaction()
</script>


<template>

<div class="flex flex-row">
    <div class="flex flex-col">
        <p class="font-bold text-md">I Tuoi Obiettivi</p>
        <p>Gestisci i tuoi traguardi</p>
    </div>
    <button class="p-4 text-center bg-black text-white">+</button>
</div>
</template>