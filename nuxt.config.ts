// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxt/ui'],
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: '2024-11-01',
  nitro: {
    experimental: {
      tasks: true,
    },
    scheduledTasks: {
      '0 4 * * *': 'ping',
    },
  },
  eslint: {
    config: {
      stylistic: true,
    },
  },
})
