<template>

  <v-dialog
    v-model="asientoStore.getDialogCargaAsientoExcel"
    width="500px"
  >
 <formCargaAsientoExcelComponent></formCargaAsientoExcelComponent>
  </v-dialog>
  <div style="width: 100%">
    <v-card elevation="2" class="mx-auto">
      <v-toolbar flat style="height: 60px; " color="#F9FAFE">
        <v-toolbar-title class="text-grey">
          Envio de Asientos Contables a ERP
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-chip class="ma-2" color="primary" label @click="asientoStore.setDialogCargaAsientoExcel(true) ">Cargar Asientos desde Excel
          </v-chip>
          <v-chip class="ma-2" color="primary" label >Cargar Asientos desde SF</v-chip>
        </v-toolbar-items>
      </v-toolbar>
      <div v-if="asientoStore.getLstReporte.length>0">
        <div class="text-center d-flex pb-4">
          <v-btn class="ma-2" elevation="0" @click="desplegar">
            Desplegar Todo
          </v-btn>
          <v-btn class="ma-2" elevation="0" @click="replegar">
            Replegar Todo
          </v-btn>
        </div>
        <v-expansion-panels
          v-model="panel"
          multiple
        >
          <v-expansion-panel v-for="obj in asientoStore.getLstReporte" :key="obj"
                             :value="obj.codReporte"
          >
            <v-expansion-panel-title>
              <v-row no-gutters>
                <v-col cols="2" class="d-flex justify-start">
                  <div><span class="font-weight-bold">Código de Reporte: </span>{{ obj.codReporte }}</div>
                </v-col>
                <v-col
                  cols="10"
                  class="text--secondary"
                >
                  <div>{{ obj.nombreReporte }}</div>
                </v-col>
              </v-row>
            </v-expansion-panel-title>
            <v-expansion-panel-text>

              <detalleAsientosComponent :reporte="obj"></detalleAsientosComponent>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>

    </v-card>
  </div>
</template>

<script setup>

import detalleAsientosComponent from '@/modules/erp/asientos/components/AsientoCabComponent.vue'
import formCargaAsientoExcelComponent from '../components/FormCargaAsientoExcelComponent.vue';

import {useAsientoStore} from '../store/AsientoStore';
import {ref, } from "vue";

const asientoStore = useAsientoStore();
const panel = ref([]);


const desplegar = () => {
  panel.value = asientoStore.getLstReporte.map((item) => parseInt(item.codReporte));
}
const replegar = () => {
  panel.value = []
}





</script>

<style scoped>

</style>
