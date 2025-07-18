import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

export const userStore = defineStore ('user', () => {

const groupData = ref([])   
const formActive = ref()
const activeGroup = ref()
const members = ref([{ name:'Antonio Florea', initials:'AF' }, { name:'Lorenzo Giacopuzzi', initials:'LG' }, { name:'Tommaso Chieregato', initials:'TC' }, { name:'Mattia Corolaita', initials:'MT' },])
const groupTransaction = ref([])
let id = 0;


function formatDate(date) {
    // const now = new Date()
    const d = new Date(date)
    // const diff = now.setHours(0,0,0,0) - d.setHours(0,0,0,0)
    // if (diff === 0) return 'Oggi'
    // if (diff === 86400000) return 'Yesterday'
    return d.toLocaleDateString('it-IT', { year: 'numeric' ,month: 'short', day: 'numeric' }) 
  }

function form (data) {
    formActive.value = data
}

function newGroup(name, desc, groupMembers) {
  const selectedMembers = members.value.filter(m =>
    groupMembers.includes(m.name))
    selectedMembers.push({name: 'Tu', initials: 'TU'})

  const newGroup = {
    id: id++,
    name: name,
    desc: desc,
    members: selectedMembers,
    amount: 0,
  }

  groupData.value.push(newGroup)
  console.log(groupData.value)
}

function newTransaction(groupid, name, amount, category, description, buyer, memberSplit) {

  const transaction = {
    groupId: groupid,
    id: id++,
    name: name,
    amount: amount,
    date: formatDate(Date.now()),
    category: category,
    description: description,
    buyer: buyer,
    members: memberSplit,
  }

  groupTransaction.value.push(transaction)
  const group = groupData.value.find(g => g.id === groupid)

  console.log('groupData:', groupData.value)
  if (group) {
    group.amount += amount
    console.log(group.amount)
  }
}

function groupActivated(data) {
  activeGroup.value = data
  console.log(activeGroup.value)
}

const myAmount = computed(() => {
  const myCredit = groupTransaction.value.filter(t => t.buyer === 'Tu').map(t => Number(t.amount) - (Number(t.amount) / (t.members?.length || 1))).reduce((sum, val) => sum + val, 0)
  const myDebit = groupTransaction.value.filter(t => t.buyer !== 'Tu' && t.members?.includes('Tu')).map(t => Number(t.amount) / (t.members?.length || 1)).reduce((sum, val) => sum + val, 0)

  return (myCredit - myDebit)
})


    return {
        members,
        groupData,
        formActive,
        myAmount,
        form,
        newGroup,
        newTransaction,
        groupActivated,
        activeGroup,
        groupTransaction,
    }
})