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
          ACTUALIZAR COLUMNAS REPORTES
        </v-toolbar-title>

        <v-spacer></v-spacer>
        <v-btn
          @click="clickCerrar()"
          icon
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col
          cols="12"
          md="12"
        >

          <v-autocomplete density="compact" variant="outlined"
                          v-model="objColumnaReporte.codReporte"
                          :items="tablaIntermediaStore.getLstReportesTodos"
                          item-value="reporteId"
                          item-title="nombreReporte" outlined dense label="Reporte" hide-details
          ></v-autocomplete>
        </v-col>
        <v-col
          cols="12"
          md="12"
        >
          <v-autocomplete density="compact" variant="outlined" v-model="objColumnaReporte.tipoReporteId" :items="lstTipoReportes"
                          item-value="dominioId"
                          item-title="descripcion" outlined dense label="Tipo de Reporte" hide-details
          ></v-autocomplete>

        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            variant="outlined"
            density="compact"
            label="Código Concepto"
            required
            type="number"
            hide-details
            v-model="objColumnaReporte.codConcepto"
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          md="8"
        >
          <v-text-field
            variant="outlined"
            density="compact"
            label="Columna Excel"
            required
            type="text"
            hide-details
            v-model="objColumnaReporte.colummaExcel"
          ></v-text-field>
        </v-col>
       </v-row>
    </v-card-text>
    <v-card-actions>
      <v-chip  class="ma-2" color="primary" label @click="clickActualizarColumnasReporte() ">
        Actualizar Columnas Reporte
      </v-chip>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import {useColumnasReporteStore} from '../store/ColumnasReporteStore'
import {computed, onMounted, ref} from "vue";
const columnasReporteStore  = useColumnasReporteStore();
import {useDominioStore} from "@/modules/transversal/store/DominioStore";
const dominioStore = useDominioStore();
import {useTablaIntermediaStore} from '../../tabla-intermedia/store/TablaIntermediaStore'
const tablaIntermediaStore = useTablaIntermediaStore();


const lstTipoReportes = ref([]);


const objColumnaReporte = computed({
  get: () => columnasReporteStore.getObjColumnaReporte,
  set: val => {
    columnasReporteStore.setObjColumnaReporte(val)
  }
})

onMounted(async () => {
  lstTipoReportes.value = await dominioStore.obtenerDominioPorDominio("TipoReporteID");
  await tablaIntermediaStore.obtenerReportesTodos();
})


const clickActualizarColumnasReporte = async() => {
  let update = {
    columnaReporteId:objColumnaReporte.value.columnaReporteId,
    tipoReporteId:objColumnaReporte.value.tipoReporteId,
    codReporte:objColumnaReporte.value.codReporte,
    codConcepto:objColumnaReporte.value.codConcepto,
    colummaExcel:objColumnaReporte.value.colummaExcel
  }
  let r = await columnasReporteStore.actualizarColumnasReportes(update);
  if(r.codigoMensaje !="1000"){
    alert(r.mensaje);
    return;
  }
  columnasReporteStore.setDialogFormColumnasReporte(false);
  columnasReporteStore.obtenerColumnasReportesTodos();

}
const clickCerrar = () => {
  columnasReporteStore.setDialogFormColumnasReporte(false);
  columnasReporteStore.obtenerColumnasReportesTodos();
}
</script>

<style scoped>

</style>
