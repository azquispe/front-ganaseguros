export default [
    {
      path: '/banco/datos-persona',
      name: 'bancoDatosPersona',
      component: () => import('@/modules/banco/pages/DatosPersonaPage.vue')
    },
    {
      path: '/banco/datos-cuenta',
      name: 'bancoDatosCuenta',
      component: () => import('@/modules/banco/pages/DatosCuentaPage.vue')
    },
    {
      path: '/banco/listas-negras',
      name: 'bancoListasNegras',
      component: () => import('@/modules/banco/pages/ListasNegrasPage.vue')
    },
    {
      path: '/banco/datos-financiero',
      name: 'bancoDatosFinanciero',
      component: () => import('@/modules/banco/pages/DatosFinancieroPage.vue')
    },
    {
      path: '/banco/datos-cumulo',
      name: 'bancoDatosCumulo',
      component: () => import('@/modules/banco/pages/DatosCumuloPage.vue')
    },
    {
      path: '/banco/datos-linea',
      name: 'bancoDatosLinea',
      component: () => import('@/modules/banco/pages/DatosLineaPage.vue')
    }
]