<script setup lang="ts">
useSeoMeta({ title: 'Night Run post generator' })
</script>

<template>
  <UContainer>
    <ColorModeButton />
    <h1 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white tracking-tight text-center mt-4 mb-8">
      Night Run post generator
    </h1>

    <PostGenerator />

    <div class="flex gap-2 justify-center mt-8">
      <UButton
        variant="link"
        label="Facebook"
        icon="i-octicon-link-external-24"
        target="_blank"
        to="https://www.facebook.com/NightRunMontpellier"
      />
      <UButton
        variant="link"
        label="GitHub"
        icon="i-octicon-mark-github-24"
        target="_blank"
        to="https://github.com/xviniette/NightRun"
      />
    </div>
  </UContainer>
</template>
