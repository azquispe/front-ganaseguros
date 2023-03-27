<template>
  <v-chip class="ma-2" color="primary" label  >Nuevo
  </v-chip>
  <v-data-table
    v-model:items-per-page="itemsPerPage"
    :headers="headersDataTablaColumnasReporte"
    :items="lstColumnasReporte"
    item-value="tablaIntermediaId"
    class="elevation-1"
    density="compact"

  >
    <template v-slot:column.codReporte="{ column }">
      <input  @input="clickBuscar()"  style="width: 50px; border: 1px solid #c2c3c4; padding: 2px; margin-top: 2px;" type="search" id="searchCodReporte" ><br>
      <tr class="text-caption">{{ column.title.toUpperCase() }}</tr>
    </template>
    <template v-slot:column.codConcepto="{ column }">
      <input  @input="clickBuscar()"  style="width: 50px; border: 1px solid #c2c3c4; padding: 2px; margin-top: 2px;" type="search" id="searchCodConcepto" ><br>
      <tr class="text-caption">{{ column.title.toUpperCase() }}</tr>
    </template>
    <template v-slot:column.colummaExcel="{ column }">
      <tr class="text-caption">{{ column.title.toUpperCase() }}</tr>
    </template>
    <template v-slot:column.acciones="{ column }">
      <tr class="text-caption">{{ column.title.toUpperCase() }}</tr>
    </template>

    <template v-slot:item.codReporte="{ item }">
      <tr class="text-caption">{{ item.raw.codReporte }}</tr>
    </template>
    <template v-slot:item.codConcepto="{ item }">
      <tr class="text-caption">{{ item.raw.codConcepto }}</tr>
    </template>
    <template v-slot:item.colummaExcel="{ item }">
      <tr class="text-caption">{{ item.raw.colummaExcel }}</tr>
    </template>
    <template v-slot:item.acciones="{ item }">
      <v-row align="center" justify="center">

        <v-col cols="auto">
          <v-icon icon="mdi-pencil" size="x-small" color="teal"></v-icon>
        </v-col>

        <v-col cols="auto">
          <v-icon icon="mdi-delete" size="x-small" color="pink"></v-icon>
        </v-col>

      </v-row>
    </template>


  </v-data-table>

</template>

<script setup>
import {ref,onMounted} from 'vue';
import {useColumnasReporteStore} from '../store/ColumnasReporteStore'
const columnasReporteStore = useColumnasReporteStore();
const itemsPerPage = ref(10);
const lstColumnasReporte = ref([]);
const headersDataTablaColumnasReporte = ref([
  { title: 'Código Reporte', key: 'codReporte' },
  { title: 'Código Concepto',  key: 'codConcepto' },
  { title: 'Columna Excel',  key: 'colummaExcel' },
  { title: 'Acciones',  key: 'acciones' }
]);

onMounted(async ()=>{
  console.log("entrando por onmuonted")
   await columnasReporteStore.obtenerColumnasReportesTodos();
  lstColumnasReporte.value = columnasReporteStore.getLstColumnasReporte;
})

const clickBuscar = () =>{
  console.log("buscar")
  let codReporte = document.getElementById("searchCodReporte").value;
  let codConcepto = document.getElementById("searchCodConcepto").value;
  lstColumnasReporte.value = columnasReporteStore.getLstColumnasReporte

  if(codReporte!=""){
    if(codReporte>0){
      lstColumnasReporte.value = lstColumnasReporte.value.filter(r => (r.codReporte+"").includes(codReporte));
    }
  }
  if(codConcepto!=""){
    if(codConcepto>0){
      lstColumnasReporte.value = lstColumnasReporte.value.filter(r => (r.codConcepto+"").includes(codConcepto));
    }
  }
}

</script>

<style scoped>

</style>
