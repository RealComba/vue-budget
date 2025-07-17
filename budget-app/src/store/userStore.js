import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

export const userStore = defineStore ('user', () => {

const groupData = ref([])   
const formActive = ref()
const members = ref([{ name:'Antonio Florea', initials:'AF' }, { name:'Lorenzo Giacopuzzi', initials:'LG' }, { name:'Tommaso Chieregato', initials:'TC' }, { name:'Mattia Corolaita', initials:'MT' },])
const groupTransaction = ref([])
let id = 0;

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
    category: category,
    description: description,
    buyer: buyer,
    members: memberSplit,
  }

  groupTransaction.value.push(transaction)
  console.log(groupTransaction.value)
}


    return {
        members,
        groupData,
        formActive,
        form,
        newGroup,
        newTransaction,
    }
})