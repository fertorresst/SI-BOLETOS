<template>
  <v-row class="ma-0 pa-0" style="background-color: aliceblue !important;">
    <v-col cols="12" align="center" justify="center" class="pa-0 ma-0">
      <v-row class="ma-0 pa-0 py-10 justify-center align-center">
        <v-stepper
          ref="stepper"
          v-model="e6"
          max-width="500"
          align="center"
          justify="center"
          vertical
          tile
          elevation="0"
          style="border-radius: 30px !important;"
          @change="scrollToStep"
        >
          <!-- STEP 1 -->
          <v-stepper-step
            :complete="e6 > 1"
            step="1"
            class="blueBack fontTitle"
            complete-icon="mdi-check black--text"
            color="goldBack black--text"
            style="border-radius: 30px 30px 0px 0px !important;"
          >
            <strong class="white--text">BUSCA TU VIAJE</strong>
            <small class="white--text">¿A dónde irás?</small>
          </v-stepper-step>

          <v-stepper-content step="1" class="px-8 ma-0">
            <v-card class="pa-0 ma-0 mt-5 mb-2" elevation="0">
              <v-card class="pa-3 ma-0 blueBack" style="border-radius: 30px;">
                <v-card-title class="ma-0 pa-0 white--text">
                  <v-row class="ma-0 pa-0 text-center fontTitle" justify="center" style="font-size: 20px;">
                    BIENVENIDO
                  </v-row>
                </v-card-title>

                <v-card-subtitle class="pa-0 ma-0 white--text">
                  <v-row class="ma-0 pa-0 fontDisplay" justify="center">
                    ¿A dónde viajaremos hoy?
                  </v-row>
                </v-card-subtitle>
              </v-card>

              <v-card-text class="ma-0 pa-0 mt-7" style="box-shadow: none !important;">
                <v-form
                  ref="formViaje"
                  v-model="validViaje"
                  class="text-center black--text fontDisplay ma-0 pa-0"
                  lazy-validation
                  @submit.prevent="submit"
                >
                  <v-row class="ma-0 pa-0">
                    <v-col cols="5" class="ma-0 pa-0">
                      <v-btn
                        style="margin: none !important; padding-inline: 10px;"
                        :color="tipoViaje === 'sencillo' ? '#8C6E39' : '#FFFFFF'"
                        :class="tipoViaje === 'sencillo' ? 'white--text' : 'black--text'"
                        :outlined="tipoViaje === 'sencillo' ? false : true"
                        elevation="0"
                        width="100%"
                        rounded
                        @click="tipoViaje = 'sencillo'"
                      >
                        <v-row class="ma-0 pa-0" align="center" justify="center">
                          <v-icon class="ma-0 pa-0">
                            mdi-keyboard-tab
                          </v-icon>
                          <span class="ma-0 pa-0">&nbsp;SENCILLO</span>
                        </v-row>
                      </v-btn>
                    </v-col>

                    <v-col cols="2" class="ma-0 pa-0" />

                    <v-col cols="5" class="ma-0 pa-0">
                      <v-btn
                        :color="tipoViaje === 'redondo' ? '#8C6E39' : '#FFFFFF'"
                        :class="tipoViaje === 'redondo' ? 'white--text' : 'black--text'"
                        :outlined="tipoViaje === 'redondo' ? false : true"
                        elevation="0"
                        rounded
                        width="100%"
                        class="ma-0 pa-0"
                        @click="tipoViaje = 'redondo'"
                      >
                        <v-row class="ma-0 pa-0" align="center" justify="center">
                          <v-icon class="ma-0 pa-0">
                            mdi-autorenew
                          </v-icon>
                          <span class="ma-0 pa-0">&nbsp;REDONDO</span>
                        </v-row>
                      </v-btn>
                    </v-col>
                  </v-row>

                  <v-row class="ma-0 pa-0 mt-7 text-center" align="center" justify="center">
                    <v-col cols="12" class="ma-0 pa-0">
                      <v-row class="ma-0 pa-0">
                        <v-col class="ma-0 pa-0">
                          <h4>Origen</h4>

                          <v-combobox
                            v-model="origenViaje"
                            :items="itemsStep1"
                            hide-selected
                            solo
                            flat
                            placeholder="Selecciona la ciudad de origen"
                            dense
                            outlined
                            rounded
                            required
                            :rules="origenRule"
                          />
                        </v-col>
                      </v-row>

                      <v-row class="ma-0 pa-0">
                        <v-col class="ma-0 pa-0">
                          <h4>Destino</h4>

                          <v-combobox
                            v-model="destinoViaje"
                            :items="itemsStep1"
                            hide-selected
                            solo
                            flat
                            placeholder="Selecciona la ciudad de destino"
                            dense
                            outlined
                            rounded
                            required
                            :rules="destinoRule"
                          />
                          <h4>Fecha de Salida</h4>

                          <v-text-field
                            ref="fechaSalida"
                            v-model="fechaSalidaViaje"
                            type="date"
                            class="ma-0 pa-0"
                            rounded
                            dense
                            required
                            outlined
                            prepend-inner-icon="mdi-calendar"
                            :min="today()"
                            :rules="requiredRule"
                            @focus="validateField('fechaSalida')"
                            @blur="validateField('fechaSalida')"
                          />
                        </v-col>
                      </v-row>

                      <h4 v-if="tipoViaje === 'redondo'">
                        Fecha de Regreso
                      </h4>
                      <v-text-field
                        v-if="tipoViaje === 'redondo'"
                        ref="fechaRegreso"
                        v-model="fechaRegresoViaje"
                        type="date"
                        rounded
                        dense
                        required
                        outlined
                        prepend-inner-icon="mdi-calendar"
                        :min="today()"
                        :rules="fechaRegresoRule"
                        @focus="validateField('fechaRegreso')"
                        @blur="validateField('fechaRegreso')"
                      />

                      <h4>Pasajeros</h4>
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
                        :rules="pasajerosRule"
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
            style="border-radius: 30px 30px 0px 0px !important;"
          >
            <strong class="white--text">SELECCIONA TU VIAJE DE IDA</strong>
            <small class="white--text">¿Cuál horario es tu mejor opción?</small>
          </v-stepper-step>

          <v-stepper-content step="2" class="fontDisplay px-8 ma-0">
            <small class="ma-0 pa-0 mt-5"><strong>{{ fechaFormateada(fechaSalidaViaje) }}</strong></small>
            <v-row align="center" justify="center" class="pa-3 ma-0 mt-5">
              <v-col cols="5" class="fontTitle pa-0 ma-0">
                <h3>
                  {{ origenViaje }}
                </h3>
              </v-col>

              <v-col cols="2" class="fontTitle pa-0 ma-0">
                <v-icon large color="#8C6E39">
                  mdi-bus-articulated-front
                </v-icon>
              </v-col>

              <v-col cols="5" class="fontTitle pa-0 ma-0">
                <h3>
                  {{ destinoViaje }}
                </h3>
              </v-col>
            </v-row>

            <v-row class="ma-0 pa-0 my-4">
              <v-col v-for="r in routes" :key="r.routeId" class="ma-0 pa-0" cols="12">
                <v-card class="pa-0 ma-0 white--text mb-4" style="border-radius: 30px;">
                  <v-card-title class="ma-0 pa-0 py-3 headline text-center blueBack fontTitle">
                    <v-row class="pa-0 ma-0">
                      <v-col cols="6" class="fontTitle text-center pa-0 ma-0">
                        <small>Salida:</small>
                        <h6>{{ getHour(r.departureTime) }}</h6>
                      </v-col>
                      <v-col cols="6" class="fontTitle text-center pa-0 ma-0">
                        <small>Precio:</small>
                        <h6>${{ r.price }} c/u</h6>
                      </v-col>
                    </v-row>
                  </v-card-title>

                  <v-divider color="white" />

                  <v-card-subtitle class="ma-0 pa-0 py-5">
                    <v-row class="text-center ma-0 pa-0">
                      <v-col class="ma-0 pa-0" cols="12" style="font-size: 15px">
                        <span>Asientos Disponibles: {{ r.seats.available }} asientos</span>
                        <br>
                        <span>Duración: {{ getDuration(r.departureTime, r.arrivalTime) }}</span>
                      </v-col>
                    </v-row>
                  </v-card-subtitle>

                  <v-card-actions class="d-flex ma-0 pa-5">
                    <v-col cols="5" class="ma-0 pa-0">
                      <v-btn
                        color="#8C6E39"
                        class="black--text mb-3 fontTitle"
                        rounded
                        text
                        width="100%"
                        @click="moreInfo(r)"
                      >
                        MAS INFO
                      </v-btn>
                    </v-col>

                    <v-col cols="2" class="ma-0 pa-0" />

                    <v-col cols="5" class="ma-0 pa-0">
                      <v-btn
                        color="#8C6E39"
                        class="white--text mb-3 fontTitle"
                        rounded
                        width="100%"
                        @click="selectTravel(r)"
                      >
                        SELECCIONAR
                      </v-btn>
                    </v-col>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>

            <v-btn
              color="transparent"
              class="mb-4 fontTitle"
              elevation="0"
              width="122px"
              rounded
              @click="e6 = 1"
            >
              ATRÁS
            </v-btn>

            <v-dialog v-model="showMasInfo" max-width="400">
              <v-card class="fontDisplay" style="border-radius: 30px !important;">
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
                      color="transparent"
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

                <v-card-text class="ma-0 pa-0 py-5">
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
            style="border-radius: 30px 30px 0px 0px !important;"
          >
            <strong class="white--text">ELIGE TUS ASIENTOS DE IDA</strong>
            <small class="white--text">¿Cuál asiento es más cómo para ti?</small>
          </v-stepper-step>

          <v-stepper-content step="3" class="px-8 ma-0">
            <v-card elevation="0" class="mb-5">
              <v-row class="fontTitle ma-0 pa-0 mt-3">
                <v-col cols="12">
                  <h1>Frontal</h1>
                </v-col>
              </v-row>

              <v-row class="fontDisplay ma-0 pa-0 my-6" align="center" justify="center">
                <v-card class="ma-0 pa-0 px-1 py-4" width="45%" height="100%" style="border-radius: 30px!important; border: black 1px solid">
                  <v-row class="ma-0 pa-0">
                    <!-- Renglón 1 -->
                    <v-col cols="12" class="ma-0 pa-0">
                      <v-row class="ma-0 pa-0">
                        <v-col cols="5" class="ma-0 pa-0 d-flex justify-center">
                          <v-icon class="ma-0 pa-0" style="background-color: transparent !important; color: #0A263D; border: none !important;">
                            mdi-steering
                          </v-icon>
                        </v-col>
                      </v-row>
                    </v-col>

                    <v-col cols="12" class="ma-0 pa-0">
                      <v-row class="ma-0 pa-0">
                        <v-col cols="5" class="ma-0 pa-0 d-flex justify-center">
                          <v-btn
                            class="blueBack white--text mt-0 pt-0"
                            elevation="0"
                            outlined
                            rounded
                            icon
                          >
                            <v-icon>mdi-seat</v-icon>
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-col>

                    <!-- Renglón 1 -->
                    <v-col cols="12" class="ma-0 pa-0 d-flex justify-center">
                      <v-btn
                        :class="seats[0].selected ? 'coyoteBack white--text' : getSeatClass(seats[0])"
                        elevation="0"
                        style="margin: 5px 2px;"
                        outlined
                        rounded
                        icon
                        @click="toggleSeat(1)"
                      >
                        <v-icon>mdi-seat</v-icon>
                      </v-btn>

                      <v-btn
                        :class="seats[1].selected ? 'coyoteBack white--text' : getSeatClass(seats[1])"
                        elevation="0"
                        style="margin: 5px 2px;"
                        outlined
                        rounded
                        icon
                        @click="toggleSeat(2)"
                      >
                        <v-icon>mdi-seat</v-icon>
                      </v-btn>

                      <v-spacer />

                      <v-btn
                        :class="seats[2].selected ? 'coyoteBack white--text' : getSeatClass(seats[2])"
                        elevation="0"
                        style="margin: 5px 2px;"
                        outlined
                        rounded
                        icon
                        @click="toggleSeat(3)"
                      >
                        <v-icon>mdi-seat</v-icon>
                      </v-btn>

                      <v-btn
                        :class="seats[3].selected ? 'coyoteBack white--text' : getSeatClass(seats[3])"
                        elevation="0"
                        style="margin: 5px 2px;"
                        outlined
                        rounded
                        icon
                        @click="toggleSeat(4)"
                      >
                        <v-icon>mdi-seat</v-icon>
                      </v-btn>
                    </v-col>

                    <!-- Renglón 2 -->
                    <v-col cols="12" class="ma-0 pa-0 d-flex justify-center">
                      <v-btn
                        :class="seats[4].selected ? 'coyoteBack white--text' : getSeatClass(seats[4])"
                        elevation="0"
                        style="margin: 5px 2px;"
                        outlined
                        rounded
                        icon
                        @click="toggleSeat(5)"
                      >
                        <v-icon>mdi-seat</v-icon>
                      </v-btn>

                      <v-btn
                        :class="seats[5].selected ? 'coyoteBack white--text' : getSeatClass(seats[5])"
                        elevation="0"
                        style="margin: 5px 2px;"
                        outlined
                        rounded
                        icon
                        @click="toggleSeat(6)"
                      >
                        <v-icon>mdi-seat</v-icon>
                      </v-btn>

                      <v-spacer />

                      <v-btn
                        :class="seats[6].selected ? 'coyoteBack white--text' : getSeatClass(seats[6])"
                        elevation="0"
                        style="margin: 5px 2px;"
                        outlined
                        rounded
                        icon
                        @click="toggleSeat(7)"
                      >
                        <v-icon>mdi-seat</v-icon>
                      </v-btn>

                      <v-btn
                        :class="seats[7].selected ? 'coyoteBack white--text' : getSeatClass(seats[7])"
                        elevation="0"
                        style="margin: 5px 2px;"
                        outlined
                        rounded
                        icon
                        @click="toggleSeat(8)"
                      >
                        <v-icon>mdi-seat</v-icon>
                      </v-btn>
                    </v-col>

                    <!-- Renglón 3 -->
                    <v-col cols="12" class="ma-0 pa-0 d-flex justify-center">
                      <v-btn
                        :class="seats[8].selected ? 'coyoteBack white--text' : getSeatClass(seats[8])"
                        elevation="0"
                        style="margin: 5px 2px;"
                        outlined
                        rounded
                        icon
                        @click="toggleSeat(9)"
                      >
                        <v-icon>mdi-seat</v-icon>
                      </v-btn>

                      <v-btn
                        :class="seats[9].selected ? 'coyoteBack white--text' : getSeatClass(seats[9])"
                        elevation="0"
                        style="margin: 5px 2px;"
                        outlined
                        rounded
                        icon
                        @click="toggleSeat(10)"
                      >
                        <v-icon>mdi-seat</v-icon>
                      </v-btn>

                      <v-spacer />

                      <v-btn
                        :class="seats[10].selected ? 'coyoteBack white--text' : getSeatClass(seats[10])"
                        elevation="0"
                        style="margin: 5px 2px;"
                        outlined
                        rounded
                        icon
                        @click="toggleSeat(11)"
                      >
                        <v-icon>mdi-seat</v-icon>
                      </v-btn>

                      <v-btn
                        :class="seats[11].selected ? 'coyoteBack white--text' : getSeatClass(seats[11])"
                        elevation="0"
                        style="margin: 5px 2px;"
                        outlined
                        rounded
                        icon
                        @click="toggleSeat(12)"
                      >
                        <v-icon>mdi-seat</v-icon>
                      </v-btn>
                    </v-col>

                    <!-- Renglón 4 -->
                    <v-col cols="12" class="ma-0 pa-0 d-flex justify-center">
                      <v-btn
                        :class="seats[12].selected ? 'coyoteBack white--text' : getSeatClass(seats[12])"
                        elevation="0"
                        style="margin: 5px 2px;"
                        outlined
                        rounded
                        icon
                        @click="toggleSeat(13)"
                      >
                        <v-icon>mdi-seat</v-icon>
                      </v-btn>

                      <v-btn
                        :class="seats[13].selected ? 'coyoteBack white--text' : getSeatClass(seats[13])"
                        elevation="0"
                        style="margin: 5px 2px;"
                        outlined
                        rounded
                        icon
                        @click="toggleSeat(14)"
                      >
                        <v-icon>mdi-seat</v-icon>
                      </v-btn>

                      <v-spacer />

                      <v-btn
                        :class="seats[14].selected ? 'coyoteBack white--text' : getSeatClass(seats[14])"
                        elevation="0"
                        style="margin: 5px 2px;"
                        outlined
                        rounded
                        icon
                        @click="toggleSeat(15)"
                      >
                        <v-icon>mdi-seat</v-icon>
                      </v-btn>

                      <v-btn
                        :class="seats[15].selected ? 'coyoteBack white--text' : getSeatClass(seats[15])"
                        elevation="0"
                        style="margin: 5px 2px;"
                        outlined
                        rounded
                        icon
                        @click="toggleSeat(16)"
                      >
                        <v-icon>mdi-seat</v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-card>
              </v-row>

              <v-row class="fontTitle ma-0 pa-0">
                <v-col cols="12">
                  <h1>Posterior</h1>
                </v-col>
              </v-row>

              <v-divider class="ma-3 pa-0" />

              <v-row class="ma-0 pa-0" align="center" justify="center" style="max-width: 300px;">
                <v-col cols="12" class="ma-0 pa-0">
                  <v-list class="ma-0 pa-0">
                    <v-list-item-group small class="ma-0 pa-0">
                      <v-row
                        v-for="(item, i) in itemsInfoStep3"
                        :key="i"
                        class="ma-0 pa-0 my-2 align-center justify-center"
                      >
                        <v-list-item-icon class="ma-0 mx-2 px-0  align-center justify-center">
                          <v-icon :color="item.color" class="mx-0 px-0  align-center justify-center">
                            {{ item.icon }}
                          </v-icon>
                        </v-list-item-icon>

                        <small class="text-center black--text ma-0 pa-0">
                          {{ item.text }}
                        </small>
                      </v-row>
                    </v-list-item-group>
                  </v-list>
                </v-col>
              </v-row>

              <v-row v-if="selectedSeats.length > 0" align="center" justify="center" class="fontDisplay" style="max-width: 300px;">
                <v-col
                  cols="12"
                >
                  <small>ASIENTOS SELECCIONADOS:</small>
                  <br>
                  <small
                    v-for="(item, i) in selectedSeats"
                    :key="i"
                  >
                    {{ item }}&nbsp;
                  </small>
                </v-col>
              </v-row>
            </v-card>

            <v-row class="ma-0 pa-0 mt-3 mx-3">
              <v-col cols="5" class="ma-0 pa-0">
                <v-btn
                  color="#8C6E39"
                  width="100%"
                  class="black--text mb-4 fontTitle"
                  elevation="0"
                  rounded
                  text
                  @click="e6 = 2"
                >
                  ATRÁS
                </v-btn>
              </v-col>

              <v-col cols="2" class="ma-0 pa-0" />

              <v-col cols="5" class="ma-0 pa-0">
                <v-btn
                  color="#8C6E39"
                  class="white--text mb-4 fontTitle"
                  elevation="0"
                  width="100%"
                  rounded
                  @click="validarAsientos()"
                >
                  CONTINUAR
                </v-btn>
              </v-col>
            </v-row>
          </v-stepper-content>

          <!-- STEP 4 -->
          <v-stepper-step
            :complete="e6 > 4"
            step="4"
            class="blueBack fontTitle"
            complete-icon="mdi-check black--text"
            color="goldBack black--text"
            style="border-radius: 30px 30px 0px 0px !important;"
          >
            <strong class="white--text">EQUIPAJE EXTRA DE IDA</strong>
            <small class="white--text">¿Llevarás equipaje extra?</small>
          </v-stepper-step>

          <v-stepper-content step="4" class="px-8 ma-0">
            <v-card elevation="0" class="ma-0 pa-0 mb-5 fontDisplay">
              <v-card-text class="ma-0 pa-3 py-5 white--text" style="background-color: #B71C1C; border-radius: 30px; font-size: 15px">
                <strong class="text-center">REGLAS DEL EQUIPAJE EXTRA</strong>
                <br><br>
                <small class="text-justify">• Cada pasajero podrá llevar una mochila de tamaño escolar y una maleta que no exceda las siguientes medidas: 60x42x33.</small>
                <br>
                <small class="text-justify">• En caso de exceder estas dimensiones es necesario reportarlo en este apartado.</small>
                <br>
                <small class="text-justify">• El costo por exceso de equipaje es de $100 por pasajero y está limitado a una maleta de las siguientes medidas: 70x46x35.</small>
              </v-card-text>

              <v-card-text class="ma-0 pa-0 mt-10">
                <h4>¿Cuántos pasajeros llevarán equipaje extra?</h4>

                <v-form
                  ref="formEquipaje"
                  v-model="validEquipaje"
                  class="text-center black--text fontDisplay mt-3"
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

            <v-row class="ma-0 pa-0">
              <v-col cols="5" class="ma-0 pa-0">
                <v-btn
                  color="#8C6E39"
                  class="black--text mb-4 fontTitle"
                  elevation="0"
                  rounded
                  width="100%"
                  text
                  @click="e6 = 3"
                >
                  ATRÁS
                </v-btn>
              </v-col>

              <v-col cols="2" class="ma-0 pa-0" />

              <v-col cols="5" class="ma-0 pa-0">
                <v-btn
                  color="#8C6E39"
                  class="white--text mb-4 fontTitle"
                  elevation="0"
                  width="100%"
                  rounded
                  @click="validarEquipaje()"
                >
                  CONTINUAR
                </v-btn>
              </v-col>
            </v-row>
          </v-stepper-content>

          <!-- STEP 5 VIAJE REDONDO -->
          <v-stepper-step
            v-if="tipoViaje === 'redondo'"
            :complete="e6 > 5"
            step="5"
            class="blueBack fontTitle"
            complete-icon="mdi-check black--text"
            color="goldBack black--text"
            style="border-radius: 30px 30px 0px 0px !important;"
          >
            <strong class="white--text">SELECCIONA TU VIAJE DE REGRESO</strong>
            <small class="white--text">¿Cuál horario es tu mejor opción?</small>
          </v-stepper-step>

          <v-stepper-content v-if="tipoViaje === 'redondo'" step="5" class="fontDisplay px-8 ma-0">
            <small><strong>{{ fechaFormateada(fechaRegresoViaje) }}</strong></small>
            <v-row align="center" justify="center" class="pa-3 ma-0 mt-5">
              <v-col cols="5" class="fontTitle pa-0 ma-0">
                <h3>
                  {{ destinoViaje }}
                </h3>
              </v-col>

              <v-col cols="2" class="fontTitle pa-0 ma-0">
                <v-icon large color="#8C6E39">
                  mdi-bus-articulated-front
                </v-icon>
              </v-col>

              <v-col cols="5" class="fontTitle pa-0 ma-0">
                <h3>
                  {{ origenViaje }}
                </h3>
              </v-col>
            </v-row>

            <v-row class="ma-0 pa-0 my-4">
              <v-col v-for="r in routesRegreso" :key="r.routeId" class="ma-0 pa-0" cols="12">
                <v-card class="pa-0 ma-0 white--text mb-4" style="border-radius: 30px;">
                  <v-card-title class="pa-0 ma-0 py-3 headline text-center blueBack fontTitle">
                    <v-row class="pa-0 ma-0">
                      <v-col cols="6" class="pa-0 ma-0 fontTitle text-center">
                        <small>Salida:</small>
                        <h6>{{ getHour(r.departureTime) }}</h6>
                      </v-col>
                      <v-col cols="6" class="pa-0 ma-0 fontTitle text-center">
                        <small>Precio:</small>
                        <h6>${{ r.price }} c/u</h6>
                      </v-col>
                    </v-row>
                  </v-card-title>

                  <v-divider color="white" />

                  <v-card-subtitle class="ma-0 pa-0 py-5">
                    <v-row class="ma-0 pa-0 text-center">
                      <v-col class="ma-0 pa-0" cols="12" style="font-size: 15px">
                        <span>Lugares disponibles: {{ r.seats.available }} asientos</span>
                        <br>
                        <span>Duración: {{ getDuration(r.departureTime, r.arrivalTime) }}</span>
                      </v-col>
                    </v-row>
                  </v-card-subtitle>

                  <v-card-actions class="d-flex ma-0 pa-5">
                    <v-col cols="5" class="ma-0 pa-0">
                      <v-btn
                        color="#8C6E39"
                        class="black--text mb-3 fontTitle"
                        rounded
                        text
                        width="100%"
                        @click="moreInfo(r)"
                      >
                        MAS INFO
                      </v-btn>
                    </v-col>

                    <v-col cols="2" class="ma-0 pa-0" />

                    <v-col cols="5" class="ma-0 pa-0">
                      <v-btn
                        color="#8C6E39"
                        class="white--text mb-3 fontTitle"
                        rounded
                        width="100%"
                        @click="selectTravel(r)"
                      >
                        SELECCIONAR
                      </v-btn>
                    </v-col>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>

            <v-btn
              color="transparent"
              class="mb-4 fontTitle"
              elevation="0"
              width="122px"
              rounded
              @click="e6 = 4"
            >
              ATRÁS
            </v-btn>

            <v-dialog v-model="showMasInfo" max-width="400">
              <v-card class="fontDisplay" style="border-radius: 30px !important;">
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
                      color="transparent"
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

                <v-card-text class="ma-0 pa-0 py-5">
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

          <!-- STEP 6 ASIENTOS REDONDO -->
          <v-stepper-step
            v-if="tipoViaje === 'redondo'"
            :complete="e6 > 6"
            step="6"
            class="blueBack fontTitle"
            complete-icon="mdi-check black--text"
            color="goldBack black--text"
            style="border-radius: 30px 30px 0px 0px !important;"
          >
            <strong class="white--text">ELIGE TUS ASIENTOS DE REGRESO</strong>
            <small class="white--text">¿Cuál asiento es más cómo para ti?</small>
          </v-stepper-step>

          <v-stepper-content v-if="tipoViaje === 'redondo'" step="6" class="px-8 ma-0">
            <v-card elevation="0" class="mb-5">
              <v-row class="fontTitle ma-0 pa-0 mt-3">
                <v-col cols="12">
                  <h1>Frontal</h1>
                </v-col>
              </v-row>

              <v-row class="fontDisplay ma-0 pa-0 my-6" align="center" justify="center">
                <v-card class="ma-0 pa-0 px-1 py-4" width="45%" height="100%" style="border-radius: 30px!important; border: black 1px solid">
                  <v-row class="ma-0 pa-0">
                    <!-- Renglón 1 -->
                    <v-col cols="12" class="ma-0 pa-0">
                      <v-row class="ma-0 pa-0">
                        <v-col cols="5" class="ma-0 pa-0 d-flex justify-center">
                          <v-icon class="ma-0 pa-0" style="background-color: transparent !important; color: #0A263D; border: none !important;">
                            mdi-steering
                          </v-icon>
                        </v-col>
                      </v-row>
                    </v-col>

                    <v-col cols="12" class="ma-0 pa-0">
                      <v-row class="ma-0 pa-0">
                        <v-col cols="5" class="ma-0 pa-0 d-flex justify-center">
                          <v-btn
                            class="blueBack white--text mt-0 pt-0"
                            elevation="0"
                            outlined
                            rounded
                            icon
                          >
                            <v-icon>mdi-seat</v-icon>
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-col>

                    <!-- Renglón 1 -->
                    <v-col cols="12" class="ma-0 pa-0 d-flex justify-center">
                      <v-btn
                        :class="seatsRegreso[0].selected ? 'coyoteBack white--text' : getSeatClass(seatsRegreso[0])"
                        elevation="0"
                        style="margin: 5px 2px;"
                        outlined
                        rounded
                        icon
                        @click="toggleSeat(1)"
                      >
                        <v-icon>mdi-seat</v-icon>
                      </v-btn>

                      <v-btn
                        :class="seatsRegreso[1].selected ? 'coyoteBack white--text' : getSeatClass(seatsRegreso[1])"
                        elevation="0"
                        style="margin: 5px 2px;"
                        outlined
                        rounded
                        icon
                        @click="toggleSeat(2)"
                      >
                        <v-icon>mdi-seat</v-icon>
                      </v-btn>

                      <v-spacer />

                      <v-btn
                        :class="seatsRegreso[2].selected ? 'coyoteBack white--text' : getSeatClass(seatsRegreso[2])"
                        elevation="0"
                        style="margin: 5px 2px;"
                        outlined
                        rounded
                        icon
                        @click="toggleSeat(3)"
                      >
                        <v-icon>mdi-seat</v-icon>
                      </v-btn>

                      <v-btn
                        :class="seatsRegreso[3].selected ? 'coyoteBack white--text' : getSeatClass(seatsRegreso[3])"
                        elevation="0"
                        style="margin: 5px 2px;"
                        outlined
                        rounded
                        icon
                        @click="toggleSeat(4)"
                      >
                        <v-icon>mdi-seat</v-icon>
                      </v-btn>
                    </v-col>

                    <!-- Renglón 2 -->
                    <v-col cols="12" class="ma-0 pa-0 d-flex justify-center">
                      <v-btn
                        :class="seatsRegreso[4].selected ? 'coyoteBack white--text' : getSeatClass(seatsRegreso[4])"
                        elevation="0"
                        style="margin: 5px 2px;"
                        outlined
                        rounded
                        icon
                        @click="toggleSeat(5)"
                      >
                        <v-icon>mdi-seat</v-icon>
                      </v-btn>

                      <v-btn
                        :class="seatsRegreso[5].selected ? 'coyoteBack white--text' : getSeatClass(seatsRegreso[5])"
                        elevation="0"
                        style="margin: 5px 2px;"
                        outlined
                        rounded
                        icon
                        @click="toggleSeat(6)"
                      >
                        <v-icon>mdi-seat</v-icon>
                      </v-btn>

                      <v-spacer />

                      <v-btn
                        :class="seatsRegreso[6].selected ? 'coyoteBack white--text' : getSeatClass(seatsRegreso[6])"
                        elevation="0"
                        style="margin: 5px 2px;"
                        outlined
                        rounded
                        icon
                        @click="toggleSeat(7)"
                      >
                        <v-icon>mdi-seat</v-icon>
                      </v-btn>

                      <v-btn
                        :class="seatsRegreso[7].selected ? 'coyoteBack white--text' : getSeatClass(seatsRegreso[7])"
                        elevation="0"
                        style="margin: 5px 2px;"
                        outlined
                        rounded
                        icon
                        @click="toggleSeat(8)"
                      >
                        <v-icon>mdi-seat</v-icon>
                      </v-btn>
                    </v-col>

                    <!-- Renglón 3 -->
                    <v-col cols="12" class="ma-0 pa-0 d-flex justify-center">
                      <v-btn
                        :class="seatsRegreso[8].selected ? 'coyoteBack white--text' : getSeatClass(seatsRegreso[8])"
                        elevation="0"
                        style="margin: 5px 2px;"
                        outlined
                        rounded
                        icon
                        @click="toggleSeat(9)"
                      >
                        <v-icon>mdi-seat</v-icon>
                      </v-btn>

                      <v-btn
                        :class="seatsRegreso[9].selected ? 'coyoteBack white--text' : getSeatClass(seatsRegreso[9])"
                        elevation="0"
                        style="margin: 5px 2px;"
                        outlined
                        rounded
                        icon
                        @click="toggleSeat(10)"
                      >
                        <v-icon>mdi-seat</v-icon>
                      </v-btn>

                      <v-spacer />

                      <v-btn
                        :class="seatsRegreso[10].selected ? 'coyoteBack white--text' : getSeatClass(seatsRegreso[10])"
                        elevation="0"
                        style="margin: 5px 2px;"
                        outlined
                        rounded
                        icon
                        @click="toggleSeat(11)"
                      >
                        <v-icon>mdi-seat</v-icon>
                      </v-btn>

                      <v-btn
                        :class="seatsRegreso[11].selected ? 'coyoteBack white--text' : getSeatClass(seatsRegreso[11])"
                        elevation="0"
                        style="margin: 5px 2px;"
                        outlined
                        rounded
                        icon
                        @click="toggleSeat(12)"
                      >
                        <v-icon>mdi-seat</v-icon>
                      </v-btn>
                    </v-col>

                    <!-- Renglón 4 -->
                    <v-col cols="12" class="ma-0 pa-0 d-flex justify-center">
                      <v-btn
                        :class="seatsRegreso[12].selected ? 'coyoteBack white--text' : getSeatClass(seatsRegreso[12])"
                        elevation="0"
                        style="margin: 5px 2px;"
                        outlined
                        rounded
                        icon
                        @click="toggleSeat(13)"
                      >
                        <v-icon>mdi-seat</v-icon>
                      </v-btn>

                      <v-btn
                        :class="seatsRegreso[13].selected ? 'coyoteBack white--text' : getSeatClass(seatsRegreso[13])"
                        elevation="0"
                        style="margin: 5px 2px;"
                        outlined
                        rounded
                        icon
                        @click="toggleSeat(14)"
                      >
                        <v-icon>mdi-seat</v-icon>
                      </v-btn>

                      <v-spacer />

                      <v-btn
                        :class="seatsRegreso[14].selected ? 'coyoteBack white--text' : getSeatClass(seatsRegreso[14])"
                        elevation="0"
                        style="margin: 5px 2px;"
                        outlined
                        rounded
                        icon
                        @click="toggleSeat(15)"
                      >
                        <v-icon>mdi-seat</v-icon>
                      </v-btn>

                      <v-btn
                        :class="seatsRegreso[15].selected ? 'coyoteBack white--text' : getSeatClass(seatsRegreso[15])"
                        elevation="0"
                        style="margin: 5px 2px;"
                        outlined
                        rounded
                        icon
                        @click="toggleSeat(16)"
                      >
                        <v-icon>mdi-seat</v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-card>
              </v-row>

              <v-row class="fontTitle ma-0 pa-0">
                <v-col cols="12">
                  <h1>Posterior</h1>
                </v-col>
              </v-row>

              <v-divider class="ma-3 pa-0" />

              <v-row class="ma-0 pa-0" align="center" justify="center" style="max-width: 300px;">
                <v-col cols="12" class="ma-0 pa-0">
                  <v-list class="ma-0 pa-0">
                    <v-list-item-group small class="ma-0 pa-0">
                      <v-row
                        v-for="(item, i) in itemsInfoStep3"
                        :key="i"
                        class="ma-0 pa-0 my-2 align-center justify-center"
                      >
                        <v-list-item-icon class="ma-0 mx-2 px-0  align-center justify-center">
                          <v-icon :color="item.color" class="mx-0 px-0  align-center justify-center">
                            {{ item.icon }}
                          </v-icon>
                        </v-list-item-icon>

                        <small class="text-center black--text ma-0 pa-0">
                          {{ item.text }}
                        </small>
                      </v-row>
                    </v-list-item-group>
                  </v-list>
                </v-col>
              </v-row>

              <v-row v-if="selectedSeatsRegreso.length > 0" align="center" justify="center" class="fontDisplay" style="max-width: 300px;">
                <v-col
                  cols="12"
                >
                  <small>Asientos seleccionados:</small>
                  <br>
                  <small
                    v-for="(item, i) in selectedSeatsRegreso"
                    :key="i"
                  >
                    {{ item }}&nbsp;
                  </small>
                </v-col>
              </v-row>
            </v-card>

            <v-row class="ma-0 pa-0 mt-3 mx-3">
              <v-col cols="5" class="ma-0 pa-0">
                <v-btn
                  color="#8C6E39"
                  width="100%"
                  class="black--text mb-4 fontTitle"
                  elevation="0"
                  rounded
                  text
                  @click="e6 = 5"
                >
                  ATRÁS
                </v-btn>
              </v-col>

              <v-col cols="2" class="ma-0 pa-0" />

              <v-col cols="5" class="ma-0 pa-0">
                <v-btn
                  color="#8C6E39"
                  class="white--text mb-4 fontTitle"
                  elevation="0"
                  width="100%"
                  rounded
                  @click="validarAsientos()"
                >
                  CONTINUAR
                </v-btn>
              </v-col>
            </v-row>
          </v-stepper-content>

          <!-- STEP EQUIPAJE REDONDO -->
          <v-stepper-step
            v-if="tipoViaje === 'redondo'"
            :complete="e6 > 7"
            step="7"
            class="blueBack fontTitle"
            complete-icon="mdi-check black--text"
            color="goldBack black--text"
            style="border-radius: 30px 30px 0px 0px !important;"
          >
            <strong class="white--text">EQUIPAJE EXTRA DE IDA</strong>
            <small class="white--text">¿Llevarás equipaje extra?</small>
          </v-stepper-step>

          <v-stepper-content v-if="tipoViaje === 'redondo'" step="7" class="px-8 ma-0">
            <v-card elevation="0" class="ma-0 pa-0 mb-5 fontDisplay">
              <v-card-text class="ma-0 pa-3 py-5 white--text" style="background-color: #B71C1C; border-radius: 30px; font-size: 15px">
                <strong class="text-center">REGLAS DEL EQUIPAJE EXTRA</strong>
                <br><br>
                <small class="text-justify">• Cada pasajero podrá llevar una mochila de tamaño escolar y una maleta que no exceda las siguientes medidas: 60x42x33.</small>
                <br>
                <small class="text-justify">• En caso de exceder estas dimensiones es necesario reportarlo en este apartado.</small>
                <br>
                <small class="text-justify">• El costo por exceso de equipaje es de $100 por pasajero y está limitado a una maleta de las siguientes medidas: 70x46x35.</small>
              </v-card-text>

              <v-card-text class="ma-0 pa-0 mt-10">
                <h4>¿Cuántos pasajeros llevarán equipaje extra?</h4>

                <v-form
                  ref="formEquipajeRegreso"
                  v-model="validEquipajeRegreso"
                  class="text-center black--text fontDisplay mt-3"
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

            <v-row class="ma-0 pa-0">
              <v-col cols="5" class="ma-0 pa-0">
                <v-btn
                  color="#8C6E39"
                  class="black--text mb-4 fontTitle"
                  elevation="0"
                  rounded
                  width="100%"
                  text
                  @click="e6 = 6"
                >
                  ATRÁS
                </v-btn>
              </v-col>

              <v-col cols="2" class="ma-0 pa-0" />

              <v-col cols="5" class="ma-0 pa-0">
                <v-btn
                  color="#8C6E39"
                  class="white--text mb-4 fontTitle"
                  elevation="0"
                  width="100%"
                  rounded
                  @click="validarEquipaje()"
                >
                  CONTINUAR
                </v-btn>
              </v-col>
            </v-row>
          </v-stepper-content>

          <!-- STEP PAGO -->
          <v-stepper-step
            :complete="tipoViaje === 'sencillo' ? e6 > 5 : e6 > 8"
            :step="tipoViaje === 'sencillo' ? '5' : '8'"
            class="blueBack fontTitle"
            complete-icon="mdi-check black--text"
            color="goldBack black--text"
            style="border-radius: 30px 30px 0px 0px !important;"
          >
            <strong class="white--text">REALIZA TU PAGO</strong>
            <small class="white--text">Solo se permite pago con tarjeta</small>
          </v-stepper-step>

          <v-stepper-content :step="tipoViaje === 'sencillo' ? '5' : '8'" class="px-8 ma-0">
            <v-card elevation="0" class="mb-10 fontDisplay text-center align-center justify-center">
              <v-card-title class="ma-0 pa-0 mt-3 d-flex justify-center">
                <v-row class="ma-0 pa-0 text-center justify-center">
                  TICKETS
                </v-row>
              </v-card-title>

              <v-img
                v-if="Object.keys(routeSelected).length > 0"
                :src="require('@/assets/back-credit-card.svg')"
                class="ma-0 pa-3 py-5 mt-7"
                style="border-radius: 30px;"
              >
                <v-card-text class="white--text ma-0 pa-0 text-center" style="border-radius: 30px;">
                  <strong>VIAJE DE IDA</strong>
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
                    ASIENTOS SELECCIONADOS: {{ selectedSeats.join(', ') }}
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
                class="ma-0 pa-3 py-5 mt-5"
                style="border-radius: 30px;"
              >
                <v-card-text class="white--text ma-0 pa-0 text-center" style="border-radius: 30px;">
                  <strong>VIAJE DE REGRESO</strong>
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
                    ASIENTOS SELECCIONADOS: {{ selectedSeatsRegreso.join(', ') }}
                    <br>
                    PASAJEROS CON EQUIPAJE EXTRA: {{ equipajeExtraRegreso }}
                  </small>
                  <br>
                  <br>
                  <strong>TOTAL: ${{ (routeSelectedRegreso.price * Number(pasajerosViaje)) + (Number(equipajeExtraRegreso) * 100) }}</strong>
                </v-card-text>
              </v-img>

              <v-row class="ma-0 pa-0 mt-7 justify-center" style="font-size: 12px;">
                * BENEFICIO PARA MIEMBROS 10% DE DESCUENTO
              </v-row>

              <v-row class="ma-0 pa-0 mt-7 justify-center">
                TOTAL: ${{ total }}
              </v-row>
            </v-card>

            <v-row class="ma-0 pa-0">
              <v-col cols="5" class="ma-0 pa-0">
                <v-btn
                  color="#8C6E39"
                  class="black--text mb-4 fontTitle ma-0 pa-0"
                  elevation="0"
                  rounded
                  width="100%"
                  text
                  @click="tipoViaje === 'sencillo' ? e6 = 4 : e6 = 7"
                >
                  ATRÁS
                </v-btn>
              </v-col>

              <v-col cols="2" class="ma-0 pa-0" />

              <v-col cols="5" class="ma-0 pa-0">
                <v-btn
                  color="#8C6E39"
                  class="white--text mb-4 fontTitle ma-0 pa-0"
                  elevation="0"
                  width="100%"
                  rounded
                  @click="validarPago()"
                >
                  PAGAR
                </v-btn>
              </v-col>
            </v-row>

            <v-dialog v-model="dialogPay" max-width="300" height="300" persistent>
              <v-card v-if="successPay === ''" color="#0A263D" class="pa-5 fontDisplay">
                <v-card-text align="center" justify="center" class="white--text">
                  <v-btn solo loading color="#0A263D" class="white--text" />
                  <br>
                  PROCESANDO PAGO
                  <br>
                  <br>
                  CIERRE EL POP-UP PARA CONTINUAR
                </v-card-text>
              </v-card>

              <v-card v-else-if="successPay === 'paid'" color="#0A263D" class="ma-0 pa-5 fontDisplay align-center justify-center">
                <v-card-text align="center" justify="center" class="ma-0 pa-0 white--text text-center align-center justify-center">
                  <v-icon large color="white">
                    mdi-check-circle-outline
                  </v-icon>

                  <v-row class="ma-0 pa-0 mt-7 text-center align-center justify-center" style="font-size: 20px;">
                    PAGO EXITOSO
                  </v-row>
                </v-card-text>

                <v-card-actions class="ma-0 pa-0 mt-8">
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

              <v-card v-else-if="successPay === 'unpaid'" color="red darken-4" class="ma-0 pa-5 fontDisplay align-center justify-center">
                <v-card-text align="center" justify="center" class="white--text text-center align-center justify-center">
                  <v-icon large color="white">
                    mdi-close-circle-outline
                  </v-icon>

                  <v-row class="ma-0 pa-0 mt-7 text-center align-center justify-center" style="font-size: 20px;">
                    PAGO CANCELADO
                  </v-row>
                </v-card-text>

                <v-card-actions class="ma-0 pa-0 mt-8">
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
            style="border-radius: 30px 30px 0px 0px !important;"
          >
            <strong class="white--text">DESCARGA TU BOLETO</strong>
            <small class="white--text">Deberá presentarse el día del viaje</small>
          </v-stepper-step>

          <v-stepper-content :step="tipoViaje === 'sencillo' ? '6' : '9'" class="px-8 ma-0">
            <v-card elevation="0" class="ma-0 pa-0 mb-5 fontDisplay text-center justify-center align-center">
              <v-card-title class="ma-0 pa-0 mt-3 d-flex text-center justify-center align-center">
                <v-row class="ma-0 pa-0 text-center justify-center align-center">
                  COMPROBANTE
                </v-row>
              </v-card-title>

              <v-card-actions class="d-flex justify-center align-center ma-0 pa-0 mt-7">
                <v-btn
                  color="#8C6E39"
                  class="white--text mb-4 fontTitle ma-0 pa-0"
                  elevation="0"
                  width="122px"
                  rounded
                  @click="descargarComprobante()"
                >
                  DESCARGAR
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-stepper-content>
        </v-stepper>
      </v-row>

      <v-row class="ma-0 pa-0">
        <v-col class="ma-0 pa-0">
          <v-row class="ma-0 pa-0 py-4 blueBack">
            <v-spacer />
            <v-btn v-for="icon in icons" :key="icon" class="mx-4" dark icon>
              <v-icon size="24px">
                {{ icon }}
              </v-icon>
            </v-btn>
            <v-spacer />
          </v-row>

          <v-row class="ma-0 pa-0 py-2 white--text justify-center coyoteBack">
            {{ new Date().getFullYear() }} — <strong>&COPY; BUS BEE</strong>
          </v-row>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import JsPDF from 'jspdf'
import { mask } from 'vue-the-mask'
import moment from 'moment'
import 'moment/locale/es'

export default {
  name: 'IndexPage',

  directives: {
    mask
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
      fechaSalidaViaje: new Date().toISOString().split('T')[0],
      fechaRegresoViaje: new Date().toISOString().split('T')[0],
      pasajerosViaje: '0',
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
        { name: 'A16', selected: false, unavailable: false }
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
      equipajeExtra: '0',
      validEquipaje: '',
      total: 0,

      // STEP VIAJE REGRESO
      menu1: false,
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
        { name: 'A16', selected: false, unavailable: false }
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
      equipajeExtraRegreso: '0',
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

      pasajerosRule: [
        v => !!v || 'EL NÚMERO DE PASAJEROS ES REQUERIDO',
        v => v >= 1 || 'EL NÚMERO DE PASAJEROS DEBE DE SER MÍNIMO 1'
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
      reservation: {},
      reservationRegreso: {},

      // VARIABLES DE FOOTER
      icons: [
        'mdi-facebook',
        'mdi-twitter',
        'mdi-instagram'
      ]
    }
  },

  async mounted () {},

  methods: {
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
      const index = i - 1 // Ajustar el índice para que comience en 1

      if (index < 0 || index >= this.seats.length) {
        return
      }

      if (this.e6 === 3) {
        if (this.seats[index].unavailable) {
          return
        }

        if (this.seats[index].selected) {
          // Si el asiento está seleccionado, deseleccionarlo
          this.seats[index].selected = false
          this.selectedSeats = this.selectedSeats.filter(seat => seat !== this.seats[index].name)
        } else if (this.selectedSeats.length < this.pasajerosViaje) {
          // Si el asiento no está seleccionado y no se ha alcanzado el límite máximo, seleccionarlo
          this.seats[index].selected = true
          this.selectedSeats.push(this.seats[index].name)
        }
      } else if (this.e6 === 6 && this.tipoViaje === 'redondo') {
        if (this.seatsRegreso[index].unavailable) {
          return
        }

        if (this.seatsRegreso[index].selected) {
          // Si el asiento está seleccionado, deseleccionarlo
          this.seatsRegreso[index].selected = false
          this.selectedSeatsRegreso = this.selectedSeatsRegreso.filter(seat => seat !== this.seatsRegreso[index].name)
        } else if (this.selectedSeatsRegreso.length < this.pasajerosViaje) {
          // Si el asiento no está seleccionado y no se ha alcanzado el límite máximo, seleccionarlo
          this.seatsRegreso[index].selected = true
          this.selectedSeatsRegreso.push(this.seatsRegreso[index].name)
        }
      }
    },

    async cargarViajes (origen, destino, fecha) {
      this.validViaje = this.$refs.formViaje.validate()

      if (this.validViaje) {
        const params = {
          origenViaje: origen,
          destinoViaje: destino,
          fechaSalidaViaje: fecha,
          pasajerosViaje: this.pasajerosViaje
        }
        const url = '/routes'
        await this.$axios.get(url, { params })
          .then(async (res) => {
            if (res.data.success) {
              this.routes = res.data.routes
              // eslint-disable-next-line no-console
              console.log('this.routes ', this.routes)
              if (this.tipoViaje === 'redondo') {
                await this.cargarViajesRegreso()
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

    async cargarViajesRegreso () {
      const params = {
        origenViaje: this.destinoViaje,
        destinoViaje: this.origenViaje,
        fechaSalidaViaje: this.fechaRegresoViaje,
        pasajerosViaje: this.pasajerosViaje
      }
      const url = '/routes'
      await this.$axios.get(url, { params })
        .then((res) => {
          if (res.data.success) {
            this.routesRegreso = res.data.routes
            // eslint-disable-next-line no-console
            console.log('this.routesRegreso ', this.routesRegreso)
          }
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log('ERROR => ', error)
          // eslint-disable-next-line no-console
          console.log('PARAMS => ', params)
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

        // eslint-disable-next-line no-console
        console.log('this.routeSelected:', this.routeSelected)
        // eslint-disable-next-line no-console
        console.log('this.routeSelectedid:', this.routeSelected.routeId)

        const unavailableSeats = Object.keys(this.routeSelected.seats).filter(key => key.startsWith('A'))

        this.seats.forEach((seat) => {
          seat.unavailable = unavailableSeats.includes(seat.name)
        })
        this.e6 = 3
      } else if (this.e6 === 5 && this.tipoViaje === 'redondo') {
        this.routeSelectedRegreso = route

        // eslint-disable-next-line no-console
        console.log('this.routeSelectedRegreso:', this.routeSelectedRegreso)

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
          if (this.$store.state.user && this.$store.state.token) {
            this.total *= 0.9
          }
          this.e6 = 5
        }
      } else if (this.e6 === 7 && this.tipoViaje === 'redondo') {
        this.validEquipajeRegreso = this.$refs.formEquipajeRegreso.validate()

        if (this.validEquipajeRegreso) {
          if (this.total !== 0) {
            this.total = 0
          }
          this.total = (this.routeSelected.price * Number(this.pasajerosViaje)) + (this.routeSelectedRegreso.price * Number(this.pasajerosViaje)) + ((Number(this.equipajeExtra) + Number(this.equipajeExtraRegreso)) * 100)
          if (this.$store.state.user && this.$store.state.token) {
            this.total *= 0.9
          }
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
        this.user = this.sessionId.slice(-10)
      }

      // eslint-disable-next-line no-console
      console.log('this.routeSelected:', this.routeSelected)
      // eslint-disable-next-line no-console
      console.log('this.routeSelectedid:', this.routeSelected.routeId)

      // eslint-disable-next-line no-console
      console.log('id act ', this.routeSelected.routeId)

      const urlReservation = '/update-reservation'
      let dataReservation = {
        user: this.user,
        token: this.token,
        tipo: this.tipoViaje.toUpperCase(),
        origen: this.origenViaje.toUpperCase(),
        destino: this.destinoViaje.toUpperCase(),
        fechaSalida: this.routeSelected.departureTime,
        pasajeros: this.pasajerosViaje,
        asientos: this.selectedSeats,
        costo: this.total,
        routeId: this.routeSelected.routeId
      }

      // eslint-disable-next-line no-console
      console.log('reservation', dataReservation)

      await this.agregarReservacion(urlReservation, dataReservation, 1)

      if (this.tipoViaje === 'redondo') {
        dataReservation = {
          user: this.user,
          token: this.token,
          tipo: this.tipoViaje.toUpperCase(),
          origen: this.destinoViaje.toUpperCase(),
          destino: this.origenViaje.toUpperCase(),
          fechaSalida: this.routeSelectedRegreso.departureTime,
          pasajeros: this.pasajerosViaje,
          asientos: this.selectedSeatsRegreso,
          costo: this.total,
          routeId: this.routeSelectedRegreso.routeId
        }
        await this.agregarReservacion(urlReservation, dataReservation, 2)
      }

      const urlRoute = '/update-route'
      let dataRoute = {
        routeId: this.routeSelected.routeId,
        selectedSeats: this.selectedSeats,
        user: this.user,
        availableSeats: this.routeSelected.seats.available - this.selectedSeats.length,
        bookedSeats: this.routeSelected.seats.booked + this.selectedSeats.length
      }
      // eslint-disable-next-line no-console
      console.log('data: ', dataRoute)
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
      this.dialogPay = false
      this.tipoViaje === 'sencillo' ? this.e6 = 6 : this.e6 = 9
      // eslint-disable-next-line no-console
      console.log('🚀 ~ .then ~ this.reservation:', this.reservation)
      // eslint-disable-next-line no-console
      console.log('🚀 ~ .then ~ this.reservationRegreso:', this.reservationRegreso)
    },

    async agregarReservacion (url, data, tipo) {
      await this.$axios.post(url, data)
        .then((res) => {
          if (res.data.success) {
            if (tipo === 1) {
              this.reservation = res.data.reservation
            } else if (tipo === 2) {
              this.reservationRegreso = res.data.reservation
            }
          }
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log('ERROR AL AGREGAR RESERVACIÓN => ', error)
          this.mostrarAlerta('red', 'error', 'ERROR AL AGREGAR RESERVACIÓN')
        })
    },

    async actualizarRoute (url, data) {
      await this.$axios.post(url, data)
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
    },

    descargarComprobante () {
      const doc = new JsPDF('p', 'mm', 'letter') // Utiliza 'p' para orientación vertical y 'letter' para tamaño de papel
      const margen = 15 // Establece un margen de 15 mm

      // Agrega datos de la reserva al PDF
      doc.text('COMPROBANTE DE RESERVA', margen, margen)
      doc.text(`ID: ${this.reservation.id}`, margen, margen + 15)
      doc.text(`USUARIO: ${this.reservation.user}`, margen, margen + 30)
      doc.text(`ORIGEN: ${this.reservation.origen}`, margen, margen + 45)
      doc.text(`DESTINO: ${this.reservation.destino}`, margen, margen + 60)
      doc.text(`PRECIO: ${this.reservation.costo}`, margen, margen + 75)
      doc.text(`ASIENTOS: ${this.reservation.asientos}`, margen, margen + 90)

      // Si es viaje redondo, agregar datos de la reserva de regreso
      if (this.tipoViaje === 'redondo' && this.reservationRegreso) {
        doc.text('', margen, margen + 105) // Espacio en blanco
        doc.text('COMPROBANTE DE RESERVA - REGRESO', margen, margen + 120)
        doc.text(`ID: ${this.reservationRegreso.id}`, margen, margen + 135)
        doc.text(`USUARIO: ${this.reservationRegreso.user}`, margen, margen + 150)
        doc.text(`ORIGEN: ${this.reservationRegreso.origen}`, margen, margen + 165)
        doc.text(`DESTINO: ${this.reservationRegreso.destino}`, margen, margen + 180)
        doc.text(`PRECIO: ${this.reservationRegreso.costo}`, margen, margen + 195)
        doc.text(`ASIENTOS: ${this.reservationRegreso.asientos}`, margen, margen + 210)
      }

      // Descargar el PDF
      doc.save('comprobante.pdf')

      this.mostrarAlerta('green', 'success', 'COMPROBANTE DESCARGADO EXITOSAMENTE')
    },

    scrollToStep () {
      this.$nextTick(() => {
        const steps = this.$refs.stepper.$el.querySelectorAll('.v-stepper__step')
        const activeStep = steps[this.e6 - 1] // Obtén el Step activo basado en el índice

        if (activeStep) {
          // eslint-disable-next-line no-console
          console.log('Step activo encontrado:', activeStep)

          // Altura del `v-app-bar` fijo (si existe)
          const appBar = document.querySelector('.v-app-bar')
          const appBarHeight = appBar ? appBar.offsetHeight : 0

          // Obtén las dimensiones del Step activo
          const activeStepRect = activeStep.getBoundingClientRect()

          // Altura visible del viewport
          const viewportHeight = window.innerHeight

          // Calcula el desplazamiento requerido para centrar el Step verticalmente
          const offset = window.scrollY + activeStepRect.top - viewportHeight / 2 + activeStepRect.height / 2 - appBarHeight

          // Ajusta el desplazamiento usando scroll suave
          window.scrollTo({
            top: offset,
            behavior: 'smooth'
          })
        } else {
          // eslint-disable-next-line no-console
          console.error('No se encontró el Step activo por índice')
        }
      })
    }
  }
}
</script>

<style>
.v-input input {
  justify-content: center !important;
}

.v-messages .theme--light .primary--text {
  justify-content: center !important;
}

.v-text-field.v-text-field--solo .v-input__control input {
  text-align: center !important;
}

.v-messages__message
{
  text-align: center !important;
}

.v-input__control {
  box-shadow: none !important;
}

.v-dialog {
  border-radius: 30px !important;
}
</style>
