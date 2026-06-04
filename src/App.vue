<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 py-8 px-4">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <header class="mb-8">
        <h1 class="text-4xl font-bold text-white mb-2">📅 Routine Tracker</h1>
        <p class="text-indigo-100">Stay on track with your daily routines</p>
      </header>

      <!-- Stats Bar -->
      <div class="grid grid-cols-2 gap-4 mb-8 md:grid-cols-4">
        <div class="bg-white/10 backdrop-blur-md rounded-lg p-4 text-white">
          <div class="text-3xl font-bold">{{ routineStore.totalRoutines }}</div>
          <div class="text-sm text-indigo-100">Total Routines</div>
        </div>
        <div class="bg-white/10 backdrop-blur-md rounded-lg p-4 text-white">
          <div class="text-3xl font-bold">{{ routineStore.completedCount }}</div>
          <div class="text-sm text-indigo-100">Completed Today</div>
        </div>
        <div class="bg-white/10 backdrop-blur-md rounded-lg p-4 text-white">
          <div class="text-3xl font-bold">{{ completionRate }}%</div>
          <div class="text-sm text-indigo-100">Completion Rate</div>
        </div>
        <div class="bg-white/10 backdrop-blur-md rounded-lg p-4 text-white">
          <button 
            @click="showForm = !showForm"
            class="w-full py-2 px-4 bg-pink-500 hover:bg-pink-600 rounded-lg font-semibold transition"
          >
            {{ showForm ? 'Cancel' : '+ New Routine' }}
          </button>
        </div>
      </div>

      <!-- Routine Form -->
      <RoutineForm v-if="showForm" @routine-added="onRoutineAdded" />

      <!-- Routines Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <RoutineCard 
          v-for="routine in routineStore.routines" 
          :key="routine.id"
          :routine="routine"
          @complete="completeRoutine"
          @delete="deleteRoutine"
        />
      </div>

      <!-- Empty State -->
      <div v-if="routineStore.totalRoutines === 0" class="text-center mt-12">
        <div class="text-6xl mb-4">📝</div>
        <h2 class="text-2xl font-bold text-white mb-2">No routines yet</h2>
        <p class="text-indigo-100 mb-6">Create your first routine to get started!</p>
        <button 
          @click="showForm = true"
          class="px-6 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:bg-indigo-50 transition"
        >
          Create Your First Routine
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoutineStore } from './stores/routineStore'
import RoutineForm from './components/RoutineForm.vue'
import RoutineCard from './components/RoutineCard.vue'

const routineStore = useRoutineStore()
const showForm = ref(false)

const completionRate = computed(() => {
  if (routineStore.totalRoutines === 0) return 0
  return Math.round((routineStore.completedCount / routineStore.totalRoutines) * 100)
})

const onRoutineAdded = () => {
  showForm.value = false
}

const completeRoutine = (id) => {
  routineStore.completeRoutine(id)
}

const deleteRoutine = (id) => {
  if (confirm('Are you sure you want to delete this routine?')) {
    routineStore.deleteRoutine(id)
  }
}
</script>
