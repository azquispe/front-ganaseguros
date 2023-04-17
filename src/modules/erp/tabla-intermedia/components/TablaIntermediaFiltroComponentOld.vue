<template>
<v-container>
  <v-row>
    <v-col cols="12">
      <label for="start">Fecha de Referencia:</label>
      <input type="date"
             v-model="vFechaReferencia"
             min="2018-01-01" max="2018-12-31">
    </v-col>
    <v-col cols="12">
      <label for="start">Fecha de Vencimiento:</label>
      <input type="date"
             v-model="vFechaVencimiento"
             min="2018-01-01" max="2018-12-31">
    </v-col>
    <v-col cols="12">
      <label for="start">Fecha de Contabilización Fiscal:</label>
      <input type="date"
             v-model="vFechaContabilizacion"
             min="2018-01-01" max="2018-12-31">
    </v-col>
    <v-col cols="12">
      <v-autocomplete
        v-model="vTipoReporte"
        :items="lstTipoReportes"
        density="compact"
        label="Seleccione Tipo de Reporte"
        item-value="dominioId"
        item-text="descripcion"
      ></v-autocomplete>
    </v-col>
    <v-col cols="12">

    </v-col>
    <v-col cols="12">

    </v-col>
  </v-row>
</v-container>
</template>
<script setup>
import {ref,onMounted} from 'vue'
import {useDominioStore} from '@/modules/transversal/store/DominioStore';
const vTipoReporte = ref(0);
const vFechaReferencia = ref('');
const vFechaVencimiento = ref('');
const vFechaContabilizacion = ref('');
const lstTipoReportes = ref([]);

onMounted(async ()=>{
  const   dominioStore = useDominioStore();
  lstTipoReportes.value = await dominioStore.obtenerDominioPorDominio("TipoReporteContableID");
})

</script>
<style scoped>
</style>
