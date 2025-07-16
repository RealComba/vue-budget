import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

export const userStore = defineStore ('user', () => {

const groupData = ref([])   
const formActive = ref()
const members = ref([{ name:'Antonio Florea', initials:'AF' }, { name:'Lorenzo Giacopuzzi', initials:'LG' },])
let id = 0;

function form (data) {
    formActive.value = data
}

function newGroup(name, desc, groupMembers) {
  const selectedMembers = members.value.filter(m =>
    groupMembers.includes(m.name)
  )

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


    return {
        members,
        groupData,
        formActive,
        form,
        newGroup,
    }
})