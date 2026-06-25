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
    } else {
      console.warn("⚠️ Telegram WebApp not found");
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
      console.log("📱 Telegram user data:", tg.initDataUnsafe?.user);
      return tg.initDataUnsafe?.user;
    }
    console.warn("⚠️ No Telegram user data");
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
