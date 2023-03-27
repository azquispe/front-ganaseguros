/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

import { VDataTable } from 'vuetify/labs/VDataTable'  // noe sta en produccion segun vuetfy

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  components: {
    VDataTable, // no esta ne produccion segun vuetify
  },

  theme: {
    themes: {
      light: {
        colors: {

          primary: '#53A808',
          secondary: '#B7DF98',
        },
      },
    },
  },
})
