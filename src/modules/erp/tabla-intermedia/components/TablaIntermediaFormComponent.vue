<template>
  <!--<v-container>>
    <v-row>

    </v-row>
  </v-container>-->


  <v-card>
    <v-card-title class="pa-0">
      <v-toolbar
        :color=" 'primary' "
        dark
        elevation="0"
        density="compact"
      >
        <v-toolbar-title>
          ACTUALIZAR TABLA INTERMEDIA
        </v-toolbar-title>

        <v-spacer></v-spacer>
        <v-btn
          @click="clickCerrar()"
          icon
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col
          cols="12"
          md="4"
        >


          <v-text-field
            variant="outlined"
            density="compact"
            label="Código Ramo"
            required
            type="number"
            v-model="tablaIntermedia.codRamo"
            hide-details
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          md="8"
        >
          <v-text-field
            v-model="tablaIntermedia.ramo"
            variant="outlined"
            density="compact"
            label="Ramo"
            required
            type="text"
            hide-details
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="tablaIntermedia.codReporte"
            variant="outlined"
            density="compact"
            label="Código Reporte"
            required
            type="number"
            hide-details

          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          md="8"
        >
          <v-text-field
            v-model="tablaIntermedia.nombreReporte"
            variant="outlined"
            density="compact"
            label="Nombre reporte"
            required
            type="text"
            hide-details

          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="tablaIntermedia.tipoMoneda"
            variant="outlined"
            density="compact"
            label="Tipo Moneda"
            required
            type="text"
            hide-details

          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="tablaIntermedia.codigoConcepto"
            variant="outlined"
            density="compact"
            label="Código de Concepto"
            required
            type="number"
            hide-details

          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          md="8"
        >
          <v-text-field
            v-model="tablaIntermedia.descripcionConcepto"
            variant="outlined"
            density="compact"
            label="Descripción Concepto"
            required
            type="text"
            hide-details

          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="tablaIntermedia.codigoCuentaSapPuc"
            variant="outlined"
            density="compact"
            label="Código Cuenta SAP PUC"
            required
            type="text"
            hide-details

          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          md="8"
        >
          <v-text-field
            v-model="tablaIntermedia.descripcionCuenta"
            variant="outlined"
            density="compact"
            label="Descripción Cuenta"
            required
            type="text"
            hide-details
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="tablaIntermedia.debeHaber"
            variant="outlined"
            density="compact"
            label="Debe/Haber"
            required
            type="text"
            hide-details

          ></v-text-field>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-chip  class="ma-2" color="primary" label @click="clickActualizarTablaIntermedia() ">
        Actualizar Tabla Intermedia
      </v-chip>
    </v-card-actions>
  </v-card>

</template>

<script setup>

//import {useTablaIntermediaStore} from "@/modules/erp/tabla-intermedia/store/TablaIntermediaStore";
import {useTablaIntermediaStore} from '../store/TablaIntermediaStore'
import {computed} from "vue";

const tablaIntermediaStore  = useTablaIntermediaStore();


const tablaIntermedia = computed({
  get: () => tablaIntermediaStore.getObjTablaIntermedia,
  set: val => {
    tablaIntermediaStore.setObjTablaIntermedia(val)
  }
})

const clickCerrar = () =>{
  tablaIntermediaStore.setDialogFormTablaIntermedia(false)
  tablaIntermediaStore.getIntermediateTable();
}
const clickActualizarTablaIntermedia = async () =>{


  let r = await  tablaIntermediaStore.actualizarTablaIntermedia(tablaIntermedia.value);
  if(r.codigoMensaje!="1000"){
    alert(r.mensaje);
    return;
  }
  alert(r.mensaje)
  tablaIntermediaStore.setDialogFormTablaIntermedia(false);
  tablaIntermediaStore.getIntermediateTable();

}



</script>

<style scoped>

</style>
