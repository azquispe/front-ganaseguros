<template>
  <v-row>
    <v-col cols="12"
           md="3">
      <v-autocomplete density="compact" variant="outlined" v-model="tipoReporteId" :items="lstTipoReportes"
                      item-value="dominioId"
                      item-title="descripcion" outlined dense label="Tipo de Reporte" hide-details
      ></v-autocomplete>
    </v-col>
    <v-col cols="12"
           md="2">
      <v-chip v-if="  lstTipoReportes.filter(r => r.dominioId == tipoReporteId && r.abreviatura=='CORE' ).length>0"
              class="ma-2" color="primary" label>Cargar Asientos desde CORE
      </v-chip>
      <v-chip v-else class="ma-2" color="primary" label @click="clickAbrirDialogoCargaExcel() ">Cargar Asientos
        desde Excel
      </v-chip>
    </v-col>
  </v-row>
</template>

<script setup>
import {useAsientoStore} from '../store/AsientoStore';
import {computed, onMounted, ref} from "vue";
const asientoStore = useAsientoStore();
import {useDominioStore} from "@/modules/transversal/store/DominioStore";
const dominioStore = useDominioStore();

//const vTipoReporte = ref(1034);
const lstTipoReportes = ref([]);

const tipoReporteId = computed({
  get: () => asientoStore.getTipoReporteId,
  set: val => {
    asientoStore.setTipoReporteId(val)
  }
})

onMounted(async () => {
  lstTipoReportes.value = await dominioStore.obtenerDominioPorDominio("TipoReporteID")
})

const clickAbrirDialogoCargaExcel = async () => {

  let continuar = false;
  let cantiadPendiente = await asientoStore.verificarAsientosPendientesPorEnviar();
  if (cantiadPendiente > 0) {
    continuar = confirm("Existen " + cantiadPendiente + " asientos por enviar, el cual va ser remplazado por la nueva informacion que se esta cargando, ¿ Desea Contianuar?");
  } else {
    continuar = true;
  }
  if (!continuar) {
    return;
  }

  asientoStore.setDialogCargaAsientoExcel(true);

}
</script>

<style scoped>

</style>
