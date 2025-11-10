<script setup>
import { computed, ref } from 'vue'
import { storeTransaction } from '/src/store/store'
import ArrowUp from '../svg/arrow-up-right-svgrepo-com.svg'
import ArrowDown from '../svg/arrow-down-right-svgrepo-com.svg'
import Target from '../svg/target-svgrepo-com.svg'

const store = storeTransaction()

const dataArray = store.transaction

const lastTransaction = computed(() => {
    return dataArray.slice(-4).reverse()
})

const category = {

    earning: {
        logo: ArrowUp,
        boxColor: "bg-green-200",
        textColor: "text-green-600",
        textDark: "text-green-400",
    },

    expense: {
        logo: ArrowDown,
        boxColor: "bg-red-200",
        textColor: "text-red-600",
        textDark: "text-red-400",
    },

    savings: {
        logo: Target,
        boxColor: "bg-blue-200",
        textColor: "text-red-600",
        textDark: "text-red-400",
    },

    'refund-savings': {
        logo: Target,
        boxColor: 'bg-blue-200',
        textColor: 'text-green-600',
        textDark: 'text-green-400',
    }
}

</script>

<template>
    <div class="flex justify-center">
        <div class="flex flex-col border-1 rounded-lg border-gray-300 w-130"
            :class="(store.dark) ? 'bg-neutral-700 border-none' : ''">
            <div class="flex flex-row justify-between p-7 items-center">
                <p class="font-bold text-xl">Transazioni Recenti</p>
                <RouterLink to="/transaction">Vedi Tutte</RouterLink>
            </div>
            <div class="flex flex-col m-5 pl-4">
                <div v-for="card in lastTransaction" :key="card.id"
                    class="flex rounded-md m-2 p-2 pb-5 space-between flex-row justify-between pr-7"
                    :class="(store.dark) ? 'bg-neutral-700 border-none' : 'bg-white'">
                    <div class="flex items-center gap-3">
                        <div class="flex rounded-md w-10 h-10 justify-center items-center"
                            :class="category[card.category]?.boxColor">
                            <img class="w-6" :src="category[card.category]?.logo" alt="">
                        </div>
                        <div>
                            <p class="text-md font-medium">{{ card.description }}</p>
                            <p v-if="card.category === 'savings' || card.category === 'refund-savings'">{{ card.category
                                === 'refund-savings' ? 'Rimborso Obiettivo ' : '' }}{{ card.type }}</p>
                            <p class="text-sm" :class="store.dark ? 'text-slate-300' : 'text-gray-500'">{{ card.date }}
                            </p>
                        </div>
                    </div>
                    <p
                        :class="(store.dark ? category[card.category]?.textDark : category[card.category]?.textColor) + ' font-bold text-lg'">
                        {{ ['earning', 'refund-savings'].includes(card.category) ? '+ ' : '- ' }}{{ card.amount }}€
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.text-container p {
    margin: 0px !important;
}
</style>