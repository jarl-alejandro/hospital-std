'use strict'

function authenticated ($q, $location, $http, $rootScope) {
  let deferred = $q.defer()
  $http.get('src/perfil/service/me.php')
  .then(response => {
    if (response.data.status === 404) deferred.resolve()
    else {
      const user = response.data.user
      const rol = user.hgc_rol_usu
      $rootScope.user = {
        rol,
        name: `${user.hgc_nom_profe} ${user.hgc_ape_profe}`,
        cedula: user.hgc_cedu_profe,
        avatar: user.hgc_avat_profe
      }
      console.log($rootScope.user)
      if (rol === 'administrador') $location.path("/admin")
      if (rol === 'doctor') $location.path("/form28C")
      if (rol === 'enfermera') $location.path("/signos-vitales")
      if (rol === 'departamento estadistico') $location.path("/turnos")
    }
  })
  return deferred.promise
}
