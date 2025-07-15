<template>
  <Line :data="data" :options="options" />
</template>

<script setup>
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Line } from 'vue-chartjs'
import { storeTransaction } from '../store/store'
import { computed } from 'vue'

const store = storeTransaction()

const transaction = store.transaction


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)


const data = computed(() => {
    const labels = transaction.map((t, i) => t.name || `T${i + 1}`)
    let runningTotal = 0
    const balanceData = transaction.map(t => {
        if (t.category === 'earning' || t.category === 'refund-savings') {
        runningTotal += t.amount
        console.log(runningTotal)
        } else if (t.category === 'expense' || t.category === 'savings') {
        console.log(t.amount)
        runningTotal -= Number(t.amount)
        console.log(runningTotal)
        }
        return runningTotal
    })

  return {
    labels,
    datasets: [
      {
        label: 'Andamento Movimenti',
        data: balanceData,
        borderColor: 'rgb(59, 130, 246)', // blu
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        fill: false,
        tension: 0, // rende la linea "ondulata"
        spanGaps: true
      }
    ]
  }
})

const options = computed(() => {
    const color =  store.dark ? '#fff' : '#000'
    return {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          color: color
        }
      },
      y: {
        ticks: {
          color: color
        }
      }
    },
    plugins: {
      legend: {
        labels: {
          color: color
        }
      }
    }
  }
})

</script>