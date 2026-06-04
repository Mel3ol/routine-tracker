<template>
  <div class="bg-white/5 rounded-lg p-4 mb-4">
    <h4 class="font-semibold text-sm mb-3 text-indigo-100">Tasks</h4>
    <div class="space-y-2">
      <div 
        v-for="(task, index) in routine.tasks" 
        :key="index"
        class="flex items-center gap-3 p-2 bg-white/5 rounded hover:bg-white/10 transition"
      >
        <input 
          type="checkbox"
          :checked="task.completed"
          @change="toggleTask(index)"
          class="w-4 h-4 rounded cursor-pointer"
        />
        <span :class="['flex-1', task.completed ? 'line-through text-indigo-300' : 'text-white']">
          {{ task.name }}
        </span>
      </div>
    </div>
    <div class="text-xs text-indigo-200 mt-2">
      {{ completedCount }} of {{ routine.tasks.length }} completed
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoutineStore } from '../stores/routineStore'

const props = defineProps({
  routine: {
    type: Object,
    required: true
  }
})

const routineStore = useRoutineStore()

const completedCount = computed(() => {
  return props.routine.tasks?.filter(t => t.completed).length || 0
})

const toggleTask = (index) => {
  routineStore.completeTask(props.routine.id, index)
}
</script>
