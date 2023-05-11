<template>

  <v-dialog
    v-model="asientoStore.getDialogCargaAsientoExcel"
    width="700px"
  >
    <generaAsientosFormCargaAsientosExcelComponent></generaAsientosFormCargaAsientosExcelComponent>
  </v-dialog>

  <v-dialog
    v-model="dialogEnviarAsiento"
    width="700px"
  >
    <v-card>
      <v-card-title class="pa-0">
        <v-toolbar
          :color=" 'primary' "
          dark
          elevation="0"
          density="compact"
        >
          <v-toolbar-title>
            ENVIAR ASIENTOS
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn
            @click="dialogEnviarAsiento=false;"
            icon
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <span>Fecha Desde:</span>
            <input type="date" v-model="fechaDesde">

          </v-col>
          <v-col cols="12">
            <span>Fecha Hasta:</span>
            <input type="date" v-model="fechaHasta">
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-chip class="ma-2" color="primary" label @click=" clickEnviar()">
          Enviar Asiento a ERP
        </v-chip>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-card elevation="2" class="mx-auto pt-10 pl-2 pr-2" width="90%">

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
        A continuación se muestra las opciones para el cargado de asientos MANUAL y desde el CORE, donde básicamente
        debe seguir los siguientes pasos:
        <lu>
          <li> - Cargar Asiento por Archivo EXCEL o desde CORE</li>
          <li> - Revisar los asientos</li>
          <li> - Enviar a ERP (por ramo, reporte o todos)</li>
        </lu>
      </v-alert>
      <div class="pt-3">
      </div>

    </div>
    <div>
      <generaAsientosOpcionCargaComponent></generaAsientosOpcionCargaComponent>
    </div>


    <div v-if="asientoStore.getLstReporte && asientoStore.getLstReporte.length>0">
      <div class="text-center d-flex pb-4">
        <v-btn class="ma-2" elevation="0" @click="desplegar">
          Desplegar Todo
        </v-btn>
        <v-btn class="ma-2" elevation="0"  @click="replegar">
          Replegar Todo
        </v-btn>

        <v-chip class="ma-2" color="primary" label @click="dialogEnviarAsiento=true;enviarTodo=true; /*clickEnviarTodoAerp()*/">
          Enviar Todo a ERP
        </v-chip>

      </div>

      <v-expansion-panels
        v-model="panel"
        multiple

      >
        <v-expansion-panel v-for="obj in asientoStore.getLstReporte" :key="obj" :value="obj.codReporte">
          <v-expansion-panel-title>
            <v-row no-gutters>

              <v-col
                cols="5"
                class="text--secondary"
              >
                <span class="font-weight-bold">Nombre reporte </span>
                <div class="pt-2">{{ obj.codReporte }} - {{ obj.nombreReporte }}</div>
              </v-col>
              <v-col
                cols="2"
                class="text--secondary"
              >
                <span class="font-weight-bold">Tipo reporte </span>
                <div class="pt-2">{{ obj.tipoReporte }}</div>
              </v-col>
              <v-col
                cols="1"
                class="text--secondary"
              >
                <span class="font-weight-bold">Moneda </span>
                <div class="pt-2">{{ obj.tipoMoneda }}</div>
              </v-col>
              <v-col
                cols="3"
                class="text--secondary"
              >
                <v-btn class="ma-2" elevation="0" density="compact" @click.stop="dialogEnviarAsiento=true;enviarTodo=false; objReporteSeleccionado = obj; /*clickEnviarReporteErp(obj)*/">
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

</template>

<script setup>

import detalleAsientosComponent from '@/modules/erp/asientos/components/AsientoCabComponent.vue'
import generaAsientosFormCargaAsientosExcelComponent
  from '../components/GeneraAsientosFormCargaAsientosExcelComponent.vue';
import generaAsientosOpcionCargaComponent from '../components/GeneraAsientosOpcionCargaComponent.vue'

import {useAsientoStore} from '../store/AsientoStore';
import {useDialogLoadingStore} from "@/modules/transversal/store/DialogLoadingStore"
import {ref, onMounted} from "vue";
import {useDominioStore} from "@/modules/transversal/store/DominioStore";

const dominioStore = useDominioStore();

const dialogLoadingStore = useDialogLoadingStore();
const lstTipoReportes = ref([]);
const asientoStore = useAsientoStore();
const panel = ref([]);

const enviarTodo = ref(false);
const dialogEnviarAsiento = ref(false);
const fechaDesde = ref(new Date);
const fechaHasta = ref(new Date);
const objReporteSeleccionado = ref ({});


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
const clickEnviar = () =>{
  if(enviarTodo.value){
    clickEnviarTodoAerp();
  }else{
    clickEnviarReporteErp();
  }
}
const clickEnviarTodoAerp = async () => {
  replegar();


  let cantidadPorEnviar = 0;
  let cantidadAsiento = await asientoStore.obtenerCantidadAsientos(1000, asientoStore.getTipoReporteId);
  let cantidadNoEnviado = cantidadAsiento.cantidad.cantidadNoEviados;
  //cantidadNoEnviado = 5000; // PARA PRUEBA

  let lstReportes = await asientoStore.obtenerReportes(1000, asientoStore.getTipoReporteId);

  dialogLoadingStore.setDialogLoading(true, "Enviando " + cantidadPorEnviar + " asiento de " + cantidadNoEnviado);
  for (const objReporte of lstReportes) {
    let lstAsientosCab = await asientoStore.obtenerAsientoCab(objReporte.codReporte);

    for (const objAsientoCab of lstAsientosCab.filter(r => r.nroasientoSap=="null")) {
    //for (const objAsientoCab of lstAsientosCab) { // PARA LAS PRUEBAS

        let lstDetAsiento = await asientoStore.obtenerAsientosDet(objAsientoCab.asientoCabTemId);
        console.log("det "+lstDetAsiento.length)
        let detalle = [];
        for (let objAsientoDet of lstDetAsiento) {
          detalle.push({
            CodigoRamo: objAsientoCab.codRamo,
            CodigoReporte: objAsientoCab.codReporte,
            AccountCode: objAsientoDet.codigoConcepto,
            ShortName: objAsientoDet.descripcionConcepto,
            LineMemo: objAsientoDet.descripcionCuenta,
            Amount: objAsientoDet.debeHaber == "D" ? parseFloat(objAsientoDet.amountDebe) : parseFloat(objAsientoDet.amountHaber),
            CostingCode: "",
            CostingCode2: "",
            CostingCode3: ""
          })
        }

        let request = {
          asiento :{
            TaxDate: objAsientoCab.taxDate,
            DueDate: objAsientoCab.dueDate,
            ReferenceDate: objAsientoCab.referenceDate,
            Memo: objReporte.nombreReporte,
            References: "Enviado desde: App Web - Ganaseguros",
            JournalEntryLine: detalle
          },
          asientoCabTemId: objAsientoCab.asientoCabTemId,
          usuarioId: 1000,
          fechaDesde: fechaDesde.value,
          fechaHasta: fechaHasta.value
        }

        let r = await asientoStore.enviarErpAsientos(request)
        if (r.codigoMensaje == "1") {
          cantidadPorEnviar++;
          dialogLoadingStore.setDialogLoading(true, "Enviando " + cantidadPorEnviar + " asiento de " + cantidadNoEnviado);
        }

    }
  }
  dialogLoadingStore.setDialogLoading(false, "");
  desplegar();
}
const clickEnviarReporteErp = async () => {
  let obj = objReporteSeleccionado.value;
  replegar();
  let lstAsientoCab = await asientoStore.obtenerAsientoCab(obj.codReporte)
  let contador = 1;
  let cantidadPorEnviar = lstAsientoCab.filter(r => r.nroasientoSap=="null").length;
  for (const objAsientoCab of lstAsientoCab.filter(r => r.nroasientoSap=="null")) {
    let lstDetAsiento = await asientoStore.obtenerAsientosDet(objAsientoCab.asientoCabTemId);
    let detalle = [];
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
    let request = {
      asiento :{
        TaxDate: objAsientoCab.taxDate,
        DueDate: objAsientoCab.dueDate,
        ReferenceDate: objAsientoCab.referenceDate,
        Memo: objAsientoCab.nombreReporte,
        References: "Enviado desde: App Web - Ganaseguros",
        JournalEntryLine: detalle,
      },
      asientoCabTemId: objAsientoCab.asientoCabTemId,
      usuarioId: 1000,
      fechaDesde: fechaDesde.value,
      fechaHasta: fechaHasta.value
    }

    dialogLoadingStore.setDialogLoading(true, "se han enviado " + contador + " asiento de " + cantidadPorEnviar);
    await asientoStore.enviarErpAsientos(request);
    contador++;
  }
  dialogLoadingStore.setDialogLoading(false);
  panel.value.push(obj.codReporte);

}


</script>

<style scoped>

</style>
