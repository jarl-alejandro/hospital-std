'use strict'

const validForm = angular.module('Hospital')

validForm.controller('validForm', validOut)

function validOut ($scope) {
  $scope.ValidaSoloNumeros = function ValidaSoloNumeros() {
    if ((event.keyCode < 48) || (event.keyCode > 57))
    event.returnValue = false
  }
  $scope.txNombres = function txNombres() {
    if ((event.keyCode != 32) && (event.keyCode < 65) || (event.keyCode > 90) && (event.keyCode < 97) || (event.keyCode > 122)) {
      event.returnValue = false
    }
  }
  $scope.ValidaSoloDecimal = function ValidaSoloDecimal () {
    if ((event.keyCode < 46) || (event.keyCode > 57))
    event.returnValue = false
  }
}
