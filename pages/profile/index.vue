<template>
  <v-row align="center" justify="center" class="ma-0 pa-0 align-center justify-center" style="background-color: aliceblue !important; height: 92.8vh;">
    <v-card elevation="0" class="ma-0 pa-0 text-center align-center justify-center" rounded color="transparent">
      <v-card-text class="ma-0 pa-0" style="font-size: 18px;">
        <v-avatar class="ma-0 pa-0 align-center justify-center" size="200">
          <v-img class="ma-0 pa-0" :src="$store.state.user.img" style="width: 200px; height: 200px; background-size: cover; background-position: center; background-repeat: no-repeat;" />
        </v-avatar>

        <v-row class="ma-0 pa-0 mt-10 align-center justify-center fontTitle" style="font-size: 23px;">
          {{ $store.state.user.nombre }} {{ $store.state.user.apellidos }}
        </v-row>

        <v-row class="ma-0 pa-0 mt-1 align-center justify-center fontDisplay">
          {{ $store.state.user.email }}
        </v-row>

        <v-row class="ma-0 pa-0 mt-1 align-center justify-center fontDisplay">
          Id:  {{ $store.state.user.id }}
        </v-row>

        <v-divider class="ma-0 my-5" />

        <v-row class="ma-0 pa-0 mt-5 align-center justify-center fontDisplay">
          Edad:
        </v-row>

        <v-row class="ma-0 pa-0 align-center justify-center fontDisplay">
          {{ calculateAge($store.state.user.cumple) }} años
        </v-row>

        <v-row class="ma-0 pa-0 mt-5 align-center justify-center fontDisplay">
          Fecha de nacimiento:
        </v-row>

        <v-row class="ma-0 pa-0 align-center justify-center fontDisplay" style="text-transform: capitalize;">
          {{ fechaFormateada($store.state.user.cumple) }}
        </v-row>

        <v-row class="ma-0 pa-0 mt-5 align-center justify-center fontDisplay">
          Teléfono:
        </v-row>

        <v-row class="ma-0 pa-0 align-center justify-center fontDisplay">
          {{ $store.state.user.telefono }}
        </v-row>
      </v-card-text>

      <v-card-actions class="ma-0 pa-0 mt-12 align-center justify-center">
        <v-btn color="#8C6E39" height="38px" class="ma-0 pa-0 px-2 white--text" rounded @click="dialogProfile = true">
          Editar perfil
        </v-btn>
      </v-card-actions>
    </v-card>

    <v-dialog v-model="dialogProfile" width="500px" class="pa-0 ma-0">
      <edit-profile @closeDialog="closeDialog" />
    </v-dialog>
  </v-row>
</template>

<script>
import moment from 'moment'
import 'moment/locale/es'
import { mapGetters } from 'vuex'
import editProfile from '@/components/ui-editprofile.vue'

export default {
  components: {
    editProfile
  },

  layout: 'home',
  auth: true,
  data () {
    return {
      localUser: {},
      dialogProfile: false
    }
  },

  computed: {
    ...mapGetters(['user'])
  },

  mounted () {
    if (!this.$store.state.user || !this.$store.state.token) {
      this.$router.push('/')
    }
  },

  methods: {
    closeDialog () {
      this.dialogProfile = false
      this.$store.commit('modifySnackbar', true)
      this.$store.commit('modifyColor', 'green darken-4')
      this.$store.commit('modifyIcon', 'mdi-check-circle')
      this.$store.commit('modifyText', 'USUARIO ACTUALIZADO EXITOSAMENTE')
    },

    fechaFormateada (fecha) {
      return moment(fecha).format('dddd D [de] MMMM [de] YYYY')
    },

    calculateAge (birthdate) {
      const today = new Date()
      const birthDate = new Date(birthdate)
      let age = today.getFullYear() - birthDate.getFullYear()
      const month = today.getMonth() - birthDate.getMonth()
      if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
        age--
      }
      return age
    }
  }
}
</script>
