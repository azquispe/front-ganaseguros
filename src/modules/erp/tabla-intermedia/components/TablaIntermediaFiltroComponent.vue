<template>
  <v-row>
    <v-col cols="12"
           md="2">
      <v-text-field
        density="compact"
        @input="clickBuscar()"
        label="Código Ramo"
        variant="outlined"
        hide-details
        id="searchCodRamo"
      ></v-text-field>
    </v-col>
    <v-col cols="12"
           md="2">
      <v-text-field
        density="compact"
        @input="clickBuscar()"
        label="Código Reporte"
        variant="outlined"
        hide-details
        id="searchCodReporte"
      ></v-text-field>
    </v-col>
    <v-col cols="12"
           md="2">
      <v-text-field
        density="compact"
        @input="clickBuscar()"
        label="Nombre Reporte"
        variant="outlined"
        hide-details
        id="searchNombreRepo"
      ></v-text-field>
    </v-col>
    <v-col cols="12"
           md="2">
      <v-text-field
        density="compact"
        @input="clickBuscar()"
        label="Tipo de Moneda"
        variant="outlined"
        hide-details
        id="searchTipoMoneda"
      ></v-text-field>
    </v-col>
    <v-col cols="12"
           md="2">
      <v-text-field
        density="compact"
        @input="clickBuscar()"
        label="Cuenta SAP PUC"
        variant="outlined"
        hide-details
        id="searchCuentaSapPuc"
      ></v-text-field>
    </v-col  >
    <v-col  cols="12" md="2">
      <v-chip class="ma-2" color="primary" label @click="clickCargarExcelTablaIntermedia()">Cargar desde Archivo Excel
      </v-chip>
    </v-col>
  </v-row>
</template>

<script setup>
import {useTablaIntermediaStore} from '../store/TablaIntermediaStore'
import {computed} from "vue";
const tablaIntermediaStore = useTablaIntermediaStore();

const clickCargarExcelTablaIntermedia = () =>{
  alert("esta en proceso de desarrollo")
}
const lstTablaIntermedia = computed({
  get: () => tablaIntermediaStore.getLstTablaIntermedia,
  set: val => {
    tablaIntermediaStore.setLstTablaIntermedia(val)
  }
})
const clickBuscar = () => {

  let codRamo = document.getElementById("searchCodRamo").value;
  let codReporte = document.getElementById("searchCodReporte").value;
  let nombreReporte = document.getElementById("searchNombreRepo").value;
  let tipoMoneda = document.getElementById("searchTipoMoneda").value;
  let cuentaSapPuc = document.getElementById("searchCuentaSapPuc").value;


  lstTablaIntermedia.value =tablaIntermediaStore.getLstTablaIntermediaTodos;


  if(codRamo!=""){
    if(codRamo>0){
      lstTablaIntermedia.value =  lstTablaIntermedia.value.filter(r => (r.codRamo+"").includes(codRamo));
    }
  }
  if(codReporte!=""){
    if(codReporte>0){
      lstTablaIntermedia.value= lstTablaIntermedia.value.filter(r => (r.codReporte+"").includes(codReporte));
    }
  }
  if(nombreReporte!=""){
    lstTablaIntermedia.value =lstTablaIntermedia.value.filter(r => (r.nombreReporte.toUpperCase()+"").includes(nombreReporte.toUpperCase()));
  }
  if(tipoMoneda!=""){
    lstTablaIntermedia.value = lstTablaIntermedia.value.filter(r => (r.tipoMoneda.toUpperCase()+"").includes(tipoMoneda.toUpperCase()));
  }
  if(cuentaSapPuc!=""){
    lstTablaIntermedia.value = lstTablaIntermedia.value.filter(r => (r.codigoCuentaSapPuc.toUpperCase()+"").includes(cuentaSapPuc.toUpperCase()));
  }

}
</script>

<style scoped>

</style>
