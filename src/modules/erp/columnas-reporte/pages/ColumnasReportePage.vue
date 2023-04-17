<template>

  <v-dialog
    v-model="columnasReporteStore.getDialogFormColumnasReporte"
    width="700px"
  >
    <columnasReporteFormComponent></columnasReporteFormComponent>
  </v-dialog>
  <v-card elevation="2" class="mx-auto pt-10 pl-2 pr-2" width="90%">
    <div>
      <v-alert
        density="compact"
        color="blak"
        variant="outlined"
        class="text-caption"
      >
        <template v-slot:title>
          Nota:
        </template>
        En las cajas de texto ingresando palabras puede realizar los filtros en las Columnas Reporte
      </v-alert>
      <div class="pt-3">
      </div>
      <columnasReporteFiltroComponent></columnasReporteFiltroComponent>
    </div>
    <v-card-text>
      <dataTableColumnasReporteComponent></dataTableColumnasReporteComponent>
    </v-card-text>
  </v-card>
</template>

<script setup>
import dataTableColumnasReporteComponent
  from '@/modules/erp/columnas-reporte/components/ColumnasReporteDataTableComponent.vue'
import columnasReporteFormComponent from '@/modules/erp/columnas-reporte/components/ColumnasReporteFormComponent.vue';
import columnasReporteFiltroComponent
  from '@/modules/erp/columnas-reporte/components/ColumnasReporteFiltroComponent.vue';
import {useColumnasReporteStore} from '../store/ColumnasReporteStore'

const columnasReporteStore  = useColumnasReporteStore();


</script>

