import { defineStore } from 'pinia'
import axios from 'axios';

export const useAsientoStore = defineStore('AsientoStore',{

    state: () => ({
        lstReporte:[],
        dialogCargaAsientoExcel:false,
        lstAsientosEnviados:[],
        lstAsientosEnviadosTodos:[],
        tipoReporteId:0,
      }),
    getters:{
        getTipoReporteId(state){
          return state.tipoReporteId;
        },
        getLstReporte(state){
            return state.lstReporte;
        },
        getLstAsientosEnviados(state){
          return state.lstAsientosEnviados;
        },
        getLstAsientosEnviadosTodos(state){
          return state.lstAsientosEnviadosTodos;
        },
        getDialogCargaAsientoExcel(state){
          return state.dialogCargaAsientoExcel;
        },
    },

    actions:{
      setDialogCargaAsientoExcel(dialog){
        this.dialogCargaAsientoExcel = dialog;
      },
      setLstAsientosEnviados(lst){
        this.lstAsientosEnviados= lst;
      },
      setLstAsientosEnviadosTodos(lst){
        this.lstAsientosEnviadosTodos= lst;
      },
      setTipoReporteId(pTipoReporteId){
        this.tipoReporteId=pTipoReporteId;
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
                return r.data.reportes;

            } catch (error) {
              alert("error al obtener reportes, mensaje técnico: "+error);
              console.log("error al obtener reportes: "+error)
              return [];
            }
        },

      async obtenerAsientoCab(pReporteId) {
        try {
          const r = await axios.get(`http://192.168.100.22:7001/api/erp/v1/obtener-asiento-cab/${pReporteId}`);
          return r.data.ramos;

        } catch (error) {
          alert("error al obtener asientos, mensaje técnico: "+error);
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
            element.amountDebe_Editar = false;
            element.amountHaber_Editar = false;
            element.codigoConcepto_Editar = false;
          });

          return lst;
        } catch (error) {
          console.log("error al obtener asientos Det: "+error)
          alert("error al obtener asientos, mensaje técnico: "+error);
          return [];
        }
      },

      async enviarErpAsientos(obj){
        try {
          const r = await axios.post(`http://192.168.100.22:7001/api/erp/v1/enviar-erp-asientos`,obj);
          if(r.data.codigoMensaje!="1" ){
            alert("codigo: "+r.data.codigoMensaje+" mensaje:"+r.data.mensaje);
          }
          return r.data;
        }catch (error) {
          console.log("error exceptiocn")
          alert("error al enviar asientos, mensaje técnico: "+error);
          return {
            codigoMensaje:"-1",
            mensaje:error
          }
        }
      },

      /*async enviarErpAsientosTodos(pUsuarioId,pTipoReporteId){
        try {
          const r = await axios.post(`http://192.168.100.22:7001/api/erp/v1/enviar-erp-asientos-todos/${pUsuarioId}/${pTipoReporteId}`);
          return r.data;
        }catch (error) {
          return {
            codigoMensaje:"-1",
            mensaje:"error"
          }
        }
      },*/
      async obtenerAsientosEnviadosTodos(){
        try {
          const r = await axios.get(`http://192.168.100.22:7001/api/erp/v1/obtener-asientos-enviados-todos`);
          this.lstAsientosEnviadosTodos =  r.data.asientosEnviados;
          this.lstAsientosEnviados =  r.data.asientosEnviados;
          return r.data;
        }catch (error) {
          alert("error al obtener reporte de asientos, mensaje técnico: "+error);
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
          alert("error al modificar asiento, mensaje técnico: "+error);
          return {
            codigoMensaje:"-1",
            mensaje:"error"
          }
        }
      },
      async verificarAsientosPendientesPorEnviar(){
        let asientosPendientes = 0;
        if(this.lstReporte){
          for (const reporte of this.lstReporte) {
            let lstCab =  await this.obtenerAsientoCab(reporte.codReporte)
            asientosPendientes =  asientosPendientes + lstCab.filter(r => r.nroasientoSap =='null').length;
          }
          return asientosPendientes;
        }else{
          return [];
        }
      },
      async obtenerCantidadAsientos(pUsuarioId,pTipoReporteId){
        try {
          const r = await axios.get(`http://192.168.100.22:7001/api/erp/v1/obtener-cantidad-asientos/${pUsuarioId}/${pTipoReporteId}`);
          return r.data;
        }catch (error) {
          alert("error al obtener cantidad de asientos: "+error);
          return {
            codigoMensaje:"-1",
            mensaje:"error"
          }
        }
      }

    }
})
