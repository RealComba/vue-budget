<script setup>
import { storeTransaction } from "/src/store/store.js"
import { userStore } from "../../store/userStore"


const colors = ["bg-red-500", "bg-pink-500", "bg-purple-500", "bg-violet-500", "bg-indigo-500", "bg-blue-500", "bg-sky-500", "bg-cyan-500", "bg-teal-500", "bg-green-500", "bg-lime-500", "bg-yellow-500", "bg-amber-500", "bg-orange-500", "bg-rose-500", "bg-neutral-500", "bg-zinc-500", "bg-gray-500", "bg-slate-500", "bg-stone-500"]

const darkStore = storeTransaction()
const store = userStore()



</script>

<template>
    <div v-for="(group, idx) in store.groupData" :key="group.id">
        <div class="flex justify-center p-2">
            <div class="border-1 rounded-md border-gray-300 w-120 sm:p-2"
                :class="store.dark ? 'bg-neutral-700 border-none' : 'bg-white'">
                <div class="flex flex-col justify-between p-2">
                    <div class="flex flex-col gap-2 p-2 pb-6">
                        <div class="flex flex-row gap-5 justify-between items-center">
                            <div class="flex flex-row justify-between items-center gap-5">
                                <div class="rounded-full p-2 w-5 h-5"
                                    :class="colors[idx % colors.length]"></div>
                                <div class="flex flex-col">
                                    <p class="font-semibold text-lg">{{ group.name }}</p>
                                    <p class="text-md"
                                    :class="store.dark ? 'text-gray-300' : 'text-gray-500'">{{ group.desc }}</p>
                                </div>
                            </div>
                            <div class="flex flex-col text-center">
                                <p class="font-bold text-2xl">€{{ group.amount }}</p>
                                <p class="text-md text-gray-500">spese totali</p>
                            </div>
                        </div>
                        <div class="flex flex-row gap-1 justify-between">
                            <div class="flex flex-row">
                                <p v-for="member in group.members" :key="member.name" class="p-1 rounded-full bg-gray-100 w-8 h-8 text-center">{{ member.initials }}</p>
                            </div>
                            <p class="bg-gray-100 rounded-2xl p-1.5 text-center text-sm font-semibold w-25">{{ group.members.length }} membri</p>
                        </div>
                    </div> 
                    <div class="flex flex-row gap-3">
                        <button class="w-2/3 border-1 rounded-md border-gray-200 p-1 font-semibold" 
                        :class="store.dark ? 'border-none bg-neutral-800' : 'bg-white'"@click="setActiveGoal(goal.id)">+ Aggiungi</button>
                        <button class="w-1/5 border-1 rounded-md border-gray-200 p-1 font-semibold"
                        :class="store.dark ? 'border-none bg-neutral-800' : 'bg-white'" @click="modifyGoal('ModifyGoals', goal.id)" >Md</button>
                        <button class="w-1/6 border-1 rounded-md border-gray-200 p-1 font-semibold" 
                        :class= "darkStore.dark ? 'border-none bg-neutral-800 text-white' : 'bg-white text-black' "@click="deleteGoal('deleteGoals', goal.id)">X</button>
                    </div>
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