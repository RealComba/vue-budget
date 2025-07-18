<script setup>
import { storeTransaction } from "/src/store/store.js"
import { userStore } from "../../store/userStore"
import GroupFormTsx from "./GroupFormTsx.vue"

const darkStore = storeTransaction()
const store = userStore()

function newTransaction(groupId) {
    store.groupActivated(groupId)
    console.log(groupId)
    darkStore.closeForm('active')
}

</script>

<template>
    <div v-for="(transaction) in store.groupTransaction" :key="transaction.id">
        <div class="flex justify-center p-2">
            <div class="border-1 rounded-md border-gray-300 w-120 sm:p-2"
                :class="store.dark ? 'bg-neutral-700 border-none' : 'bg-white'">
                <div class="flex flex-col justify-between p-2">
                    <div class="flex flex-col gap-2 p-2 pb-6">
                        <div class="flex flex-row gap-5 justify-between items-center">
                            <div class="flex flex-row justify-between items-center gap-5">
                                <div class="bg-blue-200 rounded-lg w-10 h-10"></div>
                                <div class="flex flex-col">
                                    <p class="font-semibold text-lg">{{ transaction.name }}</p>
                                    <p class="text-md"
                                    :class="store.dark ? 'text-gray-300' : 'text-gray-500'">{{ transaction.description }}</p>
                                </div>
                            </div>
                            <div class="flex flex-col text-center">
                                <p class="font-bold text-2xl">€{{ transaction.amount }}</p>
                                <p class="text-md text-gray-500">spese totali</p>
                            </div>
                        </div>
                        <div class="flex flex-row gap-1 justify-between">
                            <div class="flex flex-row">
                                <p>{{ transaction.buyer }}</p>
                            </div>
                            <p class="bg-gray-100 rounded-2xl p-1.5 text-center text-sm font-semibold w-25">membri</p>
                        </div>
                    </div> 
                    <div class="flex flex-row gap-3">
                        <button class="w-2/3 border-1 rounded-md border-gray-200 p-1 font-semibold" 
                        :class="store.dark ? 'border-none bg-neutral-800' : 'bg-white'"@click="newTransaction(group.id)">+ Aggiungi</button>
                        <button class="w-1/5 border-1 rounded-md border-gray-200 p-1 font-semibold"
                        :class="store.dark ? 'border-none bg-neutral-800' : 'bg-white'" @click="modifyGoal('ModifyGoals', goal.id)" >Md</button>
                        <button class="w-1/6 border-1 rounded-md border-gray-200 p-1 font-semibold" 
                        :class= "darkStore.dark ? 'border-none bg-neutral-800 text-white' : 'bg-white text-black' "@click="deleteGoal('deleteGoals', goal.id)">X</button>
                    </div>
                </div>
            </div>
        </div>
        <transition name="fade">
            <div v-if="darkStore.showForm === 'active' " class="fixed inset-0 z-50 flex items-center justify-center">
                <div class="absolute inset-0 bg-black/60 "></div>
                    <div class="relative z-10">
                        <GroupFormTsx></GroupFormTsx>
                    </div>
                </div>
        </transition>
        <transition name="fade">
            <div v-if="store.showGoalsForm === 'ModifyGoals' " class="fixed inset-0 z-50 flex items-center justify-center">
                <div class="absolute inset-0 bg-black/60 "></div>
                    <div class="relative z-10">
                        <!-- <GoalModifyForm></GoalModifyForm>    -->
                    </div>
                </div>
        </transition>
        <transition name="fade">
            <div v-if="store.showGoalsForm === 'deleteGoals' " class="fixed inset-0 z-50 flex items-center justify-center">
                <div class="absolute inset-0 bg-black/60 "></div>
                    <div class="relative z-10">
                        <!-- <GoalDelete></GoalDelete>    -->
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