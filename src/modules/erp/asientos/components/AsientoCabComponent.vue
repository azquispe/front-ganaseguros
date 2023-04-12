<template>

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
              <v-btn  :value="obj" v-for="obj in lstAsientoCab" :key="obj">

                <v-icon v-if="obj.nroasientoSap=='null' && obj.jsonEnviadoSap!='null'" icon="mdi-alert" color="red"></v-icon>
               <span class="font-weight-thin "> {{ obj.codRamo +' - '+obj.ramo }}</span>
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
                  Respuesta SAP: {{objAsientoCab.jsonRespuestaSap}}
                </code>
                <!--<code>
                  Json Enviado: {{objAsientoCab.jsonEnviadoSap}}
                </code>-->


                  <v-btn density="compact" v-if="objAsientoCab.nroasientoSap=='null'" class="ma-2" elevation="0" @click="clickCopiar()">
                    Copiar Json Enviado
                  </v-btn>
                  <input type="hidden" id="copy-code" :value="objAsientoCab.jsonEnviadoSap">



              </v-alert>

              <detalleAsientosComponent :objAsientoCab="objAsientoCab" ></detalleAsientosComponent>


            </v-card-item>
            <v-card-actions>
              <v-chip v-if="objAsientoCab.nroasientoSap=='null'" class="ma-2" color="primary" label @click="clickEnviarErp()" >Enviar a ERP


              </v-chip>

            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>

</template>

<script setup>
import {defineProps, onMounted, ref } from "vue";

const props = defineProps(['reporte'])
import detalleAsientosComponent from '@/modules/erp/asientos/components/AsientoDetComponent.vue'
import {useAsientoStore} from '../store/AsientoStore';
import {useDialogLoadingStore} from "@/modules/transversal/store/DialogLoadingStore"
const dialogLoadingStore = useDialogLoadingStore();

const asientoStore = useAsientoStore();
const objAsientoCab = ref({});
const lstAsientoCab = ref([]);

onMounted(async () => {
  lstAsientoCab.value =  await asientoStore.obtenerAsientoCab(props.reporte.codReporte)
  objAsientoCab.value = lstAsientoCab.value[0];
})
const clickCopiar = () =>{
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

  /* unselect the range */
  testingCodeToCopy.setAttribute('type', 'hidden')
  window.getSelection().removeAllRanges()
}
const clickEnviarErp = async () =>{
  if(objAsientoCab.value.asientoCabTemId>0){
    dialogLoadingStore.setDialogLoading(true,"Enviando a ERP...");
    let lstDetAsiento =  await asientoStore.obtenerAsientosDet(objAsientoCab.value.asientoCabTemId);
    let detalle = [];
    let asiento = {};
    for (let item of lstDetAsiento){
      detalle.push({
        CodigoRamo: objAsientoCab.value.codRamo,
        CodigoReporte: objAsientoCab.value.codReporte,
        AccountCode: item.codigoConcepto,
        ShortName: item.descripcionConcepto,
        LineMemo: item.descripcionCuenta,
        Amount: item.debeHaber=="D"?parseFloat(item.amountDebe):parseFloat(item.amountHaber),
        CostingCode: "",
        CostingCode2: "",
        CostingCode3: ""
      })
    }
    asiento = {
      TaxDate: objAsientoCab.value.taxDate,
      DueDate: objAsientoCab.value.dueDate,
      ReferenceDate: objAsientoCab.value.referenceDate,
      Memo: props.reporte.nombreReporte,
      References: "Enviado desde: App Web - Ganaseguros",
      JournalEntryLine: detalle,
    }
    /*console.log("jsonenviado");
    console.log(asiento);*/
    let r = await asientoStore.enviarErpAsientos(asiento,objAsientoCab.value.asientoCabTemId,1000);
    objAsientoCab.value.respSapCode=r.codigoMensaje; // dede sap retorna 1, eso nomas esta retornando hasta el frontend
    objAsientoCab.value.respSapSms=r.mensaje;
    dialogLoadingStore.setDialogLoading(false);
    if(r.codigoMensaje=="1"){
      objAsientoCab.value.respSapSms="Nro Asiento: "+r.respuestaErp+',  Mensaje ERP: '+r.mensaje;
      alert(r.mensaje)
    }else{
      alert(r.mensaje)
    }

    lstAsientoCab.value =  await asientoStore.obtenerAsientoCab(props.reporte.codReporte)
    console.log("udemy========================");
    console.log(lstAsientoCab.value);
    objAsientoCab.value = lstAsientoCab.value.filter(r => r.asientoCabTemId === Number(objAsientoCab.value.asientoCabTemId ))[0];
    console.log(objAsientoCab.value);
    //objAsientoCab.value = lstAsientoCab.value[0];

  }

}
</script>

<style scoped>

</style>
