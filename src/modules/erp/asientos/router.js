export default [

  {
    path: '/erp/genera-asientos',
    name: 'erpGeneraAsientosExcel',
    component: () => import('@/modules/erp/asientos/pages/GeneraAsientosExcelPage.vue')
  },
  {
    path: '/erp/asientos-enviados',
    name: 'erpAsientosEnviados',
    component: () => import('@/modules/erp/asientos/pages/AsientosEnviadosPage.vue')
  }

]
