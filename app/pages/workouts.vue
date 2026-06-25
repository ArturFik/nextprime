<template>
  <div>
    <h1 class="page-title">🏋️ Тренировки</h1>

    <div v-if="loading" class="loading">Загрузка...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else>
      <div v-if="todayWorkout" class="today-workout">
        <h3>📌 Сегодня</h3>
        <h2>{{ todayWorkout.program_name || "Тренировка" }}</h2>
        <div
          v-for="(ex, i) in todayWorkout.exercises"
          :key="i"
          class="exercise-item"
        >
          {{ ex }}
        </div>
        <button v-if="todayWorkout.has_complete_button" class="start-btn">
          ✅ Завершить тренировку
        </button>
      </div>

      <div class="calendar">
        <div class="calendar-header">
          <button @click="prevMonth">‹</button>
          <span>{{ currentMonth }} {{ currentYear }}</span>
          <button @click="nextMonth">›</button>
        </div>
        <div class="calendar-grid">
          <div v-for="day in weekDays" :key="day" class="calendar-label">
            {{ day }}
          </div>
          <div
            v-for="day in calendarDays"
            :key="day.date"
            class="calendar-day"
            :class="{ today: day.isToday, completed: day.isWorkout }"
          >
            {{ day.day }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { useTelegram } from "~/composables/useTelegram";
import { useApi } from "~/composables/useApi";

const { getUser } = useTelegram();
const { getTodayWorkout } = useApi();

const loading = ref(true);
const error = ref(null);
const todayWorkout = ref(null);
const currentMonth = ref(new Date().getMonth());
const currentYear = ref(new Date().getFullYear());
const weekDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

const calendarDays = computed(() => {
  const days = [];
  const firstDay = new Date(currentYear.value, currentMonth.value, 1).getDay();
  const daysInMonth = new Date(
    currentYear.value,
    currentMonth.value + 1,
    0
  ).getDate();
  const today = new Date();
  const startOffset = firstDay === 0 ? 6 : firstDay - 1;

  for (let i = 0; i < startOffset; i++)
    days.push({ day: "", date: null, isToday: false, isWorkout: false });
  for (let i = 1; i <= daysInMonth; i++) {
    const isToday =
      i === today.getDate() &&
      currentMonth.value === today.getMonth() &&
      currentYear.value === today.getFullYear();
    days.push({
      day: i,
      date: `${currentYear.value}-${String(currentMonth.value + 1).padStart(
        2,
        "0"
      )}-${String(i).padStart(2, "0")}`,
      isToday,
      isWorkout: i % 2 === 0,
    });
  }
  return days;
});

const prevMonth = () => {
  if (currentMonth.value === 0) {
    currentMonth.value = 11;
    currentYear.value--;
  } else {
    currentMonth.value--;
  }
};
const nextMonth = () => {
  if (currentMonth.value === 11) {
    currentMonth.value = 0;
    currentYear.value++;
  } else {
    currentMonth.value++;
  }
};

onMounted(async () => {
  const tgUser = getUser();
  if (!tgUser) {
    error.value = "Не удалось получить данные";
    loading.value = false;
    return;
  }

  try {
    todayWorkout.value = await getTodayWorkout(tgUser.id);
  } catch (err) {
    console.error(err);
    error.value = "Ошибка загрузки тренировки";
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.page-title {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 16px;
}
.today-workout {
  background: #fff;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  margin-bottom: 16px;
}
.today-workout h3 {
  font-size: 12px;
  color: #9ca3af;
  margin-bottom: 4px;
}
.today-workout h2 {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 10px;
}
.exercise-item {
  padding: 6px 0;
  border-bottom: 1px solid #f3f4f6;
  font-size: 14px;
  color: #4b5563;
}
.start-btn {
  width: 100%;
  margin-top: 12px;
  padding: 10px;
  background: #2563eb;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
}
.calendar {
  background: #fff;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}
.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}
.calendar-header button {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  padding: 0 12px;
}
.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
}
.calendar-label {
  text-align: center;
  font-size: 11px;
  font-weight: 600;
  color: #9ca3af;
  padding: 4px 0;
}
.calendar-day {
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  border-radius: 8px;
  background: #f3f4f6;
  color: #4b5563;
}
.calendar-day.today {
  background: #2563eb;
  color: #fff;
  font-weight: 600;
}
.calendar-day.completed {
  background: #dcfce7;
  color: #166534;
}
.loading,
.error {
  text-align: center;
  padding: 40px;
  color: #6b7280;
}
.error {
  color: #dc2626;
}
</style>
