<script setup>
import { storeTransaction } from "/src/store/store.js"
import GoalRecap from "../components/Goals/GoalRecap.vue";
import GoalCard from "../components/Goals/GoalCard.vue"
import Goals from '../components/GoalsForm.vue'
// import GoalAmount from "../components/Goals/GoalAmount.vue";

const store = storeTransaction()

function addGoal() {
    store.closeGoalsForm('active')
}

</script>



<template>
<div class="flex flex-row justify-center">
<div class="flex flex-row w-120 justify-between items-center pt-10">
    <div class="flex flex-col gap-2">
        <p class="font-bold text-4xl">I Tuoi Obiettivi</p>
        <p class="text-gray-600">Gestisci i tuoi traguardi</p>
    </div>
    <button class=" w-10 h-10 text-center bg-black text-white rounded-md" @click="addGoal">+</button>
</div>
</div>
<div class="flex flex-col p-10 gap-5">
    <GoalRecap></GoalRecap>
    <GoalCard></GoalCard>
    <GoalAmount></GoalAmount>

</div>
<transition name="fade">
<div v-if="store.showGoalsForm === 'active' " class="fixed inset-0 z-50 flex items-center justify-center">
    <div class="absolute inset-0 bg-black/60 "></div>
        <div class="relative z-10">
            <Goals></Goals>
        </div>
    </div>
</transition>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s;
}
.fade-enter-from, .fade-leave-to {
    opacity: 0;
}
</style>