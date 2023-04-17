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
    </tr>
    </thead>
    <tbody style="font-size: 12px;">
    <tr v-for="(obj, index) in lstAsientoDet" :key="index">
      <td>{{ index + 1 }}</td>
      <td>
        <div v-if="obj.debeHaber == 'D'">

              <span class="font-weight-thin text-overline small" v-if="!obj.amountDebe_Editar" >{{
                  Number(obj.amountDebe).toLocaleString('en', {
                    timeZone: 'UTC', minimumFractionDigits: 2
                  })
                }}</span>

            <input size="10" v-if="props.objAsientoCab.nroasientoSap=='null' && obj.amountDebe_Editar" type="number" v-model=obj.amountDebe  min="0">

              <v-icon v-if="props.objAsientoCab.nroasientoSap=='null' && !obj.amountDebe_Editar " size="x-small" color="teal" icon="mdi-pencil" @click="obj.amountDebe_Editar = true" ></v-icon>
              <v-icon v-if="props.objAsientoCab.nroasientoSap=='null' && obj.amountDebe_Editar" size="x-small" color="pink" icon="mdi-content-save" @click="clickModificarAsiento(obj);  obj.amountDebe_Editar = false" ></v-icon>


        </div>
      </td>
      <td>
        <div v-if="obj.debeHaber == 'H'">
            <span class="font-weight-thin text-overline small" v-if="!obj.amountHaber_Editar">{{
                Number(obj.amountHaber).toLocaleString('en', {timeZone: 'UTC', minimumFractionDigits: 2})
              }}</span>

            <input size="10" v-if="props.objAsientoCab.nroasientoSap=='null' && obj.amountHaber_Editar"  type="number" v-model=obj.amountHaber min="0" >
          <v-icon v-if="props.objAsientoCab.nroasientoSap=='null' && !obj.amountHaber_Editar " size="x-small" color="teal" icon="mdi-pencil" @click="obj.amountHaber_Editar = true" ></v-icon>
          <v-icon v-if="props.objAsientoCab.nroasientoSap=='null' && obj.amountHaber_Editar" size="x-small" color="pink" icon="mdi-content-save" @click="clickModificarAsiento(obj);  obj.amountHaber_Editar = false" ></v-icon>

        </div>
      </td>
      <td>
        <span class="font-weight-thin text-overline small"  v-if="!obj.codigoConcepto_Editar">{{ obj.codigoConcepto }}</span>
        <input size="10" v-if="props.objAsientoCab.nroasientoSap=='null' && obj.codigoConcepto_Editar" type="number" v-model=obj.codigoConcepto min="0">
        <v-icon v-if="props.objAsientoCab.nroasientoSap=='null' && !obj.codigoConcepto_Editar " size="x-small" color="teal" icon="mdi-pencil" @click="obj.codigoConcepto_Editar = true" ></v-icon>
        <v-icon v-if="props.objAsientoCab.nroasientoSap=='null' && obj.codigoConcepto_Editar" size="x-small" color="pink" icon="mdi-content-save" @click="clickModificarAsiento(obj); obj.codigoConcepto_Editar = false" ></v-icon>

      </td>
      <td>
        <span class="font-weight-thin text-overline small">{{ obj.columnaExcel }}</span>
      </td>
      <td><span class="font-weight-thin  small">{{ obj.descripcionCuenta }}</span>
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
    codigoConcepto:obj.codigoConcepto?obj.codigoConcepto:0,
    amountDebe: obj.amountDebe?obj.amountDebe:0,
    amountHaber:obj.amountHaber?obj.amountHaber:0,
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
