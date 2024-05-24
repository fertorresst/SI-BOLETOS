<template>
  <v-app>
    <v-app-bar
      elevation="0"
      app
      absolute
      dense
      dark
    >
      <v-col cols="1" class="mr-16" />
      <v-col cols="2">
        <v-btn elevation="0" x-small width="1px">
          <v-icon>mdi-facebook</v-icon>
        </v-btn>
        <v-btn elevation="0" x-small width="1px">
          <v-icon>mdi-instagram</v-icon>
        </v-btn>
      </v-col>

      <v-col cols="1" />
      <v-spacer />

      <span class="fontTitle" style="font-size: 12px;">
        <v-icon>mdi-email</v-icon>
        <a href="" style="text-decoration: none; color: white;">contacto@example.com</a>&nbsp;
        <v-icon>mdi-phone</v-icon>
        <a href="" style="text-decoration: none; color: white;">456 XXX XXX</a>&nbsp;
        <v-icon>mdi-whatsapp</v-icon>
        <a href="" style="text-decoration: none; color: white;">477 XXX XXX</a>&nbsp;
      </span>

      <v-col cols="1" class="ml-16" />
    </v-app-bar>

    <v-app-bar
      prominent
      elevation="1"
      class="ma-0 pa-0"
      style="top: 48px; padding: 0 !important"
    >
      <v-col cols="1" class="mr-16" />
      <v-col cols="2">
        <a href="/">
          <v-img
            :src="require('@/assets/logo.svg')"
            class="logoAppBar"
          />
        </a>
      </v-col>

      <v-col cols="1" />

      <v-col cols="4" class="fontTitle vinculosSpan d-flex justify-space-around">
        <a href="" class="vinculosAppBar">
          <v-icon color="black">
            mdi-home
          </v-icon>
          INICIO
        </a>
        <a href="" class="vinculosAppBar">
          <v-icon color="black">
            mdi-calendar
          </v-icon>
          EVENTOS
        </a>
        <a href="" class="vinculosAppBar">
          <v-icon color="black">
            mdi-beach
          </v-icon>
          BENEFICIOS
        </a>
        <a href="" class="vinculosAppBar">
          <v-icon color="black">
            mdi-domain
          </v-icon>
          NOSOTROS
        </a>
        <a href="" class="vinculosAppBar">
          <v-icon color="black">
            mdi-help
          </v-icon>
          AYUDA
        </a>
      </v-col>

      <v-col cols="2" class="botonesAppBar">
        <v-row>
          <v-btn
            rounded
            outlined
            width="158"
            small
            elevation="0"
          >
            <v-icon>
              mdi-account
            </v-icon>
            <span>&nbsp;INICIAR SESIÓN</span>
          </v-btn>
        </v-row>

        <v-row class="py-5">
          <v-btn
            small
            rounded
            width="158"
            elevation="0"
            color="#03c6a6"
          >
            <span>REGISTRASE</span>
          </v-btn>
        </v-row>
      </v-col>

      <v-col cols="1" class="ml-16" />
    </v-app-bar>

    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>

    <v-footer
      dark
      padless
      class="pa-10"
    >
      <v-container
        class="white--text containerFooter"
      >
        <v-col cols="6">
          <v-row>
            <a href="/">
              <v-img
                :src="require('@/assets/logo.svg')"
              />
            </a>
          </v-row>

          <v-row class="my-10 mb-16 align-center justify-start">
            <v-btn icon x-small class="mr-3">
              <v-icon>mdi-facebook</v-icon>
            </v-btn>

            <v-btn icon x-small>
              <v-icon>mdi-instagram</v-icon>
            </v-btn>
          </v-row>

          <v-row class="fontDisplay">
            <span style="font-size: 10px;">Operadora Turística Abejas Pro Max SA de CV</span>
          </v-row>
        </v-col>

        <v-col cols="3">
          <v-row class="fontDisplay text-center vinculosFooter">
            <strong class="fontTitle mb-3">AYUDA</strong>
            <a
              href=""
              class="fontTitle"
              style="font-size: 12px; text-decoration: none; color: white;"
            >
              Nosotros
            </a>
            <a
              href=""
              class="fontTitle"
              style="font-size: 12px; text-decoration: none; color: white;"
            >
              Contacto
            </a>
            <a
              href=""
              class="fontTitle"
              style="font-size: 12px; text-decoration: none; color: white;"
            >
              Iniciar Sesión
            </a>
            <a
              href=""
              class="fontTitle"
              style="font-size: 12px; text-decoration: none; color: white;"
            >
              Regístrate Gratis
            </a>
            <a
              href=""
              class="fontTitle"
              style="font-size: 12px; text-decoration: none; color: white;"
            >
              Beneficios
            </a>
          </v-row>
        </v-col>

        <v-col cols="3">
          <v-row class="fontDisplay text-center vinculosFooter">
            <strong class="fontTitle mb-3">INFORMACION LEGAL</strong>
            <a
              href=""
              class="fontTitle"
              style="font-size: 12px; text-decoration: none; color: white;"
            >
              Preguntas Frecuentes
            </a>
            <a
              href=""
              class="fontTitle"
              style="font-size: 12px; text-decoration: none; color: white;"
            >
              TÉRMINOS Y CONDICIONES
            </a>
            <a
              href=""
              class="fontTitle"
              style="font-size: 12px; text-decoration: none; color: white;"
            >
              AVISO DE PRIVACIDAD
            </a>
          </v-row>
        </v-col>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  }
}
</script>

<style scoped>
.logoAppBar {
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
}

.vinculosAppBar {
  text-decoration: none;
  color: black;
}

.vinculosSpan {
  position: relative;
  margin: 0;
  font-size: 12px;
  top: 50%;
  transform: translate(0, -50%);
  display: flex;
  justify-content: space-around;
}

.botonesAppBar {
  position: relative;
  top: 57%;
  right: -9%;
  transform: translate(0, -50%);
}

.containerFooter {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: flex-start;
}

.vinculosFooter {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: flex-start;
}
</style>
