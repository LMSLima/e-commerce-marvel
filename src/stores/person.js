import { defineStore } from "pinia";
import { computed, reactive } from "vue";
import PersonService from '@/services/person'

export const usePersonStore = defineStore('person',() => {
  const state = reactive({
    person: [],
    loading: false,
    error: null
  })

  const person = computed(() => state.person)

  async function getAllPerson() {
    try {
      const response = await PersonService.getAllPersons()
      state.person = response
    } catch (error) {
      state.error = error
      console.error('Erro ao buscar personagens da Marvel:', error)
    }
    };

  return {
    person,
    getAllPerson
  }
})