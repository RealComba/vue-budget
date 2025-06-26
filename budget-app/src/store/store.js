import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

export const storeTransaction = defineStore ('transaction', () => {
    const expenses = ref([0])
    const earnings = ref([0])
    const transaction = ref ([])
    const goals = ref ([])

    let newId = 0

    function newTsx(category, amount, type) {
        if (isNaN(amount)) return
        if (category === 'expense' || category === 'savings') {
            expenses.value.push(amount)
        } else if (category === 'earning') {
            earnings.value.push(amount)
        } else {
            return
        }

        const newTransaction = {
            id: newId++,
            category: category,
            amount: amount,
            type: type,
            date: 'today'
        };
        transaction.value.push(newTransaction)
    }

    function Goals (name, firstAmount, maxAmount) {
        if(isNaN(firstAmount && maxAmount)) return

        const newGoals = {
            id: newId++,
            name: name,
            firstAmount: firstAmount,
            maxAmount: maxAmount,
        }
        goals.value.push(newGoals)
    }
    
    const expensesTotal = computed(() => {
        const exp = expenses?.value ?? []
        return Math.abs(exp.reduce((totale, transazione) => totale + transazione, 0))
    })

    const earningsTotal = computed(() => {
        const earn = earnings?.value ?? []
        return earn.reduce((totale, transazione) => totale + transazione, 0)
    })

    const totalValue = computed(() => {
        return earningsTotal.value - expensesTotal.value

    })

    watch (earnings.value, () => {
        console.log(earnings)
    })


     

    return {
        expensesTotal,
        earningsTotal,
        totalValue,
        newTsx,
        transaction,
        Goals,
        goals
    }
})