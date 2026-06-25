<template>
  <div>
    <h1 class="page-title">👤 Профиль</h1>

    <div v-if="loading" class="loading">Загрузка...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else-if="userData" class="profile-card">
      <div class="profile-header">
        <div class="profile-avatar">{{ userData.first_name?.[0] || "?" }}</div>
        <div class="profile-info">
          <h2 class="profile-name">{{ userData.first_name || "Гость" }}</h2>
          <p class="profile-username">@{{ userData.username || "нет" }}</p>
        </div>
      </div>

      <div class="profile-stats">
        <div class="profile-stat">
          <span>Тариф</span>
          <span class="blue">{{
            userData.subscription?.toUpperCase() || "FREE"
          }}</span>
        </div>
        <div class="profile-stat">
          <span>Тренировок</span>
          <span>{{ userData.total_workouts || 0 }}</span>
        </div>
        <div class="profile-stat">
          <span>Серия</span>
          <span class="green">{{ userData.current_streak || 0 }} дней 🔥</span>
        </div>
        <div class="profile-stat">
          <span>Вес</span>
          <span>{{ userData.weight || "—" }} кг</span>
        </div>
        <div class="profile-stat">
          <span>Рост</span>
          <span>{{ userData.height || "—" }} см</span>
        </div>
        <div class="profile-stat">
          <span>Возраст</span>
          <span>{{ userData.age || "—" }}</span>
        </div>
        <div class="profile-stat">
          <span>Пол</span>
          <span>{{ userData.gender || "—" }}</span>
        </div>
        <div class="profile-stat">
          <span>Цель</span>
          <span>{{ userData.goal || "—" }}</span>
        </div>
        <div class="profile-stat">
          <span>Опыт</span>
          <span>{{ userData.experience || "—" }}</span>
        </div>
      </div>

      <div class="strength-section">
        <h3>🏋️ Силовые</h3>
        <div class="strength-grid">
          <div>
            <span>Жим</span>
            <strong>{{ userData.bench_press || "—" }} кг</strong>
          </div>
          <div>
            <span>Присед</span> <strong>{{ userData.squat || "—" }} кг</strong>
          </div>
          <div>
            <span>Тяга</span> <strong>{{ userData.deadlift || "—" }} кг</strong>
          </div>
        </div>
      </div>

      <button class="profile-btn">✏️ Редактировать профиль</button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useTelegram } from "~/composables/useTelegram";

const { getUser } = useTelegram();
const userData = ref(null);
const loading = ref(true);
const error = ref(null);

const API_URL = "https://residence-earache-golf.ngrok-free.dev";

onMounted(async () => {
  try {
    const tgUser = getUser();
    if (!tgUser) {
      error.value = "Не удалось получить данные из Telegram";
      loading.value = false;
      return;
    }

    const response = await fetch(
      `${API_URL}/api/user?telegram_id=${tgUser.id}`
    );
    if (!response.ok) throw new Error("Ошибка загрузки");

    userData.value = await response.json();
    loading.value = false;
  } catch (err) {
    console.error(err);
    error.value = "Ошибка загрузки данных";
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
.profile-card {
  background: #fff;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}
.profile-header {
  display: flex;
  align-items: center;
  gap: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid #f3f4f6;
}
.profile-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #2563eb;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26px;
  font-weight: 600;
}
.profile-name {
  font-size: 20px;
  font-weight: 700;
}
.profile-username {
  font-size: 14px;
  color: #6b7280;
}
.profile-stats {
  padding-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.profile-stat {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #f9fafb;
}
.profile-stat .blue {
  color: #2563eb;
  font-weight: 600;
}
.profile-stat .green {
  color: #22c55e;
  font-weight: 600;
}
.strength-section {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #f3f4f6;
}
.strength-section h3 {
  font-size: 16px;
  margin-bottom: 10px;
}
.strength-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}
.strength-grid div {
  background: #f3f4f6;
  padding: 10px;
  border-radius: 8px;
  text-align: center;
}
.strength-grid span {
  display: block;
  font-size: 12px;
  color: #6b7280;
}
.strength-grid strong {
  font-size: 16px;
}
.profile-btn {
  width: 100%;
  margin-top: 16px;
  padding: 10px;
  border-radius: 8px;
  background: #f3f4f6;
  border: none;
  font-size: 14px;
  cursor: pointer;
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
