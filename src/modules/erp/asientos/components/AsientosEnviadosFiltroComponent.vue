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
        label="Ramo"
        variant="outlined"
        hide-details
        id="searchRamo"
      ></v-text-field>
    </v-col>
    <v-col cols="12"
           md="2">
      <v-text-field
        density="compact"
        @input="clickBuscar()"
        label="Usuario"
        variant="outlined"
        hide-details
        id="searchUsuario"
      ></v-text-field>
    </v-col>
  </v-row>
</template>

<script setup>

import {useAsientoStore} from '../store/AsientoStore';
import {computed} from "vue";
const asientoStore = useAsientoStore();

const lstAsientosEnviados = computed({
  get: () => asientoStore.getLstAsientosEnviados,
  set: val => {
    asientoStore.setLstAsientosEnviados(val)
  }
})

const clickBuscar = () => {
  let reporte = document.getElementById("searchReporte").value;
  let ramo = document.getElementById("searchRamo").value;
  let usuario = document.getElementById("searchUsuario").value;
  lstAsientosEnviados.value = asientoStore.getLstAsientosEnviadosTodos;
  if (reporte != "") {
    lstAsientosEnviados.value = lstAsientosEnviados.value.filter(r => (r.nombreReporte.toUpperCase() + "").includes(reporte.toUpperCase()));
  }
  if (ramo != "") {
    lstAsientosEnviados.value = lstAsientosEnviados.value.filter(r => (r.nombreRamo.toUpperCase() + "").includes(ramo.toUpperCase()));
  }
  if (usuario != "") {
    lstAsientosEnviados.value = lstAsientosEnviados.value.filter(r => (r.usuario.toUpperCase() + "").includes(usuario.toUpperCase()));
  }
}
</script>

<style scoped>

</style>
