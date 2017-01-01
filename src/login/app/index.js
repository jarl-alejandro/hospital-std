'use strict'

const login = angular.module('Hospital')

login.controller('loginController', function ($scope, $http, $location, $rootScope) {
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
      console.log(response);
      if (response.data.status === 404) {
        Materialize.toast("Usuario incorrecto", 4000)
      }
      if (response.data.status === 303) {
        Materialize.toast("Contraseña incorrecto", 4000)
      }
      if (response.data.status === 200) {
        Materialize.toast("Ha iniciado sesion", 4000)
        location.reload()
      }
    })
  }
})

login.controller('logoutController', function ($scope, $http, $location) {
  $http.post('src/login/service/logout.php')
  .then(response => {
    $location.path('/')
    window.localStorage.clear()
  })
})
