// composables/useTelegram.ts
export const useTelegram = () => {
  const getTg = () => {
    if (process.client) {
      return (window as any).Telegram?.WebApp;
    }
    return null;
  };

  const init = () => {
    const tg = getTg();
    if (tg) {
      tg.ready();
      tg.expand();
      console.log("✅ Telegram WebApp initialized");
    }
  };

  const close = () => {
    const tg = getTg();
    if (tg) {
      tg.close();
    }
  };

  const sendData = (data: any) => {
    const tg = getTg();
    if (tg) {
      tg.sendData(JSON.stringify(data));
    }
  };

  const getUser = () => {
    const tg = getTg();
    if (tg) {
      return tg.initDataUnsafe?.user;
    }
    return null;
  };

  // Получаем полные данные от бота (через initDataUnsafe)
  const getInitData = () => {
    const tg = getTg();
    if (tg) {
      return tg.initDataUnsafe;
    }
    return null;
  };

  // Отправляем запрос к боту за данными
  const fetchUserData = async () => {
    try {
      const response = await fetch("https://твой-бот-домен/api/user", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return await response.json();
    } catch (error) {
      console.error("Ошибка загрузки данных:", error);
      return null;
    }
  };

  return {
    init,
    close,
    sendData,
    getUser,
    getInitData,
    fetchUserData,
    getTg,
  };
};
