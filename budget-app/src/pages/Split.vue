<script setup>
import { userStore } from '../store/userStore';
import DarkButton from '../components/DarkButton.vue'
import { useRouter } from 'vue-router'
import recap from '../components/Split/SplitRecap.vue'
import GroupForm from '../components/Split/GroupForm.vue';
import GroupCard from '../components/Split/GroupCard.vue';
import GroupTsx from '../components/Split/GroupTsx.vue'
import { ref } from 'vue'
import { storeTransaction } from '../store/store';
import GroupFriend from '../components/Split/GroupFriend.vue';
import Balance from '../components/Split/SplitBalance.vue'

const store = userStore()
const darkStore = storeTransaction()
const router = useRouter()
const show = ref('group')

function openGroup() {  
    store.form(true)
}

function active(param) {
    show.value = param
}

</script>



<template>
<DarkButton></DarkButton>
<div class="flex flex-col justify-center gap-8 p-2">
    <div class="flex justify-center">
        <div class="flex flex-row w-120 justify-between items-center pt-10">
            <svg  class="w-8 rounded-lg "
            :fill="store.dark ? 'white' : 'black'" @click="router.push({ path:'/'})" alt=""  viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M11.7071 4.29289C12.0976 4.68342 12.0976 5.31658 11.7071 5.70711L6.41421 11H20C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H6.41421L11.7071 18.2929C12.0976 18.6834 12.0976 19.3166 11.7071 19.7071C11.3166 20.0976 10.6834 20.0976 10.2929 19.7071L3.29289 12.7071C3.10536 12.5196 3 12.2652 3 12C3 11.7348 3.10536 11.4804 3.29289 11.2929L10.2929 4.29289C10.6834 3.90237 11.3166 3.90237 11.7071 4.29289Z">
                </path> 
                </g>
            </svg> 
            <div class="flex flex-col gap-2">
                <p class="font-bold text-2xl sm:text-4xl">Spese Condivise</p>
                <p :class="store.dark ? 'text-white' : 'text-gray-600'">Dividi le Spese con gli amici</p>
            </div>
            <button class=" w-10 h-10 text-center text-2xl bg-black text-white rounded-md"
            :class="store.dark ? 'bg-blue-800 text-white' : 'bg-black text-white'" @click="openGroup">+</button>
        </div>
    </div>
    <recap></recap>
    <div class="flex justify-center">
        <div class="flex flex-row items-center rounded-lg text-center justify-evenly w-120 p-1"
            :class="darkStore.dark ? 'bg-neutral-700' : 'bg-gray-100 border-1 border-gray-300'">
            <button
                @click="active('group')"
                class="rounded-md p-2"
                :class="{
                    'bg-white text-black': show === 'group' && !darkStore.dark,
                    'bg-gray-100 text-black': show !== 'group' && !darkStore.dark,
                    'bg-neutral-500': show === 'group' && darkStore.dark,
                    'bg-neutral-700': show !== 'group' && darkStore.dark
                }"
                >
                Gruppi
            </button>
            <button @click="active('transaction')" class="rounded-md p-2"
                :class="{
                    'bg-white text-black': show === 'transaction' && !darkStore.dark,
                    'bg-gray-100 text-black': show !== 'transaction' && !darkStore.dark,
                    'bg-neutral-500': show === 'transaction' && darkStore.dark,
                    'bg-neutral-700': show !== 'transaction' && darkStore.dark
                }"
                >
                Movimenti
            </button>
            <button @click="active('friend')" class="rounded-md p-2"
                :class="{
                    'bg-white text-black': show === 'friend' && !darkStore.dark,
                    'bg-gray-100 text-black': show !== 'friend' && !darkStore.dark,
                    'bg-neutral-500': show === 'friend' && darkStore.dark,
                    'bg-neutral-700': show !== 'friend' && darkStore.dark
                }"
                >
                Amici
            </button>
            <button @click="active('balance')" class="rounded-md p-2"
                :class="{
                    'bg-white text-black': show === 'balance' && !darkStore.dark,
                    'bg-gray-100 text-black': show !== 'balance' && !darkStore.dark,
                    'bg-neutral-500': show === 'balance' && darkStore.dark,
                    'bg-neutral-700': show !== 'balance' && darkStore.dark
                }"
                >
                Bilanci
            </button>
        </div>
    </div>
    <div v-if="show === 'group'">
        <GroupCard></GroupCard>
    </div>
    <div v-if="show === 'transaction'">
        <GroupTsx></GroupTsx>
    </div>
    <div v-if="show === 'friend'">
        <GroupFriend></GroupFriend>
    </div>
    <div v-if="show === 'balance'">
        <Balance></Balance>
    </div>
     <transition name="fade">
            <div v-if="store.formActive === true " class="fixed inset-0 z-50 flex items-center justify-center">
                <div class="absolute inset-0 bg-black/60 "></div>
                <div class="relative z-10">
                    <GroupForm></GroupForm>
                </div>
            </div>
    </transition>
</div>
</template>