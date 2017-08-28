'use strict'

angular.module('Hospital')
.factory('motivoContadorService', function () {
  return {
    data: {
      indexMotivo: 3,
      indexMotivoCompany: 3,
      indexDiagnostico: 3,
    }
  }
})
