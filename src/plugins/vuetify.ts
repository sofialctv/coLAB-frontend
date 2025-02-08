import { createVuetify } from 'vuetify'
import 'vuetify/styles'

// Configuração correta dos ícones
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
  icons: {
    defaultSet: 'mdi', // set de ícones do Material Design Icons
  },
})

export default vuetify
