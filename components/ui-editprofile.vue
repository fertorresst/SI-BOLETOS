<template>
  <v-card class="pa-10">
    <v-card-title class="mb-10 text-center d-flex justify-center">
      <strong class="text-center fontTitle" style="font-size: 30px;">ACTUALIZAR PERFIL</strong>
    </v-card-title>

    <v-card-text>
      <v-form
        ref="formActualizar"
        v-model="formActualizar"
        lazy-validation
        @submit.prevent="submit"
      >
        <h3 class="fontTitle">
          FOTO DE PERFIL (URL):
        </h3>
        <v-text-field
          v-model="foto"
          class="fontTitle"
          dense
          solo
          outlined
          flat
          rounded
          required
          type="url"
          :rules="requiredRule"
        />
        <h3 class="fontTitle">
          ID DE USUARIO:
        </h3>
        <v-text-field
          v-model="id"
          class="fontTitle"
          dense
          solo
          outlined
          flat
          rounded
          required
          type="url"
          :rules="requiredRule"
        />
        <h3 class="fontTitle">
          NOMBRE:
        </h3>
        <v-text-field
          v-model="nombre"
          class="fontTitle"
          dense
          solo
          outlined
          flat
          rounded
          required
          type="text"
          :rules="requiredRule"
        />
        <h3 class="fontTitle">
          APELLIDOS:
        </h3>
        <v-text-field
          v-model="apellidos"
          class="fontTitle"
          dense
          solo
          outlined
          flat
          rounded
          required
          type="text"
          :rules="requiredRule"
        />
        <h3 class="fontTitle">
          CORREO:
        </h3>
        <v-text-field
          v-model="correo"
          class="fontTitle"
          disabled
          dense
          solo
          outlined
          flat
          rounded
          required
          type="email"
          :rules="correoRule"
        />
        <h3 class="fontTitle">
          TELÉFONO:
        </h3>
        <v-text-field
          v-model="telefono"
          v-mask="'(###) ### ####'"
          class="fontTitle"
          dense
          solo
          outlined
          flat
          rounded
          required
          type="tel"
          :rules="requiredRule"
        />
        <h3 class="fontTitle">
          FECHA DE NACIMIENTO:
        </h3>
        <v-text-field
          v-model="fechaNacimiento"
          class="fontTitle"
          dense
          solo
          outlined
          flat
          rounded
          required
          type="date"
          :max="maxDate"
          :rules="requiredRule"
        />
      </v-form>
    </v-card-text>

    <v-card-actions>
      <v-row class="mb-5">
        <v-col cols="3" />
        <v-col cols="6">
          <v-btn
            block
            color="#8C6E39"
            height="38px"
            rounded
            @click="update()"
          >
            <span class="fontTitle" style="text-transform: none; color: white">ACTUALIZAR</span>
          </v-btn>
        </v-col>
        <v-col cols="3" />
      </v-row>
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
      ]
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
