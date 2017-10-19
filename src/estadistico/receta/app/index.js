'use strict'

angular.module('Hospital')
.controller('RecetaAdmisionCtrl', function ($scope, $http) {
  $scope.recetas = []
  $scope.empresa = {}
  $scope.receta = {}

  $http.get('src/estadistico/receta/service/recetas.php')
  .then(response => $scope.recetas = response.data)

  $http.get('src/doctor/receta/service/empresa.php')
  .then(response => $scope.empresa = response.data)

  $scope.get = (item) => {
    let id = item.hgc_cod_rec

    $http.get(`src/estadistico/receta/service/detail.php?id=${id}`)
    .then(response => {
      $scope.receta.maester = item
      $scope.receta.detail = response.data
      $('.mask').fadeIn()
      $('.Receta-modal').slideDown()
    })
  }

  $scope.cerrar = () => {
    $scope.receta = {}
    $('.mask').fadeOut()
    $('.Receta-modal').slideUp()
  }

  $scope.imprimir = () => {
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
        pdfMake.createPdf(docDefinition).download("receta.pdf");
      }
    })
  }

  $scope.delete = (item, index) => {
    let id = item.hgc_cod_rec
    $http.post(`src/estadistico/receta/service/delete.php`, { id })
    .then(response => {
      console.log(response)
      if (response.data === '201') $scope.recetas.splice(index, 1)
    })

  }
})
