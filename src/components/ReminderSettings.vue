<template>
  <div class="bg-white/10 backdrop-blur-md rounded-lg p-4 text-white">
    <h4 class="font-semibold text-sm mb-3 text-indigo-100">Reminder Settings</h4>
    <div class="space-y-3">
      <div v-if="routine.reminderTime" class="flex items-center justify-between p-2 bg-white/5 rounded">
        <span class="text-sm">⏰ {{ routine.reminderTime }}</span>
        <span class="text-xs text-green-300">Active</span>
      </div>
      <div v-else class="text-xs text-indigo-200">
        No reminder set
      </div>
      <div class="text-xs text-indigo-200 mt-2">
        <div>📍 Frequency: {{ routine.frequency }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  routine: {
    type: Object,
    required: true
  }
})
</script>
