import {defineStore} from 'pinia'
import axios from 'axios'

export const useDominioStore  = defineStore("DominioStore",{
  state:()=>({
    //lstDominio:[]
  }),
  getters:{
    /*getLstDominio(state){
      return state.lstDominio
    }*/
  },
  actions:{
    async uploadIntermediateTable(formData){
      try{
        const r = await axios.post("http://localhost:7001/api/erp/v1/upload-file", formData, { 'Content-Type': 'multipart/form-data' });
        return r.data;
      }catch (error){
        return {
          codigoMensaje:"-1",
          mensaje:"error"
        }
      }
    }
  }
})




