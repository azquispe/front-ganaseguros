import { defineStore } from 'pinia'
import axios from 'axios';

export const useAsientoStore = defineStore('AsientoStore',{

    state: () => ({
        lstReporte:[],
        dialogCargaAsientoExcel:false
      }),
    getters:{
        getLstReporte(state){
            return state.lstReporte;
        },
      getDialogCargaAsientoExcel(state){
        return state.dialogCargaAsientoExcel;
      },

    },

    actions:{
      setDialogCargaAsientoExcel(dialog){
        this.dialogCargaAsientoExcel = dialog;
      },
      async cargarArchivoAsiento(pFormData,pTipoReporteId,pUsuarioId){

        try{
          const headers = { 'Content-Type': 'multipart/form-data' };
          const r = await axios.post(`http://localhost:7001/api/erp/v1/cargar-archivo-asiento/${pTipoReporteId}/${pUsuarioId}`, pFormData, { headers })
          return r.data;
        }catch (error){
          console.log("error al cargar archivo: "+error)
          return {
            codigoMensaje:"-1",
            mensaje:"error"
          }
        }
      },

        async obtenerReportes(pUsuarioId) {
            try {
                const r = await axios.get(`http://localhost:7001/api/erp/v1/obtener-reportes/${pUsuarioId}`);
                this.lstReporte = r.data.reportes;

            } catch (error) {
              console.log("error al obtener reportes: "+error)
            }
        },

      async obtenerAsientoCab(pReporteId) {
        try {
          const r = await axios.get(`http://localhost:7001/api/erp/v1/obtener-asiento-cab/${pReporteId}`);
          return r.data.ramos;

        } catch (error) {
          console.log("error al obtener asientos Cab: "+error)
          return [];
        }
      },

      //localhost:7001/api/erp/v1/obtener-asientos-det/1120
      async obtenerAsientosDet(pAsientoCabId) {
        try {
          const r = await axios.get(`http://localhost:7001/api/erp/v1/obtener-asientos-det/${pAsientoCabId}`);
          return r.data.asientos;
        } catch (error) {
          console.log("error al obtener asientos Det: "+error)
          return [];
        }
      },

      async enviarErpAsientos(obj,asientoCabTemId){
        try {
          const r = await axios.post(`http://localhost:7001/api/erp/v1/enviar-erp-asientos/${asientoCabTemId}`,obj);
          return r.data;
        }catch (error) {
          return {
            codigoMensaje:"-1",
            mensaje:"error"
          }
        }
      }
    }
})
