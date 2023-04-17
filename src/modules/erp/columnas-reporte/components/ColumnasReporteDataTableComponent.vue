<template>

  <v-data-table
    v-model:items-per-page="itemsPerPage"
    :headers="headersDataTablaColumnasReporte"
    :items=" columnasReporteStore.getLstColumnasReporte"
    item-value="tablaIntermediaId"
    class="elevation-1"
    density="compact"
  >
    <template v-slot:column.nombreReporte="{ column }">
      <tr class="text-caption">{{ column.title.toUpperCase() }}</tr>
    </template>
    <template v-slot:column.tipoReporte="{ column }">
      <tr class="text-caption">{{ column.title.toUpperCase() }}</tr>
    </template>
    <template v-slot:column.codConcepto="{ column }">
      <tr class="text-caption">{{ column.title.toUpperCase() }}</tr>
    </template>
    <template v-slot:column.colummaExcel="{ column }">
      <tr class="text-caption">{{ column.title.toUpperCase() }}</tr>
    </template>
    <template v-slot:column.acciones="{ column }">
      <tr class="text-caption">{{ column.title.toUpperCase() }}</tr>
    </template>



    <template v-slot:item.nombreReporte="{ item }">
      <tr class="text-caption">{{ item.raw.nombreReporte }}</tr>
    </template>
    <template v-slot:item.tipoReporte="{ item }">
      <tr class="text-caption">{{ item.raw.tipoReporte }}</tr>
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
          <v-icon icon="mdi-pencil" size="x-small" color="teal" @click="clickEditar(item.raw)" ></v-icon>
        </v-col>

        <v-col cols="auto">
          <v-icon icon="mdi-delete" size="x-small" color="pink" @click="clickAnular(item.raw.columnaReporteId)" ></v-icon>
        </v-col>

      </v-row>
    </template>


  </v-data-table>

</template>

<script setup>
import {ref, onMounted, computed} from 'vue';
import {useColumnasReporteStore} from '../store/ColumnasReporteStore'
const columnasReporteStore = useColumnasReporteStore();
const itemsPerPage = ref(10);

const headersDataTablaColumnasReporte = ref([
  { title: 'Reporte', key: 'nombreReporte' },
  { title: 'Tipo Reporte',  key: 'tipoReporte' },
  { title: 'Código Concepto',  key: 'codConcepto' },

  { title: 'Columna Excel',  key: 'colummaExcel' },
  { title: 'Acciones',  key: 'acciones' }
]);

onMounted(async ()=>{
   await columnasReporteStore.obtenerColumnasReportesTodos();
  //lstColumnasReporte.value = columnasReporteStore.getLstColumnasReporte;
})


const clickAnular = async (columnaReporteId) =>{
  let eliminar = confirm("¿Confirma eliminar el registro?");
  if(!eliminar){
    return;
  }
  let r = await columnasReporteStore.anularColumnaReporte(columnaReporteId);
  alert(r.mensaje);
  await columnasReporteStore.obtenerColumnasReportesTodos();
}
const clickEditar = (obj) => {
  columnasReporteStore.setDialogFormColumnasReporte(true);
  columnasReporteStore.setObjColumnaReporte(obj);

}

</script>

<style scoped>

</style>
