<template>
  <v-row>
    <v-col cols="12"
           md="2">
      <v-text-field
        density="compact"
        @input="clickBuscar()"
        label="Reporte"
        variant="outlined"
        hide-details
        id="searchReporte"
      ></v-text-field>
    </v-col>
    <v-col cols="12"
           md="2">
      <v-text-field
        density="compact"
        @input="clickBuscar()"
        label="Código Concepto"
        variant="outlined"
        hide-details
        id="searchCodConcepto"
      ></v-text-field>
    </v-col>
    <v-col cols="12"
           md="2">
      <v-text-field
        density="compact"
        @input="clickBuscar()"
        label="Columna Excel"
        variant="outlined"
        hide-details
        id="searchColumnaExcel"
      ></v-text-field>
    </v-col>
    <v-col cols="12" md="2">
      <v-chip class="ma-2" color="primary" label @click="clickAgregarNuevo()"  >Agregar Nuevo
      </v-chip>
    </v-col>
  </v-row>
</template>

<script setup>

import {useColumnasReporteStore} from '../store/ColumnasReporteStore'
import {computed} from "vue";
const columnasReporteStore = useColumnasReporteStore();

const lstColumnasReporte = computed({
  get: () => columnasReporteStore.getLstColumnasReporte,
  set: val => {
    columnasReporteStore.setLstColumnasReporte(val)
  }
})

const clickBuscar = () =>{
  let reporte = document.getElementById("searchReporte").value;
  let codConcepto = document.getElementById("searchCodConcepto").value;
  let columnaExcel = document.getElementById("searchColumnaExcel").value;
  lstColumnasReporte.value =columnasReporteStore.getLstColumnasReporteTodos;
  if(reporte!=""){
    lstColumnasReporte.value =lstColumnasReporte.value.filter(r => (r.nombreReporte.toUpperCase()+"").includes(reporte.toUpperCase()));
  }
  if(codConcepto!=""){
    lstColumnasReporte.value = lstColumnasReporte.value.filter(r => (r.codConcepto+"").includes(codConcepto));
  }
  if(columnaExcel!=""){
    lstColumnasReporte.value = lstColumnasReporte.value.filter(r => (r.colummaExcel+"").includes(columnaExcel));
  }
}
const clickAgregarNuevo = () => {
  columnasReporteStore.setDialogFormColumnasReporte(true);
}
</script>

<style scoped>

</style>
