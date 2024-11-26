<template>
  <div class="dashboard">
    <v-app>
      <v-container>
        <v-row>
          <v-col>
            <v-card>
              <v-card-title>
                <h1>Dashboard de Rutas</h1>
                <v-btn @click="agregarRuta" color="primary"
                  >Agregar Nueva Ruta</v-btn
                >
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col>
                      <h2>Rutas Activas</h2>
                      <v-simple-table>
                        <thead>
                          <tr>
                            <th>Origen</th>
                            <th>Destino</th>
                            <th>Fecha y Hora Salida</th>
                            <th>Asientos Disponibles</th>
                            <th>Acciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="ruta in rutasActivas" :key="ruta.id">
                            <td>{{ ruta.origen }}</td>
                            <td>{{ ruta.destino }}</td>
                            <td>{{ ruta.fechaHoraSalida }}</td>
                            <td>{{ ruta.asientosDisponibles }}</td>
                            <td>
                              <v-btn
                                @click="actualizarRuta(ruta.id)"
                                color="warning"
                                >Actualizar</v-btn
                              >
                              <v-btn
                                @click="eliminarRuta(ruta.id)"
                                color="error"
                                >Eliminar</v-btn
                              >
                            </td>
                          </tr>
                        </tbody>
                      </v-simple-table>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <h2>Rutas No Activas</h2>
                      <v-simple-table>
                        <thead>
                          <tr>
                            <th>Origen</th>
                            <th>Destino</th>
                            <th>Fecha y Hora Salida</th>
                            <th>Asientos Disponibles</th>
                            <th>Acciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="ruta in rutasNoActivas" :key="ruta.id">
                            <td>{{ ruta.origen }}</td>
                            <td>{{ ruta.destino }}</td>
                            <td>{{ ruta.fechaHoraSalida }}</td>
                            <td>{{ ruta.asientosDisponibles }}</td>
                            <td>
                              <v-btn
                                @click="actualizarRuta(ruta.id)"
                                color="warning"
                                >Actualizar</v-btn
                              >
                              <v-btn
                                @click="eliminarRuta(ruta.id)"
                                color="error"
                                >Eliminar</v-btn
                              >
                            </td>
                          </tr>
                        </tbody>
                      </v-simple-table>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-app>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rutasActivas: [],
      rutasNoActivas: [],
    };
  },
  methods: {
    agregarRuta() {
      // Lógica para agregar una nueva ruta
    },
    actualizarRuta(id) {
      // Lógica para actualizar una ruta existente
    },
    eliminarRuta(id) {
      // Lógica para eliminar una ruta existente
    },
    cargarRutas() {
      // Simulación de carga de datos
      this.rutasActivas = [
        {
          id: 1,
          origen: "Ciudad A",
          destino: "Ciudad B",
          fechaHoraSalida: "2023-10-01 08:00",
          asientosDisponibles: 20,
        },
        {
          id: 2,
          origen: "Ciudad C",
          destino: "Ciudad D",
          fechaHoraSalida: "2023-10-02 09:00",
          asientosDisponibles: 15,
        },
      ];
      this.rutasNoActivas = [
        {
          id: 3,
          origen: "Ciudad E",
          destino: "Ciudad F",
          fechaHoraSalida: "2023-10-03 10:00",
          asientosDisponibles: 10,
        },
        {
          id: 4,
          origen: "Ciudad G",
          destino: "Ciudad H",
          fechaHoraSalida: "2023-10-04 11:00",
          asientosDisponibles: 5,
        },
      ];
    },
  },
  created() {
    // Lógica para cargar las rutas activas y no activas
    this.cargarRutas();
  },
};
</script>

<style scoped>
.dashboard {
  padding: 20px;
}
</style>
