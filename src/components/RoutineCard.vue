<template>
  <div :class="['bg-white/10 backdrop-blur-md rounded-lg p-6 text-white transition transform hover:scale-105', routine.completedToday ? 'ring-2 ring-green-400' : '']">
    <!-- Header -->
    <div class="flex justify-between items-start mb-4">
      <div class="flex-1">
        <h3 class="text-xl font-bold mb-1">{{ routine.name }}</h3>
        <p class="text-indigo-100 text-sm">{{ routine.description }}</p>
      </div>
      <button 
        @click="deleteClick"
        class="text-red-300 hover:text-red-500 transition ml-2"
      >
        🗑️
      </button>
    </div>

    <!-- Routine Info -->
    <div class="mb-4 space-y-2 text-sm text-indigo-100">
      <div v-if="routine.reminderTime">
        <span class="font-medium">⏰ Reminder:</span> {{ routine.reminderTime }}
      </div>
      <div>
        <span class="font-medium">📊 Frequency:</span> {{ routine.frequency }}
      </div>
    </div>

    <!-- Tasks List -->
    <TaskList 
      v-if="routine.tasks && routine.tasks.length > 0"
      :routine="routine"
      class="mb-4"
    />

    <!-- Completion Stats -->
    <div class="mb-4 text-sm">
      <div class="text-indigo-100">Completed: {{ completionHistory.length }} days</div>
      <div v-if="completionHistory.length > 0" class="text-xs text-indigo-200 mt-1">
        Last completed: {{ lastCompleted }}
      </div>
    </div>

    <!-- Complete Button -->
    <button 
      @click="completeClick"
      :class="['w-full py-2 px-4 rounded-lg font-semibold transition', routine.completedToday ? 'bg-green-500 hover:bg-green-600' : 'bg-pink-500 hover:bg-pink-600']"
    >
      {{ routine.completedToday ? '✓ Completed Today' : 'Mark as Complete' }}
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import TaskList from './TaskList.vue'

const props = defineProps({
  routine: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['complete', 'delete'])

const completionHistory = computed(() => {
  return props.routine.completionHistory || []
})

const lastCompleted = computed(() => {
  if (completionHistory.value.length === 0) return 'Never'
  const last = completionHistory.value[completionHistory.value.length - 1]
  return new Date(last).toLocaleDateString()
})

const completeClick = () => {
  emit('complete', props.routine.id)
}

const deleteClick = () => {
  emit('delete', props.routine.id)
}
</script>
