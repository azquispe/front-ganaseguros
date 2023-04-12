<template>
  <v-dialog
    v-model="dialogLoadingStore.dialogLoading"
    :scrim="true"
    persistent
    width="auto"
  >
    <v-card
      color="primary"
    >
      <v-card-text>
        {{dialogLoadingStore.smsDialog}}
        <v-progress-linear
          indeterminate
          color="white"
          class="mb-0"
        ></v-progress-linear>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup >
import {useDialogLoadingStore} from "@/modules/transversal/store/DialogLoadingStore"
const dialogLoadingStore = useDialogLoadingStore();
</script>

<style scoped>

</style>
