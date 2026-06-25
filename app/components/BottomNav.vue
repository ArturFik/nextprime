<template>
  <nav class="bottom-nav">
    <div class="nav-inner">
      <NuxtLink 
        v-for="item in navItems" 
        :key="item.path"
        :to="item.path"
        class="nav-item"
        :class="{ active: $route.path === item.path }"
      >
        <span class="nav-icon">{{ item.icon }}</span>
        <span class="nav-label">{{ item.label }}</span>
      </NuxtLink>
    </div>
  </nav>
</template>

<script setup>
const navItems = [
  { path: '/', icon: '🏠', label: 'Главная' },
  { path: '/workouts', icon: '🏋️', label: 'Тренировки' },
  { path: '/progress', icon: '📊', label: 'Прогресс' },
  { path: '/nutrition', icon: '🍗', label: 'Питание' },
  { path: '/profile', icon: '👤', label: 'Профиль' },
]
</script>

<style scoped>
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #ffffff;
  border-top: 1px solid #e8ecf1;
  padding: 6px 0 10px;
  z-index: 10;
}

.nav-inner {
  max-width: 480px;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1px;
  font-size: 10px;
  color: #9ca3af;
  transition: color 0.2s;
}

.nav-item.active {
  color: #2563eb;
}

.nav-icon {
  font-size: 22px;
}

.nav-label {
  font-size: 10px;
}
</style>