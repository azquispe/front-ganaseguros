<template>
  <v-card>
    <v-card-title class="pa-0">
      <v-toolbar
        :color=" 'primary' "
        dark
        elevation="0"
        density="compact"
      >
        <v-toolbar-title>
          CARGA DE ASIENTOS
        </v-toolbar-title>

        <v-spacer></v-spacer>
        <v-btn
          @click="asientoStore.setDialogCargaAsientoExcel(false)"
          icon
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="12">
          <span>Seleccione Archivo Excel:</span>
          <input type="file" ref="refFileDatosResumen">
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-chip  class="ma-2" color="primary" label @click="clickCargarAsientosExcel() ">
        Subir Asiento
      </v-chip>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import {useAsientoStore} from '../store/AsientoStore';
import {useDominioStore} from '../../../transversal/store/DominioStore';
import {useDialogLoadingStore} from "@/modules/transversal/store/DialogLoadingStore"
const dialogLoadingStore = useDialogLoadingStore();
const asientoStore = useAsientoStore();
const dominioStore = useDominioStore();
//const vTipoReporte = ref(1034);
const lstTipoReportes = ref([]);
const refFileDatosResumen = ref(null)


onMounted(async () => {
  lstTipoReportes.value = await dominioStore.obtenerDominioPorDominio("TipoReporteID")
})


const clickCargarAsientosExcel = async () => {
  // subir excel
  const formData = new FormData();
  formData.append('file', refFileDatosResumen.value.files[0]);
  dialogLoadingStore.setDialogLoading(true,"Cargando Archivo...");
  let r = await asientoStore.cargarArchivoAsiento(formData,asientoStore.getTipoReporteId, 1000); // usuario no debe ser quemado
  alert (r.mensaje);
  await asientoStore.obtenerReportes(1000,0);
  dialogLoadingStore.setDialogLoading(false);
  asientoStore.setDialogCargaAsientoExcel(false);

}


</script>

<style scoped>

</style>
