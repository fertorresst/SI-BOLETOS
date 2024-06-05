<template>
  <v-row align="center" justify="center">
    <v-col cols="12" class="text-center">
      <h1 class="fontTitle font-weight-bold">
        MIS BOLETOS
      </h1>
    </v-col>

    <v-col v-if="tickets.length === 0" cols="12">
      <p class="text-center fontDisplay">
        No hay boletos registrados
      </p>
    </v-col>

    <v-col
      v-for="ticket in tickets"
      v-else
      :key="ticket.id"
      cols="12"
      class="d-flex flex-row flex-wrap justify-space-around align-content-space-around"
    >
      <v-card
        elevation="0"
        class="mb-5 pa-5 white--text"
        min-width="350px"
        max-width="500px"
        color="#0A263D"
        rounded
      >
        <v-card-title class="fontTitle">
          <strong>RUTA: {{ ticket.ruta.toUpperCase() }}</strong>
        </v-card-title>

        <v-card-text class="white--text fontDisplay">
          <small>Tipo: </small>
          <strong>{{ ticket.data.tipo.toUpperCase() }}</strong>
          <br>
          <small>Origen: </small>
          <strong>{{ ticket.data.origen.toUpperCase() }}</strong>
          <br>
          <small>Destino: </small>
          <strong>{{ ticket.data.destino.toUpperCase() }}</strong>
          <br>
          <small>Fecha y hora de salida: </small>
          <strong>{{ fechaFormateada(ticket.data.fechaSalida) }} A LAS {{ getHour(ticket.data.fechaSalida) }}</strong>
          <br>
          <small>Asientos: </small>
          <strong>{{ ticket.data.asientos.join(', ') }}</strong>
          <br>
          <small>Costo total: </small>
          <strong>${{ ticket.data.costo }}</strong>
          <v-divider color="white" class="my-6" />
          <small>ID de validación: </small>
          <br>
          <strong>{{ ticket.validation }}</strong>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
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
    // if (this.$store.state.user && this.$store.state.token) {
    //   this.getTickets()
    // } else {
    //   this.$router.push('/')
    // }
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
