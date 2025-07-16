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

function newGroup (name, desc, members) {

    const newGroup = {
        id: id++,
        name:name,
        desc:desc,
        members:members,
    };

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