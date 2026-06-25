<template>
  <div class="app-container">
    <Header />
    <main class="main-content">
      <slot />
    </main>
    <BottomNav />
  </div>
</template>

<script setup>
import Header from '~/components/Header.vue'
import BottomNav from '~/components/BottomNav.vue'
</script>

<style scoped>
.app-container {
  min-height: 100vh;
  background: #f5f7fa;
}

.main-content {
  max-width: 480px;
  margin: 0 auto;
  padding: 16px 16px 80px;
}
</style>