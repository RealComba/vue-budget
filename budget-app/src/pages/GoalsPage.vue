<script setup>
import { storeTransaction } from "/src/store/store.js"
import GoalRecap from "../components/Goals/GoalRecap.vue";
import GoalCard from "../components/Goals/GoalCard.vue"
import Goals from '../components/GoalsForm.vue'
import { useRouter } from 'vue-router'
// import GoalAmount from "../components/Goals/GoalAmount.vue";

const router = useRouter()
const store = storeTransaction()

function addGoal() {
    store.closeGoalsForm('active')
}

</script>



<template>
<div class="container flex flex-col justify-center gap-5 p-2">
    <div class="flex justify-center">
        <div class="flex flex-row w-120 justify-between items-center pt-10">
            <img class="w-8" src="https://www.svgrepo.com/show/510041/left-arrow.svg" @click="router.push({ path:'/'})" alt="">
            <div class="flex flex-col gap-2">
                <p class="font-bold text-2xl sm:text-4xl">I Tuoi Obiettivi</p>
                <p class="text-gray-600">Gestisci i tuoi traguardi</p>
            </div>
            <button class=" w-10 h-10 text-center bg-black text-white rounded-md" @click="addGoal">+</button>
        </div>
    </div>
    <GoalRecap></GoalRecap>
    <GoalCard></GoalCard>
<transition name="fade">
<div v-if="store.showGoalsForm === 'active' " class="fixed inset-0 z-50 flex items-center justify-center">
    <div class="absolute inset-0 bg-black/60 "></div>
        <div class="relative z-10">
            <Goals></Goals>
        </div>
    </div>
</transition>
</div>
</template>

<style scoped>


@media(max-width: 337px) {
    .container {
        min-width: 337px;
        overflow-x: auto;
    }
}

.fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s;
}
.fade-enter-from, .fade-leave-to {
    opacity: 0;
}
</style>