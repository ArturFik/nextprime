<template>
  <div>
    <!-- Приветствие -->
    <div class="greeting-card">
      <h1 class="greeting-title">
        Привет, {{ userData?.first_name || "Гость" }}! 👋
      </h1>
      <p class="greeting-subtitle">{{ today }}</p>
    </div>

    <!-- Статистика -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-value blue">{{ userData?.total_workouts || 0 }}</div>
        <div class="stat-label">Тренировок</div>
      </div>
      <div class="stat-card">
        <div class="stat-value green">{{ userData?.current_streak || 0 }}</div>
        <div class="stat-label">Дней подряд</div>
      </div>
      <div class="stat-card">
        <div class="stat-value orange">{{ userData?.weight || "—" }}</div>
        <div class="stat-label">Вес, кг</div>
      </div>
    </div>

    <!-- Сегодняшняя тренировка -->
    <div class="workout-today" v-if="todayWorkout">
      <div class="workout-today-left">
        <p class="workout-today-label">Сегодня</p>
        <h3 class="workout-today-title">{{ todayWorkout.name }}</h3>
        <p class="workout-today-info">
          {{ todayWorkout.exercises_count }} упражнений
        </p>
      </div>
      <button class="btn-start" @click="startWorkout">Начать</button>
    </div>

    <!-- Прогресс за неделю -->
    <div class="week-chart">
      <h3 class="chart-title">Вес за неделю</h3>
      <div class="chart-bars">
        <div v-for="(day, i) in weekData" :key="i" class="chart-bar-wrapper">
          <div
            class="chart-bar"
            :style="{ height: day.value + '%', background: day.color }"
          ></div>
          <span class="chart-label">{{ day.label }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useTelegram } from "~/composables/useTelegram";

const { getUser, fetchUserData, sendData } = useTelegram();
const userData = ref(null);
const todayWorkout = ref(null);
const loading = ref(true);

// Данные для графика (заглушка, потом заменим на реальные)
const weekData = [
  { label: "Пн", value: 60, color: "#3b82f6" },
  { label: "Вт", value: 70, color: "#3b82f6" },
  { label: "Ср", value: 65, color: "#3b82f6" },
  { label: "Чт", value: 80, color: "#3b82f6" },
  { label: "Пт", value: 75, color: "#3b82f6" },
  { label: "Сб", value: 90, color: "#3b82f6" },
  { label: "Вс", value: 85, color: "#3b82f6" },
];

const today = new Date().toLocaleDateString("ru-RU", {
  weekday: "long",
  day: "numeric",
  month: "long",
});

const startWorkout = () => {
  // Отправляем запрос в бот
  sendData({ action: "start_workout" });
};

onMounted(async () => {
  // Получаем данные пользователя
  const tgUser = getUser();
  if (tgUser) {
    userData.value = tgUser;
    // Здесь должен быть запрос к боту за полными данными
    // userData.value = await fetchUserData()
  }

  // Пример реальных данных (потом заменишь на данные из БД)
  userData.value = {
    first_name: tgUser?.first_name || "Гость",
    total_workouts: 12,
    current_streak: 7,
    weight: 73,
    goal: "Набрать массу",
    subscription: "BASIC",
  };

  todayWorkout.value = {
    name: "Грудь + Трицепс",
    exercises_count: 3,
    exercises: [
      "Жим лёжа 3x10",
      "Разводка гантелей 3x12",
      "Французский жим 3x8",
    ],
  };

  loading.value = false;
});
</script>

<style scoped>
.greeting-card {
  background: linear-gradient(135deg, #2563eb, #7c3aed);
  border-radius: 16px;
  padding: 20px 24px;
  color: #fff;
}

.greeting-title {
  font-size: 22px;
  font-weight: 700;
}

.greeting-subtitle {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  margin-top: 4px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-top: 16px;
}

.stat-card {
  background: #fff;
  border-radius: 12px;
  padding: 16px;
  text-align: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}

.stat-value {
  font-size: 24px;
  font-weight: 700;
}

.stat-value.blue {
  color: #2563eb;
}
.stat-value.green {
  color: #22c55e;
}
.stat-value.orange {
  color: #f59e0b;
}

.stat-label {
  font-size: 11px;
  color: #9ca3af;
  margin-top: 2px;
}

.workout-today {
  background: #fff;
  border-radius: 12px;
  padding: 16px 18px;
  margin-top: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}

.workout-today-label {
  font-size: 12px;
  color: #9ca3af;
}

.workout-today-title {
  font-size: 16px;
  font-weight: 600;
  margin: 2px 0;
}

.workout-today-info {
  font-size: 13px;
  color: #6b7280;
}

.btn-start {
  background: #2563eb;
  color: #fff;
  padding: 8px 18px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  transition: background 0.2s;
}

.btn-start:hover {
  background: #1d4ed8;
}

.week-chart {
  background: #fff;
  border-radius: 12px;
  padding: 16px 18px;
  margin-top: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}

.chart-title {
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 16px;
}

.chart-bars {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  height: 120px;
  gap: 4px;
}

.chart-bar-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  height: 100%;
  justify-content: flex-end;
}

.chart-bar {
  width: 100%;
  max-width: 28px;
  border-radius: 4px 4px 0 0;
  min-height: 4px;
  transition: height 0.3s;
}

.chart-label {
  font-size: 10px;
  color: #9ca3af;
}

.loading {
  text-align: center;
  padding: 40px;
  color: #6b7280;
}
</style>
