// Composables
import { createRouter, createWebHistory } from 'vue-router'

import routerBanco from '@/modules/banco/router';
import routerErpAsientos from '@/modules/erp/asientos/router';
import routerErpTablaIntermedia from '@/modules/erp/tabla-intermedia/router';
import routerErpColumnasReporte from '@/modules/erp/columnas-reporte/router'

const baseRoutes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/modules/usuario/pages/LoginPage.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/modules/usuario/pages/HomePage.vue')
  },
]
const routes = baseRoutes.concat(routerBanco,routerErpAsientos,routerErpTablaIntermedia,routerErpColumnasReporte);
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
