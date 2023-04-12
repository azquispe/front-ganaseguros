<template>

  <v-data-table
    v-model:items-per-page="itemsPerPage"
    :headers="headersDataTableAsientoEnviado"
    :items="lstAsientosEnviados.asientosEnviados"
    item-value="asientoEnviadoId"
    class="elevation-1"
    density="compact"
  >
    <template v-slot:column.codReporte="{ column }">
      <tr class="text-caption">{{ column.title.toUpperCase() }}</tr>
    </template>
    <template v-slot:column.codRamo="{ column }">
      <tr class="text-caption">{{ column.title.toUpperCase() }}</tr>
    </template>
    <template v-slot:column.nroAsiento="{ column }">
      <tr class="text-caption">{{ column.title.toUpperCase() }}</tr>
    </template>
    <template v-slot:column.usuario="{ column }">
      <tr class="text-caption">{{ column.title.toUpperCase() }}</tr>
    </template>
    <template v-slot:column.fechaEnviado="{ column }">
      <tr class="text-caption">{{ column.title.toUpperCase() }}</tr>
    </template>
    <template v-slot:column.jsonEnviado="{ column }">
      <tr class="text-caption">{{ column.title.toUpperCase() }}</tr>
    </template>
    <template v-slot:column.jsonRecibido="{ column }">
      <tr class="text-caption">{{ column.title.toUpperCase() }}</tr>
    </template>
    <template v-slot:column.estadoAsiento="{ column }">
      <tr class="text-caption">{{ column.title.toUpperCase() }}</tr>
    </template>
    <template v-slot:column.tipoReporte="{ column }">
      <tr class="text-caption">{{ column.title.toUpperCase() }}</tr>
    </template>

    <template v-slot:column.nombreArchivo="{ column }">
      <tr class="text-caption">{{ column.title.toUpperCase() }}</tr>
    </template>



    <template v-slot:item.codReporte="{ item }">
      <tr class="text-caption">{{ item.raw.codReporte }}</tr>
    </template>
    <template v-slot:item.codRamo="{ item }">
      <tr class="text-caption">{{ item.raw.codRamo }}</tr>
    </template>

    <template v-slot:item.usuario="{ item }">
      <tr class="text-caption">{{ item.raw.usuario }}</tr>
    </template>
    <template v-slot:item.fechaEnviado="{ item }">
      <tr class="text-caption">{{ convertToDDMMYYYY( item.raw.fechaEnviado )}}</tr>
    </template>
    <template v-slot:item.jsonEnviado="{ item }">
      <!--<v-btn density="compact" class="ma-2" elevation="0" @click="clickCopiarJsonEnviado()">
        Copiar Json Enviado
      </v-btn>-->
      <tr class="text-caption">
        <v-row>
          <v-col></v-col>
          <v-col >
            <v-icon  size="small" color="black" icon="mdi-content-copy" class="pr-3" @click="clickCopiarJsonEnviado()" ></v-icon>
            <v-tooltip
              activator="parent"
              location="bottom"
            >Copiar JSON enviado</v-tooltip>
          </v-col>
        </v-row>


        <input type="hidden" id="copy-code" :value="item.raw.jsonEnviado">
      </tr>

      <!--<tr class="text-caption">{{ item.raw.jsonEnviado }}</tr>-->
    </template>
    <template v-slot:item.nroAsiento="{ item }">
      <tr class="text-caption">
        <v-chip
          v-if="item.raw.nroAsiento"
          density="comfortable"
          class="ma-2"
          color="green"
          text-color="white"
        >
          {{item.raw.nroAsiento}}
        </v-chip>
      </tr>
    </template>
    <!--<template v-slot:item.jsonRecibido="{ item }">
      <tr class="text-caption">{{ item.raw.jsonRecibido }}</tr>
    </template>-->
    <template v-slot:item.estadoAsiento="{ item }">
      <tr class="text-caption">
        <v-row v-if="item.raw.estadoAsientoId===1040">
          <v-col>

          </v-col>
          <v-col >
            <v-icon  size="small"  icon="mdi-checkbox-marked-circle" color="green" ></v-icon>

          </v-col>

        </v-row>

        <div v-else>
          <v-row>
            <v-col >
              <v-icon  size="small" color="red" icon="mdi-cancel"  ></v-icon>
              <v-tooltip
                activator="parent"
                location="bottom"
              >No se pudo enaviar a ERP</v-tooltip>
            </v-col>
            <v-col>
              <v-icon  size="small" color="black" icon="mdi-content-copy"  ></v-icon>
              <v-tooltip
                activator="parent"
                location="bottom"
              >Copiar JSON recibido de ERP</v-tooltip>
            </v-col>
            <v-col>
              <v-icon  size="small" color="black" icon="mdi-eye-outline" ></v-icon>
              <v-tooltip
                activator="parent"
                location="bottom"
              >Ver JSON recibido de ERP</v-tooltip>
            </v-col>
          </v-row>






        </div>

      </tr>
    </template>
    <template v-slot:item.tipoReporte="{ item }">
      <tr class="text-caption">{{ item.raw.tipoReporte }}</tr>
    </template>
    <template v-slot:item.nombreArchivo="{ item }">
      <tr class="text-caption">{{ item.raw.nombreArchivo }}</tr>
    </template>


  </v-data-table>
</template>

<script setup>
import { convertToDDMMYYYY } from '@/composables/fechasComposable.js'

import {useAsientoStore} from '../store/AsientoStore';
const asientoStore = useAsientoStore();
import {ref,onMounted } from "vue";
const headersDataTableAsientoEnviado = ref([
  { title: 'Código Reporte', key: 'codReporte' },
  { title: 'Código Ramo',  key: 'codRamo' },

  { title: 'Usuario',  key: 'usuario' },
  { title: 'Fecha Enviado',  key: 'fechaEnviado' },
  { title: 'Json Enviado',  key: 'jsonEnviado' },
  { title: 'Nro Asiento',  key: 'nroAsiento' },
  //{ title: 'Json Recibido',  key: 'jsonRecibido' },
  { title: 'Estado',  key: 'estadoAsiento' },
  { title: 'Tipo de Reporte',  key: 'tipoReporte' },
  { title: 'Nombre Archivo',  key: 'nombreArchivo' },


]);

const itemsPerPage = ref(10);
const lstAsientosEnviados = ref([]);
onMounted(async ()=>{
  lstAsientosEnviados.value = await asientoStore.obtenerAsientosEnviadosTodos();
})
const clickCopiarJsonEnviado = () =>{
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
</script>

<style scoped>

</style>
