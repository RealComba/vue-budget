import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { storeTransaction } from './store'

export const userStore = defineStore ('user', () => {

const members = ref([])
const groupData = ref([])   
const formActive = ref()
const activeGroup = ref()
let id = 0;


function createMembers(name, mail, phone) {

  const newMember = {
    id: id++,
    name: name,
    initials: getInitials(name),
    mail: mail,   
    phone: phone,
    transactions: [],
  }
  members.value.push(newMember)
}
const groupTransaction = ref([])

function getInitials(name) {
  return name
    .split(' ')
    .map(word => word[0]?.toUpperCase() || '')
    .join('');
}

function formatDate(date) {
    const d = new Date(date)
    return d.toLocaleDateString('it-IT', { year: 'numeric' ,month: 'short', day: 'numeric' }) 
  }

function form (data) {
    formActive.value = data
}

function newGroup(name, desc, groupMembers) {
  const selectedMembers = members.value.filter(m =>
    groupMembers.includes(m.name))
    selectedMembers.push({name: 'Tu', initials: 'TU', id: id++, })

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

  const initials = memberSplit.map(memberName => {
    if (memberName === 'Tu') return 'TU';
    const member = members.value.find(m => m.name === memberName);
    return member ? member.initials : '';
  });


  const transaction = {
    groupId: groupid,
    id: id++,
    name: name,
    amount: amount,
    amountPerPerson: (amount / memberSplit.length).toFixed(2),
    date: formatDate(Date.now()),
    category: category,
    description: description,
    buyer: buyer,
    members: memberSplit,
    initials: initials,
    paid: false,
  }


  groupTransaction.value.push(transaction)
  transaction.members.forEach(memberName => {
    const member = members.value.find(m => m.name === memberName);
    if (member) {
      member.transactions.push({ ...transaction, paid: false });
    }
  });
  console.log('lista membri', members.value)
  console.log('lista membri in transazione',transaction.members)
  console.log('transazione', transaction)

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
  const myDebit = groupTransaction.value.filter(t => t.buyer !== 'Tu' && t.members?.includes('Tu') && t.paid !== true).map(t => Number(t.amount) / (t.members?.length || 1)).reduce((sum, val) => sum + val, 0)

  return {
    total: myCredit - myDebit,
    myCredit: myCredit,
    myDebit: myDebit,
  }
})

function pay(id) {
  const mainStore = storeTransaction()
  const transaction = groupTransaction.value.find(t => t.id === id)
  if (transaction) {
    transaction.paid = true
    console.log(transaction)
    // console.log(mainStore.transaction)
    // mainStore.newTsx(transaction.category, transaction.amount, 'expense', transaction.description)
  }
}

function countGroupsPerson(name) {
  const groups = groupData.value.filter(g => g.members.some(m => m.name === name))
  return groups.length
}

function deleteMember(id) {
  members.value = members.value.filter(m => m.id !== id)
  console.log(members.value)
}


    return {
        members,
        groupData,
        formActive,
        myAmount,
        pay,
        form,
        newGroup,
        newTransaction,
        groupActivated,
        countGroupsPerson,
        createMembers,
        deleteMember,
        activeGroup,
        groupTransaction,
    }
}, {
    // persist: true,
})