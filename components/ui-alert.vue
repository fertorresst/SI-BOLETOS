<template>
  <v-alert
    :type="type"
    :color="color"
    :icon="icon"
    width="300px"
    height="auto"
    class="ma-0 pa-0 text-center align-center"
    prominent
    transition="scale-transition"
    style="border-radius: 0px 0px 0px 25px !important; z-index: 9999; position: absolute;"
  >
    <span style="color: white; font-size: 20px;">
      {{ mensaje }}
    </span>
  </v-alert>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      type: state => state.type,
      color: state => state.color,
      icon: state => state.icon,
      mensaje: state => state.mensaje
    })
  },
  watch: {
    type () {},
    color () {},
    icon () {},
    mensaje () {}
  }
}
</script>
