export default defineEventHandler(async (event) => {
  const target = 'https://fetchrss.com/rss/6776637ca504913bb60fdc5267766315438c5f25010deac3.xml'
  return proxyRequest(event, target)
})

// import { joinURL, withQuery } from 'ufo'

// export default defineEventHandler(async (event) => {
//   const { nasaApodKey } = useRuntimeConfig(event)
//   const { nasaApodBase } = useRuntimeConfig(event)
//   const path = event.path.replace('/api/apod', '')
//   const target = withQuery(joinURL(nasaApodBase, path), { api_key: nasaApodKey })
//   return proxyRequest(event, target)
// })
