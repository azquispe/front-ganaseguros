<template>
  <v-card elevation="2" class="mx-auto pt-10 pl-2 pr-2" width="100%">
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
        En las cajas de texto ingresando palabras puede realizar los filtros en los asientos enviados<br>
      </v-alert>
      <div class="pt-3">
      </div>
      <asientosEnviadosFiltroComponent></asientosEnviadosFiltroComponent>
    </div>
    <v-card-text>
      <asientosEnviadosDataTableComponent></asientosEnviadosDataTableComponent>
    </v-card-text>
  </v-card>
</template>

<script setup>
import asientosEnviadosFiltroComponent from '../components/AsientosEnviadosFiltroComponent.vue'
import asientosEnviadosDataTableComponent from '../components/AsientosEnviadosDataTableComponent.vue'
</script>

<style scoped>

</style>
