// composables/useApi.ts
export const useApi = () => {
  const API_URL = "https://residence-earache-golf.ngrok-free.dev"; // или твой домен

  const getUserData = async (telegramId: number) => {
    const response = await fetch(
      `${API_URL}/api/user?telegram_id=${telegramId}`
    );
    return response.json();
  };

  const getTodayWorkout = async (telegramId: number) => {
    const response = await fetch(
      `${API_URL}/api/workouts/today?telegram_id=${telegramId}`
    );
    return response.json();
  };

  const getTodayNutrition = async (telegramId: number) => {
    const response = await fetch(
      `${API_URL}/api/nutrition/today?telegram_id=${telegramId}`
    );
    return response.json();
  };

  return { getUserData, getTodayWorkout, getTodayNutrition };
};
