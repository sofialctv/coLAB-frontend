import '@mdi/font/css/materialdesignicons.min.css'
import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import 'vuetify/styles'
import App from './App.vue'
import { createPinia } from 'pinia'
import { router } from './router'

const vuetify = createVuetify({
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#1976D2',
          secondary: '#424242',
          accent: '#82B1FF',
        },
      },
    },
  },
})

const pinia = createPinia() // Cria a instância do Pinia

const app = createApp(App)
app.use(router)

app.use(pinia) // Usa a instância do Pinia
app.use(vuetify) // Usa o Vuetify
app.mount('#app') // Monta o aplicativo no DOM
