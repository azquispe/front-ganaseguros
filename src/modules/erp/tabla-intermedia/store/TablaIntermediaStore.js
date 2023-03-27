import { defineStore } from 'pinia'
import axios from 'axios';
export const useTablaIntermediaStore = defineStore('TablaIntermediaStore',{

    state: () => ({

      }),
    getters:{

    },
    actions:{
        // Obtiene tabla intermedia
        async getIntermediateTable() {
            try {
                const r = await axios.get("http://localhost:7001/api/erp/v1/get-intermediate-table");
                return r.data;

            } catch (error) {
              return {
                codigoMensaje:"-1",
                mensaje:"error"
              }
            }
        },
       async generateIntermediateTable(){
          try{
            const r = await axios.get("http://localhost:7001/api/erp/v1/generate-intermediate-table");
            return r.data;
          } catch (error){
            return {
              codigoMensaje:"-1",
              mensaje:"error"
            }
          }
        },

    }
})
