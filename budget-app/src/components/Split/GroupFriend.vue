<script setup>
import { userStore } from '../../store/userStore';
import FriendForm from './FriendForm.vue';
import { storeTransaction } from '../../store/store';

const store = userStore()
const darkStore = storeTransaction()

function form() {
    store.form('active')
}

function remove(id) {
    store.deleteMember(id)
    console.log(store.members)
}

</script>

<template>
    <div class="flex justify-center flex-col p-2 items-center">
        <div class="flex flex-col gap-4 rounded-md border-gray-300 w-120 sm:p-2 ">
            <div class="flex flex-row justify-between items-center">
                <p>I Tuoi Amici</p>
                <button class="p-2 w-25 h-10 bg-black rounded-lg text-white font-semibold" @click="form()">Aggiungi +</button>
            </div>
            <div v-for="member in store.members" :key="member.id">
                <div class="bg-white border-1 border-gray-300 p-5 rounded-lg flex flex-row items-center justify-between">
                    <div class="flex flex-row justify-center items-center gap-4">
                        <div class="bg-gray-200 rounded-full p-1 w-10 h-10 flex justify-center items-center">
                            <p> {{ member.initials }} </p>
                        </div>
                        <div class="flex flex-col">
                            <p class="font-semibold pb-1">{{ member.name }}</p>
                            <p class="text-sm text-gray-600">{{ member.mail }}</p>
                            <p class="text-sm text-gray-600">{{ member.phone }}</p>
                        </div>
                    </div>
                    <div class="flex flex-row justify-center items-center gap-4">
                        <p class="rounded-xl text-sm p-0.25 pl-2 pr-2 border-1 border-gray-300 text-black font-semibold ">{{ store.countGroupsPerson(member.name) }} gruppi</p>
                        <button class="border-1 border-gray-300 p-2 w-10 h-10 rounded-lg" @click="remove(member.id)">X</button>
                    </div>
                </div>  
            </div>
        </div>
    </div>
    <transition name="fade">
            <div v-if="store.formActive === 'active' " class="fixed inset-0 z-50 flex items-center justify-center">
                <div class="absolute inset-0 bg-black/60 "></div>
                    <div class="relative z-10">
                        <FriendForm></FriendForm>
                    </div>
                </div>
        </transition>
</template>