<script setup>
import { onMounted, ref } from "vue";
import { useTelegram } from "~/composables/useTelegram";

const { getUser } = useTelegram();
const userData = ref(null);
const loading = ref(true);
const error = ref(null);

// ТВОЙ РЕАЛЬНЫЙ URL API (который работает в браузере)
const API_URL = "https://nextprime-three.vercel.app/"; // или твой реальный домен

onMounted(async () => {
  try {
    // 1. Проверяем, что приходит от Telegram
    const tgUser = getUser();
    console.log("📱 Telegram user:", tgUser);

    if (!tgUser) {
      error.value = "Не удалось получить данные пользователя из Telegram";
      loading.value = false;
      return;
    }

    // 2. Проверяем, какой ID получаем
    const userId = tgUser.id;
    console.log("🆔 User ID:", userId);

    // 3. Делаем запрос к API
    const url = `${API_URL}/api/user?telegram_id=${userId}`;
    console.log("🌐 Запрос к API:", url);

    const response = await fetch(url);
    console.log("📦 Статус ответа:", response.status);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("✅ Данные от API:", data);

    userData.value = data;
    loading.value = false;
  } catch (err) {
    console.error("❌ Ошибка:", err);
    error.value = "Ошибка загрузки данных: " + err.message;
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

.loading {
  text-align: center;
  padding: 40px;
  color: #6b7280;
}

.error {
  text-align: center;
  padding: 40px;
  color: #dc2626;
}
</style>
