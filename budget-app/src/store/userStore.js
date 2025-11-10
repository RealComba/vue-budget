import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { storeTransaction } from './store'

export const userStore = defineStore ('user', () => {

const members = ref([])
const groupData = ref([])   
const formActive = ref()
const activeGroup = ref()
const groupTransaction = ref([])



function createMembers(name, mail, phone) {

  let id = 0;

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
  let id = 0;
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
  let id = 0;

  const initials = memberSplit.map(memberName => {
    if (memberName === 'Tu') return 'TU';
    const member = members.value.find(m => m.name === memberName);
    return member ? member.initials : '';
  });


  const transaction = {
    groupId: groupid++,
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
  let myCredit = 0
  let myDebit = 0

  groupTransaction.value.forEach(t => {
  if (t.buyer === 'Tu' && !t.paid) {
    myCredit += Number(t.amountPerPerson)
  }

  if (t.buyer !== 'Tu' && t.members?.includes('Tu') && !t.paid) {
    myDebit += Number(t.amountPerPerson)
  }
})


  return {
    total: myCredit - myDebit,
    myCredit,
    myDebit,
  }
})

function pay(id) {
  const transaction = groupTransaction.value.find(t => t.id === id)
  const findMemberTsx = members.value.find(m => m.name === transaction.buyer)

  if (findMemberTsx) {
    findMemberTsx.transactions = findMemberTsx.transactions.map(t => {
      if (t.id === id) {
        return { ...t, paid: true }
      }}
  )}
  transaction.paid = true
  // if (transaction) {
  //   transaction.member.forEach(name => {
  //   const member = members.value.find(m => m.name === name)
  // })
  //   transaction.paid = true
  //   console.log(transaction)
  //   // console.log(mainStore.transaction)
  //   // mainStore.newTsx(transaction.category, transaction.amount, 'expense', transaction.description)
  // }
}

function countGroupsPerson(name) {
  const groups = groupData.value.filter(g => g.members.some(m => m.name === name))
  return groups.length
}

function deleteMember(id) {
  members.value = members.value.filter(m => m.id !== id)
  console.log(members.value)
}

function paidTransaction(transactionId) {
  const transaction = groupTransaction.value.find(t => t.id === transactionId)
  
  if (transaction) {
    transaction.member.forEach(name => {

    })
    transaction.paid = true
  }
  console.log(transaction)
}


    return {
        members,
        groupData,
        formActive,
        myAmount,
        paidTransaction,
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