<template>
  <v-row>
    <v-col>
      <v-card flat>
        <v-card-title class="d-flex flex-row align-center justify-center">
          <h1 class="fontTitle">
            DASHBOARD DE RUTAS
          </h1>
        </v-card-title>
        <v-card-actions>
          <v-row justify="center">
            <v-col
              cols="12"
              class="d-flex justify-center"
            >
              <v-btn
                color="#8C6E39"
                class="white--text mb-4 fontTitle"
                elevation="0"
                rounded
                @click="agregarRutaDialog()"
              >
                AGREGAR NUEVA RUTA
              </v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col>
                <h2 class="fontTitle">
                  RUTAS ACTIVAS
                </h2>
                <v-data-table
                  :headers="headers"
                  :items="rutasActivas"
                  class="fontDisplay"
                  flat
                  style="width: 100%;"
                  :footer-props="footerProps"
                >
                  <template #[`item.acciones`]="{item}">
                    <v-icon
                      small
                      class="mr-2"
                      @click="editRouteDialog(item)"
                    >
                      mdi-pencil
                    </v-icon>
                    <v-icon
                      small
                      @click="deleteRouteDialog(item)"
                    >
                      mdi-delete
                    </v-icon>
                  </template>
                </v-data-table>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <h2 class="fontTitle">
                  RUTAS INACTIVAS
                </h2>
                <v-data-table
                  :headers="headers"
                  :items="rutasNoActivas"
                  flat
                  class="fontDisplay"
                  style="width: 100%;"
                  :footer-props="footerProps"
                >
                  <template #[`item.acciones`]="{item}">
                    <v-spacer />
                    <v-icon
                      small
                      @click="deleteRouteDialog(item)"
                    >
                      mdi-delete
                    </v-icon>
                  </template>
                </v-data-table>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-col>

    <v-dialog
      v-model="routeDialog"
      persistent
      max-width="400px"
    >
      <v-card
        rounded
        flat
        class="pa-0"
      >
        <v-card-title class="blueBack">
          <v-row>
            <v-col
              cols="12"
              class="text-center mb-2"
            >
              <strong
                class="white--text fontTitle"
                style="font-size: 25px;"
              >
                {{ dialogTitle }}
              </strong>
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-subtitle class="text-center white--text blueBack fontDisplay">
          {{ dialogSubtitle }}
        </v-card-subtitle>
        <v-card-text class="pa-5 pb-0">
          <v-form
            ref="formRoute"
            v-model="validForm"
            class="text-center black--text fontDisplay"
            lazy-validation
            @submit.prevent="submit"
          >
            <h4>ORIGEN</h4>
            <v-combobox
              v-model="origin"
              :items="itemsStep1"
              solo
              flat
              dense
              outlined
              rounded
              required
              :disabled="dialogTitle === 'EDITAR RUTA'"
              :rules="requiredRule"
            />

            <h4>DESTINO</h4>
            <v-combobox
              v-model="destination"
              :items="itemsStep1"
              solo
              flat
              dense
              outlined
              rounded
              required
              :disabled="dialogTitle === 'EDITAR RUTA'"
              :rules="requiredRule"
            />

            <h4>FECHA DE SALIDA</h4>
            <v-text-field
              v-model="departureTime"
              type="datetime-local"
              solo
              flat
              dense
              outlined
              rounded
              required
              :rules="[requiredRule, departureTimeRule]"
              :min="minDepartureTime"
            />

            <h4>FECHA DE LLEGADA</h4>
            <v-text-field
              v-model="arrivalTime"
              type="datetime-local"
              solo
              flat
              dense
              outlined
              rounded
              required
              :rules="[requiredRule, arrivalTimeRule]"
              :min="departureTime"
            />

            <h4>COSTO</h4>
            <v-text-field
              v-model="price"
              type="number"
              solo
              flat
              dense
              outlined
              rounded
              required
              prepend-inner-icon="mdi-currency-usd"
              :rules="requiredRule"
            />

            <h4>ASIENTOS DISPONIBLES</h4>
            <v-text-field
              v-model="seatsAvailable"
              type="number"
              solo
              flat
              dense
              outlined
              rounded
              disabled
              :rules="[seatsAvailableRule]"
            />

            <h4>ASIENTOS RESERVADOS</h4>
            <v-text-field
              v-if="dialogTitle === 'EDITAR RUTA'"
              v-model="seatsBooked"
              type="number"
              solo
              flat
              dense
              outlined
              rounded
              disabled
              :rules="[seatsBookedRule]"
            />

            <h4>PARADAS (SEPARADAS POR COMAS)</h4>
            <v-text-field
              v-model="stopsInput"
              solo
              flat
              dense
              outlined
              rounded
              required
              :rules="requiredRule"
            />
          </v-form>
        </v-card-text>
        <v-card-actions
          class="pa-0 ma-0 fontDisplay"
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            class="pb-8"
          >
            <v-btn
              v-if="dialogTitle === 'AGREGAR NUEVA RUTA'"
              color="#8C6E39"
              class="white--text"
              width="122px"
              rounded
              @click="agregarRuta()"
            >
              REGISTRAR
            </v-btn>

            <v-btn
              v-if="dialogTitle === 'EDITAR RUTA'"
              color="#8C6E39"
              class="white--text"
              width="122px"
              rounded
              @click="actualizarRuta()"
            >
              ACTUALIZAR
            </v-btn>

            <v-btn
              class="black--text"
              text
              width="122px"
              @click="limpiarTodo()"
            >
              CANCELAR
            </v-btn>
          </v-col>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Diálogo de confirmación de eliminación -->
    <v-dialog
      v-model="deleteDialog"
      max-width="400px"
    >
      <v-card class="white--text blueBack">
        <v-card-title class="headline">
          <strong class="fontTitle">CONFIRMAR ELIMINACIÓN</strong>
        </v-card-title>
        <v-card-text class="fontDisplay">
          <span class="white--text">¿Estás seguro de que deseas eliminar esta ruta?</span>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="white"
            text
            @click="closeDeleteDialog"
          >
            Cancelar
          </v-btn>
          <v-btn
            color="#FFD300"
            text
            @click="confirmDeleteRoute"
          >
            Eliminar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import moment from 'moment'
import 'moment/locale/es'

export default {
  auth: true,

  data () {
    return {
      search: '',
      headers: [
        { text: 'ID', value: 'routeId' },
        { text: 'ORIGEN', value: 'origin' },
        { text: 'DESTINO', value: 'destination' },
        { text: 'SALIDA', value: 'departureTime' },
        { text: 'LLEGADA', value: 'arrivalTime' },
        { text: 'COSTO', value: 'price' },
        { text: 'ASIENTOS DISPONIBLES', value: 'seats.available' },
        { text: 'ACCIONES', value: 'acciones', sortable: false }
      ],
      rutas: [],
      rutasActivas: [],
      rutasNoActivas: [],
      routeDialog: false,
      deleteDialog: false,
      routeToDelete: null,
      validForm: false,
      dialogTitle: '',
      dialogSubtitle: '',
      arrivalTime: '',
      departureTime: '',
      destination: '',
      origin: '',
      price: '',
      stopsInput: '',
      routeIdUpdate: '',
      seatsAvailable: '',
      seatsBooked: '',
      itemsStep1: ['LEON', 'CIUDAD DE MEXICO', 'GUANAJUATO', 'MONTERREY', 'VALLE DE SANTIAGO'],
      requiredRule: [
        v => !!v || 'Este campo es requerido'
      ],
      departureTimeRule: [v => moment(v).isAfter(moment()) || 'La fecha de salida debe ser mayor a la fecha y hora actual'],
      arrivalTimeRule: [v => moment(v).isAfter(this.departureTime) || 'La fecha de llegada debe ser mayor a la fecha de salida'],
      seatsAvailableRule: [v => (parseInt(v) + parseInt(this.seatsBooked) === 16) || 'La suma de los asientos disponibles y los asientos reservados debe ser 16'],
      seatsBookedRule: [v => (parseInt(v) + parseInt(this.seatsAvailable) === 16) || 'La suma de los asientos disponibles y los asientos reservados debe ser 16'],
      minDepartureTime: moment().format('YYYY-MM-DDTHH:mm'),
      footerProps: {
        'items-per-page-text': 'Filas por página',
        'items-per-page-options': [5, 10, 15, 20, 25, 50, 100]
      }
    }
  },

  created () {
    if (this.$store.state.user && this.$store.state.token) {
      this.getAllRoutes()
    } else {
      this.$router.push('/')
    }
    this.getAllRoutes()
  },

  methods: {
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

    fechaFormateada (fecha) {
      let date

      // Verifica si la fecha es un timestamp de Firebase
      if (fecha && typeof fecha === 'object' && '_seconds' in fecha && '_nanoseconds' in fecha) {
        date = new Date(fecha._seconds * 1000 + fecha._nanoseconds / 1000000)
      } else {
        date = new Date(fecha)
      }

      const fechaFormateada = moment(date).format('DD/MM/YYYY, HH:mm')
      return fechaFormateada
    },

    async getAllRoutes () {
      const url = '/all-routes'
      this.$axios.defaults.headers.common.Authorization = `Bearer ${this.$store.state.token}`
      await this.$axios.get(url)
        .then((res) => {
          if (res.data.success) {
            this.rutas = []
            this.rutasActivas = []
            this.rutasNoActivas = []
            this.rutas = res.data.routes
            const now = new Date()
            this.rutas.forEach((ruta) => {
              const departureDate = new Date(ruta.departureTime._seconds * 1000 + ruta.departureTime._nanoseconds / 1000000)
              if (departureDate > now) {
                this.rutasActivas.push(ruta)
              } else {
                this.rutasNoActivas.push(ruta)
              }
              ruta.arrivalTime = this.fechaFormateada(ruta.arrivalTime)
              ruta.departureTime = this.fechaFormateada(ruta.departureTime)
            })
          }
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error('ERROR => ', error)
          this.mostrarAlerta('red', 'error', 'HA OCURRIDO UN ERROR AL OBTENER LAS RUTAS')
        })
    },

    limpiarTodo () {
      this.arrivalTime = ''
      this.departureTime = ''
      this.destination = ''
      this.origin = ''
      this.price = ''
      this.seatsAvailable = ''
      this.stopsInput = ''
      this.routeDialog = false
      this.validForm = false
      this.seatsBooked = ''
      this.routeIdUpdate = ''
      this.$refs.formRoute.reset()
    },

    agregarRutaDialog () {
      this.dialogTitle = 'AGREGAR NUEVA RUTA'
      this.dialogSubtitle = 'Completa los campos para agregar una nueva ruta'
      this.seatsAvailable = '16'
      this.routeDialog = true
    },

    async agregarRuta () {
      this.validForm = this.$refs.formRoute.validate()

      if (!this.validForm) {
        return
      }

      const departureTime = moment(this.departureTime, 'YYYY-MM-DDTHH:mm')
      const arrivalTime = moment(this.arrivalTime, 'YYYY-MM-DDTHH:mm')
      const now = moment()

      // Validar que la fecha de salida sea después de la fecha y hora actual
      if (!departureTime.isAfter(now)) {
        this.mostrarAlerta('red', 'error', 'La fecha de salida debe ser mayor a la fecha y hora actual')
        return
      }

      // Validar que la fecha de llegada sea después de la fecha de salida
      if (!arrivalTime.isAfter(departureTime)) {
        this.mostrarAlerta('red', 'error', 'La fecha de llegada debe ser mayor a la fecha de salida')
        return
      }

      const routeId = this.rutas.length + 1

      const data = {
        routeId: routeId.toString(),
        arrivalTime: this.arrivalTime,
        departureTime: this.departureTime,
        destination: this.destination.toUpperCase(),
        origin: this.origin.toUpperCase(),
        price: this.price,
        seats: this.seatsAvailable,
        stops: this.stopsInput.split(',').map(stop => stop.trim().toUpperCase())
      }

      const url = '/create-route'
      this.$axios.defaults.headers.common.Authorization = `Bearer ${this.$store.state.token}`
      await this.$axios.post(url, data)
        .then((res) => {
          if (res.data.success) {
            this.mostrarAlerta('green', 'success', 'RUTA AGREGADA')
            this.getAllRoutes()
            this.limpiarTodo()
          } else {
            this.mostrarAlerta('red', 'error', 'HA OCURRIDO UN ERROR AL AGREGAR LA RUTA')
          }
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error('ERROR => ', error)
          this.mostrarAlerta('red', 'error', 'HA OCURRIDO UN ERROR AL AGREGAR LA RUTA')
        })
    },

    editRouteDialog (route) {
      this.dialogTitle = 'EDITAR RUTA'
      this.dialogSubtitle = 'Completa los campos para editar la ruta'

      // Convierte arrivalTime y departureTime al formato adecuado
      const arrivalTime = moment(route.arrivalTime, 'DD/MM/YYYY, HH:mm')
      this.arrivalTime = arrivalTime.isValid() ? arrivalTime.format('YYYY-MM-DDTHH:mm') : ''

      const departureTime = moment(route.departureTime, 'DD/MM/YYYY, HH:mm')
      this.departureTime = departureTime.isValid() ? departureTime.format('YYYY-MM-DDTHH:mm') : ''

      this.destination = route.destination
      this.origin = route.origin
      this.price = route.price
      this.seatsAvailable = route.seats.available
      this.seatsBooked = route.seats.booked
      this.routeIdUpdate = route.routeId
      this.stopsInput = route.stops.join(', ')
      this.routeDialog = true
    },

    async actualizarRuta () {
      this.validForm = this.$refs.formRoute.validate()

      if (!this.validForm) {
        return
      }

      const data = {
        arrivalTime: this.arrivalTime,
        departureTime: this.departureTime,
        price: this.price,
        stops: this.stopsInput.split(',').map(stop => stop.trim())
      }

      const params = this.routeIdUpdate
      const url = `/update-all-route/${params}`
      this.$axios.defaults.headers.common.Authorization = `Bearer ${this.$store.state.token}`
      await this.$axios.put(url, data)
        .then((res) => {
          if (res.data.success) {
            this.mostrarAlerta('green', 'success', 'RUTA ACTUALIZADA')
            this.getAllRoutes()
            this.limpiarTodo()
          } else {
            this.mostrarAlerta('red', 'error', 'HA OCURRIDO UN ERROR AL ACTUALIZAR LA RUTA')
          }
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error('ERROR => ', error)
          this.mostrarAlerta('red', 'error', 'HA OCURRIDO UN ERROR AL ACTUALIZAR LA RUTA')
        })
    },

    deleteRouteDialog (route) {
      this.routeToDelete = route
      this.deleteDialog = true
    },

    closeDeleteDialog () {
      this.deleteDialog = false
      this.routeToDelete = null
    },

    async confirmDeleteRoute () {
      const params = this.routeToDelete.routeId.toString()
      const url = `/delete-route/${params}`
      this.$axios.defaults.headers.common.Authorization = `Bearer ${this.$store.state.token}`
      await this.$axios.delete(url)
        .then((res) => {
          if (res.data.success) {
            this.mostrarAlerta('green', 'success', 'RUTA ELIMINADA')
            this.getAllRoutes()
            this.closeDeleteDialog()
          } else {
            this.mostrarAlerta('red', 'error', 'HA OCURRIDO UN ERROR AL ELIMINAR LA RUTA')
          }
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error('ERROR => ', error)
          this.mostrarAlerta('red', 'error', 'HA OCURRIDO UN ERROR AL ELIMINAR LA RUTA')
        })
    }
  }
}
</script>

<style scoped>
.dashboard {
  padding: 20px;
}
</style>
