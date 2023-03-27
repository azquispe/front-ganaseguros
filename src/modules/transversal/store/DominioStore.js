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
    async obtenerDominioPorDominio(pDominio){
      try{
          const r = await axios.get("http://localhost:7001/api/transversal/v1/findByDominio/"+pDominio);
          //console.log(r.data.dominios);
          return r.data.dominios;

      }catch (e) {
          return [];
      }
    }
  }
})
