import { defineStore } from 'pinia'
import axios from 'axios';
export const useUsuarioStore = defineStore('UsuarioStore',{

    state: () => ({
        usuarioCorrecto:false,
        mensajeAutenticacion:"",
        datosUsuario:{},
        rolesUsuario:[]
      }),
    getters:{
        getDatosUsuario(state){
            return state.datosUsuario;
        },
        getRolesUsuario(state){
            return state.rolesUsuario;
        },
        getUsuarioCorrecto(state){
            return state.usuarioCorrecto;
        },
        getMensajeAutenticacion(state){
            return state.mensajeAutenticacion
        }
    },
    actions:{
        async LimpiarDatosUsuario() {
            this.datosUsuario={};
        },
        async Autentication(pUsuario, pContrasenia) {
            try {
                const r = await axios.post("http://localhost:7001/api/usuarios/v1/login",{
                    login:pUsuario,
                    password:pContrasenia
                });
                this.usuarioCorrecto = r.data.codigoMensaje=='1000'?true:false;
                this.mensajeAutenticacion = r.data.mensaje;
                this.datosUsuario = r.data.datosPersona;

            } catch (error) {
                /*alert(error);
                console.log(error);*/
                this.usuarioCorrecto = false;
                this.mensajeAutenticacion = error;
            }
        },
        async ObtenerRolesUsuario(pUsuarioId) {
            try {
                const r = await axios.get("http://localhost:7001/api/transversal/v1/generate-menu/"+pUsuarioId);
                this.rolesUsuario = r.data.opciones;

            } catch (error) {

            }
        }
    }
})
