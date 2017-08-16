angular.module('Hospital')
.controller('motivoConsultaCtrl056', function ($scope, $http) {

  // Eventos javascript
  let inputMotivo = [...document.querySelectorAll('.Motivo-consulta--self-input')]
  inputMotivo.map(item => item.addEventListener('keyup', motivoConsultaSelf))

  let inputMotivoCompany = [...document.querySelectorAll('.Motivo-consulta--company-input')]
  inputMotivoCompany.map(item => item.addEventListener('keyup', motivoConsultaCompany))

  function motivoConsultaSelf (e) {
    if (e.keyCode === 13) {
      let id = e.target.id
      let index = id.split('-')[1]
      let input = $(`#${id}`)
      let nombreCie = $(`#${id}`).val().trim()

      if (input === '') {
        Materialize.toast('Ingrese el motivo de consulta CIE10', 4000)
        return false
      }

      $http.get(`src/doctor/form28C/service/filterNombreCI10.php?nombre=${nombreCie}`)
      .then(response => {
        console.log(response)
        input.val(response.data.hgc_desc_c10)
        $(`#cie-${index}`).html(response.data.hgc_codi_c10)
      })
    }
  }

  function motivoConsultaCompany (e) {
    if (e.keyCode === 13) {
      let id = e.target.id
      let index = id.split('-')[2]
      let input = $(`#${id}`)
      let nombreCie = $(`#${id}`).val().trim()

      if (input === '') {
        Materialize.toast('Ingrese el motivo de consulta CIE10', 4000)
        return false
      }

      $http.get(`src/doctor/form28C/service/filterNombreCI10.php?nombre=${nombreCie}`)
      .then(response => {
        console.log(response)
        input.val(response.data.hgc_desc_c10)
        $(`#cie-company-${index}`).html(response.data.hgc_codi_c10)
      })
    }
  }

})
