<template>

  <v-dialog
    v-model="asientoStore.getDialogCargaAsientoExcel"
    width="700px"
  >
    <formCargaAsientoExcelComponent :pTipoReporteId="vTipoReporte"></formCargaAsientoExcelComponent>
  </v-dialog>
  <div style="width: 100%">
    <v-card elevation="2" class="mx-auto">
      <v-toolbar flat style="height: 60px; " color="#F9FAFE">
        <v-toolbar-title class="text-grey">
          Envio de Asientos Contables a ERP
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <div class="ma-2">

            <v-autocomplete density="compact" variant="outlined" v-model="vTipoReporte" :items="lstTipoReportes"
                            item-value="dominioId"
                            item-title="descripcion" outlined dense label="Tipo de Reporte" hide-details
            ></v-autocomplete>
          </div>
          <v-chip v-if="  lstTipoReportes.filter(r => r.dominioId == vTipoReporte && r.abreviatura=='CORE' ).length>0"
                  class="ma-2" color="primary" label>Cargar Asientos desde CORE
          </v-chip>
          <v-chip v-else class="ma-2" color="primary" label @click="clickAbrirDialogoCargaExcel() ">Cargar Asientos
            desde Excel
          </v-chip>

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
          <v-btn class="ma-2" elevation="0" @click="clickEnviarTodoAerp()">
            Enviar Todoa ERP
          </v-btn>
        </div>

        <v-expansion-panels
          v-model="panel"
          multiple

        >
          <v-expansion-panel v-for="obj in asientoStore.getLstReporte" :key="obj" :value="obj.codReporte">
            <v-expansion-panel-title>
              <v-row no-gutters>

                <v-col
                  cols="3"
                  class="text--secondary"
                >
                  <span class="font-weight-bold">Nombre reporte </span>
                  <div class="pt-2">{{ obj.codReporte }} - {{ obj.nombreReporte }}</div>
                </v-col>
                <v-col
                  cols="3"
                  class="text--secondary"
                >
                  <span class="font-weight-bold">Tipo reporte </span>
                  <div class="pt-2">{{ obj.tipoReporte }}</div>
                </v-col>
                <v-col
                  cols="3"
                  class="text--secondary"
                >
                  <span class="font-weight-bold">Moneda </span>
                  <div class="pt-2">{{ obj.tipoMoneda }}</div>
                </v-col>
                <v-col
                  cols="3"
                  class="text--secondary"
                >

                  <v-btn class="ma-2" elevation="0" density="compact" @click.stop="clickEnviarReporteErp(obj)">
                    Enviar a ERP
                  </v-btn>

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
import {useDialogLoadingStore} from "@/modules/transversal/store/DialogLoadingStore"
import {ref, onMounted} from "vue";
import {useDominioStore} from "@/modules/transversal/store/DominioStore";

const vTipoReporte = ref(1034);
const dialogLoadingStore = useDialogLoadingStore();
const lstTipoReportes = ref([]);
const asientoStore = useAsientoStore();
const panel = ref([]);
const dominioStore = useDominioStore();

onMounted(async () => {
  await asientoStore.obtenerReportes(1000, 0);
  lstTipoReportes.value = await dominioStore.obtenerDominioPorDominio("TipoReporteID")
})
const desplegar = () => {
  panel.value = asientoStore.getLstReporte.map((item) => parseInt(item.codReporte));
}
const replegar = () => {
  panel.value = []
}
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
const clickEnviarTodoAerp = async () => {
  replegar();
  await asientoStore.obtenerReportes(1000, 0);
  dialogLoadingStore.setDialogLoading(true, "Enviado todo a ERP");
  let tipoReporte = asientoStore.getLstReporte[0].tipoReporteId;
  let res = await asientoStore.enviarErpAsientosTodos(1000, tipoReporte);
  await asientoStore.obtenerReportes(1000, tipoReporte);
  dialogLoadingStore.setDialogLoading(false, "Enviado todo a ERP");
  alert(res.mensaje)
  desplegar();
}
const clickEnviarReporteErp = async (obj) => {

  replegar();
  let lstAsientoCab = await asientoStore.obtenerAsientoCab(obj.codReporte)
  let contador = 1;
  for (const objAsientoCab of lstAsientoCab) {
    let lstDetAsiento = await asientoStore.obtenerAsientosDet(objAsientoCab.asientoCabTemId);
    let detalle = [];
    let asiento = {};
    for (let item of lstDetAsiento) {
      detalle.push({
        CodigoRamo: objAsientoCab.codRamo,
        CodigoReporte: objAsientoCab.codReporte,
        AccountCode: item.codigoConcepto,
        ShortName: item.descripcionConcepto,
        LineMemo: item.descripcionCuenta,
        Amount: item.debeHaber == "D" ? parseFloat(item.amountDebe) : parseFloat(item.amountHaber),
        CostingCode: "",
        CostingCode2: "",
        CostingCode3: ""
      })
    }
    asiento = {
      TaxDate: objAsientoCab.taxDate,
      DueDate: objAsientoCab.dueDate,
      ReferenceDate: objAsientoCab.referenceDate,
      Memo: objAsientoCab.nombreReporte,
      References: "Enviado desde: App Web - Ganaseguros",
      JournalEntryLine: detalle,
    }

    dialogLoadingStore.setDialogLoading(true, "se han enviado " + contador + " asiento de " + lstAsientoCab.length);
    await asientoStore.enviarErpAsientos(asiento, objAsientoCab.asientoCabTemId, 1000);
    contador++;
  }
  dialogLoadingStore.setDialogLoading(false);
  panel.value.push(obj.codReporte);

}


</script>

<style scoped>

</style>
