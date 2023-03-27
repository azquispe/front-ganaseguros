<template>
  <v-table density="compact">
    <thead>
    <tr>
      <th class="text-left">Nro.</th>
      <th class="text-left">DEBE</th>
      <th class="text-left">HABER</th>
      <th class="text-left">Codigo <br> de Concepto</th>
      <!--<th class="text-left">Descripción <br> de Concepto</th>-->
      <th class="text-left">Descripción de Cuenta</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(obj, index) in lstAsientoDet" :key="index">
      <td>{{ index + 1 }}</td>
      <td>
        <div v-if="obj.debeHaber == 'D'">
              <span class="font-weight-thin text-overline small">{{
                  obj.amountDebe.toLocaleString('en', {timeZone: 'UTC', minimumFractionDigits: 2})
                }}</span>
        </div>
      </td>
      <td>
        <div v-if="obj.debeHaber == 'H'">
            <span class="font-weight-thin text-overline small">{{
                obj.amountHaber.toLocaleString('en', {timeZone: 'UTC', minimumFractionDigits: 2})
              }}</span>
        </div>
      </td>
      <td>
        <span class="font-weight-thin text-overline small">{{ obj.codigoConcepto }}</span>
      </td>
      <td><span class="font-weight-thin  small">{{ obj.descripcionCuenta }}</span>
      </td>
    </tr>
    </tbody>
    <tfoot>
    <tr>
      <td>Suma</td>
      <td>${{ sumaDebe }}</td>
      <td>${{ sumaHaber }}</td>
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

</script>

<style scoped>

</style>
