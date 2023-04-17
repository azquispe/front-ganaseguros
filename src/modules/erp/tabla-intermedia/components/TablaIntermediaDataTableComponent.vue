<template>
  <v-data-table
    v-model:items-per-page="itemsPerPage"
    :headers="headersTablaIntermedia"
    :items="tablaIntermediaStore.getLstTablaIntermedia"
    item-value="tablaIntermediaId"
    class="elevation-1"
    density="compact"
  >
    <template v-slot:column.codRamo="{ column }">
      <td class="text-caption">{{ column.title.toUpperCase() }}</td>
    </template>
    <template v-slot:column.ramo="{ column }">
      <tr class="text-caption">{{ column.title.toUpperCase() }}</tr>
    </template>
    <template v-slot:column.codReporte="{ column }">

      <tr class="text-caption">{{ column.title.toUpperCase() }}</tr>
    </template>
    <template v-slot:column.campoReporte="{ column }">
      <tr class="text-caption">{{ column.title.toUpperCase() }}</tr>
    </template>
    <template v-slot:column.nombreReporte="{ column }">

      <tr class="text-caption">{{ column.title.toUpperCase() }}</tr>
    </template>
    <template v-slot:column.tipoMoneda="{ column }">

      <tr class="text-caption">{{ column.title.toUpperCase() }}</tr>
    </template>
    <template v-slot:column.codigoConcepto="{ column }">
      <tr class="text-caption">{{ column.title.toUpperCase() }}</tr>
    </template>
    <template v-slot:column.descripcionConcepto="{ column }">
      <tr class="text-caption">{{ column.title.toUpperCase() }}</tr>
    </template>
    <template v-slot:column.codigoCuentaSapPuc="{ column }">

      <tr class="text-caption">{{ column.title.toUpperCase() }}</tr>
    </template>
    <template v-slot:column.descripcionCuenta="{ column }">
      <tr class="text-caption">{{ column.title.toUpperCase() }}</tr>
    </template>
    <template v-slot:column.debeHaber="{ column }">
      <tr class="text-caption">{{ column.title.toUpperCase() }}</tr>
    </template>
    <template v-slot:column.acciones="{ column }">
      <tr class="text-caption">{{ column.title.toUpperCase() }}</tr>
    </template>

    <template v-slot:item.codRamo="{ item }">
      <tr class="text-caption">{{ item.raw.codRamo }}</tr>
    </template>
    <template v-slot:item.ramo="{ item }">
      <tr class="text-caption">{{ item.raw.ramo }}</tr>
    </template>
    <template v-slot:item.codReporte="{ item }">
      <tr class="text-caption">{{ item.raw.codReporte }}</tr>
    </template>
    <template v-slot:item.campoReporte="{ item }">
      <tr class="text-caption">{{ item.raw.campoReporte }}</tr>
    </template>
    <template v-slot:item.nombreReporte="{ item }">
      <tr class="text-caption">{{ item.raw.nombreReporte }}</tr>
    </template>
    <template v-slot:item.tipoMoneda="{ item }">
      <tr class="text-caption">{{ item.raw.tipoMoneda }}</tr>
    </template>
    <template v-slot:item.codigoConcepto="{ item }">
      <tr class="text-caption">{{ item.raw.codigoConcepto }}</tr>
    </template>
    <template v-slot:item.descripcionConcepto="{ item }">
      <tr class="text-caption">{{ item.raw.descripcionConcepto }}</tr>
    </template>
    <template v-slot:item.codigoCuentaSapPuc="{ item }">
      <tr class="text-caption">{{ item.raw.codigoCuentaSapPuc }}</tr>
    </template>
    <template v-slot:item.descripcionCuenta="{ item }">
      <tr class="text-caption">{{ item.raw.descripcionCuenta }}</tr>
    </template>
    <template v-slot:item.debeHaber="{ item }">
      <tr class="text-caption">{{ item.raw.debeHaber }}</tr>
    </template>
    <template v-slot:item.acciones="{ item }">
      <tr class="text-caption">
        <v-icon class="pr-5" size="small" color="teal" icon="mdi-pencil"
                @click="clickEditarTablaIntermedia(item.raw)"></v-icon>
        <!-- <v-icon  size="small" color="pink" icon="mdi-delete" @click="clickEliminarTablaIntermedia(item)" ></v-icon>-->
      </tr>
    </template>

  </v-data-table>
</template>

<script setup>

import {onMounted, ref} from "vue";
import {useTablaIntermediaStore} from '../store/TablaIntermediaStore'
const tablaIntermediaStore = useTablaIntermediaStore();
const itemsPerPage = ref(10);


onMounted(async () => {

  const res = await tablaIntermediaStore.getIntermediateTable();
  if (res.codigoMensaje != '1000') {
    alert(res.mensaje);
    return;
  }

})

//const lstTablaIntermediaTodos =ref( []);
const headersTablaIntermedia = ref([
  {title: 'Código Ramo', key: 'codRamo', class: 'my-header-style'},
  {title: 'Ramo', key: 'ramo'},
  {title: 'Código Reporte', key: 'codReporte'},
  {title: 'Campo Reporte', key: 'campoReporte'},
  {title: 'Nombre Reporte', key: 'nombreReporte'},
  {title: 'Tipo Moneda', key: 'tipoMoneda'},
  {title: 'Código Concepto', key: 'codigoConcepto'},
  {title: 'Descripción Concepto', key: 'descripcionConcepto'},
  {title: 'Código Cuenta Sap Puc', key: 'codigoCuentaSapPuc'},
  {title: 'Descripcion Cuenta', key: 'descripcionCuenta'},
  {title: 'Debe Haber', key: 'debeHaber'},
  {title: 'Acciones', key: 'acciones'},
]);

const clickEditarTablaIntermedia = (item) => {
  tablaIntermediaStore.setDialogFormTablaIntermedia(true);
  tablaIntermediaStore.setObjTablaIntermedia(item);

}

</script>

<style scoped>

</style>
