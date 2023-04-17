<template>
  <v-dialog
    v-model="tablaIntermediaStore.getDialogFormTablaIntermedia"
    width="700px"
  >
    <formTablaIntermediaComponent></formTablaIntermediaComponent>
  </v-dialog>
  <v-card elevation="2" class="mx-auto pt-10 pl-2 pr-2" width="95%">
    <div>
      <v-alert
        density="compact"
        color="blak"
        variant="outlined"
        class="text-caption"

      >
        <template v-slot:title>
          Nota:
        </template>
        En las cajas de texto ingresando palabras puede realizar los filtros en la Tabla Intermedia<br>
        Cuando realice la carga de Tabla Intermedia a través de archivo Excel esta información remplazara a la existente
        actualmente
      </v-alert>
      <div class="pt-3">
      </div>
      <tablaIntermediaFiltroComponent></tablaIntermediaFiltroComponent>
    </div>
    <v-card-text>
      <tablaIntermediaDataTableComponent></tablaIntermediaDataTableComponent>
    </v-card-text>
  </v-card>

</template>

<script setup>
import formTablaIntermediaComponent from '../components/TablaIntermediaFormComponent.vue'
import tablaIntermediaFiltroComponent from '../components/TablaIntermediaFiltroComponent.vue'
import tablaIntermediaDataTableComponent from '../components/TablaIntermediaDataTableComponent.vue'

import {useTablaIntermediaStore} from '../store/TablaIntermediaStore'
const tablaIntermediaStore = useTablaIntermediaStore();

</script>
<style scoped>
.my-header-style {
  color: #6f8fb9 !important;
}
</style>

