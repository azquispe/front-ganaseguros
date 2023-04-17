import { defineStore } from 'pinia'
import axios from 'axios';
import {ca} from "vuetify/locale";
export const useTablaIntermediaStore = defineStore('TablaIntermediaStore',{

    state: () => ({
      dialogFormTablaIntermedia:false,
      objTablaIntermedia:{},
      lstTablaIntermedia:[],
      lstTablaIntermediaTodos:[],
      lstReportesTodos:[]

      }),
    getters:{
      getObjTablaIntermedia(state){
        return state.objTablaIntermedia;
      },
      getLstTablaIntermedia(state){
        return state.lstTablaIntermedia;
      },
      getLstTablaIntermediaTodos(state){
        return state.lstTablaIntermediaTodos;
      },
      getDialogFormTablaIntermedia(state){
        return state.dialogFormTablaIntermedia;
      },
      getLstReportesTodos(state){
        return state.lstReportesTodos;
      },
    },
    actions:{
      setObjTablaIntermedia(obj){
        this.objTablaIntermedia = obj;
      },
      setLstTablaIntermedia(lst){
        this.lstTablaIntermedia = lst;
      },
      setDialogFormTablaIntermedia(dialog){
        this.dialogFormTablaIntermedia = dialog;
      },
        // Obtiene tabla intermedia
        async getIntermediateTable() {
            try {
                const r = await axios.get("http://192.168.100.22:7001/api/erp/v1/get-intermediate-table");
                this.lstTablaIntermedia = r.data.tablaIntermedia;
                this.lstTablaIntermediaTodos = r.data.tablaIntermedia;
                return r.data;


            } catch (error) {
              return {
                codigoMensaje:"-1",
                mensaje:"error"
              }
            }
        },
       /*async generateIntermediateTable(){
          try{
            const r = await axios.get("http://192.168.100.22:7001/api/erp/v1/generate-intermediate-table");
            return r.data;
          } catch (error){
            return {
              codigoMensaje:"-1",
              mensaje:"error"
            }
          }
        },*/
      async actualizarTablaIntermedia(obj){
        try{
          console.log("consumiedp servicio")
          const r = await axios.put(`http://localhost:7001/api/erp/v1/actualizar-tabla-intermedia/${obj.tablaIntermediaId}`,obj);
          console.log("ya consumido")
          return r.data;
        }catch (error){
          return {
            codigoMensaje:"-1",
            mensaje:"error"
          }
        }
      },

      async obtenerReportesTodos(){
        try{
          const r = await axios.get(` http://localhost:7001/api/erp/v1/obtener-reportes-todos`);
          this.lstReportesTodos = r.data.reporteTodos;

        }catch (error){
          console.log("Error al obtener Reportes Todos");
          console.log(error);
        }
      }



    }
})
