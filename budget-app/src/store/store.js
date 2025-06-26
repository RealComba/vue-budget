import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

export const storeTransaction = defineStore ('transaction', () => {
    const expenses = ref([0])
    const earnings = ref([0])
    const transaction = ref ([])
    const goals = ref ([])
    const showForm = ref('close')
    const showGoalsForm = ref('close')

    let newId = 0

    function formatDate(date) {
    const now = new Date()
    const d = new Date(date)
    const diff = now.setHours(0,0,0,0) - d.setHours(0,0,0,0)
    if (diff === 0) return 'Today'
    if (diff === 86400000) return 'Yesterday'
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) 
    }

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
            date: formatDate(Date.now())
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

        const transactionGoal = {
            id: newId++,
            category: 'savings',
            amount: firstAmount,
            type: `Risparmi Obiettivo ${name}`,
            date: formatDate(Date.now())
        }

        goals.value.push(newGoals)
        transaction.value.push(transactionGoal)
        expenses.value.push(firstAmount)
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

    function closeForm(data) {
        showForm.value = data
    }

    function closeGoalsForm(data) {
        showGoalsForm.value = data
    }

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
        goals,
        closeForm,
        showForm,
        closeGoalsForm,
        showGoalsForm,
    }
})