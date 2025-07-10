<template>
<Bar :data="data" :options="options"/>
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



function getPercent(firstAmount, maxAmount) {
    return Math.round((firstAmount/maxAmount) * 100)
}

const store = storeTransaction()
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const data = computed(() => ({
    labels:
    store.goals.map(goal => goal.name),
  datasets: [
    {
      label: 'Progresso %',
      backgroundColor: '#f87979',
      data: store.goals.map(goal => getPercent(goal.firstAmount, goal.maxAmount)),
      backgroundColor: [
          "rgb(239, 68, 68)",    // red-500
          "rgb(219, 39, 119)",   // pink-500
          "rgb(168, 85, 247)",   // purple-500
          "rgb(139, 92, 246)",   // violet-500
          "rgb(99, 102, 241)",   // indigo-500
          "rgb(59, 130, 246)",   // blue-500
          "rgb(14, 165, 233)",   // sky-500
          "rgb(6, 182, 212)",    // cyan-500
          "rgb(20, 184, 166)",   // teal-500
          "rgb(34, 197, 94)",    // green-500
          "rgb(132, 204, 22)",   // lime-500
          "rgb(234, 179, 8)",    // yellow-500
          "rgb(245, 158, 11)",   // amber-500
          "rgb(249, 115, 22)",   // orange-500
          "rgb(244, 63, 94)",    // rose-500
          "rgb(115, 115, 115)",  // neutral-500
          "rgb(113, 113, 122)",  // zinc-500
          "rgb(107, 114, 128)",  // gray-500
          "rgb(100, 116, 139)",  // slate-500
          "rgb(120, 113, 108)"   // stone-500
    ],
    }
  ]
}))

const options = {
  scales: {
    y: {
      min: 0,
      max: 100,
    }
  }
}

</script>