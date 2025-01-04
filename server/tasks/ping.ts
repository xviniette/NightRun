export default defineTask({
  meta: {
    name: 'ping',
    description: 'Ping fetchrss url every day to keep it alive',
  },
  async run() {
    await $fetch('https://fetchrss.com/rss/6776637ca504913bb60fdc5267766315438c5f25010deac3.xml')
    return { result: 'OK' }
  },
})
