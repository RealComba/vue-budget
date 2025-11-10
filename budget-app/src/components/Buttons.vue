<script setup>
import { color } from 'chart.js/helpers';
import { computed } from 'vue'
import Form from './TransactionForm.vue'
import { storeTransaction } from '/src/store/store.js'; 
import { useRouter } from "vue-router"

const router = useRouter()
const store = storeTransaction()


const buttons = computed(() => {
const colors = store.dark ? '#ffffff' : '#000000'

return [    
        {
            label: "Aggiungi",
            onClick: () => store.closeForm('active'),
            icon: `<svg width="20" height="20" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none">
                    <path d="M4 12H20M12 4V20"
                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>`,
        },
        {
            label: "Dividi",
            onClick: () => router.push({ path:'/split' }),
            icon: `<svg fill="${colors}" width="24px" height="24px" viewBox="-3 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
                    <title>group</title>
                    <path d="M20.906 20.75c1.313 0.719 2.063 2 1.969 3.281-0.063 0.781-0.094 0.813-1.094 0.938-0.625 0.094-4.563 0.125-8.625 0.125-4.594 0-9.406-0.094-9.75-0.188-1.375-0.344-0.625-2.844 1.188-4.031 1.406-0.906 4.281-2.281 5.063-2.438 1.063-0.219 1.188-0.875 0-3-0.281-0.469-0.594-1.906-0.625-3.406-0.031-2.438 0.438-4.094 2.563-4.906 0.438-0.156 0.875-0.219 1.281-0.219 1.406 0 2.719 0.781 3.25 1.938 0.781 1.531 0.469 5.625-0.344 7.094-0.938 1.656-0.844 2.188 0.188 2.469 0.688 0.188 2.813 1.188 4.938 2.344zM3.906 19.813c-0.5 0.344-0.969 0.781-1.344 1.219-1.188 0-2.094-0.031-2.188-0.063-0.781-0.188-0.344-1.625 0.688-2.25 0.781-0.5 2.375-1.281 2.813-1.375 0.563-0.125 0.688-0.469 0-1.656-0.156-0.25-0.344-1.063-0.344-1.906-0.031-1.375 0.25-2.313 1.438-2.719 1-0.375 2.125 0.094 2.531 0.938 0.406 0.875 0.188 3.125-0.25 3.938-0.5 0.969-0.406 1.219 0.156 1.375 0.125 0.031 0.375 0.156 0.719 0.313-1.375 0.563-3.25 1.594-4.219 2.188zM24.469 18.625c0.75 0.406 1.156 1.094 1.094 1.813-0.031 0.438-0.031 0.469-0.594 0.531-0.156 0.031-0.875 0.063-1.813 0.063-0.406-0.531-0.969-1.031-1.656-1.375-1.281-0.75-2.844-1.563-4-2.063 0.313-0.125 0.594-0.219 0.719-0.25 0.594-0.125 0.688-0.469 0-1.656-0.125-0.25-0.344-1.063-0.344-1.906-0.031-1.375 0.219-2.313 1.406-2.719 1.031-0.375 2.156 0.094 2.531 0.938 0.406 0.875 0.25 3.125-0.188 3.938-0.5 0.969-0.438 1.219 0.094 1.375 0.375 0.125 1.563 0.688 2.75 1.313z"></path>
                    </svg>`,
        },
        {
            label: "Analytics",
            onClick: () => router.push({ path:'/chart' }),
            icon: `<svg fill="${colors}" width="22px" height="22px" viewBox="0 0 60 60" id="Capa_1" version="1.1" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                    >
                    <g>
                    <path d="M59,55.5v-39H47v39h-3v-31H32v31h-3v-23H17v23h-3v-14H2v14H1c-0.552,0-1,0.447-1,1s0.448,1,1,1h1h12h3h12h3h12h3h12   c0.552,0,1-0.447,1-1S59.552,55.5,59,55.5z M4,55.5v-12h8v12H4z M19,55.5v-21h8v21H19z M34,55.5v-29h8v29H34z M49,55.5v-37h8v37H49   z"/>
                    <path d="M8.03,27.83c0.169,0,0.342-0.043,0.499-0.134l36.269-20.94l-2.27,4.99c-0.229,0.503-0.007,1.096,0.496,1.324   c0.134,0.062,0.275,0.09,0.414,0.09c0.38,0,0.743-0.218,0.911-0.586l3.562-7.83c0.011-0.025,0.009-0.052,0.018-0.078   c0.019-0.053,0.034-0.104,0.044-0.16c0.005-0.028,0.021-0.051,0.023-0.08c0.001-0.012-0.004-0.022-0.003-0.034   c0.002-0.038-0.002-0.073-0.004-0.111c-0.003-0.055-0.012-0.107-0.024-0.162c-0.008-0.038-0.01-0.077-0.023-0.114   c-0.012-0.036-0.033-0.066-0.049-0.101C47.88,3.881,47.88,3.854,47.866,3.83c-0.014-0.024-0.038-0.038-0.054-0.061   c-0.021-0.031-0.037-0.064-0.062-0.092c-0.026-0.03-0.059-0.051-0.089-0.078c-0.041-0.037-0.082-0.071-0.128-0.101   c-0.031-0.02-0.059-0.042-0.093-0.059c-0.011-0.005-0.017-0.015-0.028-0.02c-0.025-0.011-0.052-0.009-0.077-0.018   c-0.055-0.02-0.109-0.034-0.166-0.044c-0.026-0.005-0.047-0.02-0.074-0.022l-8.562-0.83c-0.555-0.056-1.039,0.35-1.092,0.898   c-0.054,0.55,0.349,1.039,0.898,1.092l5.456,0.529L7.529,25.964C7.05,26.24,6.887,26.852,7.163,27.33   C7.348,27.651,7.684,27.83,8.03,27.83z"/>
                    </g>
                    </svg>`
        },
    {
        label: "Obiettivi",
        onClick: () => router.push({ path:'/goals' }),
        icon: `<svg fill="${colors}" width="20px" height="20px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path stroke-width="2" stroke-linecap="round" stroke-linejoin="round fill-rule="evenodd" clip-rule="evenodd" d="M8 4C5.79086 4 4 5.79086 4 8C4 10.2091 5.79086 12 8 12C10.2091 12 12 10.2091 12 8C12 5.79086 10.2091 4 8 4ZM6 8C6 6.89543 6.89543 6 8 6C9.10457 6 10 6.89543 10 8C10 9.10457 9.10457 10 8 10C6.89543 10 6 9.10457 6 8Z"
                />
                <path stroke-width="2" stroke-linecap="round" stroke-linejoin="round fill-rule="evenodd" clip-rule="evenodd" d="M8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0ZM2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8Z"/>
            </svg>`
    }
]
})


</script>


<template>
    <div class="flex justify-center">
    <div class="flex flex-row gap-5 w-130 justify-center text-xs sm:text-base">
        <div 
            v-for="btn in buttons"
            :key="btn.label"
            class="flex flex-col w-full h-20 border-1 border-gray-300 rounded-md text-center justify-center items-center font-medium gap-2" @click="btn.onClick"
            :class="(store.dark) ? 'bg-neutral-700 border-none' : 'bg-white' ">
            <div :class="(store.dark) ? 'text-white' : 'text-black'">
                <div v-html="btn.icon"></div>
            </div>
            <p>{{ btn.label }}</p>
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