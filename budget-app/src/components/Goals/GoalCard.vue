<script setup>
import { storeTransaction } from "/src/store/store.js"
import GoalForm from "./GoalAddForm.vue"
import GoalModifyForm from "./GoalModifyForm.vue"
import GoalDelete from "./GoalDeleteLabel.vue" 


const colors = ["bg-red-500", "bg-pink-500", "bg-purple-500", "bg-violet-500", "bg-indigo-500", "bg-blue-500", "bg-sky-500", "bg-cyan-500", "bg-teal-500", "bg-green-500", "bg-lime-500", "bg-yellow-500", "bg-amber-500", "bg-orange-500", "bg-rose-500", "bg-neutral-500", "bg-zinc-500", "bg-gray-500", "bg-slate-500", "bg-stone-500"]

const store = storeTransaction()

function getPercent(goal) {
    return Math.round((goal.firstAmount/goal.maxAmount) * 100)
}

function setActiveGoal(goalId) {
    store.closeForm('active')
    store.setActiveGoal(goalId)
}

function modifyGoal(value, goalId) {
    store.closeGoalsForm(value)
    store.setActiveGoal(goalId)
}

function deleteGoal(value, goalId) {
    store.closeGoalsForm(value)
    store.setActiveGoal(goalId)
}

</script>

<template>
    <div v-for="(goal, idx) in store.goals" :key="goal.id">
        <div class="flex justify-center p-2">
        <div class="border-1 rounded-md border-gray-300 w-120 sm:p-6"
        :class="store.dark ? 'bg-neutral-700 border-none' : 'bg-white'">
            <div class="flex flex-row justify-between items-center p-4">
                <div class="flex flex-row items-center gap-5">
                    <div class="rounded-full p-2 w-5 h-5"
                    :class="colors[idx % colors.length]"></div>
                    <div class="flex flex-col">
                        <p class="font-semibold text-lg">{{ goal.name }}</p>
                        <p class="text-md"
                        :class="store.dark ? 'text-gray-300' : 'text-gray-500'">{{ `Mancano €${goal.maxAmount - goal.firstAmount}` }}</p>
                    </div>
                </div>
                <p class="font-bold text-xl"
                :class="(goal.firstAmount === goal.maxAmount) ? 'text-green-600' : 'text-black' , store.dark ? 'text-white' : 'text-black' ">{{ getPercent(goal) }}%</p>
            </div>
            <div class="pt-6 p-4 w-9/10 sm:w-100">
                <div class="rounded-full bg-gray-100 relative p-2 bg-black w-9/10 sm:w-100">
                    <div class="rounded-full p-2 absolute top-0 left-0 rounded-r-sm"
                    :class="(goal.firstAmount === goal.maxAmount) ? 'bg-green-600' : 'bg-black', store.dark ? 'bg-blue-400' : 'bg-black' "
                        :style = "{ width: getPercent(goal) + '%' }">
                    </div> 
                </div>
            </div>
            <div class="flex flex-row justify-between w-8/10 pl-4 sm:w-100">
                <p class="text-md xs:text-xl"
                :class="store.dark ? 'text-white' : 'text-gray-500'">{{ `€${goal.firstAmount}` }}</p>
                <p class="text-md"
                :class="store.dark ? 'text-white' : 'text-gray-500'">{{ `€${goal.maxAmount}` }}</p>
            </div>
            <div class="flex flex-row pt-4 gap-2 p-2">
                <button class="w-1/2 border-1 rounded-md border-gray-200 p-1 font-semibold" 
                :class="store.dark ? 'border-none bg-neutral-800' : 'bg-white'"@click="setActiveGoal(goal.id)">+ Aggiungi</button>
                <button class="w-1/3 border-1 rounded-md border-gray-200 p-1 font-semibold"
                :class="store.dark ? 'border-none bg-neutral-800' : 'bg-white'" @click="modifyGoal('ModifyGoals', goal.id)" >Md</button>
                <button class="w-1/6 border-1 rounded-md border-gray-200 p-1 font-semibold" 
                :class="(goal.firstAmount === goal.maxAmount) ? 'bg-red-600 text-white' : '', store.dark ? 'border-none bg-neutral-800 text-white' : 'bg-white text-black' "@click="deleteGoal('deleteGoals', goal.id)">X</button>
            </div>
        </div>
    </div>
    <transition name="fade">
            <div v-if="store.showForm === 'active' " class="fixed inset-0 z-50 flex items-center justify-center">
                <div class="absolute inset-0 bg-black/60 "></div>
                <div class="relative z-10">
                    <GoalForm></GoalForm>
                </div>
            </div>
    </transition>
        <transition name="fade">
            <div v-if="store.showGoalsForm === 'ModifyGoals' " class="fixed inset-0 z-50 flex items-center justify-center">
                <div class="absolute inset-0 bg-black/60 "></div>
                <div class="relative z-10">
                    <GoalModifyForm></GoalModifyForm>   
                </div>
            </div>
    </transition>
    <transition name="fade">
            <div v-if="store.showGoalsForm === 'deleteGoals' " class="fixed inset-0 z-50 flex items-center justify-center">
                <div class="absolute inset-0 bg-black/60 "></div>
                <div class="relative z-10">
                    <GoalDelete></GoalDelete>   
                </div>
            </div>
    </transition>
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