'use strict'

angular.module('Hospital')
.controller('RecetaCtrl', function ($scope, $http) {
  $scope.empresa = {}
  $scope.farmacia = []

  $('.browser-default').select2()

  $http.get('src/doctor/receta/service/empresa.php')
  .then(response => $scope.empresa = response.data)

  $http.get('src/doctor/receta/service/farmacia.php')
  .then(response => {
    $scope.farmacia = response.data
    console.log(response)
  })

  $scope.medicineAdd = () => {
    $('.mask').fadeIn()
    $('.Form-medicine').slideDown()
  }

  $scope.cancel = () => {
    $('.mask').fadeOut()
    $('.Form-medicine').slideUp()
  }

})
