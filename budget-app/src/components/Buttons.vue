<script setup>
import Form from './TransactionForm.vue'
import { storeTransaction } from '/src/store/store.js'; 
import { useRouter } from "vue-router"

const router = useRouter()
const store = storeTransaction()

function addTransaction() {
    store.closeForm('active')
}



</script>


<template>
    <div class="flex justify-center">
    <div class="flex flex-row gap-5 w-130 justify-center text-xs sm:text-base">
        <div class="flex flex-col w-full h-20 border-1 border-gray-300 rounded-md text-center justify-center items-center font-medium gap-2" @click="addTransaction">
            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 12H20M12 4V20" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <p>Aggiungi</p>
        </div>
        <div class="flex flex-col w-full h-20 border-1 border-gray-300 rounded-md text-center justify-center items-center font-medium gap-2">
            <svg width="22px" height="22px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.33 3.66996C20.1408 3.48213 19.9035 3.35008 19.6442 3.28833C19.3849 3.22659 19.1135 3.23753 18.86 3.31996L4.23 8.19996C3.95867 8.28593 3.71891 8.45039 3.54099 8.67255C3.36307 8.89471 3.25498 9.16462 3.23037 9.44818C3.20576 9.73174 3.26573 10.0162 3.40271 10.2657C3.5397 10.5152 3.74754 10.7185 4 10.85L10.07 13.85L13.07 19.94C13.1906 20.1783 13.3751 20.3785 13.6029 20.518C13.8307 20.6575 14.0929 20.7309 14.36 20.73H14.46C14.7461 20.7089 15.0192 20.6023 15.2439 20.4239C15.4686 20.2456 15.6345 20.0038 15.72 19.73L20.67 5.13996C20.7584 4.88789 20.7734 4.6159 20.7132 4.35565C20.653 4.09541 20.5201 3.85762 20.33 3.66996ZM4.85 9.57996L17.62 5.31996L10.53 12.41L4.85 9.57996ZM14.43 19.15L11.59 13.47L18.68 6.37996L14.43 19.15Z" fill="#000000"/>
            </svg>
            <p>Invia</p>
        </div>
        <div class="flex flex-col w-full h-20 border-1 border-gray-300 rounded-md text-center justify-center items-center font-medium gap-2" @click="router.push({ path:'/chart'})">
            <img class="w-6" src="/Users/tommasocont/Desktop/vue-budget/budget-app/src/svg/graph-chart-2-svgrepo-com.svg" alt="">
            <p>Analytics</p>
        </div>
        <div class="flex flex-col w-full h-20 border-1 border-gray-300 rounded-md text-center justify-center items-center font-medium gap-2" @click="router.push({ path:'/goals'})">
            <svg width="20px" height="20px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M8 4C5.79086 4 4 5.79086 4 8C4 10.2091 5.79086 12 8 12C10.2091 12 12 10.2091 12 8C12 5.79086 10.2091 4 8 4ZM6 8C6 6.89543 6.89543 6 8 6C9.10457 6 10 6.89543 10 8C10 9.10457 9.10457 10 8 10C6.89543 10 6 9.10457 6 8Z" fill="#000000"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0ZM2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8Z" fill="#000000"/>
            </svg>
            <p>Obiettivi</p>
        </div>
        <transition name="fade">
            <div v-if="store.showForm === 'active' " class="fixed inset-0 z-50 flex items-center justify-center">
                <div class="absolute inset-0 bg-black/60 "></div>
                <div class="relative z-10">
                    <Form></Form>
                </div>
            </div>
        </transition>
    </div>
    </div>
</template>

<style scoped>

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>