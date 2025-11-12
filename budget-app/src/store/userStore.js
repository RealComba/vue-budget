import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { storeTransaction } from './store'

export const userStore = defineStore ('user', () => {

const members = ref([])
const groupData = ref([])   
const formActive = ref()
const activeGroup = ref()
const groupTransaction = ref([])

// contatore globale per id transazioni
let nextTransactionId = 0

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

let groupId = 0;
function newGroup(name, desc, groupMembers) {
  let memberId = 0;
  const selectedMembers = members.value.filter(m =>
    groupMembers.includes(m.name))
    selectedMembers.push({name: 'Tu', initials: 'TU', id: memberId++, })

  const newGroup = {
    id: groupId++,
    name: name,
    desc: desc,
    members: selectedMembers,
    amount: 0,
  }
  groupData.value.push(newGroup)
  console.log(groupData.value)
}

function newTransaction(groupid, name, amount, category, description, buyer, memberSplit) {
  const id = nextTransactionId++

  const initials = memberSplit.map(memberName => {
    if (memberName === 'Tu') return 'TU';
    const member = members.value.find(m => m.name === memberName);
    return member ? member.initials : '';
  });


  const transaction = {
    groupId: groupid,
    id,
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
    paidBy: [],
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
  console.log('groupTransaction:', groupTransaction.value)

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
    const paidBy = t.paidBy || []

    if (t.buyer === 'Tu') {
      const others = t.members.filter(m => m !== 'Tu')
      const unpaidCount = others.filter(m => !paidBy.includes(m)).length
      myCredit += unpaidCount * Number(t.amountPerPerson)
    }

    if (t.buyer !== 'Tu' && t.members?.includes('Tu')) {
      if (!paidBy.includes('Tu')) {
        myDebit += amountPer
      }
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
}

function countGroupsPerson(name) {
  const groups = groupData.value.filter(g => g.members.some(m => m.name === name))
  return groups.length
}

function deleteMember(id) {
  members.value = members.value.filter(m => m.id !== id)
  console.log(members.value)
}

function paidTransaction(transactionId, memberName) {
  const transaction = groupTransaction.value.find(t => t.id === transactionId)
    if (!transaction) return


  if (memberName && !transaction.paidBy.includes(memberName)) {
    transaction.paidBy.push(memberName)
  }

    if (memberName) {
    const member = members.value.find(m => m.name === memberName)
    if (member) {
      const memberTsx = member.transactions.find(t => t.id === transactionId)
      if (memberTsx) memberTsx.paid = true
    }
  }

  const others = transaction.members.filter(m => m !== transaction.buyer)
  const allPaid = others.every(m => transaction.paidBy.includes(m))
  if (allPaid) {
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