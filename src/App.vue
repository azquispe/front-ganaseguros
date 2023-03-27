<template>
  <v-app>

    <loginComponent v-if="usuarioStorage==null || usuarioStorage.usuarioId==''"></loginComponent>
    <div v-else >
      <v-card flat>
      <v-app-bar
        color="primary"
        dark
        flat
        density="compact"
      >
        <v-app-bar-nav-icon variant="text" @click.stop="vRail = !vRail"></v-app-bar-nav-icon>
        <v-toolbar-title><img src="./assets/logo_ganaseguros_400.png" height="35" width="200" /></v-toolbar-title>
        <v-spacer></v-spacer>
    <div >
      <v-btn @click="clickCerrarSession()" variant="text" icon="mdi-logout">     </v-btn>
      <v-tooltip
        activator="parent"
        location="bottom"
      >Cerrar Sessión</v-tooltip>
    </div>
      </v-app-bar>
      </v-card>
      <v-main >
        <v-container fluid style="background-color: #F9FAFE; height: 100%;   ">
          <v-row dense>
            <router-view />
          </v-row>
        </v-container>
      </v-main>
      <v-navigation-drawer   v-model="vDrawer" :rail="vRail" permanent @click="vRail = false">
        <v-list-item prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg" nav>
          <template v-slot:append>
            <v-btn variant="text" icon="mdi-chevron-left" @click.stop="vRail = !vRail"></v-btn>
          </template>
          <p>
            <small>{{ usuarioStorage.nombres + ' ' + usuarioStorage.apellidoPaterno + ' ' + usuarioStorage.apellidoMaterno }}</small>
          </p>
          <p>
            <small>{{ usuarioStorage.correoElectronico}}</small>
          </p>
        </v-list-item>
        <v-divider></v-divider>
        <v-list density="compact" nav>
          <div v-for="menu in rolesUsuario" :key="menu.opcionId">
            <v-list-group :value="menu.opcionId">
              <template v-slot:activator="{ props }">
                <v-list-item class="text-caption" v-bind="props" prepend-icon="mdi-account-circle"  active-color="primary"> <span class="text-caption"> {{menu.nombre}}</span></v-list-item>
              </template>
              <v-list-group :value="menu2.opcionId" :key="menu2" v-for="menu2 in menu.menu">
                <template v-slot:activator="{ props }">
                  <v-list-item class="text-caption" v-bind="props" active-color="primary"> <span class="text-caption"> {{menu2.nombre}}</span></v-list-item>
                </template>
                <!--<div  v-for="menu3 in menu2.menu" :key="menu3" style="padding-left: 90px;"  @click="clickGo(menu3.link)"  active-color="primary">{{menu3.nombre}}</div>-->
                <v-list-item  v-for="menu3 in menu2.menu" :key="menu3"   :value="menu3.opcionId" @click="clickGo(menu3.link)" active-color="primary">
                  <span class="text-caption"> {{menu3.nombre}}</span>
                </v-list-item>
              </v-list-group>
            </v-list-group>
          </div>
        </v-list>
      </v-navigation-drawer>
    </div>
  </v-app>
</template>

<script setup>

import {useRouter} from 'vue-router'
import {ref} from 'vue'
import loginComponent from '@/modules/usuario/components/LoginComponent.vue'


const router = useRouter()
const vDrawer = ref(true);
const vRail = ref(true);

const usuarioStorage = JSON.parse(localStorage.getItem("datosUsuario"));
const rolesUsuario = JSON.parse(localStorage.getItem("rolesUsuario"));
const clickCerrarSession = () => {
  localStorage.removeItem("datosUsuario");
  localStorage.removeItem("rolesUsuario");
  location.reload()
}
const clickGo = (enlace) => {
  console.log(enlace);
  router.push({path: enlace});
  //location.reload()
}
</script>
