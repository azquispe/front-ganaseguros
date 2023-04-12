import { defineStore } from 'pinia'
import axios from 'axios';

export const useAsientoStore = defineStore('AsientoStore',{

    state: () => ({
        lstReporte:[],
        dialogCargaAsientoExcel:false,
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
        this.tipoReporteId = pTipoReporteId;
        try{
          const headers = { 'Content-Type': 'multipart/form-data' };
          const r = await axios.post(`http://192.168.100.22:7001/api/erp/v1/cargar-archivo-asiento/${pTipoReporteId}/${pUsuarioId}`, pFormData, { headers })
          return r.data;
        }catch (error){
          console.log("error al cargar archivo: "+error)
          return {
            codigoMensaje:"-1",
            mensaje:"error"
          }
        }
      },

        async obtenerReportes(pUsuarioId,pTipoReporteId) {
            try {
                const r = await axios.get(`http://192.168.100.22:7001/api/erp/v1/obtener-reportes/${pUsuarioId}/${pTipoReporteId}`);
                this.lstReporte = r.data.reportes;

            } catch (error) {
              console.log("error al obtener reportes: "+error)
            }
        },

      async obtenerAsientoCab(pReporteId) {
        try {
          const r = await axios.get(`http://192.168.100.22:7001/api/erp/v1/obtener-asiento-cab/${pReporteId}`);
          return r.data.ramos;

        } catch (error) {
          console.log("error al obtener asientos Cab: "+error)
          return [];
        }
      },

      //localhost:7001/api/erp/v1/obtener-asientos-det/1120
      async obtenerAsientosDet(pAsientoCabId) {
        try {
          const r = await axios.get(`http://192.168.100.22:7001/api/erp/v1/obtener-asientos-det/${pAsientoCabId}`);
          let lst = r.data.asientos;

          lst.forEach((element) => {
            element.editar = false;
          });

          return lst;
        } catch (error) {
          console.log("error al obtener asientos Det: "+error)
          return [];
        }
      },

      async enviarErpAsientos(obj,asientoCabTemId,pUsuarioId){
        try {
          const r = await axios.post(`http://192.168.100.22:7001/api/erp/v1/enviar-erp-asientos/${asientoCabTemId}/${pUsuarioId}`,obj);
          return r.data;
        }catch (error) {
          return {
            codigoMensaje:"-1",
            mensaje:"error"
          }
        }
      },
      async enviarErpAsientosTodos(pUsuarioId,pTipoReporteId){
        try {
          const r = await axios.post(`http://192.168.100.22:7001/api/erp/v1/enviar-erp-asientos-todos/${pUsuarioId}/${pTipoReporteId}`);
          return r.data;
        }catch (error) {
          return {
            codigoMensaje:"-1",
            mensaje:"error"
          }
        }
      },
      async obtenerAsientosEnviadosTodos(){
        try {
          const r = await axios.get(`http://192.168.100.22:7001/api/erp/v1/obtener-asientos-enviados-todos`);
          return r.data;
        }catch (error) {
          return {
            codigoMensaje:"-1",
            mensaje:"error"
          }
        }
      },
      async modificarAsientoDetalle(obj){
        try {
          const r = await axios.post(`http://192.168.100.22:7001/api/erp/v1/modificar-asiento-detalle/${obj.asientoDetTemId}`, obj);
          return r.data;
        }catch (error) {
          return {
            codigoMensaje:"-1",
            mensaje:"error"
          }
        }
      },
      async verificarAsientosPendientesPorEnviar(){
        let asientosPendientes = 0;
        for (const reporte of this.lstReporte) {
          let lstCab =  await this.obtenerAsientoCab(reporte.codReporte)
          asientosPendientes =  asientosPendientes + lstCab.filter(r => r.nroasientoSap =='null').length;
        }
        return asientosPendientes;
      }
    }
})
