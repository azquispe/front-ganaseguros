import {defineStore} from "pinia";
import axios from 'axios';

export const useColumnasReporteStore = defineStore( 'ColumnasReporteStore',{
  state:()=>({
    lstColumnasReporte:[],
    lstColumnasReporteTodos:[],
    objColumnaReporte:{},
    dialogFormColumnasReporte:false,
  }),
  getters:{
    getObjColumnaReporte(state){
      return state.objColumnaReporte;
    },
    getDialogFormColumnasReporte(state){
      return state.dialogFormColumnasReporte;
    },
    getLstColumnasReporte(state){
      return state.lstColumnasReporte;
    },
    getLstColumnasReporteTodos(state){
      return state.lstColumnasReporteTodos;
    }
  },
  actions:{
    setObjColumnaReporte(obj){
      this.objColumnaReporte= obj;
    },
    setDialogFormColumnasReporte(dialog){
      this.dialogFormColumnasReporte= dialog;
    },
    setLstColumnasReporte(lst){
      this.lstColumnasReporte = lst;
    },
    setLstColumnasReporteTodos(lst){
      this.lstColumnasReporteTodos = lst;
    },
    async obtenerColumnasReportesTodos() {
      try{
        const r = await axios.get(`http://192.168.100.22:7001/api/erp/v1/obtener-columnas-reportes`);
        this.lstColumnasReporte = r.data.columnasExcel;
        this.lstColumnasReporteTodos = r.data.columnasExcel;
      }catch (error) {
        console.log("error al cargar archivo: "+error)
        this.lstColumnasReporte = [];
      }
    },
    async actualizarColumnasReportes(obj) {
      try{
        const r = await axios.put(`http://192.168.100.22:7001/api/erp/v1/actualizar-columnas-reportes/${obj.columnaReporteId}`,obj);
        return r.data;
      }catch (error) {
        console.log("error al cargar archivo: "+error)
        this.lstColumnasReporte = [];
      }
    },
    async anularColumnaReporte(columnaReporteId) {
      try{
        const r = await axios.delete(`http://192.168.100.22:7001/api/erp/v1/anular-columna-reporte/${columnaReporteId}`);
        return r.data;
      }catch (error) {
        console.log("error al cargar archivo: "+error)
        this.lstColumnasReporte = [];
      }
    }
  }
})
