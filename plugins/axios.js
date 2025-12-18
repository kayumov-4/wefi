import axios from 'axios'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  const instance = axios.create({
    baseURL: 'https://api.mahalla.bank-kredit.uz/',
  })

  return {
    provide: {
      axios: instance
    }
  }
})
