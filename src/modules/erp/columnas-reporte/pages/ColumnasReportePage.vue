<template>
  <!--<v-dialog
    width="500px"
  >
   Hola soy Dialog
  </v-dialog>-->
  <div style="width: 100%">
    <v-card elevation="2" class="mx-auto">
      <v-toolbar flat style="height: 60px; " color="#F9FAFE">
        <v-toolbar-title class="text-grey">
          Asociación de Columnas Excel en Código de Concepto de Tabla Intermedia
        </v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
       <dataTableColumnasReporteComponent></dataTableColumnasReporteComponent>
    </v-card>
  </div>
</template>

<script setup>
import dataTableColumnasReporteComponent from '@/modules/erp/columnas-reporte/components/DataTableColumnasReporteComponent.vue'

</script>

