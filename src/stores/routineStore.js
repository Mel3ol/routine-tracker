import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useRoutineStore = defineStore('routine', () => {
  const routines = ref([])

  // Load routines from localStorage
  const loadRoutines = () => {
    const stored = localStorage.getItem('routines')
    if (stored) {
      routines.value = JSON.parse(stored)
    }
  }

  // Save routines to localStorage
  const saveRoutines = () => {
    localStorage.setItem('routines', JSON.stringify(routines.value))
  }

  // Add a new routine
  const addRoutine = (routine) => {
    const newRoutine = {
      id: Date.now(),
      createdAt: new Date().toISOString(),
      completedToday: false,
      completionHistory: [],
      ...routine
    }
    routines.value.push(newRoutine)
    saveRoutines()
    return newRoutine
  }

  // Update routine
  const updateRoutine = (id, updatedRoutine) => {
    const index = routines.value.findIndex(r => r.id === id)
    if (index !== -1) {
      routines.value[index] = { ...routines.value[index], ...updatedRoutine }
      saveRoutines()
    }
  }

  // Delete routine
  const deleteRoutine = (id) => {
    routines.value = routines.value.filter(r => r.id !== id)
    saveRoutines()
  }

  // Mark routine as completed
  const completeRoutine = (id) => {
    const routine = routines.value.find(r => r.id === id)
    if (routine) {
      const today = new Date().toDateString()
      if (!routine.completionHistory) {
        routine.completionHistory = []
      }
      if (!routine.completionHistory.includes(today)) {
        routine.completionHistory.push(today)
        routine.completedToday = true
        saveRoutines()
      }
    }
  }

  // Mark routine task as completed
  const completeTask = (routineId, taskIndex) => {
    const routine = routines.value.find(r => r.id === routineId)
    if (routine && routine.tasks && routine.tasks[taskIndex]) {
      routine.tasks[taskIndex].completed = true
      saveRoutines()
    }
  }

  // Reset routine completion for today
  const resetRoutineForToday = (id) => {
    const routine = routines.value.find(r => r.id === id)
    if (routine) {
      routine.completedToday = false
      routine.tasks?.forEach(task => task.completed = false)
      saveRoutines()
    }
  }

  // Get completed count today
  const completedCount = computed(() => {
    return routines.value.filter(r => r.completedToday).length
  })

  // Get total routines count
  const totalRoutines = computed(() => {
    return routines.value.length
  })

  // Initialize store
  loadRoutines()

  return {
    routines,
    addRoutine,
    updateRoutine,
    deleteRoutine,
    completeRoutine,
    completeTask,
    resetRoutineForToday,
    completedCount,
    totalRoutines,
    loadRoutines,
    saveRoutines
  }
})
