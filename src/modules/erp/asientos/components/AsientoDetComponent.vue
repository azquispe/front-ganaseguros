<template>
  <v-table density="compact">
    <thead>
    <tr>
      <th class="text-left">Nro.</th>
      <th class="text-left">DEBE</th>
      <th class="text-left">HABER</th>
      <th class="text-left">Codigo <br> de Concepto</th>
      <th class="text-left">Columna <br> en Excel</th>
      <th class="text-left">Descripción de Cuenta</th>
      <th class="text-left">Acción</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(obj, index) in lstAsientoDet" :key="index">
      <td>{{ index + 1 }}</td>
      <td>
        <div v-if="obj.debeHaber == 'D'">

              <span class="font-weight-thin text-overline small" v-if="!obj.editar" >{{
                  Number(obj.amountDebe).toLocaleString('en', {
                    timeZone: 'UTC', minimumFractionDigits: 2
                  })
                }}</span>

            <input size="10" v-if="props.objAsientoCab.nroasientoSap=='null' && obj.editar" type="number" v-model=obj.amountDebe  >


        </div>
      </td>
      <td>
        <div v-if="obj.debeHaber == 'H'">
            <span class="font-weight-thin text-overline small" v-if="!obj.editar">{{
                Number(obj.amountHaber).toLocaleString('en', {timeZone: 'UTC', minimumFractionDigits: 2})
              }}</span>

            <input size="10" v-if="props.objAsientoCab.nroasientoSap=='null' && obj.editar"  type="number" v-model=obj.amountHaber  >


        </div>
      </td>
      <td>
        <span class="font-weight-thin text-overline small"  v-if="!obj.editar">{{ obj.codigoConcepto }}</span>
        <input size="10" v-if="props.objAsientoCab.nroasientoSap=='null' && obj.editar" type="number" v-model=obj.codigoConcepto  >
      </td>
      <td>
        <span class="font-weight-thin text-overline small">{{ obj.columnaExcel }}</span>
      </td>
      <td><span class="font-weight-thin  small">{{ obj.descripcionCuenta }}</span>
      </td>
      <td>
        <v-icon v-if="props.objAsientoCab.nroasientoSap=='null' && !obj.editar" size="x-small" color="teal" icon="mdi-pencil" @click="obj.editar = true" ></v-icon>
        <v-icon v-if="props.objAsientoCab.nroasientoSap=='null' && obj.editar" size="x-small" color="teal" icon="mdi-check" @click="obj.editar = false" ></v-icon>
      </td>
    </tr>
    </tbody>
    <tfoot>
    <tr>
      <td>Suma</td>
      <td>${{ Number(sumaDebe).toLocaleString('en', {
        timeZone: 'UTC', minimumFractionDigits: 2
      }) }}</td>
      <td>${{ Number(sumaHaber).toLocaleString('en', {
        timeZone: 'UTC', minimumFractionDigits: 2
      }) }}</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    </tfoot>
  </v-table>

</template>

<script setup>
import {defineProps, ref, watch, computed} from "vue";

const props = defineProps(['objAsientoCab'])

import {useAsientoStore} from '../store/AsientoStore';
import {useDialogLoadingStore} from "@/modules/transversal/store/DialogLoadingStore"
const dialogLoadingStore = useDialogLoadingStore();


const asientoStore = useAsientoStore();
const lstAsientoDet = ref([]);


watch(() => props.objAsientoCab.asientoCabTemId, async (nuevoAsientoCabId) => {
  console.log("================");
  console.log(nuevoAsientoCabId);
  lstAsientoDet.value = await asientoStore.obtenerAsientosDet(nuevoAsientoCabId)
});
const sumaDebe = computed(() => {
  let sumaDebe = 0;
  lstAsientoDet.value.filter(obj => obj.debeHaber == "D").forEach(item => {
    sumaDebe += Number(item.amountDebe);
  });
  return sumaDebe;
})
const sumaHaber = computed(() => {
  let sumaDebe = 0;
  lstAsientoDet.value.filter(obj => obj.debeHaber == "H").forEach(item => {
    sumaDebe += Number(item.amountHaber);
  });
  return sumaDebe;
})
const clickModificarAsiento = async (obj) =>{
  dialogLoadingStore.setDialogLoading(true,"Modificando Monto");
  let r = await asientoStore.modificarAsientoDetalle({
    asientoDetTemId:obj.asientoDetTemId,
    codigoConcepto:obj.codigoConcepto,
    amountDebe:obj.amountDebe,
    amountHaber:obj.amountHaber,
    debeHaber:obj.debeHaber
  })
  dialogLoadingStore.setDialogLoading(false);
  if(r.codigoMensaje=="1000"){
    alert("Actualización de monto Exitoso")
  }else{
    alert("Error al actualizar monto")
  }
  lstAsientoDet.value = await asientoStore.obtenerAsientosDet(props.objAsientoCab.asientoCabTemId);

}

</script>

<style scoped>

</style>
