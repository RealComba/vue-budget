<script setup>
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'vue-chartjs'
import { storeTransaction } from '../store/store';

const cleanAmount = x => Number(x.toString().replace(/,/g, '')) || 0
const store = storeTransaction()
const expenses = store.transaction.filter(t => t.category === 'expense')
const typeList = ['alimentari', 'trasporti', 'intrattenimento', 'salute', 'sport', 'viaggi' , 'altro']

store.groupedLabel.length = 0;
console.log(store.groupedLabel)
console.log(store.groupedLabel.value)

expenses.forEach((e) => {
    const amount = cleanAmount(e.amount)
    const type = typeList.includes(e.type) ? e.type : 'Altre spese'
    const existing = store.groupedLabel.find(e => e.label === type)

    if(existing) {
        existing.value += amount
    } else {
        store.groupedLabel.push({label: type, value: amount})
    }
    console.log(store.groupedLabel)
})


ChartJS.register(ArcElement, Tooltip, Legend)

const options = {
   responsive: true,
   aspectRatio: 1.33
}

const data = {  
labels: store.groupedLabel.map(item => item.label),
  datasets: [{
    data: store.groupedLabel.map(item => item.value),
    borderWidth: 0,
    cutout: 100,
    backgroundColor: [
     "rgb(239, 68, 68)",    // red-500
      "rgb(249, 115, 22)",   // orange-500
      "rgb(234, 179, 8)",    // yellow-500
      "rgb(34, 197, 94)",    // green-500
      "rgb(59, 130, 246)",   // blue-500
      "rgb(168, 85, 247)",   // purple-500
       "rgb(6, 182, 212)",    // cyan-500
    ],
    hoverOffset: 4
  }],
};


</script>

<template>
    <Doughnut :data="data" :options="options" />
</template>