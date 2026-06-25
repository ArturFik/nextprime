<template>
  <div class="workout-card" :class="{ completed }">
    <div class="workout-card-header">
      <div class="workout-card-left">
        <h3 class="workout-card-title">{{ title }}</h3>
        <p class="workout-card-duration">⏱ {{ duration }}</p>
      </div>
      <div class="workout-card-status">
        <span v-if="completed" class="badge-completed">✅ Готово</span>
        <span v-else class="badge-pending">⏳ Ожидает</span>
      </div>
    </div>
    <div class="workout-card-exercises">
      <div v-for="(ex, i) in exercises" :key="i" class="exercise-item">
        <span class="exercise-dot"></span>
        <span class="exercise-name">{{ ex }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, required: true },
  exercises: { type: Array, required: true },
  duration: { type: String, required: true },
  completed: { type: Boolean, default: false },
});
</script>

<style scoped>
.workout-card {
  background: #fff;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  border-left: 4px solid #2563eb;
  transition: all 0.2s;
}

.workout-card.completed {
  border-left-color: #22c55e;
  opacity: 0.7;
}

.workout-card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.workout-card-title {
  font-size: 16px;
  font-weight: 600;
}

.workout-card-duration {
  font-size: 13px;
  color: #6b7280;
  margin-top: 2px;
}

.badge-completed {
  font-size: 12px;
  color: #166534;
  background: #dcfce7;
  padding: 2px 10px;
  border-radius: 12px;
}

.badge-pending {
  font-size: 12px;
  color: #92400e;
  background: #fef3c7;
  padding: 2px 10px;
  border-radius: 12px;
}

.workout-card-exercises {
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid #f3f4f6;
}

.exercise-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #4b5563;
  padding: 2px 0;
}

.exercise-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #2563eb;
  flex-shrink: 0;
}
</style>
