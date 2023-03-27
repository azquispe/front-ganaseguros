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
                v-if="objAsientoCab.respSapCode!='null'"
                density="compact"
                color="primary"
                type="info"
                :text="objAsientoCab.respSapSms"
                variant="tonal"
              ></v-alert>

              <detalleAsientosComponent :objAsientoCab="objAsientoCab"></detalleAsientosComponent>


            </v-card-item>
            <v-card-actions>
              <v-chip v-if="objAsientoCab.respSapCode!=1" class="ma-2" color="primary" label @click="clickEnviarErp()" >Enviar a ERP


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

const asientoStore = useAsientoStore();
const objAsientoCab = ref({});
const lstAsientoCab = ref([]);

onMounted(async () => {
  lstAsientoCab.value =  await asientoStore.obtenerAsientoCab(props.reporte.codReporte)
  objAsientoCab.value = lstAsientoCab.value[0];
})

const clickEnviarErp = async () =>{
  if(objAsientoCab.value.asientoCabTemId>0){
    let lstDetAsiento =  await asientoStore.obtenerAsientosDet(objAsientoCab.value.asientoCabTemId);
    let detalle = [];
    let asiento = {};
    for (let item of lstDetAsiento){


      detalle.push({
        CodigoRamo: objAsientoCab.value.codRamo,
        CodigoReporte: objAsientoCab.value.codReporte,
        AccountCode: item.codigoConcepto,
        ShortName: objAsientoCab.value.descripcionConcepto,
        LineMemo: objAsientoCab.value.descripcionCuenta,
        Amount: item.debeHaber=="D"?parseFloat(item.amountDebe):parseFloat(item.amountHaber),
        CostingCode: "",
        CostingCode2: "",
        CostingCode3: ""
      })

      asiento = {
        TaxDate: objAsientoCab.value.taxDate,
        DueDate: objAsientoCab.value.dueDate,
        ReferenceDate: objAsientoCab.value.referenceDate,
        Memo: props.reporte.nombreReporte,
        References: "Enviado desde: App Web - Ganaseguros",
        JournalEntryLine: detalle,
      }


    }
    let r = await asientoStore.enviarErpAsientos(asiento,objAsientoCab.value.asientoCabTemId);
    objAsientoCab.value.respSapCode=r.codigoMensaje; // dede sap retorna 1, eso nomas esta retornando hasta el frontend
    objAsientoCab.value.respSapSms=r.mensaje;
    if(r.codigoMensaje=="1"){
      objAsientoCab.value.respSapSms="Nro Asiento: "+r.respuestaErp+',  Mensaje ERP: '+r.mensaje;
      alert("Envio Exitoso")
    }else{
      alert("Error al envio")
    }

    //objAsientoCab.value =  await asientoStore.obtenerAsientoCab(props.reporte.codReporte).filter(r => r.asientoCabTemId == objAsientoCab.value.asientoCabTemId )
    //objAsientoCab.value = lstAsientoCab.value.filter(r => r.asientoCabTemId == objAsientoCab.value.asientoCabTemId );
  }

}
</script>

<style scoped>

</style>
