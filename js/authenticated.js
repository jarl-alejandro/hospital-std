'use strict'

function authenticated ($q, $location, $http, $rootScope) {
  let deferred = $q.defer()
  $http.get('src/perfil/service/me.php')
  .then(response => {
    if (response.data.status === 404) deferred.resolve()
    else {
      const user = response.data.user
      const rol = user.hgc_rol_usu
      const name = `${user.hgc_nom_profe} ${user.hgc_ape_profe}`
      let avatar = null
      let isAvatar = null

      if (user.hgc_avat_profe === null) {
        const len = name.length
        avatar = name.substr(-len, 1)
        isAvatar = false
      } else {
        avatar = user.hgc_avat_profe
        isAvatar = true
      }
      $rootScope.user = {
        rol,
        avatar,
        name,
        cedula: user.hgc_cedu_profe,
        username: user.hgc_user_usu,
        isAvatar
      }
      window.localStorage.setItem('user', JSON.stringify($rootScope.user))
      if (rol === 'administrador') $location.path("/admin")
      if (rol === 'doctor') $location.path("/doctor")
      if (rol === 'enfermera') $location.path("/signos-vitales")
      if (rol === 'departamento estadistico') $location.path("/turnos")
    }
  })
  return deferred.promise
}


function auth_roles ($q, $location, $http, $rootScope) {
  let deferred = $q.defer()
  $rootScope.user = JSON.parse(window.localStorage.getItem('user'))
}
