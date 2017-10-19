'use strict'

angular.module('Hospital')
.controller('solicitudAdminisionCtrl', function ($scope, $http) {
  $scope.solicitud = []
  $scope.empresa = {}
  $scope.item = {}
  $scope.months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiemnbre',
    'Octubre', 'Noviembre', 'Diciembre'
  ]

  $http.get('src/estadistico/solicitud/service/solicitud.php')
  .then(response => $scope.solicitud = response.data)

  $http.get('src/doctor/receta/service/empresa.php')
  .then(response => $scope.empresa = response.data)

  $scope.get = (item) => {
    let date = new Date(item.hgc_fet_soli)
    let monthIndex = date.getMonth()
    let month = $scope.months[monthIndex]
    let fecha = `${date.getDate()} de ${month}  del ${date.getFullYear()}`
    $scope.item = item
    $scope.item.fecha = fecha
    $('.solicitud-modal').slideDown()
    $('.mask').fadeIn()
  }

  $scope.close = () => {
    $('.solicitud-modal').slideUp()
    $('.mask').fadeOut()
    $scope.item = {}
  }

  $scope.print = () => {
    html2canvas(document.getElementById('exportthis'), {
      useCORS: true,
      onrendered: function (canvas) {
        var data = canvas.toDataURL();
        var docDefinition = {
            content: [{
                image: data,
                width: 500,
            }]
        };
        pdfMake.createPdf(docDefinition).download("solicitud.pdf");
      }
    })
  }

  $scope.delete = (item, index) => {
    let id = item.hgc_cod_soli
    $http.post(`src/estadistico/solicitud/service/delete.php`, { id })
    .then(response => {
      console.log(response)
      if (response.data === '201') $scope.solicitud.splice(index, 1)
    })
  }

})
