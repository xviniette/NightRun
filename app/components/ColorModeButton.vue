<script setup lang="ts">
const colorMode = useColorMode()
const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  },
})
</script>

<template>
  <ClientOnly>
    <UButton
      :icon="isDark ? 'i-octicon-moon-24' : 'i-octicon-sun-24'"
      color="primary"
      variant="ghost"
      aria-label="Theme"
      class="absolute top-2 left-2"
      @click="isDark = !isDark"
    />
    <template #fallback>
      <div class="size-6" />
    </template>
  </ClientOnly>
</template>
