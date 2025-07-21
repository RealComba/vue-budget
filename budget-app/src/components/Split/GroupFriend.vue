<script setup>
import { userStore } from '../../store/userStore';

const store = userStore()

</script>

<template>
    <div class="flex justify-center flex-col p-2 items-center">
        <div class="flex flex-col gap-4 rounded-md border-gray-300 w-120 sm:p-2 ">
            <div v-for="member in store.members" :key="member.id">
                <div class="bg-white border-1 border-gray-300 p-5 rounded-lg flex flex-row gap-4 items-center">
                    <div class="bg-gray-200 rounded-full p-1 w-10 h-10 flex justify-center items-center">
                        <p> {{ member.initials }} </p>
                    </div>
                    <div class="flex flex-col">
                        <p class="font-semibold pb-1">{{ member.name }}</p>
                        <p class="text-sm text-gray-600">member altri dati</p>
                        <p class="text-sm text-gray-600">memebr altri dati</p>
                    </div>
                </div>  
            </div>
        </div>
    </div>
</template>