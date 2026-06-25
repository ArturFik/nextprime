<template>
  <div>
    <h1 class="page-title">🏋️ Тренировки</h1>
    
    <!-- Календарь -->
    <div class="calendar">
      <div class="calendar-week">
        <div v-for="day in daysOfWeek" :key="day" class="calendar-week-label">
          {{ day }}
        </div>
      </div>
      <div class="calendar-grid">
        <div 
          v-for="day in calendarDays" 
          :key="day.date"
          class="calendar-day"
          :class="{
            'calendar-day-today': day.isToday,
            'calendar-day-workout': day.isWorkout
          }"
        >
          {{ day.day }}
        </div>
      </div>
    </div>
    
    <!-- Список тренировок -->
    <div class="workout-list">
      <WorkoutCard 
        v-for="workout in workouts" 
        :key="workout.id"
        :title="workout.title"
        :exercises="workout.exercises"
        :duration="workout.duration"
        :completed="workout.completed"
      />
    </div>
  </div>
</template>

<script setup>
import WorkoutCard from '~/components/WorkoutCard.vue'

const daysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']

const calendarDays = [
  { day: 1, date: '2024-01-01', isToday: false, isWorkout: false },
  { day: 2, date: '2024-01-02', isToday: false, isWorkout: true },
  { day: 3, date: '2024-01-03', isToday: false, isWorkout: false },
  { day: 4, date: '2024-01-04', isToday: false, isWorkout: true },
  { day: 5, date: '2024-01-05', isToday: false, isWorkout: false },
  { day: 6, date: '2024-01-06', isToday: false, isWorkout: true },
  { day: 7, date: '2024-01-07', isToday: false, isWorkout: false },
  { day: 8, date: '2024-01-08', isToday: false, isWorkout: false },
  { day: 9, date: '2024-01-09', isToday: false, isWorkout: true },
  { day: 10, date: '2024-01-10', isToday: false, isWorkout: false },
  { day: 11, date: '2024-01-11', isToday: false, isWorkout: true },
  { day: 12, date: '2024-01-12', isToday: false, isWorkout: false },
  { day: 13, date: '2024-01-13', isToday: false, isWorkout: true },
  { day: 14, date: '2024-01-14', isToday: false, isWorkout: false },
  { day: 15, date: '2024-01-15', isToday: true, isWorkout: true },
  { day: 16, date: '2024-01-16', isToday: false, isWorkout: false },
  { day: 17, date: '2024-01-17', isToday: false, isWorkout: true },
  { day: 18, date: '2024-01-18', isToday: false, isWorkout: false },
  { day: 19, date: '2024-01-19', isToday: false, isWorkout: true },
  { day: 20, date: '2024-01-20', isToday: false, isWorkout: false },
  { day: 21, date: '2024-01-21', isToday: false, isWorkout: true },
  { day: 22, date: '2024-01-22', isToday: false, isWorkout: false },
  { day: 23, date: '2024-01-23', isToday: false, isWorkout: true },
  { day: 24, date: '2024-01-24', isToday: false, isWorkout: false },
  { day: 25, date: '2024-01-25', isToday: false, isWorkout: true },
  { day: 26, date: '2024-01-26', isToday: false, isWorkout: false },
  { day: 27, date: '2024-01-27', isToday: false, isWorkout: true },
  { day: 28, date: '2024-01-28', isToday: false, isWorkout: false },
  { day: 29, date: '2024-01-29', isToday: false, isWorkout: true },
  { day: 30, date: '2024-01-30', isToday: false, isWorkout: false },
  { day: 31, date: '2024-01-31', isToday: false, isWorkout: true },
]

const workouts = [
  {
    id: 1,
    title: 'Грудь + Трицепс',
    exercises: ['Жим лёжа 3x10', 'Разводка гантелей 3x12', 'Французский жим 3x8'],
    duration: '45 мин',
    completed: false,
  },
  {
    id: 2,
    title: 'Спина + Бицепс',
    exercises: ['Подтягивания 4x6', 'Тяга штанги 3x10', 'Подъём на бицепс 3x12'],
    duration: '50 мин',
    completed: true,
  },
]
</script>

<style scoped>
.page-title {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 16px;
}

.calendar {
  background: #fff;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.08);
  margin-bottom: 16px;
}

.calendar-week {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
  margin-bottom: 8px;
}

.calendar-week-label {
  text-align: center;
  font-size: 11px;
  font-weight: 600;
  color: #9ca3af;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
}

.calendar-day {
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  border-radius: 8px;
  transition: all 0.2s;
  background: #f3f4f6;
  color: #4b5563;
}

.calendar-day-today {
  background: #2563eb;
  color: #fff;
  font-weight: 600;
}

.calendar-day-workout {
  background: #dcfce7;
  color: #166534;
}

.workout-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>