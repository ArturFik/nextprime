<!-- app.vue -->
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
useHead({
  script: [
    {
      src: "https://telegram.org/js/telegram-web-app.js",
      defer: true,
    },
  ],
});
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  background: #f5f7fa;
  color: #1a1a2e;
  padding-bottom: 70px;
}

button {
  cursor: pointer;
  border: none;
  outline: none;
}

a {
  text-decoration: none;
}
</style>
