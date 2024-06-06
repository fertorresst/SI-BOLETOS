<template>
  <v-row align="center" justify="center" class="d-flex flex-row align-center justify-center align-content-center">
    <v-col cols="12" align="center" justify="center">
      <v-row align="center" justify="center">
        <v-card
          elevation="0"
          max-width="500px"
          class="pa-5"
          rounded
        >
          <v-row align="center" justify="center">
            <v-col cols="12" align="center" justify="center">
              <v-avatar
                size="128"
              >
                <v-img
                  :src="$store.state.user.img"
                />
              </v-avatar>
              <h2 class="text-center fontTitle">
                {{ $store.state.user.nombre }} {{ $store.state.user.apellidos }}
              </h2>
              <p class="text-center fontDisplay">
                {{ $store.state.user.email }}
              </p>
            </v-col>
          </v-row>

          <v-card-text>
            <v-col cols="12">
              <h3 class="text-center fontDisplay">
                {{ calculateAge($store.state.user.cumple) }} AÑOS
              </h3>
            </v-col>

            <v-col cols="12">
              <h3 class="text-center fontDisplay">
                CUMPLEAÑOS:
                <br>
                {{ fechaFormateada($store.state.user.cumple).toUpperCase() }}
              </h3>
            </v-col>

            <v-col cols="12">
              <h3 class="text-center fontDisplay">
                TELÉFONO:
                <br>
                {{ $store.state.user.telefono }}
              </h3>
            </v-col>

            <v-divider class="ma-5" />

            <v-row align="center" justify="center">
              <v-col cols="12" class="text-center">
                <h2 class="text-center fontDisplay pb-5" style="font-size: 18px;">
                  ID DE USUARIO:
                  <br>
                  {{ $store.state.user.id }}
                </h2>
              </v-col>
            </v-row>
          </v-card-text>

          <v-card-actions>
            <v-spacer />
            <v-btn
              color="#8C6E39"
              height="38px"
              class="white--text"
              rounded
              @click="dialogProfile = true"
            >
              <span>EDITAR PERFIL</span>
            </v-btn>
            <v-spacer />
          </v-card-actions>
        </v-card>
      </v-row>
      <v-dialog v-model="dialogProfile" width="700" class="pa-0 ma-0">
        <edit-profile @closeDialog="closeDialog" />
      </v-dialog>
    </v-col>
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
      user: {},
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
