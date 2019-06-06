export default {
  setToken (token, scope) {
    window.localStorage.setItem('token', token)
    window.localStorage.setItem('scope', scope)
  },
  getToken () {
    return window.localStorage.getItem('token')
  },
  removeToken () {
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('scope')
  },
  getScope () {
    window.localStorage.getItem('scope')
  }
}
