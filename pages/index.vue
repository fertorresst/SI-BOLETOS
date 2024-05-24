<template>
  <v-row>
    <v-col cols="12" align="center" justify="center">
      <ui-alert v-if="showAlert" class="alerta" />
      <v-btn
        color="primary"
        @click="pruebaPago()"
      >
        PRUEBAS
      </v-btn>
      <v-stepper
        v-model="e6"
        max-width="500"
        align="center"
        justify="center"
        vertical
        elevation="0"
        style="border-radius: 20px;"
      >
        <!-- STEP 1 -->
        <v-stepper-step
          :complete="e6 > 1"
          step="1"
          class="blueBack fontTitle"
          complete-icon="mdi-check black--text"
          color="goldBack black--text"
        >
          <strong class="white--text">BUSCA TU VIAJE</strong>
          <small class="white--text">¿A DONDE IRÁS?</small>
        </v-stepper-step>

        <v-stepper-content step="1">
          <v-card rounded flat class="pa-0">
            <v-card-title class="blueBack">
              <v-row>
                <v-col cols="12" class="text-center mb-2">
                  <strong class="white--text fontTitle" style="font-size: 25px;">
                    BIENVENIDO
                  </strong>
                </v-col>
              </v-row>
            </v-card-title>

            <v-card-subtitle class="text-center white--text blueBack fontDisplay">
              ¿A donde viajaremos hoy?
            </v-card-subtitle>

            <v-card-text>
              <v-form
                ref="formViaje"
                v-model="validViaje"
                class="text-center black--text fontDisplay"
                lazy-validation
                @submit.prevent="submit"
              >
                <v-row>
                  <v-col cols="12" class="text-center mt-4" align="center" justify="center">
                    <v-btn
                      :color="tipoViaje === 'sencillo' ? '#8C6E39' : '#FFFFFF'"
                      :class="tipoViaje === 'sencillo' ? 'white--text ma-2' : 'black--text ma-2'"
                      :outlined="tipoViaje === 'sencillo' ? false : true"
                      width="157px"
                      elevation="0"
                      rounded
                      @click="tipoViaje = 'sencillo'"
                    >
                      <v-icon>mdi-keyboard-tab</v-icon>
                      <span>&nbsp;SENCILLO</span>
                    </v-btn>

                    <v-btn
                      :color="tipoViaje === 'redondo' ? '#8C6E39' : '#FFFFFF'"
                      :class="tipoViaje === 'redondo' ? 'white--text ma-2' : 'black--text ma-2'"
                      :outlined="tipoViaje === 'redondo' ? false : true"
                      width="157px"
                      elevation="0"
                      rounded
                      @click="tipoViaje = 'redondo'"
                    >
                      <v-icon>mdi-autorenew</v-icon>
                      <span>&nbsp;REDONDO</span>
                    </v-btn>
                  </v-col>
                </v-row>

                <v-row class="text-center" align="center" justify="center">
                  <v-col cols="12">
                    <h4>ORIGEN</h4>
                    <v-select
                      v-model="origenViaje"
                      :items="itemsStep1"
                      type="text"
                      solo
                      flat
                      dense
                      outlined
                      rounded
                      required
                      :rules="origenRule"
                    />
                    <h4>DESTINO</h4>
                    <v-select
                      v-model="destinoViaje"
                      :items="itemsStep1"
                      type="text"
                      solo
                      flat
                      dense
                      outlined
                      rounded
                      required
                      :rules="destinoRule"
                    />
                    <h4>FECHA DE SALIDA</h4>
                    <v-text-field
                      ref="fechaSalida"
                      v-model="fechaSalidaViaje"
                      type="date"
                      solo
                      flat
                      dense
                      rounded
                      required
                      :min="today()"
                      :rules="requiredRule"
                      @focus="validateField('fechaSalida')"
                      @blur="validateField('fechaSalida')"
                    />
                    <h4 v-if="tipoViaje === 'redondo'">
                      FECHA DE REGRESO
                    </h4>
                    <v-text-field
                      v-if="tipoViaje === 'redondo'"
                      ref="fechaRegreso"
                      v-model="fechaRegresoViaje"
                      type="date"
                      solo
                      flat
                      dense
                      rounded
                      required
                      :min="today()"
                      :rules="fechaRegresoRule"
                      @focus="validateField('fechaRegreso')"
                      @blur="validateField('fechaRegreso')"
                    />
                    <h4>PASAJEROS</h4>
                    <v-text-field
                      v-model="pasajerosViaje"
                      type="number"
                      solo
                      flat
                      dense
                      outlined
                      rounded
                      required
                      min="1"
                      max="4"
                      :rules="requiredRule"
                    />
                  </v-col>
                </v-row>
              </v-form>
            </v-card-text>
          </v-card>
          <v-btn
            color="#8C6E39"
            class="white--text mb-4 fontTitle"
            elevation="0"
            width="122px"
            rounded
            @click="cargarViajes(origenViaje, destinoViaje,fechaSalidaViaje)"
          >
            CONTINUAR
          </v-btn>
        </v-stepper-content>

        <!-- STEP 2 -->
        <v-stepper-step
          :complete="e6 > 2"
          step="2"
          class="blueBack fontTitle"
          complete-icon="mdi-check black--text"
          color="goldBack black--text"
        >
          <strong class="white--text">SELECCIONA TU VIAJE DE IDA</strong>
          <small class="white--text">¿CUAL HORARIO ES TU MEJOR OPCIÓN?</small>
        </v-stepper-step>

        <v-stepper-content
          step="2"
          class="fontDisplay"
        >
          <small><strong>{{ fechaFormateada(fechaSalidaViaje) }}</strong></small>
          <v-row align="center" justify="center" class="ma-2">
            <v-col cols="5" class="fontTitle">
              <h3>
                {{ origenViaje }}
              </h3>
            </v-col>

            <v-col cols="2" class="fontTitle">
              <v-icon large color="#8C6E39">
                mdi-bus-articulated-front
              </v-icon>
            </v-col>

            <v-col cols="5" class="fontTitle">
              <h3>
                {{ destinoViaje }}
              </h3>
            </v-col>
          </v-row>

          <v-row>
            <v-col
              v-for="r in routes"
              :key="r.routeId"
              cols="12"
            >
              <v-card
                class="tour-card white--text mb-4"
                rounded
                outlined
                flat
              >
                <v-card-title class="headline text-center blueBack fontTitle">
                  <v-row>
                    <v-col cols="6" class="fontTitle">
                      <small>SALIDA:</small>
                      <h6>{{ getHour(r.departureTime) }}</h6>
                    </v-col>
                    <v-col cols="6" class="fontTitle">
                      <small>PRECIO:</small>
                      <h6>${{ r.price }} c/u</h6>
                    </v-col>
                  </v-row>
                </v-card-title>

                <v-divider color="white" />

                <v-card-subtitle>
                  <v-row class="text-start">
                    <v-col cols="12">
                      <span>LUGARES DISPONIBLES: {{ r.seats.available }} asientos</span>
                      <br>
                      <span>DURACIÓN: {{ getDuration(r.departureTime, r.arrivalTime) }}</span>
                    </v-col>
                  </v-row>
                </v-card-subtitle>

                <v-card-actions class="d-flex justify-end">
                  <v-btn
                    color="#8C6E39"
                    class="black--text mb-3 fontTitle"
                    rounded
                    text
                    @click="moreInfo(r)"
                  >
                    MAS INFO
                  </v-btn>
                  <v-btn
                    color="#8C6E39"
                    class="white--text mb-3 fontTitle"
                    rounded
                    @click="selectTravel(r)"
                  >
                    SELECCIONAR
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>

          <v-btn
            color="#8C6E39"
            class="white--text mb-4 fontTitle"
            elevation="0"
            width="122px"
            rounded
            @click="e6 = 1"
          >
            ATRÁS
          </v-btn>

          <v-dialog v-model="showMasInfo" max-width="400">
            <v-card class="fontDisplay">
              <v-img
                :src="require('@/assets/back-more-info.svg')"
              >
                <v-app-bar
                  flat
                  color="rgba(0, 0, 0, 0)"
                >
                  <v-toolbar-title class="text-h6 white--text pl-0 fontTitle">
                    <v-icon color="white">
                      mdi-routes
                    </v-icon>&nbsp;ITINERARIO
                  </v-toolbar-title>

                  <v-spacer />

                  <v-btn
                    color="#0A263D"
                    elevation="0"
                    style="max-width: 36px !important; width: 36px !important;"
                    @click="showMasInfo=false"
                  >
                    <v-icon color="white">
                      mdi-close-thick
                    </v-icon>
                  </v-btn>
                </v-app-bar>
              </v-img>

              <v-card-text>
                <div class="font-weight-bold my-5 ml-9 mb-2">
                  <v-icon color="#8C6E39">
                    mdi-triangle-down-outline
                  </v-icon>&nbsp;CENTRAL DE {{ routeInfo.origin }}
                </div>

                <v-timeline
                  align-top
                  dense
                >
                  <v-timeline-item
                    v-for="(stop, index) in routeInfo.stops"
                    :key="index"
                    icon="mdi-arrow-down"
                    color="#8C6E39"
                    small
                    elevation="0"
                  >
                    <div>
                      <div>{{ stop }}</div>
                    </div>
                  </v-timeline-item>
                </v-timeline>

                <div class="font-weight-bold ml-9 mb-2">
                  <v-icon color="#8C6E39">
                    mdi-square-outline
                  </v-icon>&nbsp;CENTRAL DE {{ routeInfo.destination }}
                </div>
              </v-card-text>
            </v-card>
          </v-dialog>
        </v-stepper-content>

        <!-- STEP 3 -->
        <v-stepper-step
          :complete="e6 > 3"
          step="3"
          class="blueBack fontTitle"
          complete-icon="mdi-check black--text"
          color="goldBack black--text"
        >
          <strong class="white--text">ELIGE TUS ASIENTOS DE IDA</strong>
          <small class="white--text">¿CUAL ES TU ASIENTO MAS COMODO?</small>
        </v-stepper-step>

        <v-stepper-content step="3">
          <v-card elevation="0" class="mb-5">
            <v-row class="fontTitle">
              <v-col cols="12">
                <h1>ADELANTE</h1>
              </v-col>
            </v-row>

            <v-row class="fontDisplay" align="center" justify="center" style="max-width: 160px;">
              <v-col cols="3">
                <v-btn
                  class="white--text blueBack mb-2"
                  elevation="0"
                  rounded
                  icon
                >
                  <v-icon>mdi-seat</v-icon>
                </v-btn>

                <v-btn
                  :class="seats[1].selected ? 'coyoteBack white--text mb-2' : getSeatClass(seats[1])"
                  elevation="0"
                  outlined
                  rounded
                  icon
                  @click="toggleSeat(1)"
                >
                  <v-icon>mdi-seat</v-icon>
                </v-btn>

                <v-btn
                  :class="seats[4].selected ? 'coyoteBack white--text mb-2' : getSeatClass(seats[4])"
                  elevation="0"
                  outlined
                  rounded
                  icon
                  @click="toggleSeat(4)"
                >
                  <v-icon>mdi-seat</v-icon>
                </v-btn>

                <v-btn
                  :class="seats[7].selected ? 'coyoteBack white--text mb-2' : getSeatClass(seats[7])"
                  elevation="0"
                  outlined
                  rounded
                  icon
                  @click="toggleSeat(7)"
                >
                  <v-icon>mdi-seat</v-icon>
                </v-btn>

                <v-btn
                  :class="seats[10].selected ? 'coyoteBack white--text mb-2' : getSeatClass(seats[10])"
                  elevation="0"
                  outlined
                  rounded
                  icon
                  @click="toggleSeat(10)"
                >
                  <v-icon>mdi-seat</v-icon>
                </v-btn>

                <v-btn
                  :class="seats[13].selected ? 'coyoteBack white--text mb-2' : getSeatClass(seats[13])"
                  elevation="0"
                  outlined
                  rounded
                  icon
                  @click="toggleSeat(13)"
                >
                  <v-icon>mdi-seat</v-icon>
                </v-btn>
              </v-col>

              <v-col cols="3">
                <v-btn
                  color="#0A263D"
                  class="white--text mb-2"
                  elevation="0"
                  disabled
                  rounded
                  icon
                />

                <v-btn
                  :class="seats[2].selected ? 'coyoteBack white--text mb-2' : getSeatClass(seats[2])"
                  elevation="0"
                  outlined
                  rounded
                  icon
                  @click="toggleSeat(2)"
                >
                  <v-icon>mdi-seat</v-icon>
                </v-btn>

                <v-btn
                  :class="seats[5].selected ? 'coyoteBack white--text mb-2' : getSeatClass(seats[5])"
                  elevation="0"
                  outlined
                  rounded
                  icon
                  @click="toggleSeat(5)"
                >
                  <v-icon>mdi-seat</v-icon>
                </v-btn>

                <v-btn
                  :class="seats[8].selected ? 'coyoteBack white--text mb-2' : getSeatClass(seats[8])"
                  elevation="0"
                  outlined
                  rounded
                  icon
                  @click="toggleSeat(8)"
                >
                  <v-icon>mdi-seat</v-icon>
                </v-btn>

                <v-btn
                  :class="seats[11].selected ? 'coyoteBack white--text mb-2' : getSeatClass(seats[11])"
                  elevation="0"
                  outlined
                  rounded
                  icon
                  @click="toggleSeat(11)"
                >
                  <v-icon>mdi-seat</v-icon>
                </v-btn>

                <v-btn
                  :class="seats[14].selected ? 'coyoteBack white--text mb-2' : getSeatClass(seats[14])"
                  elevation="0"
                  outlined
                  rounded
                  icon
                  @click="toggleSeat(14)"
                >
                  <v-icon>mdi-seat</v-icon>
                </v-btn>
              </v-col>

              <v-col cols="3">
                <v-btn
                  color="#0A263D"
                  class="white--text mb-2"
                  elevation="0"
                  disabled
                  rounded
                  icon
                />

                <v-btn
                  :class="seats[3].selected ? 'coyoteBack white--text mb-2' : getSeatClass(seats[3])"
                  elevation="0"
                  outlined
                  rounded
                  icon
                  @click="toggleSeat(3)"
                >
                  <v-icon>mdi-seat</v-icon>
                </v-btn>

                <v-btn
                  color="#0A263D"
                  class="white--text mb-2"
                  elevation="0"
                  disabled
                  rounded
                  icon
                />

                <v-btn
                  color="#0A263D"
                  class="white--text mb-2"
                  elevation="0"
                  disabled
                  rounded
                  icon
                />

                <v-btn
                  color="#0A263D"
                  class="white--text mb-2"
                  elevation="0"
                  disabled
                  rounded
                  icon
                />

                <v-btn
                  :class="seats[15].selected ? 'coyoteBack white--text mb-2' : getSeatClass(seats[15])"
                  elevation="0"
                  outlined
                  rounded
                  icon
                  @click="toggleSeat(15)"
                >
                  <v-icon>mdi-seat</v-icon>
                </v-btn>
              </v-col>

              <v-col cols="3">
                <v-btn
                  :class="seats[0].selected ? 'coyoteBack white--text mb-2' : getSeatClass(seats[0])"
                  elevation="0"
                  outlined
                  rounded
                  icon
                  @click="toggleSeat(0)"
                >
                  <v-icon>mdi-seat</v-icon>
                </v-btn>

                <v-btn
                  color="#0A263D"
                  class="white--text mb-2"
                  elevation="0"
                  disabled
                  rounded
                  icon
                />

                <v-btn
                  :class="seats[6].selected ? 'coyoteBack white--text mb-2' : getSeatClass(seats[6])"
                  elevation="0"
                  outlined
                  rounded
                  icon
                  @click="toggleSeat(6)"
                >
                  <v-icon>mdi-seat</v-icon>
                </v-btn>

                <v-btn
                  :class="seats[9].selected ? 'coyoteBack white--text mb-2' : getSeatClass(seats[9])"
                  elevation="0"
                  outlined
                  rounded
                  icon
                  @click="toggleSeat(9)"
                >
                  <v-icon>mdi-seat</v-icon>
                </v-btn>

                <v-btn
                  :class="seats[12].selected ? 'coyoteBack white--text mb-2' : getSeatClass(seats[12])"
                  elevation="0"
                  outlined
                  rounded
                  icon
                  @click="toggleSeat(12)"
                >
                  <v-icon>mdi-seat</v-icon>
                </v-btn>

                <v-btn
                  :class="seats[16].selected ? 'coyoteBack white--text mb-2' : getSeatClass(seats[16])"
                  elevation="0"
                  outlined
                  rounded
                  icon
                  @click="toggleSeat(16)"
                >
                  <v-icon>mdi-seat</v-icon>
                </v-btn>
              </v-col>
            </v-row>

            <v-row class="fontTitle">
              <v-col cols="12">
                <h1>ATRÁS</h1>
              </v-col>
            </v-row>

            <v-divider inset />

            <v-row align="center" justify="center" style="max-width: 300px;">
              <v-col cols="12">
                <v-list>
                  <v-list-item-group small class="fontDisplay">
                    <v-list-item
                      v-for="(item, i) in itemsInfoStep3"
                      :key="i"
                    >
                      <v-list-item-icon>
                        <v-icon :color="item.color">
                          {{ item.icon }}
                        </v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title class="text-start black--text">
                          {{ item.text }}
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-col>
            </v-row>

            <v-row align="center" justify="center" class="fontDisplay" style="max-width: 300px;">
              <v-col
                cols="12"
              >
                <small>ASIENTOS SELECCIONADOS:</small>
                <br>
                <small
                  v-for="(item, i) in selectedSeats"
                  :key="i"
                >
                  {{ item.name }}&nbsp;
                </small>
              </v-col>
            </v-row>
          </v-card>

          <v-btn
            color="#8C6E39"
            class="black--text mb-4 fontTitle"
            elevation="0"
            rounded
            text
            @click="e6 = 2"
          >
            ATRÁS
          </v-btn>
          <v-btn
            color="#8C6E39"
            class="white--text mb-4 fontTitle"
            elevation="0"
            width="122px"
            rounded
            @click="validarAsientos()"
          >
            CONTINUAR
          </v-btn>
        </v-stepper-content>

        <!-- STEP 4 -->
        <v-stepper-step
          :complete="e6 > 4"
          step="4"
          class="blueBack fontTitle"
          complete-icon="mdi-check black--text"
          color="goldBack black--text"
        >
          <strong class="white--text">EQUIPAJE EXTRA DE IDA</strong>
          <small class="white--text">¿LLEVARAS EQUIPAJE EXTRA?</small>
        </v-stepper-step>

        <v-stepper-content step="4">
          <v-card elevation="0" class="mb-5 fontDisplay">
            <v-card-text rounded class="white--text text-start" style="background-color: #B71C1C;">
              <strong>REGLAS DEL EQUIPAJE EXTRA:</strong>
              <br>
              <small>CADA PASAJERO PODRÁ LLEVAR UNA MOCHILA DE TAMAÑO ESCOLAR Y UNA MALETA QUE NO EXCEDA LAS SIGUIENTES MEDIDAS: 60x42x33.</small>
              <br>
              <small>EN CASO DE EXCEDER ESTAS DIMENSIONES ES NECESARIO REPORTARLO EN ESTE APARTADO.</small>
              <br>
              <small>EL COSTO POR EXCESO DE EQUIPAJE ES DE $100 POR PASAJERO Y ESTA LIMITADO A UNA MALETA DE LAS SIGUIENTES MEDIDAS: 70x46x35.</small>
            </v-card-text>

            <v-card-text>
              <h4>¿CUANTOS PASAJEROS LLEVARAN EQUIPAJE EXTRA?</h4>
              <v-form
                ref="formEquipaje"
                v-model="validEquipaje"
                class="text-center black--text fontDisplay"
                lazy-validation
                @submit.prevent="submit"
              >
                <v-text-field
                  v-model="equipajeExtra"
                  type="number"
                  solo
                  flat
                  dense
                  outlined
                  rounded
                  required
                  min="0"
                  :max="pasajerosViaje"
                  :rules="requiredRule"
                />
              </v-form>
            </v-card-text>
          </v-card>

          <v-btn
            color="#8C6E39"
            class="black--text mb-4 fontTitle"
            elevation="0"
            rounded
            text
            @click="e6 = 3"
          >
            ATRÁS
          </v-btn>
          <v-btn
            color="#8C6E39"
            class="white--text mb-4 fontTitle"
            elevation="0"
            width="122px"
            rounded
            @click="validarEquipaje()"
          >
            CONTINUAR
          </v-btn>
        </v-stepper-content>

        <!-- STEP VIAJE REDONDO -->
        <v-stepper-step
          v-if="tipoViaje === 'redondo'"
          :complete="e6 > 5"
          step="5"
          class="blueBack fontTitle"
          complete-icon="mdi-check black--text"
          color="goldBack black--text"
        >
          <strong class="white--text">SELECCIONA TU VIAJE DE REGRESO</strong>
          <small class="white--text">¿CUAL HORARIO ES TU MEJOR OPCIÓN?</small>
        </v-stepper-step>

        <v-stepper-content
          v-if="tipoViaje === 'redondo'"
          step="5"
          class="fontDisplay"
        >
          <small><strong>{{ fechaFormateada(fechaRegresoViaje) }}</strong></small>
          <v-row align="center" justify="center" class="ma-2">
            <v-col cols="5" class="fontTitle">
              <h3>
                {{ destinoViaje }}
              </h3>
            </v-col>

            <v-col cols="2" class="fontTitle">
              <v-icon large color="#8C6E39">
                mdi-bus-articulated-front
              </v-icon>
            </v-col>

            <v-col cols="5" class="fontTitle">
              <h3>
                {{ origenViaje }}
              </h3>
            </v-col>
          </v-row>

          <v-row>
            <v-col
              v-for="r in routesRegreso"
              :key="r.routeId"
              cols="12"
            >
              <v-card
                class="tour-card white--text mb-4"
                rounded
                outlined
                flat
              >
                <v-card-title class="headline text-center blueBack fontTitle">
                  <v-row>
                    <v-col cols="6" class="fontTitle">
                      <small>SALIDA:</small>
                      <h6>{{ getHour(r.departureTime) }}</h6>
                    </v-col>
                    <v-col cols="6" class="fontTitle">
                      <small>PRECIO:</small>
                      <h6>${{ r.price }} c/u</h6>
                    </v-col>
                  </v-row>
                </v-card-title>

                <v-divider color="white" />

                <v-card-subtitle>
                  <v-row class="text-start">
                    <v-col cols="12">
                      <span>LUGARES DISPONIBLES: {{ r.seats.available }} asientos</span>
                      <br>
                      <span>DURACIÓN: {{ getDuration(r.departureTime, r.arrivalTime) }}</span>
                    </v-col>
                  </v-row>
                </v-card-subtitle>

                <v-card-actions class="d-flex justify-end">
                  <v-btn
                    color="#8C6E39"
                    class="black--text mb-3 fontTitle"
                    rounded
                    text
                    @click="moreInfo(r)"
                  >
                    MAS INFO
                  </v-btn>
                  <v-btn
                    color="#8C6E39"
                    class="white--text mb-3 fontTitle"
                    rounded
                    @click="selectTravel(r)"
                  >
                    SELECCIONAR
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>

          <v-btn
            color="#8C6E39"
            class="white--text mb-4 fontTitle"
            elevation="0"
            width="122px"
            rounded
            @click="e6 = 4"
          >
            ATRÁS
          </v-btn>

          <v-dialog v-model="showMasInfo" max-width="400">
            <v-card class="fontDisplay">
              <v-img
                :src="require('@/assets/back-more-info.svg')"
              >
                <v-app-bar
                  flat
                  color="rgba(0, 0, 0, 0)"
                >
                  <v-toolbar-title class="text-h6 white--text pl-0 fontTitle">
                    <v-icon color="white">
                      mdi-routes
                    </v-icon>&nbsp;ITINERARIO
                  </v-toolbar-title>

                  <v-spacer />

                  <v-btn
                    color="#0A263D"
                    elevation="0"
                    style="max-width: 36px !important; width: 36px !important;"
                    @click="showMasInfo=false"
                  >
                    <v-icon color="white">
                      mdi-close-thick
                    </v-icon>
                  </v-btn>
                </v-app-bar>
              </v-img>

              <v-card-text>
                <div class="font-weight-bold my-5 ml-9 mb-2">
                  <v-icon color="#8C6E39">
                    mdi-triangle-down-outline
                  </v-icon>&nbsp;CENTRAL DE {{ routeInfo.origin }}
                </div>

                <v-timeline
                  align-top
                  dense
                >
                  <v-timeline-item
                    v-for="(stop, index) in routeInfo.stops"
                    :key="index"
                    icon="mdi-arrow-down"
                    color="#8C6E39"
                    small
                    elevation="0"
                  >
                    <div>
                      <div>{{ stop }}</div>
                    </div>
                  </v-timeline-item>
                </v-timeline>

                <div class="font-weight-bold ml-9 mb-2">
                  <v-icon color="#8C6E39">
                    mdi-square-outline
                  </v-icon>&nbsp;CENTRAL DE {{ routeInfo.destination }}
                </div>
              </v-card-text>
            </v-card>
          </v-dialog>
        </v-stepper-content>

        <!-- STEP ASIENTOS REDONDO -->
        <v-stepper-step
          v-if="tipoViaje === 'redondo'"
          :complete="e6 > 6"
          step="6"
          class="blueBack fontTitle"
          complete-icon="mdi-check black--text"
          color="goldBack black--text"
        >
          <strong class="white--text">ELIGE TUS ASIENTOS DE REGRESO</strong>
          <small class="white--text">¿CUAL ES TU ASIENTO MAS COMODO?</small>
        </v-stepper-step>

        <v-stepper-content step="6">
          <v-card elevation="0" class="mb-5">
            <v-row class="fontTitle">
              <v-col cols="12">
                <h1>ADELANTE</h1>
              </v-col>
            </v-row>

            <v-row class="fontDisplay" align="center" justify="center" style="max-width: 160px;">
              <v-col cols="3">
                <v-btn
                  class="white--text blueBack mb-2"
                  elevation="0"
                  rounded
                  icon
                >
                  <v-icon>mdi-seat</v-icon>
                </v-btn>

                <v-btn
                  :class="seatsRegreso[1].selected ? 'coyoteBack white--text mb-2' : getSeatClass(seatsRegreso[1])"
                  elevation="0"
                  outlined
                  rounded
                  icon
                  @click="toggleSeat(1)"
                >
                  <v-icon>mdi-seat</v-icon>
                </v-btn>

                <v-btn
                  :class="seatsRegreso[4].selected ? 'coyoteBack white--text mb-2' : getSeatClass(seatsRegreso[4])"
                  elevation="0"
                  outlined
                  rounded
                  icon
                  @click="toggleSeat(4)"
                >
                  <v-icon>mdi-seat</v-icon>
                </v-btn>

                <v-btn
                  :class="seatsRegreso[7].selected ? 'coyoteBack white--text mb-2' : getSeatClass(seatsRegreso[7])"
                  elevation="0"
                  outlined
                  rounded
                  icon
                  @click="toggleSeat(7)"
                >
                  <v-icon>mdi-seat</v-icon>
                </v-btn>

                <v-btn
                  :class="seatsRegreso[10].selected ? 'coyoteBack white--text mb-2' : getSeatClass(seatsRegreso[10])"
                  elevation="0"
                  outlined
                  rounded
                  icon
                  @click="toggleSeat(10)"
                >
                  <v-icon>mdi-seat</v-icon>
                </v-btn>

                <v-btn
                  :class="seatsRegreso[13].selected ? 'coyoteBack white--text mb-2' : getSeatClass(seatsRegreso[13])"
                  elevation="0"
                  outlined
                  rounded
                  icon
                  @click="toggleSeat(13)"
                >
                  <v-icon>mdi-seat</v-icon>
                </v-btn>
              </v-col>

              <v-col cols="3">
                <v-btn
                  color="#0A263D"
                  class="white--text mb-2"
                  elevation="0"
                  disabled
                  rounded
                  icon
                />

                <v-btn
                  :class="seatsRegreso[2].selected ? 'coyoteBack white--text mb-2' : getSeatClass(seatsRegreso[2])"
                  elevation="0"
                  outlined
                  rounded
                  icon
                  @click="toggleSeat(2)"
                >
                  <v-icon>mdi-seat</v-icon>
                </v-btn>

                <v-btn
                  :class="seatsRegreso[5].selected ? 'coyoteBack white--text mb-2' : getSeatClass(seatsRegreso[5])"
                  elevation="0"
                  outlined
                  rounded
                  icon
                  @click="toggleSeat(5)"
                >
                  <v-icon>mdi-seat</v-icon>
                </v-btn>

                <v-btn
                  :class="seatsRegreso[8].selected ? 'coyoteBack white--text mb-2' : getSeatClass(seatsRegreso[8])"
                  elevation="0"
                  outlined
                  rounded
                  icon
                  @click="toggleSeat(8)"
                >
                  <v-icon>mdi-seat</v-icon>
                </v-btn>

                <v-btn
                  :class="seatsRegreso[11].selected ? 'coyoteBack white--text mb-2' : getSeatClass(seatsRegreso[11])"
                  elevation="0"
                  outlined
                  rounded
                  icon
                  @click="toggleSeat(11)"
                >
                  <v-icon>mdi-seat</v-icon>
                </v-btn>

                <v-btn
                  :class="seatsRegreso[14].selected ? 'coyoteBack white--text mb-2' : getSeatClass(seatsRegreso[14])"
                  elevation="0"
                  outlined
                  rounded
                  icon
                  @click="toggleSeat(14)"
                >
                  <v-icon>mdi-seat</v-icon>
                </v-btn>
              </v-col>

              <v-col cols="3">
                <v-btn
                  color="#0A263D"
                  class="white--text mb-2"
                  elevation="0"
                  disabled
                  rounded
                  icon
                />

                <v-btn
                  :class="seatsRegreso[3].selected ? 'coyoteBack white--text mb-2' : getSeatClass(seatsRegreso[3])"
                  elevation="0"
                  outlined
                  rounded
                  icon
                  @click="toggleSeat(3)"
                >
                  <v-icon>mdi-seat</v-icon>
                </v-btn>

                <v-btn
                  color="#0A263D"
                  class="white--text mb-2"
                  elevation="0"
                  disabled
                  rounded
                  icon
                />

                <v-btn
                  color="#0A263D"
                  class="white--text mb-2"
                  elevation="0"
                  disabled
                  rounded
                  icon
                />

                <v-btn
                  color="#0A263D"
                  class="white--text mb-2"
                  elevation="0"
                  disabled
                  rounded
                  icon
                />

                <v-btn
                  :class="seatsRegreso[15].selected ? 'coyoteBack white--text mb-2' : getSeatClass(seatsRegreso[15])"
                  elevation="0"
                  outlined
                  rounded
                  icon
                  @click="toggleSeat(15)"
                >
                  <v-icon>mdi-seat</v-icon>
                </v-btn>
              </v-col>

              <v-col cols="3">
                <v-btn
                  :class="seatsRegreso[0].selected ? 'coyoteBack white--text mb-2' : getSeatClass(seatsRegreso[0])"
                  elevation="0"
                  outlined
                  rounded
                  icon
                  @click="toggleSeat(0)"
                >
                  <v-icon>mdi-seat</v-icon>
                </v-btn>

                <v-btn
                  color="#0A263D"
                  class="white--text mb-2"
                  elevation="0"
                  disabled
                  rounded
                  icon
                />

                <v-btn
                  :class="seatsRegreso[6].selected ? 'coyoteBack white--text mb-2' : getSeatClass(seatsRegreso[6])"
                  elevation="0"
                  outlined
                  rounded
                  icon
                  @click="toggleSeat(6)"
                >
                  <v-icon>mdi-seat</v-icon>
                </v-btn>

                <v-btn
                  :class="seatsRegreso[9].selected ? 'coyoteBack white--text mb-2' : getSeatClass(seatsRegreso[9])"
                  elevation="0"
                  outlined
                  rounded
                  icon
                  @click="toggleSeat(9)"
                >
                  <v-icon>mdi-seat</v-icon>
                </v-btn>

                <v-btn
                  :class="seatsRegreso[12].selected ? 'coyoteBack white--text mb-2' : getSeatClass(seatsRegreso[12])"
                  elevation="0"
                  outlined
                  rounded
                  icon
                  @click="toggleSeat(12)"
                >
                  <v-icon>mdi-seat</v-icon>
                </v-btn>

                <v-btn
                  :class="seatsRegreso[16].selected ? 'coyoteBack white--text mb-2' : getSeatClass(seatsRegreso[16])"
                  elevation="0"
                  outlined
                  rounded
                  icon
                  @click="toggleSeat(16)"
                >
                  <v-icon>mdi-seat</v-icon>
                </v-btn>
              </v-col>
            </v-row>

            <v-row class="fontTitle">
              <v-col cols="12">
                <h1>ATRÁS</h1>
              </v-col>
            </v-row>

            <v-divider inset />

            <v-row align="center" justify="center" style="max-width: 300px;">
              <v-col cols="12">
                <v-list>
                  <v-list-item-group small class="fontDisplay">
                    <v-list-item
                      v-for="(item, i) in itemsInfoStep3"
                      :key="i"
                    >
                      <v-list-item-icon>
                        <v-icon :color="item.color">
                          {{ item.icon }}
                        </v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title class="text-start black--text">
                          {{ item.text }}
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-col>
            </v-row>

            <v-row align="center" justify="center" class="fontDisplay" style="max-width: 300px;">
              <v-col
                cols="12"
              >
                <small>ASIENTOS SELECCIONADOS:</small>
                <br>
                <small
                  v-for="(item, i) in selectedSeatsRegreso"
                  :key="i"
                >
                  {{ item.name }}&nbsp;
                </small>
              </v-col>
            </v-row>
          </v-card>

          <v-btn
            color="#8C6E39"
            class="black--text mb-4 fontTitle"
            elevation="0"
            rounded
            text
            @click="e6 = 5"
          >
            ATRÁS
          </v-btn>
          <v-btn
            color="#8C6E39"
            class="white--text mb-4 fontTitle"
            elevation="0"
            width="122px"
            rounded
            @click="validarAsientos()"
          >
            CONTINUAR
          </v-btn>
        </v-stepper-content>

        <!-- STEP EQUIPAJE REDONDO -->
        <v-stepper-step
          v-if="tipoViaje === 'redondo'"
          :complete="e6 > 7"
          step="7"
          class="blueBack fontTitle"
          complete-icon="mdi-check black--text"
          color="goldBack black--text"
        >
          <strong class="white--text">EQUIPAJE EXTRA DE IDA</strong>
          <small class="white--text">¿LLEVARAS EQUIPAJE EXTRA?</small>
        </v-stepper-step>

        <v-stepper-content v-if="tipoViaje === 'redondo'" step="7">
          <v-card elevation="0" class="mb-5 fontDisplay">
            <v-card-text rounded class="white--text text-start" style="background-color: #B71C1C;">
              <strong>REGLAS DEL EQUIPAJE EXTRA:</strong>
              <br>
              <small>CADA PASAJERO PODRÁ LLEVAR UNA MOCHILA DE TAMAÑO ESCOLAR Y UNA MALETA QUE NO EXCEDA LAS SIGUIENTES MEDIDAS: 60x42x33.</small>
              <br>
              <small>EN CASO DE EXCEDER ESTAS DIMENSIONES ES NECESARIO REPORTARLO EN ESTE APARTADO.</small>
              <br>
              <small>EL COSTO POR EXCESO DE EQUIPAJE ES DE $100 POR PASAJERO Y ESTA LIMITADO A UNA MALETA DE LAS SIGUIENTES MEDIDAS: 70x46x35.</small>
            </v-card-text>

            <v-card-text>
              <h4>¿CUANTOS PASAJEROS LLEVARAN EQUIPAJE EXTRA?</h4>
              <v-form
                ref="formEquipajeRegreso"
                v-model="validEquipajeRegreso"
                class="text-center black--text fontDisplay"
                lazy-validation
                @submit.prevent="submit"
              >
                <v-text-field
                  v-model="equipajeExtraRegreso"
                  type="number"
                  solo
                  flat
                  dense
                  outlined
                  rounded
                  required
                  min="0"
                  :max="pasajerosViaje"
                  :rules="requiredRule"
                />
              </v-form>
            </v-card-text>
          </v-card>

          <v-btn
            color="#8C6E39"
            class="black--text mb-4 fontTitle"
            elevation="0"
            rounded
            text
            @click="e6 = 6"
          >
            ATRÁS
          </v-btn>
          <v-btn
            color="#8C6E39"
            class="white--text mb-4 fontTitle"
            elevation="0"
            width="122px"
            rounded
            @click="validarEquipaje()"
          >
            CONTINUAR
          </v-btn>
        </v-stepper-content>

        <!-- STEP PAGO -->
        <v-stepper-step
          :complete="tipoViaje === 'sencillo' ? e6 > 5 : e6 > 8"
          :step="tipoViaje === 'sencillo' ? '5' : '8'"
          class="blueBack fontTitle"
          complete-icon="mdi-check black--text"
          color="goldBack black--text"
        >
          <strong class="white--text">REALIZA TU PAGO</strong>
          <small class="white--text">SOLO SE PERMITE PAGO CON TARJETA</small>
        </v-stepper-step>

        <v-stepper-content :step="tipoViaje === 'sencillo' ? '5' : '8'">
          <v-card elevation="0" class="mb-5 fontDisplay">
            <v-card-title class="d-flex justify-center align-center">
              <strong>TICKETS</strong>
            </v-card-title>
            <v-img
              v-if="Object.keys(routeSelected).length > 0"
              :src="require('@/assets/back-credit-card.svg')"
              class="mb-5"
            >
              <v-card-text rounded class="white--text text-start">
                <strong class="text-center">VIAJE DE IDA</strong>
                <br>
                <br>
                <small>
                  TIPO DE VIAJE: {{ tipoViaje.toUpperCase() }}
                  <br>
                  ORIGEN: {{ routeSelected.origin }}
                  <br>
                  DESTINO: {{ routeSelected.destination }}
                  <br>
                  SALIDA: {{ fechaFormateada(routeSelected.departureTime) }} {{ getHour(routeSelected.departureTime) }}
                  <br>
                  LLEGADA: {{ fechaFormateada(routeSelected.arrivalTime) }} {{ getHour(routeSelected.arrivalTime) }}
                  <br>
                  PASAJEROS: {{ pasajerosViaje }}
                  <br>
                  ASIENTOS SELECCIONADOS:
                  <small
                    v-for="(item, i) in selectedSeats"
                    :key="i"
                  >
                    &nbsp;{{ item.name }}
                  </small>
                  <br>
                  PASAJEROS CON EQUIPAJE EXTRA: {{ equipajeExtra }}
                </small>
                <br>
                <br>
                <strong>TOTAL: ${{ (routeSelected.price * Number(pasajerosViaje)) + (Number(equipajeExtra) * 100) }}</strong>
              </v-card-text>
            </v-img>

            <v-img
              v-if="Object.keys(routeSelectedRegreso).length > 0"
              :src="require('@/assets/back-credit-card.svg')"
            >
              <v-card-text rounded class="white--text text-start">
                <strong class="text-center">VIAJE DE REGRESO</strong>
                <br>
                <br>
                <small>
                  TIPO DE VIAJE: {{ tipoViaje.toUpperCase() }}
                  <br>
                  ORIGEN: {{ routeSelectedRegreso.origin }}
                  <br>
                  DESTINO: {{ routeSelectedRegreso.destination }}
                  <br>
                  SALIDA: {{ fechaFormateada(routeSelectedRegreso.departureTime) }} {{ getHour(routeSelectedRegreso.departureTime) }}
                  <br>
                  LLEGADA: {{ fechaFormateada(routeSelectedRegreso.arrivalTime) }} {{ getHour(routeSelectedRegreso.arrivalTime) }}
                  <br>
                  PASAJEROS: {{ pasajerosViaje }}
                  <br>
                  ASIENTOS SELECCIONADOS:
                  <small
                    v-for="(item, i) in selectedSeatsRegreso"
                    :key="i"
                  >
                    &nbsp;{{ item.name }}
                  </small>
                  <br>
                  PASAJEROS CON EQUIPAJE EXTRA: {{ equipajeExtraRegreso }}
                </small>
                <br>
                <br>
                <strong>TOTAL: ${{ (routeSelectedRegreso.price * Number(pasajerosViaje)) + (Number(equipajeExtraRegreso) * 100) }}</strong>
              </v-card-text>
            </v-img>

            <v-card-title class="d-flex align-end justify-end">
              <strong>TOTAL: ${{ total }}</strong>
            </v-card-title>
          </v-card>

          <v-btn
            color="#8C6E39"
            class="black--text mb-4 fontTitle"
            elevation="0"
            rounded
            text
            @click="tipoViaje === 'sencillo' ? e6 = 4 : e6 = 7"
          >
            ATRÁS
          </v-btn>
          <v-btn
            color="#8C6E39"
            class="white--text mb-4 fontTitle"
            elevation="0"
            width="122px"
            rounded
            @click="validarPago()"
          >
            PAGAR
          </v-btn>
          <v-dialog v-model="dialogPay" max-width="300" height="300" persistent>
            <v-card v-if="successPay === ''" color="#0A263D" class="pa-5 fontDisplay">
              <v-card-text align="center" justify="center" class="white--text">
                <v-btn solo loading color="#0A263D" class="white--text" />
                <br>
                PROCESANDO PAGO
                <br>
                <br>
                CIERRE EL POPUP PARA CONTINUAR
              </v-card-text>
            </v-card>

            <v-card v-else-if="successPay === 'paid'" color="green darken-4" class="pa-5 fontDisplay">
              <v-card-text align="center" justify="center" class="white--text">
                <v-icon large color="white">
                  mdi-check-circle-outline
                </v-icon>
                <br>
                PAGO EXITOSO
              </v-card-text>

              <v-card-actions class="pb-0 mb-0">
                <v-row align="center" justify="center">
                  <v-col cols="12" align="center" justify="center">
                    <v-btn
                      color="#8C6E39"
                      class="white--text mb-4 fontTitle"
                      elevation="0"
                      width="122px"
                      rounded
                      outlined
                      @click="actualizarBD()"
                    >
                      CONTINUAR
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card-actions>
            </v-card>

            <v-card v-else-if="successPay === 'unpaid'" color="red darken-4" class="pa-5 fontDisplay">
              <v-card-text align="center" justify="center" class="white--text">
                <v-icon large color="white">
                  mdi-close-circle-outline
                </v-icon>
                <br>
                PAGO CANCELADO
              </v-card-text>

              <v-card-actions class="pb-0 mb-0">
                <v-row align="center" justify="center">
                  <v-col cols="12" align="center" justify="center">
                    <v-btn
                      class="white--text mb-4 fontTitle"
                      elevation="0"
                      width="122px"
                      rounded
                      outlined
                      @click="salirPago()"
                    >
                      SALIR
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-stepper-content>

        <!-- STEP IMPRIMIR COMPROBANTE -->
        <v-stepper-step
          :complete="tipoViaje === 'sencillo' ? e6 > 6 : e6 > 9"
          :step="tipoViaje === 'sencillo' ? '6' : '9'"
          class="blueBack fontTitle"
          complete-icon="mdi-check black--text"
          color="goldBack black--text"
        >
          <strong class="white--text">IMPRIME TU BOLETO</strong>
          <small class="white--text">DEBERÁ PRESENTARSE EL DIA DEL VIAJE</small>
        </v-stepper-step>

        <v-stepper-content :step="tipoViaje === 'sencillo' ? '6' : '9'">
          <v-card elevation="0" class="mb-5 fontDisplay">
            <v-card-title class="d-flex justify-end align-end">
              <strong>TOTAL: $ {{ routeSelected.price + (equipajeExtra * 100) }}</strong>
            </v-card-title>

            <v-card-actions />
          </v-card>

          <v-btn
            color="#8C6E39"
            class="black--text mb-4 fontTitle"
            elevation="0"
            rounded
            text
            @click="tipoViaje === 'sencillo' ? e6 = 4 : e6 = 7"
          >
            ATRÁS
          </v-btn>
          <v-btn
            color="#8C6E39"
            class="white--text mb-4 fontTitle"
            elevation="0"
            width="122px"
            rounded
            @click="validarPago()"
          >
            PAGAR
          </v-btn>
        </v-stepper-content>
      </v-stepper>
    </v-col>
  </v-row>
</template>

<script>
import { mask } from 'vue-the-mask'
import { mapState } from 'vuex'
import moment from 'moment'
import uiAlert from '@/components/ui-alert.vue'
import 'moment/locale/es'

export default {
  name: 'IndexPage',

  directives: {
    mask
  },

  components: {
    uiAlert
  },

  layout: 'default',

  data () {
    return {
      // STEPPER
      e6: 1,

      // STEP RUTA
      validViaje: false,
      tipoViaje: 'sencillo',
      origenViaje: '',
      destinoViaje: '',
      itemsStep1: ['LEON', 'CIUDAD DE MEXICO', 'GUANAJUATO', 'MONTERREY'],
      fechaSalidaViaje: '',
      fechaRegresoViaje: '',
      pasajerosViaje: '',
      equipajeViaje: false,

      // STEP VIAJE IDA
      routes: [],
      routeInfo: [],
      routeSelected: [],
      showMasInfo: false,
      itinerario: [
        {
          stop: '',
          color: '#8C6E39'
        },
        {
          stop: '',
          color: '#8C6E39'
        },
        {
          stop: '',
          color: '#8C6E39'
        }
      ],

      // STEP ASIENTOS IDA
      selectedSeats: [],
      seats: [
        { name: 'A1', selected: false, unavailable: false },
        { name: 'A2', selected: false, unavailable: false },
        { name: 'A3', selected: false, unavailable: false },
        { name: 'A4', selected: false, unavailable: false },
        { name: 'A5', selected: false, unavailable: false },
        { name: 'A6', selected: false, unavailable: false },
        { name: 'A7', selected: false, unavailable: false },
        { name: 'A8', selected: false, unavailable: false },
        { name: 'A9', selected: false, unavailable: false },
        { name: 'A10', selected: false, unavailable: false },
        { name: 'A11', selected: false, unavailable: false },
        { name: 'A12', selected: false, unavailable: false },
        { name: 'A13', selected: false, unavailable: false },
        { name: 'A14', selected: false, unavailable: false },
        { name: 'A15', selected: false, unavailable: false },
        { name: 'A16', selected: false, unavailable: false },
        { name: 'A17', selected: false, unavailable: false }
      ],
      itemsInfoStep3: [
        {
          color: '#0A263D',
          icon: 'mdi-square',
          text: 'NO DISPONIBLES'
        },
        {
          color: 'black',
          icon: 'mdi-square-outline',
          text: 'DISPONIBLES'
        },
        {
          color: '#8C6E39',
          icon: 'mdi-square',
          text: 'SELECCIONADO'
        }
      ],

      // STEP EQUIPAJE IDA
      equipajeExtra: '',
      validEquipaje: '',
      total: 0,

      // STEP VIAJE REGRESO
      routesRegreso: [],
      routeSelectedRegreso: '',

      // STEP ASIENTOS REGRESO
      selectedSeatsRegreso: [],
      seatsRegreso: [
        { name: 'A1', selected: false, unavailable: false },
        { name: 'A2', selected: false, unavailable: false },
        { name: 'A3', selected: false, unavailable: false },
        { name: 'A4', selected: false, unavailable: false },
        { name: 'A5', selected: false, unavailable: false },
        { name: 'A6', selected: false, unavailable: false },
        { name: 'A7', selected: false, unavailable: false },
        { name: 'A8', selected: false, unavailable: false },
        { name: 'A9', selected: false, unavailable: false },
        { name: 'A10', selected: false, unavailable: false },
        { name: 'A11', selected: false, unavailable: false },
        { name: 'A12', selected: false, unavailable: false },
        { name: 'A13', selected: false, unavailable: false },
        { name: 'A14', selected: false, unavailable: false },
        { name: 'A15', selected: false, unavailable: false },
        { name: 'A16', selected: false, unavailable: false },
        { name: 'A17', selected: false, unavailable: false }
      ],
      itemsInfoRegreso: [
        {
          color: '#0A263D',
          icon: 'mdi-square',
          text: 'NO DISPONIBLES'
        },
        {
          color: 'black',
          icon: 'mdi-square-outline',
          text: 'DISPONIBLES'
        },
        {
          color: '#8C6E39',
          icon: 'mdi-square',
          text: 'SELECCIONADO'
        }
      ],

      // STEP EQUIPAJE REGRESO
      equipajeExtraRegreso: '',
      validEquipajeRegreso: '',
      totalRegreso: 0,

      // STEP PAGO TARJETA
      titularTarjeta: '',
      numeroTarjeta: '',
      vencimientoTarjeta: '',
      cvvTarjeta: '',
      validPago: false,

      // REGLAS
      requiredRule: [
        v => !!v || 'CAMPO REQUERIDO'
      ],
      fechaSalidaRule: [
        v => !!v || 'FECHA DE REGRESO REQUERIDA',
        v => v <= this.fechaRegresoViaje || 'LA FECHA DE SALIDA DEBE SER MENOR A LA FECHA DE REGRESO'
      ],
      fechaRegresoRule: [
        v => !!v || 'FECHA DE REGRESO REQUERIDA',
        v => v >= this.fechaSalidaViaje || 'LA FECHA DE REGRESO DEBE SER MAYOR A LA FECHA DE SALIDA'
      ],
      origenRule: [
        v => !!v || 'EL ORIGEN ES REQUERIDO',
        v => v !== this.destinoViaje || 'EL ORIGEN NO PUEDE SER IGUAL AL DESTINO'
      ],
      destinoRule: [
        v => !!v || 'EL DESTINO ES REQUERIDO',
        v => v !== this.origenViaje || 'EL DESTINO NO PUEDE SER IGUAL AL ORIGEN'
      ],

      // STRIPE
      stripeKey: 'sk_test_51PJU8CRwWA3gXNirOlh2sPZyDCUDVUZr64Z8p9WFSB0vg3JM7g05hjXHSDIC95WE1zlcJV8f5NojTo9PCrVjprxe00kCiFwhK1',
      dialogPay: false,
      urlPay: '',
      sessionId: '',
      successPay: '',

      // ACTUALIZAR BASE DE DATOS
      token: '',
      user: {},
      reservation: [],
      reservationRegreso: []
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

  async mounted () {},

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

    validateField (field) {
      this.$refs[field].validate()
    },

    today () {
      const today = new Date()
      const year = today.getFullYear()
      const month = String(today.getMonth() + 1).padStart(2, '0')
      const day = String(today.getDate()).padStart(2, '0')
      return `${year}-${month}-${day}`
    },

    getHour (departureTime) {
      const date = new Date(departureTime._seconds * 1000 + departureTime._nanoseconds / 1000000)
      return moment(date).format('hh:mm A')
    },

    getDuration (departureTime, arrivalTime) {
      // Convierte los Timestamps a objetos Date
      const departureDate = new Date(departureTime._seconds * 1000 + departureTime._nanoseconds / 1000000)
      const arrivalDate = new Date(arrivalTime._seconds * 1000 + arrivalTime._nanoseconds / 1000000)

      // Convierte los objetos Date a Moment.js
      const departure = moment(departureDate)
      const arrival = moment(arrivalDate)

      // Calcula la duración en horas y minutos
      const duration = moment.duration(arrival.diff(departure))
      const hours = duration.hours()
      const minutes = duration.minutes()

      return `${hours}h ${minutes}m`
    },

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

    getSeatClass (seat) {
      if (seat.unavailable) {
        return 'blueBack white--text mb-2'
      } else if (seat.selected) {
        return 'coyoteBack white--text mb-2'
      } else {
        return 'mb-2'
      }
    },

    toggleSeat (i) {
      if (this.e6 === 3) {
        if (this.seats[i].unavailable) {
          return
        }

        if (this.seats[i].selected) {
          // Si el asiento está seleccionado, deseleccionarlo
          this.seats[i].selected = false
          this.selectedSeats = this.seats.filter(seat => seat.selected)
        } else if (this.selectedSeats.length < this.pasajerosViaje) {
          // Si el asiento no está seleccionado y no se ha alcanzado el límite máximo, seleccionarlo
          this.seats[i].selected = true
          this.selectedSeats.push(this.seats[i])
        }
      } else if (this.e6 === 6 && this.tipoViaje === 'redondo') {
        if (this.seatsRegreso[i].unavailable) {
          return
        }

        if (this.seatsRegreso[i].selected) {
          // Si el asiento está seleccionado, deseleccionarlo
          this.seatsRegreso[i].selected = false
          this.selectedSeatsRegreso = this.seatsRegreso.filter(seat => seat.selected)
        } else if (this.selectedSeatsRegreso.length < this.pasajerosViaje) {
          // Si el asiento no está seleccionado y no se ha alcanzado el límite máximo, seleccionarlo
          this.seatsRegreso[i].selected = true
          this.selectedSeatsRegreso.push(this.seats[i])
        }
      }
    },

    cargarViajes (origen, destino, fecha) {
      this.validViaje = this.$refs.formViaje.validate()

      if (this.validViaje) {
        const params = {
          origenViaje: origen,
          destinoViaje: destino,
          fechaSalidaViaje: fecha,
          pasajerosViaje: this.pasajerosViaje
        }
        const url = '/routes'
        this.$axios.get(url, { params })
          .then((res) => {
            if (res.data.success) {
              this.routes = res.data.routes
              if (this.tipoViaje === 'redondo') {
                this.cargarViajesRegreso()
                if (this.routesRegreso.length > 0) {
                  this.e6 = 2
                }
              } else {
                this.e6 = 2
              }
            } else {
              // eslint-disable-next-line no-console
              console.log('ERROR: ', res.data.message)
            }
          })
          .catch((error) => {
            // eslint-disable-next-line no-console
            console.log('ERROR => ', error)
            this.mostrarAlerta('red', 'error', 'NO SE ENCONTRARON VIAJES DE IDA')
          })
      }
    },

    cargarViajesRegreso () {
      const params = {
        origenViaje: this.destinoViaje,
        destinoViaje: this.origenViaje,
        fechaSalidaViaje: this.fechaRegresoViaje,
        pasajerosViaje: this.pasajerosViaje
      }
      const url = '/routes'
      this.$axios.get(url, { params })
        .then((res) => {
          if (res.data.success) {
            this.routesRegreso = res.data.routes
          }
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log('ERROR => ', error)
          this.mostrarAlerta('red', 'error', 'NO SE ENCONTRARON VIAJES DE REGRESO')
        })
    },

    moreInfo (route) {
      this.routeInfo = route
      this.showMasInfo = true
    },

    selectTravel (route) {
      if (this.e6 === 2) {
        this.routeSelected = route
        const unavailableSeats = Object.keys(this.routeSelected.seats).filter(key => key.startsWith('A'))

        this.seats.forEach((seat) => {
          seat.unavailable = unavailableSeats.includes(seat.name)
        })
        this.e6 = 3
      } else if (this.e6 === 5 && this.tipoViaje === 'redondo') {
        this.routeSelectedRegreso = route
        const unavailableSeats = Object.keys(this.routeSelectedRegreso.seats).filter(key => key.startsWith('A'))

        this.seatsRegreso.forEach((seat) => {
          seat.unavailable = unavailableSeats.includes(seat.name)
        })
        this.e6 = 6
      }
    },

    validarAsientos () {
      if (this.e6 === 3) {
        if (this.selectedSeats.length.toString() === this.pasajerosViaje) {
          this.e6 = 4
        } else {
          this.mostrarAlerta('red', 'error', 'AUN NO SE SELECCIONAN TODOS LOS ASIENTOS SOLICITADOS')
        }
      } else if (this.e6 === 6) {
        if (this.selectedSeatsRegreso.length.toString() === this.pasajerosViaje) {
          this.e6 = 7
        } else {
          this.mostrarAlerta('red', 'error', 'AUN NO SE SELECCIONAN TODOS LOS ASIENTOS SOLICITADOS')
        }
      }
    },

    validarEquipaje () {
      if (this.e6 === 4) {
        this.validEquipaje = this.$refs.formEquipaje.validate()

        if (this.validEquipaje) {
          if (this.total !== 0) {
            this.total = 0
          }
          this.total = (this.routeSelected.price * Number(this.pasajerosViaje)) + (Number(this.equipajeExtra) * 100)
          this.e6 = 5
        }
      } else if (this.e6 === 7 && this.tipoViaje === 'redondo') {
        this.validEquipajeRegreso = this.$refs.formEquipajeRegreso.validate()

        if (this.validEquipajeRegreso) {
          if (this.total !== 0) {
            this.total = 0
          }
          this.total = (this.routeSelected.price * Number(this.pasajerosViaje)) + (this.routeSelectedRegreso.price * Number(this.pasajerosViaje)) + ((Number(this.equipajeExtra) + Number(this.equipajeExtraRegreso)) * 100)

          this.e6 = 8
        }
      }
    },

    async validarPago () {
      // if (this.total > 0) {
      const data = {
        name: 'VIAJE ' + this.tipoViaje.toUpperCase(),
        description: 'VIAJE DE ' + this.origenViaje + ' A ' + this.destinoViaje,
        unit_amount: this.total * 100
      }
      const url = '/create-checkout-session'

      try {
        const response = await this.$axios.post(url, data)
        if (response.data.success) {
          this.sessionId = response.data.session.id
          this.urlPay = response.data.session.url
          this.dialogPay = true
          const popup = window.open(this.urlPay, 'PAGAR BOLETOS', 'width=600,height=700')
          const interval = setInterval(() => {
            if (popup.closed) {
              clearInterval(interval)
              this.pruebaPago()
            }
          }, 1000)
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error creating checkout session:', error)
      }
      // }
    },

    async actualizarBD () {
      if (this.$store.state.user && this.$store.state.token) {
        this.user = this.$store.state.user.id
        this.token = this.$store.state.token
      } else {
        this.user = this.sessionId
      }

      const urlReservation = '/update-reservation'
      let dataReservation = {
        user: this.user,
        token: this.token,
        tipo: this.tipoViaje,
        origen: this.origenViaje,
        destino: this.destinoViaje,
        pasajeros: this.pasajerosViaje,
        asientos: this.selectedSeats,
        costo: this.total,
        routeId: this.routeSelected.routeId
      }
      let reservation = await this.agregarReservacion(urlReservation, dataReservation)
      this.reservation = reservation

      if (this.tipoViaje === 'redondo') {
        dataReservation = {
          user: this.user,
          token: this.token,
          tipo: this.tipoViaje,
          origen: this.destinoViaje,
          destino: this.origenViaje,
          pasajeros: this.pasajerosViaje,
          asientos: this.selectedSeatsRegreso,
          costo: this.total,
          routeId: this.routeSelectedRegreso.routeId
        }
        reservation = await this.agregarReservacion(urlReservation, dataReservation)
        this.reservationRegreso = reservation
      }

      const urlRoute = '/update-route'
      let dataRoute = {
        routeId: this.routeSelected.routeId,
        selectedSeats: this.selectedSeats,
        user: this.user,
        availableSeats: this.routeSelected.seats.available - this.selectedSeats.length,
        bookedSeats: this.routeSelected.seats.booked + this.selectedSeats.length
      }
      await this.actualizarRoute(urlRoute, dataRoute)

      if (this.tipoViaje === 'redondo') {
        dataRoute = {
          routeId: this.routeSelectedRegreso.routeId,
          selectedSeats: this.selectedSeatsRegreso,
          user: this.user,
          availableSeats: this.routeSelectedRegreso.seats.available - this.selectedSeatsRegreso.length,
          bookedSeats: this.routeSelectedRegreso.seats.booked + this.selectedSeatsRegreso.length
        }
        await this.actualizarRoute(urlRoute, dataRoute)
      }
    },

    agregarReservacion (url, data) {
      this.$axios.post(url, data)
        .then((res) => {
          if (res.data.success) {
            return res.data.reservation
          }
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log('ERROR AL AGREGAR RESERVACIÓN => ', error)
          this.mostrarAlerta('red', 'error', 'ERROR AL AGREGAR RESERVACIÓN')
        })
    },

    actualizarRoute (url, data) {
      this.$axios.post(url, data)
        .then((res) => {
          if (res.data.success) {
            // eslint-disable-next-line no-console
            console.log('SUCCESS => ', res.data.message)
          }
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log('ERROR AL ACTUALIZAR RUTA => ', error)
          this.mostrarAlerta('red', 'error', 'ERROR AL ACTUALIZAR RUTA')
        })
    },

    salirPago () {
      this.dialogPay = false
      this.urlPay = ''
      this.sessionId = ''
      this.successPay = ''
    },

    async pruebaPago () {
      const session = this.sessionId
      try {
        const res = await this.$axios.get(`https://api.stripe.com/v1/checkout/sessions/${session}`, {
          headers: {
            Authorization: `Bearer ${this.stripeKey}`,
            'Content-Type': 'application/json'
          }
        })
        if (res.data.payment_status === 'paid') {
          this.successPay = 'paid'
        } else if (res.data.payment_status === 'unpaid') {
          this.successPay = 'unpaid'
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error al validar el pago:', error)
      }
    }
  }
}
</script>

<style scoped>
.tour-card {
  width: 100%;
  max-width: 400px;
}

.alerta {
  position: fixed;
  top: 3.5%;
  left: 50%;
  z-index: 1000;
  transform: translate(-50%, -50%);
}
</style>
