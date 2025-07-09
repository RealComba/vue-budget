<template>
<Bar :data="data"/>
    <div v-for="goal in store.goals" :key="goal.id">
        <p>{{ goal.name }}: {{ goal.firstAmount }}</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { storeTransaction } from '../store/store'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import { Bar } from 'vue-chartjs'

const store = storeTransaction()
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)
store.goals.forEach((goal) => {
    console.log(goal)
    return goal
})


const data = computed(() => ({
    labels: [
    [store.goals.map(goal => goal.name),],
  ],
  datasets: [
    {
      label: 'Data One',
      backgroundColor: '#f87979',
      data: store.goals.firstAmount
    }
  ]
}))

</script>