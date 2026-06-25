<template>
  <div>
    <h1 class="page-title">✏️ Редактирование профиля</h1>

    <div v-if="loading" class="loading">Загрузка...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else class="edit-form">
      <div class="field">
        <label>Рост (см)</label>
        <input
          v-model="form.height"
          type="number"
          placeholder="например: 175"
        />
      </div>

      <div class="field">
        <label>Вес (кг)</label>
        <input
          v-model="form.weight"
          type="number"
          step="0.5"
          placeholder="например: 75.5"
        />
      </div>

      <div class="field">
        <label>Возраст</label>
        <input v-model="form.age" type="number" placeholder="например: 25" />
      </div>

      <div class="field">
        <label>Пол</label>
        <select v-model="form.gender">
          <option value="">Не выбрано</option>
          <option value="Мужской">Мужской</option>
          <option value="Женский">Женский</option>
        </select>
      </div>

      <div class="field">
        <label>Цель</label>
        <select v-model="form.goal">
          <option value="">Не выбрано</option>
          <option value="Похудеть">Похудеть</option>
          <option value="Набрать массу">Набрать массу</option>
          <option value="Поддержать форму">Поддержать форму</option>
        </select>
      </div>

      <div class="field">
        <label>Опыт</label>
        <select v-model="form.experience">
          <option value="">Не выбрано</option>
          <option value="Новичок (менее 3 месяцев)">
            Новичок (менее 3 месяцев)
          </option>
          <option value="Средний (3-12 месяцев)">Средний (3-12 месяцев)</option>
          <option value="Продвинутый (более года)">
            Продвинутый (более года)
          </option>
        </select>
      </div>

      <div class="field">
        <label>Травмы или противопоказания</label>
        <input v-model="form.injuries" placeholder="Напиши, если есть..." />
      </div>

      <div class="field">
        <label>Силовые (жим / присед / тяга)</label>
        <div class="strength-inputs">
          <input v-model="form.bench_press" type="number" placeholder="Жим" />
          <input v-model="form.squat" type="number" placeholder="Присед" />
          <input v-model="form.deadlift" type="number" placeholder="Тяга" />
        </div>
      </div>

      <div class="field">
        <label>Место тренировок</label>
        <select v-model="form.workout_location">
          <option value="gym">Тренажёрный зал</option>
          <option value="home">Домашние тренировки</option>
          <option value="mixed">Смешанный</option>
        </select>
      </div>

      <div class="field">
        <label>Инвентарь</label>
        <input
          v-model="form.available_equipment"
          placeholder="Например: гантели, турник..."
        />
      </div>

      <button class="save-btn" @click="saveProfile" :disabled="saving">
        {{ saving ? "Сохранение..." : "💾 Сохранить" }}
      </button>
      <button class="cancel-btn" @click="goBack">Отмена</button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useTelegram } from "~/composables/useTelegram";
import { useApi } from "~/composables/useApi";

const router = useRouter();
const { getUser } = useTelegram();
const { getUserData, updateUser } = useApi();

const loading = ref(true);
const saving = ref(false);
const error = ref(null);
const form = ref({});

const goBack = () => {
  router.push("/profile");
};

onMounted(async () => {
  const tgUser = getUser();
  if (!tgUser) {
    error.value = "Не удалось получить данные";
    loading.value = false;
    return;
  }

  try {
    const data = await getUserData(tgUser.id);
    form.value = { ...data };
    loading.value = false;
  } catch (err) {
    console.error(err);
    error.value = "Ошибка загрузки данных";
    loading.value = false;
  }
});

const saveProfile = async () => {
  const tgUser = getUser();
  if (!tgUser) return;

  saving.value = true;
  try {
    await updateUser(tgUser.id, form.value);
    alert("✅ Профиль обновлён!");
    router.push("/profile");
  } catch (err) {
    alert("❌ Ошибка сохранения");
  } finally {
    saving.value = false;
  }
};
</script>

<style scoped>
.page-title {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 20px;
}
.edit-form {
  background: #fff;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}
.field {
  margin-bottom: 16px;
}
.field label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #4b5563;
  margin-bottom: 4px;
}
.field input,
.field select {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
}
.field input:focus,
.field select:focus {
  outline: none;
  border-color: #2563eb;
}
.strength-inputs {
  display: flex;
  gap: 8px;
}
.strength-inputs input {
  flex: 1;
}
.save-btn {
  width: 100%;
  padding: 12px;
  background: #2563eb;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
}
.save-btn:hover {
  background: #1d4ed8;
}
.save-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.cancel-btn {
  width: 100%;
  margin-top: 8px;
  padding: 12px;
  background: #f3f4f6;
  border: none;
  border-radius: 8px;
  font-size: 16px;
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
