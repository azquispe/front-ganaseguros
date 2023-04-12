import {defineStore} from "pinia";

export const useDialogLoadingStore = defineStore("DialogLoadingStore", {
  state: () => ({
    dialogLoading: false,
    smsDialog:'Procesando...'
  }),
  getters: {
  },
  actions: {
    setDialogLoading(loading,smsLoading="Procesando...") {
      this.dialogLoading=loading;
      this.smsDialog= smsLoading;
    }
  }
})
