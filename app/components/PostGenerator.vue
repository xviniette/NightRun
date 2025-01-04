<script lang="ts" setup>
const image = ref('https://media.istockphoto.com/id/1154557075/fr/photo/grand-groupe-de-gens-athl%C3%A9tiques-heureux-traversant-la-nature.jpg?s=170667a&w=0&k=20&c=I4uorxONGFZ7KlXIizBuUL2eTTRmZ6w3EjS8l_S4hw8=')
const number = ref(1)
const rdv = ref(`19h20 devant l'office de tourisme`)
const direction = ref(`Parc Méric`)
const day = new Date().getDay()
const distance9 = ref(day === 4 ? 9 : 5)
const distance11 = ref(day === 4 ? 11 : 7)
const splitrun = ref(false)
const headlamp = ref(false)
const water = ref(false)
const arrival = ref('')

const copyText = computed(() => `Bonjour à toutes et tous,<br/>
Ce soir ce sera la sortie #${number.value} 😀<br/>
🏁 Nous vous donnons rendez-vous à ${rdv.value}.<br/>
<br/>
Nous irons en direction de ${direction.value}<br/>
<br/>
Au programme ce soir :<br/>
${distance9.value ? `📍 ${splitrun.value ? 'Footing' : 'Un run'} de ${splitrun.value ? distance9.value - 2 : distance9.value}km à 9km/h 🏃‍♀️<br/>` : ''}
${distance11.value ? `📍 ${splitrun.value ? 'Footing' : 'Un run'} de ${splitrun.value ? distance11.value - 3 : distance11.value}km à 11km/h 🏃‍♀️<br/>` : ''}
${splitrun.value ? 'Suivi d\'une séance de fractionné<br/>' : ''}<br/>
${arrival.value ? `La séance se terminera ${arrival.value}.<br/><br/>` : ''}
${headlamp.value ? 'Pensez à prendre votre lampe frontale 🔦<br/>' : ''}
${water.value ? 'Pensez à prendre de l\'eau 💧<br/>' : ''}
${headlamp.value || water.value ? '<br/>' : ''}
À ce soir,<br/>
L'équipe Night Run Montpellier<br/>
#nightrun #montpellier #running`)

const { data, status } = await useLazyFetch('/api/fb', { server: false })
if (data.value) {
  const xml = new DOMParser().parseFromString(data.value, 'text/xml')
  const [lastPost] = (xml.firstChild as Element).getElementsByTagName('item')
  if (lastPost) {
    const [, postNumber] = lastPost.textContent?.match(/#(\d+)/) ?? []
    number.value = postNumber ? Number(postNumber) + 1 : number.value
    const [mediaContent] = lastPost.getElementsByTagName('media:content')
    image.value = mediaContent?.getAttribute('url') ?? image.value
  }
}

const copyTextStatus = ref(false)
async function copyTextToClipboard() {
  copyTextStatus.value = true
  const text = copyText.value.replaceAll('<br/>', '\n')
  await navigator.clipboard.writeText(text)
  setTimeout(() => {
    copyTextStatus.value = false
  }, 2000)
}

const blob = ref<Blob | null>(null)
const copyImageStatus = ref(false)
async function copyImageToClipboard() {
  if (!blob.value) return
  copyImageStatus.value = true
  await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob.value })])
  setTimeout(() => {
    copyImageStatus.value = false
  }, 2000)
}
</script>

<template>
  <UIcon
    v-if="status === 'pending'"
    name="i-octicon-ai-model-24"
    class="size-6 animate-spin absolute top-2 right-2"
  />
  <div class="grid sm:grid-cols-2 gap-4">
    <UFormGroup label="Image" required>
      <div class="flex gap-x-2">
        <UInput
          v-model="image"
          icon="i-octicon-image-24"
          class="w-full"
        />
        <UFormGroup>
          <template #label>
            <UAvatar icon="i-octicon-upload-24" />
          </template>
          <UInput type="file" accept="image/*" class="hidden" />
        </UFormGroup>
      </div>
    </UFormGroup>

    <UFormGroup label="Numéro" required>
      <UInput
        v-model="number"
        type="number"
        icon="i-octicon-hash-24"
      />
    </UFormGroup>

    <UFormGroup label="Lieu de RDV" required>
      <UInput v-model="rdv" icon="i-octicon-location-24" />
    </UFormGroup>

    <UFormGroup label="Direction" required>
      <UInput v-model="direction" icon="i-octicon-arrow-right-24" />
    </UFormGroup>

    <UFormGroup label="Distance 9km/h">
      <UInput
        v-model="distance9"
        type="number"
        icon="i-octicon-arrow-both-24"
      />
    </UFormGroup>

    <UFormGroup label="Distance 11km/h">
      <UInput
        v-model="distance11"
        type="number"
        icon="i-octicon-arrow-both-24"
      />
    </UFormGroup>

    <UFormGroup label="Arrivée ?">
      <UInput
        v-model="arrival"
        icon="i-octicon-move-to-end-24"
        placeholder="devant l'office de tourisme"
      />
    </UFormGroup>

    <div class="flex justify-between gap-x-4">
      <UFormGroup label="Fractionné">
        <UToggle v-model="splitrun" />
      </UFormGroup>
      <UFormGroup label="Frontale">
        <UToggle v-model="headlamp" />
      </UFormGroup>
      <UFormGroup label="Eau">
        <UToggle v-model="water" />
      </UFormGroup>
    </div>

    <div class="flex flex-col gap-2">
      <UCard
        class="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
        @click="copyTextToClipboard"
      >
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-html="copyText" />
      </UCard>
      <UButton
        :label="copyTextStatus ? 'Texte copié !' : 'Copier texte'"
        :icon="copyTextStatus ? 'i-octicon-check-24' : 'i-octicon-clippy-24'"
        :color="copyTextStatus ? 'green' : 'primary'"
        block
        variant="outline"
        @click="copyTextToClipboard"
      />
    </div>

    <div class="flex flex-col gap-2">
      <img
        src="https://media.istockphoto.com/id/1154557075/fr/photo/grand-groupe-de-gens-athl%C3%A9tiques-heureux-traversant-la-nature.jpg?s=170667a&w=0&k=20&c=I4uorxONGFZ7KlXIizBuUL2eTTRmZ6w3EjS8l_S4hw8="
        alt="aperçu"
        class="w-full rounded"
      >
      <UButtonGroup>
        <UButton
          :label="copyImageStatus ? 'Image copiée !' : 'Copier image'"
          :icon="copyImageStatus ? 'i-octicon-check-24' : 'i-octicon-clippy-24'"
          :color="copyImageStatus ? 'green' : 'primary'"
          variant="outline"
          class="flex-1 justify-center"
          @click="copyImageToClipboard"
        />
        <UButton
          label="Télécharger"
          icon="i-octicon-download-24"
          variant="outline"
          class="flex-1 justify-center"
        />
      </UButtonGroup>
    </div>
  </div>
</template>
