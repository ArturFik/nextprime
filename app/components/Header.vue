<template>
  <header class="header">
    <div class="header-inner">
      <div class="header-left">
        <span class="logo">💪 Fitness</span>
      </div>
      <div class="header-right">
        <span class="user-name">{{ user?.first_name || "Гость" }}</span>
        <div class="avatar">{{ user?.first_name?.[0] || "?" }}</div>
      </div>
    </div>
  </header>
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
.header {
  background: #ffffff;
  padding: 12px 16px;
  border-bottom: 1px solid #e8ecf1;
  position: sticky;
  top: 0;
  z-index: 10;
}

.header-inner {
  max-width: 480px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  font-size: 20px;
  font-weight: 700;
  color: #2563eb;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 10px;
}

.user-name {
  font-size: 14px;
  color: #4b5563;
}

.avatar {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: #2563eb;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
}
</style>
