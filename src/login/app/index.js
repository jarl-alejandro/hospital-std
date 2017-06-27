'use strict'

const login = angular.module('Hospital')

login.controller('loginController', function ($scope, toaster, $http, $location, $rootScope) {
  $scope.data = { email: '', password: '' }

  $scope.handleSave = function (e) {
    if ($scope.data.email === ''){
      toaster.pop('error', "Error", "Ingresa el email")
      return false
    }
    if ($scope.data.password === ''){
      toaster.pop('error', "Error", "Ingresa la contraseña")
      return false
    }

    $http.post("src/login/service/login.php", {
      'email': $scope.data.email,
      'password': $scope.data.password
    }).then(response => {
      if (response.data.status === 404) {
        toaster.pop('error', "Error", "Usuario incorrecto")
      }
      if (response.data.status === 303) {
        toaster.pop('error', "Error", "Contraseña incorrecto")
      }
      if (response.data.status === 200) {
        toaster.pop('info', "Ha iniciado sesion")
        const user = response.data.user
        const rol = user.hgc_rol_usu
        $rootScope.user = {
          rol,
          name: `${user.hgc_nom_profe} ${user.hgc_ape_profe}`,
          cedula: user.hgc_cedu_profe,
          avatar: user.hgc_avat_profe
        }
        if (rol === 'administrador') $location.path("/admin")
        if (rol === 'doctor') $location.path("/form28C")
        if (rol === 'enfermera') $location.path("/signos-vitales")
        if (rol === 'departamento estadistico') $location.path("/turnos")
      }
    })
  }
})

login.controller('logoutController', function ($scope, $http, $location) {
  $http.post('src/login/service/logout.php')
  .then(response => {
    console.log(response)
    $location.path('/')
  })
})
