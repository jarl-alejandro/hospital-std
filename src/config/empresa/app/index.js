'use strict'

const empresa = angular.module('Hospital')

empresa.controller('empresaController', function ($scope, $http) {
  $('.tooltipped').tooltip({delay: 50})
  const file = document.querySelector('#upload-empresa')
  file.addEventListener('change', handleChange)

  $scope.data = {
    id: '',
    empresa: '',
    direccion: '',
    telefono: '',
    fax: '',
    eslogan: '',
    mision: '',
    vision: ''
  }

  $http.get('src/config/empresa/service/get.php')
  .then(response => {
    if(response.data.cont > 0) {
      $scope.data = {
        id: response.data.empresa.hgc_id_empr,
        empresa: response.data.empresa.hgc_nom_empr,
        direccion: response.data.empresa.hgc_dir_empr,
        telefono: response.data.empresa.hgc_tel_empr,
        fax: response.data.empresa.hgc_fax_empr,
        eslogan: response.data.empresa.hgc_esl_empr,
        mision: response.data.empresa.hgc_mis_empr,
        vision:response.data.empresa.hgc_vis_empr,
      }
      $('.input-field label').addClass('active')
    }
  })

  $scope.handleSave = () => {
    $http.post('src/config/empresa/service/save.php', $scope.data)
    .then(response => {
      if (response.data === '201') Materialize.toast('Se ha guardado con exito', 4000)
    })
  }

  function handleChange (eve) {
    const formData = new FormData()
    formData.append("imagen", file.files[0])
    formData.append("id", $scope.data.id)

    const xhr = new XMLHttpRequest()
    xhr.open('POST', 'src/config/empresa/service/saveAvatar.php', true)

    xhr.onload = function (e) {
      if (this.status == 200) {
        var json = JSON.parse(this.responseText)
        if (json.status === '201') {
          Materialize.toast('Ha cambiado su foto', 4000)
        }
        if (json.estado === 'nuevo') $scope.data.id = json.id
      }
    }

    xhr.send(formData)
  }
})
