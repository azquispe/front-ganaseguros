<template>
    <div class="d-flex align-center justify-center" style="height: 70vh">
        <v-sheet width="500" class="mx-auto">
            <v-card class="mx-auto" width="400" prepend-icon="mdi-security" variant="outlined" elevation="0">
                <template v-slot:title>
                    Autenticación
                </template>
                <v-card-text>
                    <v-form @submit.prevent="clickAutentication" >
                        <v-text-field v-model="vUsuario" class="mb-2" clearable label="Usuario"
                            variant="outlined"></v-text-field>
                        <v-text-field v-model="vContrasena" clearable label="Contraseña" placeholder="Enter your password"
                            variant="outlined"></v-text-field>
                        <br>
                        <v-btn :loading="vLoading" block color="#388E3C" size="large" type="submit" variant="elevated">
                            INGRESAR
                        </v-btn>
                        <br>
                        <v-alert v-if="!usuarioStore.getUsuarioCorrecto && usuarioStore.getMensajeAutenticacion != ''"
                            color="red" variant="outlined" closable title="Mensaje"
                            :text="usuarioStore.getMensajeAutenticacion"></v-alert>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-sheet>
    </div>
</template>
<script  setup>
import { ref } from 'vue'
import { useUsuarioStore } from '../store/UsuarioStore';
const usuarioStore = useUsuarioStore();

const vUsuario = ref("AQUISPE");
const vContrasena = ref("12345");
const vLoading = ref(false);


const clickAutentication = async () => {
    console.log("autenticando")
    await usuarioStore.Autentication(vUsuario.value, vContrasena.value);
    if (usuarioStore.getUsuarioCorrecto) {
      localStorage.setItem("datosUsuario",JSON.stringify(usuarioStore.getDatosUsuario))
      await usuarioStore.ObtenerRolesUsuario(usuarioStore.getDatosUsuario.usuarioId);
      localStorage.setItem("rolesUsuario",JSON.stringify(usuarioStore.getRolesUsuario))
      location.reload()

    } else {
        console.log("incorrecto");
    }
}
</script>
