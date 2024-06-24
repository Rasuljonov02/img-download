<script setup lang="ts">
import {onMounted, ref, watch} from 'vue'
import getImages from '@/api'

const link = ref<string>('')
const btnLoading = ref(false)
const dataINS = ref(null)

watch(link, async (newVal) => {
  if (newVal) {
    await get()
  }
})

onMounted(() => {
  get()
})
const get = async () => {
  btnLoading.value = true
  try {
    const data = await getImages(link.value ? link.value : "people")
    console.log(data)
    dataINS.value = data
  } catch (e) {
    console.error('Error fetching images:', e)
  } finally {
    btnLoading.value = false
  }
}


const getDownloadFileName = (url: string): string => {
  const startIndex = url.lastIndexOf('/') + 1
  const endIndex = url.lastIndexOf('?')
  const filename = endIndex === -1 ? url.substring(startIndex) : url.substring(startIndex, endIndex)
  return filename
}

const downloadImage = (imageUrl: string) => {
  const filename = getDownloadFileName(imageUrl)
  const link = document.createElement('a')
  link.href = imageUrl
  link.setAttribute('download', filename)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

</script>


<template>
  <div class="small-contaimner">
    <div class="container">
      <div class="form-wrapper">
        <form @submit.prevent="get" class="form">
          <a-input v-model:value="link" placeholder="Instagram Linkni qo'ying"/>
          <span class="btn-wrapper">
          <a-button @click="get" :loading="btnLoading" type="primary">Qidirish</a-button>
        </span>
        </form>
      </div>
      <div v-if="dataINS" class="products">
        <div v-for="(img, i) in dataINS?.photos" :key="i" class="products-col">
          <div class="img-wrapper">
            <img class="img" :src="img.src.landscape" :alt="img?.alt">
            <a
                class="download-icon"
                :download="getDownloadFileName(img.src.large2x)"
                title="Download"
                :href="getDownloadFileName(img.src.large2x)"
            >
              <svg width="50px" height="50px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M17 17H17.01M17.4 14H18C18.9319 14 19.3978 14 19.7654 14.1522C20.2554 14.3552 20.6448 14.7446 20.8478 15.2346C21 15.6022 21 16.0681 21 17C21 17.9319 21 18.3978 20.8478 18.7654C20.6448 19.2554 20.2554 19.6448 19.7654 19.8478C19.3978 20 18.9319 20 18 20H6C5.06812 20 4.60218 20 4.23463 19.8478C3.74458 19.6448 3.35523 19.2554 3.15224 18.7654C3 18.3978 3 17.9319 3 17C3 16.0681 3 15.6022 3.15224 15.2346C3.35523 14.7446 3.74458 14.3552 4.23463 14.1522C4.60218 14 5.06812 14 6 14H6.6M12 15V4M12 15L9 12M12 15L15 12"
                    stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>

            </a>
          </div>
        </div>
      </div>

      <div v-if="!dataINS || dataINS?.photos.length === 0" class="noeData">
        <p>Malumot topilmadi</p>
      </div>

    </div>
  </div>
</template>

<style scoped lang="scss">
@import "app";
</style>
