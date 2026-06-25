<template>
  <div>
    <div v-if="loading" class="loading">Загрузка...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else>
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
          <div class="stat-value green">
            {{ userData?.current_streak || 0 }}
          </div>
          <div class="stat-label">Дней подряд</div>
        </div>
        <div class="stat-card">
          <div class="stat-value orange">{{ userData?.weight || "—" }}</div>
          <div class="stat-label">Вес, кг</div>
        </div>
      </div>

      <!-- Сегодняшняя тренировка -->
      <div v-if="todayWorkout" class="workout-today">
        <div class="workout-today-left">
          <p class="workout-today-label">Сегодня</p>
          <h3 class="workout-today-title">
            {{ todayWorkout.program_name || "Тренировка" }}
          </h3>
          <p class="workout-today-info">
            {{ todayWorkout.exercises?.length || 0 }} упражнений
          </p>
        </div>
        <button class="btn-start" @click="startWorkout">Начать</button>
      </div>

      <!-- Прогресс за неделю (график) -->
      <div v-if="weightHistory" class="week-chart">
        <h3 class="chart-title">Вес за неделю</h3>
        <div class="chart-bars">
          <div
            v-for="(item, i) in weightHistory"
            :key="i"
            class="chart-bar-wrapper"
          >
            <div
              class="chart-bar"
              :style="{
                height: Math.max((item.weight / maxWeight) * 100, 10) + '%',
                background:
                  item.weight === currentWeight ? '#2563eb' : '#93c5fd',
              }"
            ></div>
            <span class="chart-label">{{ item.date }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { useTelegram } from "~/composables/useTelegram";

const { getUser, sendData } = useTelegram();
const loading = ref(true);
const error = ref(null);
const userData = ref(null);
const todayWorkout = ref(null);
const weightHistory = ref(null);

const API_URL = "https://residence-earache-golf.ngrok-free.dev";

const today = computed(() => {
  return new Date().toLocaleDateString("ru-RU", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
});

const currentWeight = computed(() => {
  if (!weightHistory.value || weightHistory.value.length === 0) return null;
  return weightHistory.value[weightHistory.value.length - 1]?.weight;
});

const maxWeight = computed(() => {
  if (!weightHistory.value || weightHistory.value.length === 0) return 100;
  const weights = weightHistory.value.map((item) => item.weight);
  return Math.max(...weights) * 1.1;
});

const startWorkout = () => {
  sendData({ action: "start_workout" });
};

const loadUserData = async () => {
  const tgUser = getUser();
  if (!tgUser) {
    error.value = "Не удалось получить данные из Telegram";
    loading.value = false;
    return;
  }

  try {
    // Загружаем данные пользователя
    const userRes = await fetch(`${API_URL}/api/user?telegram_id=${tgUser.id}`);
    if (!userRes.ok) throw new Error("Ошибка загрузки пользователя");
    userData.value = await userRes.json();

    // Загружаем сегодняшнюю тренировку
    const workoutRes = await fetch(
      `${API_URL}/api/workouts/today?telegram_id=${tgUser.id}`
    );
    if (workoutRes.ok) {
      todayWorkout.value = await workoutRes.json();
    }

    // Загружаем историю веса
    const weightRes = await fetch(
      `${API_URL}/api/progress/weight?telegram_id=${tgUser.id}`
    );
    if (weightRes.ok) {
      const data = await weightRes.json();
      // Преобразуем в формат для графика
      weightHistory.value = data.labels.map((label, i) => ({
        date: label,
        weight: data.values[i],
      }));
    }

    loading.value = false;
  } catch (err) {
    console.error("Ошибка загрузки:", err);
    error.value = "Ошибка загрузки данных";
    loading.value = false;
  }
};

onMounted(() => {
  loadUserData();
});
</script>

<style scoped>
.loading,
.error {
  text-align: center;
  padding: 40px;
  color: #6b7280;
}
.error {
  color: #dc2626;
}

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
  border: none;
  cursor: pointer;
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
</style>
