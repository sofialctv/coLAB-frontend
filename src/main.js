import { createApp } from 'vue'
import App from './App.vue'

import { Quasar } from 'quasar'
import quasarLang from 'quasar/lang/pt-BR' //Suporte ao PT-BR

import router from './router/index.ts'

const app = createApp(App).use(router).mount('#app')

app.use(Quasar, {
  lang: quasarLang,
})