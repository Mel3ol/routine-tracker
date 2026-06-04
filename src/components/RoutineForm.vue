<template>
  <div class="bg-white/10 backdrop-blur-md rounded-lg p-6 mb-8 text-white">
    <h2 class="text-2xl font-bold mb-6">Create New Routine</h2>
    
    <form @submit.prevent="submitForm" class="space-y-6">
      <!-- Routine Name -->
      <div>
        <label class="block text-sm font-medium mb-2">Routine Name</label>
        <input 
          v-model="form.name"
          type="text"
          placeholder="e.g., Morning Workout"
          class="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-indigo-200 focus:outline-none focus:border-pink-500"
          required
        />
      </div>

      <!-- Description -->
      <div>
        <label class="block text-sm font-medium mb-2">Description</label>
        <textarea 
          v-model="form.description"
          placeholder="Describe your routine..."
          rows="3"
          class="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-indigo-200 focus:outline-none focus:border-pink-500"
        ></textarea>
      </div>

      <!-- Time -->
      <div>
        <label class="block text-sm font-medium mb-2">Time to Remind</label>
        <input 
          v-model="form.reminderTime"
          type="time"
          class="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white focus:outline-none focus:border-pink-500"
        />
      </div>

      <!-- Frequency -->
      <div>
        <label class="block text-sm font-medium mb-2">Frequency</label>
        <select 
          v-model="form.frequency"
          class="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white focus:outline-none focus:border-pink-500"
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="custom">Custom</option>
        </select>
      </div>

      <!-- Tasks -->
      <div>
        <label class="block text-sm font-medium mb-2">Tasks (Optional)</label>
        <div class="space-y-2 mb-4">
          <div v-for="(task, index) in form.tasks" :key="index" class="flex gap-2">
            <input 
              v-model="form.tasks[index]"
              type="text"
              placeholder="Add a task..."
              class="flex-1 px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-indigo-200 focus:outline-none focus:border-pink-500"
            />
            <button 
              type="button"
              @click="removeTask(index)"
              class="px-3 py-2 bg-red-500/50 hover:bg-red-600 rounded-lg transition"
            >
              ✕
            </button>
          </div>
        </div>
        <button 
          type="button"
          @click="addTask"
          class="px-4 py-2 bg-indigo-400/50 hover:bg-indigo-500 rounded-lg transition"
        >
          + Add Task
        </button>
      </div>

      <!-- Submit -->
      <button 
        type="submit"
        class="w-full py-3 bg-pink-500 hover:bg-pink-600 rounded-lg font-semibold transition"
      >
        Create Routine
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoutineStore } from '../stores/routineStore'
import { requestNotificationPermission, scheduleReminder } from '../utils/notifications'

const routineStore = useRoutineStore()

const emit = defineEmits(['routine-added'])

const form = ref({
  name: '',
  description: '',
  reminderTime: '09:00',
  frequency: 'daily',
  tasks: []
})

const addTask = () => {
  form.value.tasks.push('')
}

const removeTask = (index) => {
  form.value.tasks.splice(index, 1)
}

const submitForm = async () => {
  if (!form.value.name.trim()) {
    alert('Please enter a routine name')
    return
  }

  // Request notification permission
  if (form.value.reminderTime) {
    await requestNotificationPermission()
  }

  // Create routine object
  const routine = {
    name: form.value.name,
    description: form.value.description,
    reminderTime: form.value.reminderTime,
    frequency: form.value.frequency,
    tasks: form.value.tasks
      .filter(t => t.trim())
      .map(t => ({ name: t, completed: false }))
  }

  // Add routine to store
  const newRoutine = routineStore.addRoutine(routine)

  // Schedule reminder if time is set
  if (form.value.reminderTime) {
    scheduleReminder(form.value.name, form.value.reminderTime)
  }

  // Reset form
  form.value = {
    name: '',
    description: '',
    reminderTime: '09:00',
    frequency: 'daily',
    tasks: []
  }

  emit('routine-added', newRoutine)
}
</script>
