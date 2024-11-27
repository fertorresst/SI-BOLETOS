<template>
  <v-card rounded flat class="ma-0 pa-0">
    <v-card-title class="blueBack ma-0 pa-5 align-center justify-center">
      <v-row class="ma-0 pa-0 align-center justify-center white--text fontDisplay" style="font-size: 20px">
        ACTUALIZAR PERFIL
      </v-row>
    </v-card-title>

    <v-card-text class="ma-0 py-3 px-10">
      <v-form ref="formActualizar" v-model="formActualizar" class="text-center black--text fontDisplay ma-0 pa-0" lazy-validation @submit.prevent="submit">
        <h4 class="fontTitle ma-0 pa-0">
          FOTO DE PERFIL (URL):
        </h4>
        <v-text-field
          v-model="foto"
          class="fontTitle ma-0 pa-0"
          solo
          flat
          dense
          outlined
          rounded
          required
          type="url"
          :rules="requiredRule"
        />

        <h4 class="fontTitle ma-0 pa-0">
          ID DE USUARIO:
        </h4>
        <v-text-field
          v-model="id"
          class="fontTitle ma-0 pa-0"
          solo
          flat
          dense
          outlined
          rounded
          required
          disabled
          type="text"
          :rules="requiredRule"
        />

        <h4 class="fontTitle ma-0 pa-0">
          NOMBRE:
        </h4>
        <v-text-field
          v-model="nombre"
          class="fontTitle"
          solo
          flat
          dense
          outlined
          rounded
          required
          type="text"
          :rules="requiredRule"
        />

        <h4 class="fontTitle ma-0 pa-0">
          APELLIDOS:
        </h4>
        <v-text-field
          v-model="apellidos"
          class="fontTitle"
          solo
          flat
          dense
          outlined
          rounded
          required
          type="text"
          :rules="requiredRule"
        />

        <h4 class="fontTitle ma-0 pa-0">
          CORREO:
        </h4>
        <v-text-field
          v-model="correo"
          class="fontTitle"
          solo
          flat
          dense
          outlined
          rounded
          required
          disabled
          type="email"
          :rules="correoRule"
        />

        <h4 class="fontTitle ma-0 pa-0">
          TELÉFONO:
        </h4>
        <v-text-field
          v-model="telefono"
          v-mask="'(###) ### ####'"
          class="fontTitle"
          solo
          flat
          dense
          outlined
          rounded
          required
          type="tel"
          :rules="requiredRule"
        />

        <h4 class="fontTitle ma-0 pa-0">
          FECHA DE NACIMIENTO:
        </h4>
        <v-text-field
          v-model="fechaNacimiento"
          class="fontTitle"
          solo
          flat
          dense
          outlined
          rounded
          required
          type="date"
          :max="maxDate"
          :rules="requiredRule"
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
          @click="closeDialog"
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
          @click="update()"
        >
          Actualizar
        </v-btn>
      </v-col>
    </v-card-actions>
  </v-card>
</template>

<script>
import moment from 'moment'
import 'moment/locale/es'
import { mask } from 'vue-the-mask'

export default {
  name: 'UiEditProfile',

  directives: {
    mask
  },

  data () {
    return {
      formActualizar: false,
      foto: this.$store.state.user.img,
      id: this.$store.state.user.id,
      nombre: this.$store.state.user.nombre,
      apellidos: this.$store.state.user.apellidos,
      correo: this.$store.state.user.email,
      telefono: this.$store.state.user.telefono,
      maxDate: null,
      fechaNacimiento: this.$store.state.user.cumple,
      requiredRule: [
        v => !!v || 'CAMPO REQUERIDO'
      ],
      passwordRule: [
        v => (v && v.length > 7) || 'LA CONTRASEÑA DEBE DE TENER MÍNIMO 8 CARACTERES'
      ],
      correoRule: [
        v => /.+@ugto\.mx$/.test(v) || 'EMAIL INCORRECTO SOLO CORREO INSTITUCIONAL'
      ],
      dialogProfile: false
    }
  },

  computed: {
    formatearFecha () {
      return this.fechaNacimiento ? moment(this.fechaNacimiento, 'YYYY-MM-DD').format('dddd, DD [de] MMMM [de] YYYY') : ''
    }
  },

  created () {
    this.maxDate = moment().subtract(18, 'years').format('YYYY-MM-DD')
  },

  methods: {
    async update () {
      try {
        const url = '/updateUser'
        const data = {
          id: this.id,
          nombre: this.nombre.toUpperCase(),
          apellidos: this.apellidos.toUpperCase(),
          email: this.correo,
          telefono: this.telefono,
          cumple: this.fechaNacimiento,
          img: this.foto
        }
        this.$axios.defaults.headers.common.Authorization = `Bearer ${this.$store.state.token}`
        await this.$axios.put(url, data)
          .then((response) => {
            if (response.data.success) {
              const user = {
                id: this.id,
                nombre: this.nombre.toUpperCase(),
                apellidos: this.apellidos.toUpperCase(),
                email: this.correo,
                telefono: this.telefono,
                cumple: this.fechaNacimiento,
                password: this.$store.state.user.password,
                img: this.foto
              }

              this.$store.commit('setUser', {})
              this.$store.commit('setUser', user)
              this.closeDialog()
            } else {
              // eslint-disable-next-line no-console
              console.error('Error al actualizar información del usuario:', response.data.message)
            }
          })
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error al enviar solicitud de actualización:', error)
      }
    },

    closeDialog () {
      this.$emit('closeDialog')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
