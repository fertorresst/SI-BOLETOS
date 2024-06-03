<template>
  <v-row>
    <v-col cols="12">
      <h1 class="fontTitle">
        MIS BOLETOS
      </h1>
    </v-col>

    <v-col v-if="tickets.length === 0" cols="12">
      <p class="text-center fontDisplay">
        No hay boletos registrados
      </p>
    </v-col>

    <v-col v-else cols="12" class="d-flex flex-row flex-wrap justify-space-around align-content-space-around">
      <v-card elevation="0" class="mb-5 pa-5 white--text" width="45%" color="#0A263D" rounded>
        <v-card-title class="fontTitle">
          <strong>RUTA: routeId1</strong>
        </v-card-title>

        <v-card-text class="white--text fontDisplay">
          <small>Tipo: </small>
          <strong>REDONDO</strong>
          <br>
          <small>Origen: </small>
          <strong>LEON</strong>
          <br>
          <small>Destino: </small>
          <strong>CIUDAD DE MEXICO</strong>
          <br>
          <small>Asientos: </small>
          <strong>A1, A2, A3, A4</strong>
          <br>
          <small>Costo total: </small>
          <strong>$800</strong>
          <v-divider color="white" class="my-6" />
          <small>ID de validación: </small>
          <br>
          <strong>20240524121210</strong>
          <br>
          <small>Token de validación: </small>
          <br>
          <strong style="font-size: 12px;">eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imp1QGp1LmNvbSIsImlhdCI6MTcxNjU1MjY1MywiZXhwIjoxNzE2NTU2MjUzfQ.1a8f41laaMo6IJUmJyiLvILTHe9Xf39owbGDyFSwD54</strong>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data () {
    return {
      tickets: {}
    }
  },

  methods: {
    getTickets () {

    }
  }
}
</script>

<style scoped>

</style>
