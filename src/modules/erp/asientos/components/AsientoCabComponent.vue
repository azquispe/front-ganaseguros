<template>
  <v-dialog
    v-model="dialogEnviarASiento"
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
            @click="dialogEnviarASiento=false;"
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
        <v-chip class="ma-2" color="primary" label @click="clickEnviarErp()">
          Enviar Asiento a ERP
        </v-chip>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <div>
    <div>
      <v-row>
        <v-col cols="12">
          <div>
            <v-slide-group
              show-arrows
            >
              <v-btn-toggle
                variant="outlined"
                divided
                v-model="objAsientoCab"
                rounded="0"
                color="deep-purple-accent-3"
                group
              >
                <v-btn :value="obj" v-for="obj in lstAsientoCab" :key="obj">
                  <v-icon v-if="obj.nroasientoSap=='null' && obj.jsonEnviadoSap!='null'" icon="mdi-alert"
                          color="red"></v-icon>
                  <span class="font-weight-thin " style="font-size: 11px;"> {{ obj.codRamo + ' - ' + obj.ramo }}</span>
                </v-btn>
              </v-btn-toggle>
            </v-slide-group>
          </div>
        </v-col>
        <v-col cols="12">
          <v-card
            class="mx-auto"
            max-width="100%"
            variant="outlined"
          >
            <v-card-item>

              <v-alert
                v-if="objAsientoCab.jsonRespuestaSap!='null'"
                density="compact"
                :color="objAsientoCab.nroasientoSap!='null'?'success':'error'"
                :title="'Nro Asiento: '+(objAsientoCab.nroasientoSap=='null'?' 0 ':objAsientoCab.nroasientoSap)"
                variant="tonal"
              >
                <code>
                  Respuesta SAP: {{ objAsientoCab.jsonRespuestaSap }}
                </code>
                <v-btn density="compact" v-if="objAsientoCab.nroasientoSap=='null'" class="ma-2" elevation="0"
                       @click="clickCopiar()">
                  Copiar Json Enviado
                </v-btn>
                <input type="hidden" id="copy-code" :value="objAsientoCab.jsonEnviadoSap">
              </v-alert>
              <detalleAsientosComponent :objAsientoCab="objAsientoCab"></detalleAsientosComponent>
            </v-card-item>
            <v-card-actions>
              <v-chip v-if="objAsientoCab.nroasientoSap=='null'" class="ma-2" color="primary" label
                      @click="dialogEnviarASiento = true;">Enviar a ERP
              </v-chip>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>

</template>

<script setup>
import {defineProps, onMounted, ref} from "vue";

const props = defineProps(['reporte'])
import detalleAsientosComponent from '@/modules/erp/asientos/components/AsientoDetComponent.vue'
import {useAsientoStore} from '../store/AsientoStore';
import {useDialogLoadingStore} from "@/modules/transversal/store/DialogLoadingStore"

const dialogLoadingStore = useDialogLoadingStore();

const asientoStore = useAsientoStore();
const objAsientoCab = ref({});
const lstAsientoCab = ref([]);
const dialogEnviarASiento = ref(false);
const fechaDesde = ref(new Date);
const fechaHasta = ref(new Date);

onMounted(async () => {
  lstAsientoCab.value = await asientoStore.obtenerAsientoCab(props.reporte.codReporte)
  objAsientoCab.value = lstAsientoCab.value[0];
})
const clickCopiar = () => {
  let testingCodeToCopy = document.querySelector('#copy-code')
  testingCodeToCopy.setAttribute('type', 'text')    // 不是 hidden 才能複製
  testingCodeToCopy.select()
  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    alert('Testing code was copied ' + msg);
  } catch (err) {
    alert('Oops, unable to copy');
  }
  testingCodeToCopy.setAttribute('type', 'hidden')
  window.getSelection().removeAllRanges()
}
const clickEnviarErp = async () => {

    if (objAsientoCab.value.asientoCabTemId > 0) {
      dialogLoadingStore.setDialogLoading(true, "Enviando asiento");
      let lstDetAsiento = await asientoStore.obtenerAsientosDet(objAsientoCab.value.asientoCabTemId);
      let detalle = [];
      for (let item of lstDetAsiento) {
        detalle.push({
          CodigoRamo: objAsientoCab.value.codRamo,
          CodigoReporte: objAsientoCab.value.codReporte,
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
        asiento: {
          TaxDate: objAsientoCab.value.taxDate,
          DueDate: objAsientoCab.value.dueDate,
          ReferenceDate: objAsientoCab.value.referenceDate,
          Memo: props.reporte.nombreReporte,
          References: "Enviado desde: App Web - Ganaseguros",
          JournalEntryLine: detalle,
        },
        asientoCabTemId: objAsientoCab.value.asientoCabTemId,
        usuarioId: 1000,
        fechaDesde: fechaDesde.value,
        fechaHasta: fechaHasta.value
      }
      let r = await asientoStore.enviarErpAsientos(request);
      objAsientoCab.value.respSapCode = r.codigoMensaje;
      objAsientoCab.value.respSapSms = r.mensaje;
      dialogLoadingStore.setDialogLoading(false);
      if (r.codigoMensaje == "1") {
        objAsientoCab.value.respSapSms = "Nro Asiento: " + r.respuestaErp + ',  Mensaje ERP: ' + r.mensaje;
        alert(r.mensaje)
      } else {
        alert(r.mensaje)
      }
      lstAsientoCab.value = await asientoStore.obtenerAsientoCab(props.reporte.codReporte)
      objAsientoCab.value = lstAsientoCab.value.filter(r => r.asientoCabTemId === Number(objAsientoCab.value.asientoCabTemId))[0];
      console.log(objAsientoCab.value);
    }

}

const clickEnviarErpPrueba = async () => {

  let cantidadEnvio = 1;
  while (cantidadEnvio <= 5000) {
    if (objAsientoCab.value.asientoCabTemId > 0) {
      dialogLoadingStore.setDialogLoading(true, "Enviando : "+cantidadEnvio+" de 5000");
      let lstDetAsiento = await asientoStore.obtenerAsientosDet(objAsientoCab.value.asientoCabTemId);
      let detalle = [];
      for (let item of lstDetAsiento) {
        detalle.push({
          CodigoRamo: objAsientoCab.value.codRamo,
          CodigoReporte: objAsientoCab.value.codReporte,
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
        asiento: {
          TaxDate: objAsientoCab.value.taxDate,
          DueDate: objAsientoCab.value.dueDate,
          ReferenceDate: objAsientoCab.value.referenceDate,
          Memo: props.reporte.nombreReporte,
          References: "Enviado desde: App Web - Ganaseguros",
          JournalEntryLine: detalle,
        },
        asientoCabTemId: objAsientoCab.value.asientoCabTemId,
        usuarioId: 1000,
        fechaDesde: fechaDesde.value,
        fechaHasta: fechaHasta.value
      }
      let r = await asientoStore.enviarErpAsientos(request);
      objAsientoCab.value.respSapCode = r.codigoMensaje;
      objAsientoCab.value.respSapSms = r.mensaje;
      //dialogLoadingStore.setDialogLoading(false);
      if (r.codigoMensaje == "1") {
        objAsientoCab.value.respSapSms = "Nro Asiento: " + r.respuestaErp + ',  Mensaje ERP: ' + r.mensaje;
        //alert(r.mensaje)
      } else {
        //alert(r.mensaje)
      }
      lstAsientoCab.value = await asientoStore.obtenerAsientoCab(props.reporte.codReporte)
      objAsientoCab.value = lstAsientoCab.value.filter(r => r.asientoCabTemId === Number(objAsientoCab.value.asientoCabTemId))[0];
      console.log(objAsientoCab.value);
    }
    cantidadEnvio++;
  }
}
</script>

<style scoped>

</style>
