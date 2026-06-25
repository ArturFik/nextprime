// composables/useTelegram.ts
export const useTelegram = () => {
  const getTg = () => {
    if (process.client) {
      const tg = (window as any).Telegram?.WebApp;
      console.log("🔍 Telegram.WebApp:", tg ? "найден" : "не найден");
      return tg;
    }
    return null;
  };

  const init = () => {
    const tg = getTg();
    if (tg) {
      tg.ready();
      tg.expand();
      console.log("✅ Telegram WebApp initialized");
      console.log("📦 initDataUnsafe:", tg.initDataUnsafe);
    } else {
      console.warn("⚠️ Telegram WebApp not found");
      console.log("📍 Window location:", window.location.href);
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
      const user = tg.initDataUnsafe?.user;
      console.log("👤 User from Telegram:", user);
      return user;
    }
    console.warn("⚠️ No Telegram WebApp");
    return null;
  };

  const getInitData = () => {
    const tg = getTg();
    if (tg) {
      return tg.initDataUnsafe;
    }
    return null;
  };

  return {
    init,
    close,
    sendData,
    getUser,
    getInitData,
    getTg,
  };
};
