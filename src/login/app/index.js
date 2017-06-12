'use strict'

const login = angular.module('Hospital')

login.controller('loginController', function ($scope, toaster, $http, $location) {
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
      console.log(response)
      if (response.data.status === 404) {
        toaster.pop('error', "Error", "Usuario incorrecto")
      }
      if (response.data.status === 303) {
        toaster.pop('error', "Error", "Contraseña incorrecto")
      }
      if (response.data.status === 200) {
        toaster.pop('error', "Error", "Usuario incorrecto")
        toaster.pop('info', "Ha iniciado sesion")
        $location.path('/admin')
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
