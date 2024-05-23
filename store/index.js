export const state = () => ({
  type: '',
  color: '',
  icon: '',
  showAlert: false,
  mensaje: '',
  user: {},
  token: null
})

export const mutations = {
  modifyColor (state, color) {
    state.color = color
  },
  modifyType (state, type) {
    state.type = type
  },
  modifyAlert (state, showAlert) {
    state.showAlert = showAlert
  },
  modifyText (state, mensaje) {
    state.mensaje = mensaje
  },
  modifyIcon (state, icon) {
    state.icon = icon
  },
  setUser (state, user) {
    state.user = user
  },
  setToken (state, token) {
    state.token = token
  }
}
