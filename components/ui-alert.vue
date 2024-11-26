<template>
  <v-alert
    :type="type"
    :color="color"
    :icon="icon"
    rounded
    transition="scale-transition"
    style="position: absolute !important;"
  >
    {{ mensaje }}
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
