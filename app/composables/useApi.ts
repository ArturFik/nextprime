// composables/useApi.ts
export const useApi = () => {
  // Твой актуальный URL от ngrok
  const API_URL = "https://residence-earache-golf.ngrok-free.dev";

  const headers = {
    "ngrok-skip-browser-warning": "true",
  };

  const getUserData = async (telegramId: number) => {
    const response = await fetch(
      `${API_URL}/api/user?telegram_id=${telegramId}`,
      { headers }
    );
    if (!response.ok) throw new Error("Ошибка загрузки пользователя");
    return response.json();
  };

  const getTodayWorkout = async (telegramId: number) => {
    const response = await fetch(
      `${API_URL}/api/workouts/today?telegram_id=${telegramId}`,
      { headers }
    );
    if (!response.ok) throw new Error("Ошибка загрузки тренировки");
    return response.json();
  };

  const getNutrition = async (telegramId: number) => {
    const response = await fetch(
      `${API_URL}/api/nutrition/today?telegram_id=${telegramId}`,
      { headers }
    );
    if (!response.ok) throw new Error("Ошибка загрузки питания");
    return response.json();
  };

  const getWeightProgress = async (telegramId: number) => {
    const response = await fetch(
      `${API_URL}/api/progress/weight?telegram_id=${telegramId}`,
      { headers }
    );
    if (!response.ok) throw new Error("Ошибка загрузки прогресса");
    return response.json();
  };

  return {
    getUserData,
    getTodayWorkout,
    getNutrition,
    getWeightProgress,
  };
};
