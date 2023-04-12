import {defineStore} from "pinia";
import axios from 'axios';

export const useColumnasReporteStore = defineStore( 'ColumnasReporteStore',{
  state:()=>({
    lstColumnasReporte:[],
  }),
  getters:{
    getLstColumnasReporte(state){
      return state.lstColumnasReporte;
    }
  },
  actions:{
    async obtenerColumnasReportesTodos() {
      try{
        const r = await axios.get(`http://192.168.100.22:7001/api/erp/v1/obtener-columnas-reportes`);
        this.lstColumnasReporte = r.data.columnasExcel;

      }catch (error) {
        console.log("error al cargar archivo: "+error)
        this.lstColumnasReporte = [];
      }
    }
  }
})
