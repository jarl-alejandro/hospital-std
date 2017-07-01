'use strict'

const login = angular.module('Hospital')

login.controller('loginController', function ($scope, toaster, $http, $location, $rootScope) {
  $scope.data = { email: '', password: '' }

  $scope.handleSave = function (e) {
    if ($scope.data.email === ''){
      Materialize.toast("Ingresa el email", 4000)
      return false
    }
    if ($scope.data.password === ''){
      Materialize.toast("Ingresa la contraseña", 4000)
      return false
    }

    $http.post("src/login/service/login.php", {
      'email': $scope.data.email,
      'password': $scope.data.password
    }).then(response => {
      if (response.data.status === 404) {
        Materialize.toast("Usuario incorrecto", 4000)
      }
      if (response.data.status === 303) {
        Materialize.toast("Contraseña incorrecto", 4000)
      }
      if (response.data.status === 200) {
        Materialize.toast("Ha iniciado sesion", 4000)
        const user = response.data.user
        const rol = user.hgc_rol_usu
        $rootScope.user = {
          rol,
          name: `${user.hgc_nom_profe} ${user.hgc_ape_profe}`,
          cedula: user.hgc_cedu_profe,
          avatar: user.hgc_avat_profe
        }
        if (rol === 'administrador') $location.path("/admin")
        if (rol === 'doctor') $location.path("/doctor")
        if (rol === 'enfermera') $location.path("/signos-vitales")
        if (rol === 'departamento estadistico') $location.path("/turnos")
      }
    })
  }
})

login.controller('logoutController', function ($scope, $http, $location) {
  $http.post('src/login/service/logout.php')
  .then(response => {
    window.localStorage.clear()
    $location.path('/')
  })
})
