'use strict'

angular.module('Hospital')
.controller('RecetaCtrl', function ($scope, $http) {
  $scope.empresa = {}
  $('.browser-default').select2()

  $http.get('src/doctor/receta/service/empresa.php')
  .then(response => $scope.empresa = response.data)

  $scope.medicineAdd = () => {
    $('.mask').fadeIn()
    $('.Form-medicine').slideDown()
  }

  $scope.cancel = () => {
    $('.mask').fadeOut()
    $('.Form-medicine').slideUp()
  }

})
