<template>
  <div>
    <h1 class="page-title">🍗 Питание</h1>

    <!-- Калории -->
    <div class="calories-card">
      <div class="calories-left">
        <p class="calories-label">Осталось</p>
        <p class="calories-value">1,420</p>
        <p class="calories-sub">из 2,100 ккал</p>
      </div>
      <div class="calories-ring">
        <span class="calories-percent">68%</span>
      </div>
    </div>

    <!-- БЖУ -->
    <div class="macros-grid">
      <div class="macro-card">
        <div class="macro-value blue">120g</div>
        <div class="macro-label">Белки</div>
      </div>
      <div class="macro-card">
        <div class="macro-value yellow">50g</div>
        <div class="macro-label">Жиры</div>
      </div>
      <div class="macro-card">
        <div class="macro-value green">180g</div>
        <div class="macro-label">Углеводы</div>
      </div>
    </div>

    <!-- Приёмы пищи -->
    <div class="meals-list">
      <div v-for="meal in meals" :key="meal.id" class="meal-item">
        <div class="meal-left">
          <div
            class="meal-dot"
            :class="{ 'meal-dot-completed': meal.completed }"
          ></div>
          <div>
            <p class="meal-name">{{ meal.name }}</p>
            <p class="meal-calories">{{ meal.calories }} ккал</p>
          </div>
        </div>
        <button
          class="meal-btn"
          :class="{ 'meal-btn-completed': meal.completed }"
        >
          {{ meal.completed ? "✅" : "Отметить" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const meals = [
  { id: 1, name: "Завтрак", calories: 450, completed: true },
  { id: 2, name: "Обед", calories: 600, completed: true },
  { id: 3, name: "Ужин", calories: 550, completed: false },
  { id: 4, name: "Перекус", calories: 200, completed: false },
];
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
  padding: 20px 24px;
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
}

.calories-percent {
  font-size: 20px;
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
  border-radius: 12px;
  padding: 14px;
  text-align: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}

.macro-value {
  font-size: 18px;
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

.macro-label {
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
  border-radius: 12px;
  padding: 14px 16px;
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

.meal-dot-completed {
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
  color: #4b5563;
  transition: all 0.2s;
}

.meal-btn-completed {
  background: #dcfce7;
  color: #166534;
}
</style>
