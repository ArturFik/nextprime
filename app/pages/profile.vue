<template>
  <div>
    <h1 class="page-title">👤 Профиль</h1>

    <div class="profile-card">
      <div class="profile-header">
        <div class="profile-avatar">
          {{ user?.first_name?.[0] || "?" }}
        </div>
        <div class="profile-info">
          <h2 class="profile-name">{{ user?.first_name || "Гость" }}</h2>
          <p class="profile-username">@{{ user?.username || "нет" }}</p>
        </div>
      </div>

      <div class="profile-stats">
        <div class="profile-stat">
          <span class="profile-stat-label">Тариф</span>
          <span class="profile-stat-value blue">BASIC</span>
        </div>
        <div class="profile-stat">
          <span class="profile-stat-label">Тренировок</span>
          <span class="profile-stat-value">12</span>
        </div>
        <div class="profile-stat">
          <span class="profile-stat-label">Серия</span>
          <span class="profile-stat-value green">7 дней 🔥</span>
        </div>
        <div class="profile-stat">
          <span class="profile-stat-label">Вес</span>
          <span class="profile-stat-value">73 кг</span>
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
const user = ref(null);

onMounted(() => {
  user.value = getUser();
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
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #f9fafb;
}

.profile-stat-label {
  color: #6b7280;
}

.profile-stat-value {
  font-weight: 500;
}

.profile-stat-value.blue {
  color: #2563eb;
}
.profile-stat-value.green {
  color: #22c55e;
}

.profile-btn {
  width: 100%;
  margin-top: 16px;
  padding: 10px;
  border-radius: 8px;
  background: #f3f4f6;
  color: #4b5563;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s;
}

.profile-btn:hover {
  background: #e5e7eb;
}
</style>
