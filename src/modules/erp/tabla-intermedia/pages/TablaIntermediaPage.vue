<template>
  <div>
    <v-data-table
      v-model:items-per-page="itemsPerPage"
      :headers="headersTablaIntermedia"
      :items="lstTablaIntermedia"
      item-value="tablaIntermediaId"
      class="elevation-1"
      density="compact"
    >
      <template v-slot:column.codRamo="{ column }">
        <input  @input="clickBuscar()"  style="width: 50px; border: 1px solid #c2c3c4; padding: 2px; margin-top: 2px;" type="search" id="searchCodRamo" ><br>
        <td class="text-caption" >{{ column.title.toUpperCase() }}</td>
      </template>
      <template v-slot:column.ramo="{ column }">
        <tr class="text-caption">{{ column.title.toUpperCase() }}</tr>
      </template>
      <template v-slot:column.codReporte="{ column }">
        <input  @input="clickBuscar()"  style="width: 50px; border: 1px solid #c2c3c4; padding: 2px; margin-top: 2px;" type="search" id="searchCodReporte" ><br>
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

    </v-data-table>

  </div>
</template>

<script setup>
import {onMounted,ref} from "vue";
import {useTablaIntermediaStore} from '../store/TablaIntermediaStore'
const tablaIntermediaStore  = useTablaIntermediaStore();
const itemsPerPage = ref(10);

const lstTablaIntermedia = ref([]);
const lstTablaIntermediaTodos =ref( []);
const headersTablaIntermedia = ref([
  { title: 'Código Ramo', key: 'codRamo' ,class: 'my-header-style'},
  { title: 'Ramo',  key: 'ramo' },
  { title: 'Código Reporte',  key: 'codReporte' },
  { title: 'Campo Reporte',  key: 'campoReporte' },
  { title: 'Nombre Reporte',  key: 'nombreReporte' },
  { title: 'Tipo Moneda', key: 'tipoMoneda' },
  { title: 'Código Concepto',  key: 'codigoConcepto' },
  { title: 'Descripción Concepto', key: 'descripcionConcepto' },
  { title: 'Código Cuenta Sap Puc',  key: 'codigoCuentaSapPuc' },
  { title: 'Descripcion Cuenta',  key: 'descripcionCuenta' },
  { title: 'Debe Haber', key: 'debeHaber' },
]);

onMounted(async ()=>{
  lstTablaIntermedia.value = [];
  const res = await tablaIntermediaStore.getIntermediateTable();
  if(res.codigoMensaje!='1000'){
    alert(res.mensaje);
    return;
  }
  lstTablaIntermedia.value = res.tablaIntermedia;
  lstTablaIntermediaTodos.value = res.tablaIntermedia;

})

const clickBuscar = () =>{
  let codRamo = document.getElementById("searchCodRamo").value;
  let codReporte = document.getElementById("searchCodReporte").value;
  lstTablaIntermedia.value = lstTablaIntermediaTodos.value
  if(codRamo!=""){
    if(codRamo>0){
      lstTablaIntermedia.value = lstTablaIntermedia.value.filter(r => (r.codRamo+"").includes(codRamo));
    }
  }
  if(codReporte!=""){
    if(codReporte>0){
      lstTablaIntermedia.value = lstTablaIntermedia.value.filter(r => (r.codReporte+"").includes(codReporte));
    }
  }
}




</script>
<style scoped>
.my-header-style {
  color: #6f8fb9 !important;
}
</style>
