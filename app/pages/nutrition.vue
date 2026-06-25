<template>
  <div>
    <h1 class="page-title">🍗 Питание</h1>

    <div v-if="loading" class="loading">Загрузка...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else-if="nutritionData">
      <div class="calories-card">
        <div>
          <p class="calories-label">Осталось</p>
          <p class="calories-value">
            {{ nutritionData.goal_calories - nutritionData.total_calories }}
          </p>
          <p class="calories-sub">из {{ nutritionData.goal_calories }} ккал</p>
        </div>
        <div class="calories-ring">
          {{
            Math.round(
              (nutritionData.total_calories / nutritionData.goal_calories) * 100
            )
          }}%
        </div>
      </div>

      <div class="macros-grid">
        <div class="macro-card">
          <div class="macro-value blue">{{ nutritionData.protein }}g</div>
          <div>Белки</div>
        </div>
        <div class="macro-card">
          <div class="macro-value yellow">{{ nutritionData.fats }}g</div>
          <div>Жиры</div>
        </div>
        <div class="macro-card">
          <div class="macro-value green">{{ nutritionData.carbs }}g</div>
          <div>Углеводы</div>
        </div>
      </div>

      <div class="meals-list">
        <div
          v-for="meal in nutritionData.meals"
          :key="meal.name"
          class="meal-item"
        >
          <div class="meal-left">
            <div class="meal-dot" :class="{ completed: meal.completed }"></div>
            <div>
              <p class="meal-name">{{ meal.name }}</p>
              <p class="meal-calories">{{ meal.calories }} ккал</p>
            </div>
          </div>
          <button class="meal-btn" :class="{ completed: meal.completed }">
            {{ meal.completed ? "✅" : "Отметить" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useTelegram } from "~/composables/useTelegram";

const { getUser } = useTelegram();
const loading = ref(true);
const error = ref(null);
const nutritionData = ref(null);
const API_URL = import.meta.env.VITE_API_URL || "";

onMounted(async () => {
  try {
    const tgUser = getUser();
    if (!tgUser) {
      error.value = "Не удалось получить данные";
      loading.value = false;
      return;
    }

    const response = await fetch(
      `${API_URL}/api/nutrition/today?telegram_id=${tgUser.id}`
    );
    if (!response.ok) throw new Error("Ошибка загрузки");
    nutritionData.value = await response.json();
    loading.value = false;
  } catch (err) {
    console.error(err);
    error.value = "Ошибка загрузки данных питания";
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
.calories-card {
  background: linear-gradient(135deg, #22c55e, #16a34a);
  border-radius: 16px;
  padding: 20px;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.calories-label {
  font-size: 14px;
  opacity: 0.8;
}
.calories-value {
  font-size: 32px;
  font-weight: 700;
}
.calories-sub {
  font-size: 14px;
  opacity: 0.8;
}
.calories-ring {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 700;
}
.macros-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-top: 16px;
}
.macro-card {
  background: #fff;
  padding: 14px;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}
.macro-value {
  font-size: 20px;
  font-weight: 700;
}
.macro-value.blue {
  color: #2563eb;
}
.macro-value.yellow {
  color: #f59e0b;
}
.macro-value.green {
  color: #22c55e;
}
.macro-card div:last-child {
  font-size: 12px;
  color: #9ca3af;
  margin-top: 2px;
}
.meals-list {
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.meal-item {
  background: #fff;
  padding: 14px 16px;
  border-radius: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}
.meal-left {
  display: flex;
  align-items: center;
  gap: 12px;
}
.meal-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #d1d5db;
}
.meal-dot.completed {
  background: #22c55e;
}
.meal-name {
  font-weight: 500;
}
.meal-calories {
  font-size: 13px;
  color: #6b7280;
}
.meal-btn {
  padding: 4px 14px;
  border-radius: 6px;
  font-size: 13px;
  background: #f3f4f6;
  border: none;
  cursor: pointer;
}
.meal-btn.completed {
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
