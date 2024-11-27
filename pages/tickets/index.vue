<template>
  <v-col class="ma-0 pa-0 py-15 align-center justify-center text-center" align="center" justify="center" style="background-color: aliceblue !important; height: 92.8vh;">
    <v-row class="fontTitle font-weight-bold text-center align-center justify-center" style="font-size: 28px;">
      MIS BOLETOS
    </v-row>

    <v-row v-if="tickets.length === 0" class="ma-0 pa-0 mt-10 text-center align-center justify-center fontDisplay" style="font-size: 20px;">
      No hay boletos registrados
    </v-row>

    <v-row v-else align="center" justify="center" class="ma-0 pa-0 mt-10 text-center align-center justify-center fontDisplay">
      <v-col v-for="ticket in tickets" :key="ticket.id" cols="12" class="d-flex flex-row flex-wrap justify-space-around align-content-space-around">
        <v-card
          elevation="0"
          class="mb-5 pa-7"
          width="500px"
          color="#0A263D"
          style="border-radius: 30px;"
        >
          <v-card-title class="ma-0 pa-0 white--text">
            <v-row class="ma-0 pa-0 fontTitle align-center justify-center">
              RUTA: {{ ticket.ruta.toUpperCase() }}
            </v-row>
          </v-card-title>

          <v-row class="ma-0 pa-0 align-center justify-center white--text fontDisplay" style="font-size: 14px;">
            ID: {{ ticket.validation }}
          </v-row>

          <v-divider class="ma-0 pa-0 mt-4" style="border: 0.5px solid white;" />

          <v-card-text class="ma-0 pa-0 mt-6">
            <v-col class="ma-0 pa-0 white--text" style="font-size: 15px;">
              <v-row class="ma-0 pa-0 align-center justify-center">
                TIPO: {{ ticket.data.tipo.toUpperCase() }}
              </v-row>

              <v-row class="ma-0 pa-0 mt-1 align-center justify-center">
                ORIGEN: {{ ticket.data.origen.toUpperCase() }}
              </v-row>

              <v-row class="ma-0 pa-0 mt-1 align-center justify-center">
                DESTINO: {{ ticket.data.destino.toUpperCase() }}
              </v-row>

              <v-row class="ma-0 pa-0 mt-1 align-center justify-center">
                FECHA: {{ fechaFormateada(ticket.data.fechaSalida) }}
              </v-row>

              <v-row class="ma-0 pa-0 mt-1 align-center justify-center">
                HORARIO: {{ getHour(ticket.data.fechaSalida) }}
              </v-row>

              <v-row class="ma-0 pa-0 mt-1 align-center justify-center">
                ASIENTOS: {{ ticket.data.asientos.join(', ') }}
              </v-row>

              <v-row class="ma-0 pa-0 mt-5 align-center justify-center">
                TOTAL: ${{ ticket.data.costo }}
              </v-row>
            </v-col>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
import moment from 'moment'
import 'moment/locale/es'

export default {
  auth: true,

  data () {
    return {
      tickets: {}
    }
  },

  created () {
    if (this.$store.state.user && this.$store.state.token) {
      this.getTickets()
    } else {
      this.$router.push('/')
    }
    this.getTickets()
  },

  methods: {
    fechaFormateada (fecha) {
      let date

      // Verifica si la fecha es un timestamp de Firebase
      if (fecha && typeof fecha === 'object' && '_seconds' in fecha && '_nanoseconds' in fecha) {
        date = new Date(fecha._seconds * 1000 + fecha._nanoseconds / 1000000)
      } else {
        const fechaFormateada = moment(fecha).format('dddd D [de] MMMM [de] YYYY')
        return fechaFormateada.toUpperCase()
      }

      const fechaFormateada = moment(date).format('dddd D [de] MMMM [de] YYYY')
      return fechaFormateada.toUpperCase()
    },

    getHour (departureTime) {
      const date = new Date(departureTime._seconds * 1000 + departureTime._nanoseconds / 1000000)
      return moment(date).format('hh:mm A')
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

    getTickets () {
      const params = this.$store.state.user.id
      const url = `/get-reservations/${params}`
      this.$axios.defaults.headers.common.Authorization = `Bearer ${this.$store.state.token}`
      this.$axios.get(url)
        .then((res) => {
          if (res.data.success) {
            this.tickets = res.data.tickets
            console.log('🚀 ~ .then ~ this.tickets:', this.tickets)
          }
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log('ERROR => ', error)
          this.mostrarAlerta('red', 'error', 'HA OCURRIDO UN ERROR AL OBTENER LOS TICKETS')
        })
    }
  }
}
</script>

<style scoped>

</style>
