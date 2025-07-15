import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

export const userStore = defineStore ('user', () => {

const amount = ref()
const formActive = ref(true)

function form (data) {
    formActive.value = data
}
    return {
        formActive,
        form,
    }
})