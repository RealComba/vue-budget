import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

export const storeTransaction = defineStore ('transaction', () => {
    const expenses = ref([0])
    const earnings = ref([0])
    const transaction = ref ([])
    const goals = ref ([])
    const showForm = ref('close')
    const showGoalsForm = ref('close')
    const firstAmount = ref([])
    const maxAmount = ref([])
    const goalActive = ref()
    const category = ref()


    let newId = 0

    function formatDate(date) {
    const now = new Date()
    const d = new Date(date)
    const diff = now.setHours(0,0,0,0) - d.setHours(0,0,0,0)
    if (diff === 0) return 'Today'
    if (diff === 86400000) return 'Yesterday'
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) 
    }

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

    function newTsx(category, amount, type) {
        if (isNaN(amount)) return
        if (category === 'expense' || category === 'savings') {
            expenses.value.push(amount)
        } else if (category === 'earning' || category === 'refund-savings') {
            earnings.value.push(amount)
        } else {
            return
        }

        const newTransaction = {
            id: newId++,
            category: category,
            amount: numberWithCommas(amount),
            type: type,
            date: formatDate(Date.now())
        };
        transaction.value.push(newTransaction)
    }

    function Goals (name, first, max) {
        first = parseInt(first)
        max = parseInt(max)
        if(isNaN(first && max)) return

        const newGoals = {
            id: newId++,
            name: name,
            firstAmount: first,
            maxAmount: max,
        }

        const transactionGoal = {
            id: newId++,
            category: 'savings',
            amount: numberWithCommas(first),
            type: `${name}`,
            date: formatDate(Date.now())
        }

        goals.value.push(newGoals)
        transaction.value.push(transactionGoal)
        expenses.value.push(first)
        firstAmount.value.push(first)
        maxAmount.value.push(max)
    }

    function setActiveGoal (id) {
        goalActive.value = goals.value.find(g => g.id === id)
        return goalActive.value
    }

    function newAmount(newAmount) {
        const tot = goalActive.value.firstAmount
        goalActive.value.firstAmount = tot + parseInt(newAmount.value)
        if (newAmount.value > 0) {
            category.value = 'savings'
            expenses.value.push(newAmount.value)
        } else {
            category.value = 'refund-savings'
            earnings.value.push(Math.abs(newAmount.value))
        }

        const transactionGoal = {
            id: newId++,
            category: category.value,
            amount: newAmount.value,
            type: `${goalActive.value.name}`,
            date: formatDate(Date.now())
        }

        transaction.value.push(transactionGoal)
    }

    function modifyGoal (name, max) {
        goalActive.value.name = name
        goalActive.value.maxAmount = max
    }

    function deleteGoal() {

        const newTransaction = {
            id: newId++,
            category: 'refund-savings',
            amount: goalActive.value.firstAmount,
            type: `${goalActive.value.name}`,
            date: formatDate(Date.now())
        }

        goals.value = goals.value.filter(g => g.id !== goalActive.value.id)
        console.log(goals.value)
        transaction.value.push(newTransaction)
        earnings.value.push(goalActive.value.firstAmount)
    }
    
    const totFirstAmount = computed (() => {
        const goalAmount = goals.value.map(g => g.firstAmount) 
        return goalAmount.reduce((totale, importo) => totale + importo, 0)
    })

    const totMaxAmount = computed (() => {
        const goalAmount = goals.value.map(g => g.maxAmount) 
        return goalAmount.reduce((totale, importo) => totale + importo, 0)
    })
    
    const expensesTotal = computed(() => {
        const exp = expenses?.value ?? []
        return Math.abs(exp.reduce((totale, transazione) => totale + transazione, 0))
    })

    const earningsTotal = computed(() => {
        const earn = earnings?.value ?? []
        return (earn.reduce((totale, transazione) => totale + transazione, 0))
    })

    const totalValue = computed(() => {
        return numberWithCommas(earningsTotal.value - expensesTotal.value)

    })

    const balance = computed (() => {
        return numberWithCommas(earningsTotal.value - expensesTotal.value + 12000)
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
        balance,
        totFirstAmount,
        totMaxAmount,
        setActiveGoal,
        goalActive,
        newAmount,
        modifyGoal,
        deleteGoal
    }
})