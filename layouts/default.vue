<template>
  <v-app class="ma-0 pa-0">
    <v-navigation-drawer
      v-if="isLogged"
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      absolute
      width="20%"
      color="#0A263D"
      style="z-index: 1000; color: white;"
    >
      <v-list>
        <v-list-item>
          <v-list-item-avatar>
            <v-img
              :src="$store.state.user.img"
            />
          </v-list-item-avatar>
          <v-list-item-content class="gray--text">
            <v-list-item-title class="fontTitle" color="black">
              {{ $store.state.user.nombre }} {{ $store.state.user.apellidos }}
            </v-list-item-title>
            <v-list-item-subtitle class="fontTitle" color="black">
              {{ $store.state.user.email }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider />

        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon style="color: black;">
              {{ item.icon }}
            </v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="fontTitle" style="color: black;">
              {{ item.title }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar :clipped-left="clipped" app fixed color="#0A263D">
      <v-row>
        <v-col cols="1" align="center" justify="center">
          <v-app-bar-nav-icon
            v-if="isLogged"
            color="#FFD300"
            @click.stop="drawer = !drawer"
          />
          <v-btn
            v-else
            color="#FFD300"
            icon
            @click="registerDialog=true"
          >
            <v-icon>mdi-account-plus</v-icon>&nbsp;
          </v-btn>
        </v-col>

        <v-col cols="10" align="center" justify="center">
          <v-img
            :src="require('@/assets/logo.svg')"
            contain
            max-height="50px"
            style="cursor: pointer;"
            @click="$router.push('/')"
          />
        </v-col>

        <v-col cols="1" align="center" justify="center">
          <v-btn
            v-if="isLogged"
            elevation="0"
            color="#FFD300"
            icon
            @click="logOut()"
          >
            <v-icon>mdi-logout</v-icon>&nbsp;
          </v-btn>
          <v-btn
            v-else
            elevation="0"
            color="#FFD300"
            icon
            @click="loginDialog=true"
          >
            <v-icon>mdi-login</v-icon>&nbsp;
          </v-btn>
        </v-col>
      </v-row>
    </v-app-bar>

    <v-main class="mb-0 pb-0">
      <Nuxt />
      <ui-alert v-if="showAlert" class="alerta" />
    </v-main>

    <v-dialog v-if="!isLogged" v-model="registerDialog" persistent max-width="400px">
      <v-card rounded flat class="ma-0 pa-0">
        <v-card-title class="blueBack ma-0 pa-5 align-center justify-center">
          <v-row class="ma-0 pa-0 align-center justify-center white--text fontDisplay" style="font-size: 20px">
            REGISTRO
          </v-row>
        </v-card-title>

        <v-card-text class="ma-0 py-3 px-10">
          <v-form
            ref="formRegister"
            v-model="validRegister"
            class="text-center black--text fontDisplay ma-0 pa-0"
            lazy-validation
            @submit.prevent="submit"
          >
            <h5 class="ma-0 pa-0">
              NOMBRE
            </h5>
            <v-text-field
              v-model="nombreRegister"
              type="text"
              solo
              flat
              dense
              outlined
              rounded
              required
              :rules="requiredRule"
              class="ma-0 pa-0"
            />

            <h5 class="ma-0 pa-0">
              APELLIDOS
            </h5>
            <v-text-field
              v-model="apellidosRegister"
              type="text"
              solo
              flat
              dense
              outlined
              rounded
              required
              :rules="requiredRule"
              class="ma-0 pa-0"
            />

            <h5 class="ma-0 pa-0">
              TELEFONO
            </h5>
            <v-text-field
              v-model="phoneRegister"
              type="text"
              solo
              flat
              dense
              outlined
              rounded
              required
              :rules="phoneRule"
              class="ma-0 pa-0"
            />

            <h5 class="ma-0 pa-0">
              FECHA DE NACIMIENTO
            </h5>
            <v-text-field
              v-model="cumpleRegister"
              prepend-inner-icon="mdi-calendar"
              type="date"
              solo
              flat
              dense
              outlined
              rounded
              required
              :rules="requiredRule"
              class="ma-0 pa-0"
            />

            <h5 class="ma-0 pa-0">
              CORREO
            </h5>
            <v-text-field
              v-model="emailRegister"
              type="email"
              solo
              flat
              dense
              outlined
              rounded
              required
              :rules="emailRule"
              class="ma-0 pa-0"
            />

            <h5 class="ma-0 pa-0">
              CONTRASEÑA
            </h5>
            <v-text-field
              v-model="passwordRegister"
              type="password"
              solo
              flat
              dense
              outlined
              rounded
              required
              :rules="passwordRule"
              class="ma-0 pa-0"
            />

            <h5 class="ma-0 pa-0">
              CONFIRMAR CONTRASEÑA
            </h5>
            <v-text-field
              v-model="passwordConfirmRegister"
              type="password"
              solo
              flat
              dense
              outlined
              rounded
              required
              :rules="passwordConfirmRule"
              class="ma-0 pa-0"
            />
          </v-form>
        </v-card-text>

        <v-card-actions class="pa-0 ma-0 px-10 fontDisplay" align="center" justify="center">
          <v-col cols="6" class="ma-0 pa-0 pb-8">
            <v-btn
              class="black--text"
              text
              rounded
              width="100%"
              @click="limpiarTodo"
            >
              CANCELAR
            </v-btn>
          </v-col>

          <v-col cols="6" class="ma-0 pa-0 pb-8">
            <v-btn
              color="#8C6E39"
              class="white--text"
              width="100%"
              rounded
              @click="registrar()"
            >
              REGISTRAR
            </v-btn>
          </v-col>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-if="!isLogged" v-model="loginDialog" persistent max-width="400px">
      <v-card rounded flat class="ma-0 pa-0">
        <v-card-title class="ma-0 pa-0 blueBack">
          <v-row class="ma-0 pa-5 white--text fontTitle align-center justify-center" style="font-size: 25px;">
            LOGIN
          </v-row>
        </v-card-title>

        <v-card-text class="ma-0 pa-10">
          <v-form
            ref="formLogin"
            v-model="validLogin"
            class="text-center black--text fontDisplay ma-0 pa-0"
            lazy-validation
            @submit.prevent="submit"
          >
            <h5 class="ma-0 pa-0">
              CORREO
            </h5>
            <v-text-field
              v-model="emailLogin"
              type="email"
              solo
              flat
              dense
              outlined
              rounded
              required
              :rules="emailRule"
              class="ma-0 pa-0"
            />

            <h5 class="ma-0 pa-0">
              CONTRASEÑA
            </h5>
            <v-text-field
              v-model="passwordLogin"
              type="password"
              solo
              flat
              dense
              outlined
              rounded
              required
              :rules="passwordRule"
              class="ma-0 pa-0"
            />
          </v-form>
        </v-card-text>

        <v-card-actions class="pa-0 ma-0 px-10 fontDisplay" align="center" justify="center">
          <v-col cols="5" class="ma-0 pa-0  mb-5">
            <v-btn
              class="black--text"
              width="100%"
              text
              rounded
              @click="limpiarTodo"
            >
              CANCELAR
            </v-btn>
          </v-col>

          <v-col cols="2" class="ma-0 pa-0" />

          <v-col cols="5" class="ma-0 pa-0  mb-5">
            <v-btn
              color="#8C6E39"
              class="white--text"
              width="100%"
              rounded
              @click="login()"
            >
              LOGIN
            </v-btn>
          </v-col>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
import uiAlert from '@/components/ui-alert.vue'

export default {
  name: 'DefaultLayout',

  components: {
    uiAlert
  },

  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-home',
          title: 'PAGINA PRINCIPAL',
          to: '/'
        },
        {
          icon: 'mdi-account',
          title: 'MI PERFIL',
          to: '/profile'
        },
        {
          icon: 'mdi-ticket',
          title: 'MIS TICKETS',
          to: '/tickets'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'COMPRA TU BOLETO',

      // VARIABLES PARA USUARIO
      isLogged: false,
      user: {},
      nombre: '',
      img: '',
      token: '',

      // VARIABLES DE REGISTER
      registerDialog: false,
      validRegister: false,
      nombreRegister: '',
      apellidosRegister: '',
      phoneRegister: '',
      cumpleRegister: '',
      emailRegister: '',
      passwordRegister: '',
      passwordConfirmRegister: '',
      imgRegister: '',

      // VARIABLES LOGIN
      loginDialog: false,
      validLogin: false,
      emailLogin: '',
      passwordLogin: '',

      // RULES TEXT FIELDS
      requiredRule: [
        v => !!v || 'CAMPO REQUERIDO'
      ],
      passwordRule: [
        v => !!v || 'LA CONTRASEÑA ES REQUERIDA',
        v => (v && v.length > 5) || 'LA CONTRASEÑA DEBE DE TENER MINIMO 6 CARACTERES'
      ],
      passwordConfirmRule: [
        v => !!v || 'LA CONFIRMACIÓN ES REQUERIDA',
        v => v === this.passwordRegister || 'LAS CONTRASEÑAS NO COINCIDEN'
      ],
      emailRule: [
        v => !!v || 'EL CORREO ES REQUERIDO',
        v => /.+@.+\..+/.test(v) || 'EL CORREO DEBE SER VALIDO'
      ],
      phoneRule: [
        v => !!v || 'EL TELÉFONO ES REQUERIDO',
        v => /^\d{10}$/.test(v) || 'EL TELÉFONO DEBE DE TENER 10 CARACTERES'
      ]
    }
  },

  computed: {
    ...mapState({
      showAlert: state => state.showAlert
      // token: state => state.token
    })
  },
  watch: {
    showAlert () {}
  },

  mounted () {
  },

  methods: {
    obtenerDatosUsuarios () {
      this.user = this.$store.state.user
      this.token = this.$store.state.token
    },

    mostrarAlerta (color, type, message) {
      this.$store.commit('modifyAlert', true)
      this.$store.commit('modifyColor', `${color} lighten-2`)
      this.$store.commit('modifyIcon', color === 'green' ? 'mdi-check-circle' : 'mdi-close-circle')
      this.$store.commit('modifyType', type)
      this.$store.commit('modifyText', message)
      setTimeout(() => {
        this.$store.commit('modifyAlert', false)
      }, 3000)
    },

    limpiarTodo () {
      // FORMULARIOS
      const formularioRegister = this.$refs.formRegister
      if (formularioRegister) {
        formularioRegister.reset()
        formularioRegister.resetValidation()
      }

      const formularioLogin = this.$refs.formLogin
      if (formularioLogin) {
        formularioLogin.reset()
        formularioLogin.resetValidation()
      }

      // DIÁLOGOS
      this.registerDialog = false
      this.loginDialog = false
    },

    registrar () {
      this.validRegister = this.$refs.formRegister.validate()
      if (this.validRegister) {
        const options = {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        }
        const data = {
          id: Date.now().toLocaleString('en-US', options).replace(/[/ ,]/g, ''),
          nombre: this.nombreRegister.toUpperCase(),
          apellidos: this.apellidosRegister.toUpperCase(),
          telefono: this.phoneRegister,
          cumple: this.cumpleRegister,
          email: this.emailRegister,
          password: this.passwordRegister,
          img: this.imgRegister
        }
        const url = '/register'
        this.$axios.post(url, data)
          .then((res) => {
            // eslint-disable-next-line no-console
            console.log('RES => ', res.data)
            if (res.data.success) {
              this.mostrarAlerta('green', 'success', res.data.message)
              this.limpiarTodo()
            } else {
              this.mostrarAlerta('red', 'error', res.data.message)
            }
          })
          .catch((error) => {
            if (error.response && error.response.status === 409) {
              // Mostrar alerta de error por duplicidad de email
              this.mostrarAlerta('red', 'error', 'EL EMAIL YA ESTA REGISTRADO')
            } else {
              // Otro tipo de error, mostrar alerta genérica
              // eslint-disable-next-line no-console
              console.error('ERROR => ', error)
              this.mostrarAlerta('red', 'error', 'Ha ocurrido un error')
            }
          })
      }
    },

    async login () {
      this.validLogin = this.$refs.formLogin.validate()
      if (this.validLogin) {
        const data = {
          email: this.emailLogin,
          password: this.passwordLogin
        }
        await this.$auth.loginWith('local', { data })
          .then((res) => {
            if (res.data.success) {
              this.$store.commit('setUser', res.data.user)
              this.$store.commit('setToken', res.data.token)
              this.obtenerDatosUsuarios()
              this.isLogged = true
              this.mostrarAlerta('green', 'success', res.data.message)
              this.limpiarTodo()
            } else {
              this.mostrarAlerta('red', 'error', res.data.message)
            }
          })
          .catch((error) => {
            if (error.response && error.response.status === 401) {
              this.mostrarAlerta('red', 'error', 'CREDENCIALES INVALIDAS')
            } else {
              // eslint-disable-next-line no-console
              console.error('ERROR => ', error)
              this.mostrarAlerta('red', 'error', 'Ha ocurrido un error')
            }
          })
      }
    },

    logOut () {
      this.$store.commit('setUser', {})
      this.$store.commit('setToken', null)
      this.$auth.logout()
      this.isLogged = false
      this.mostrarAlerta('green', 'success', 'SESIÓN CERRADA CORRECTAMENTE')
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.alerta {
  position: fixed;
  top: 3.5%;
  left: 50%;
  z-index: 1000;
  transform: translate(-50%, -50%);
}
</style>
