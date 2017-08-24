angular.module('Hospital')
.controller('motivoConsultaCtrl056', function ($scope, $http, motivoContadorService) {

  $scope.handleAddMotivoSelf = () => {
    motivoContadorService.data.indexMotivo++
    let template = `
      <li class="input-field Motivo-consulta--self-item">
        <input type="text" placeholder="Ingrese el motivo de consulta"
          id="input-${motivoContadorService.data.indexMotivo}" class="Motivo-consulta--self-input" />
        <p class="consulta-cie--code">
          <input type="text" placeholder="Codigo cie10" id="cie-${motivoContadorService.data.indexMotivo}"
            class="cie-input-motivo code-motivo-self" maxlength="4" />
        </p>
      </li>`
    $('#motivo-list').append(template)
    let inputMotivo = [...document.querySelectorAll('.Motivo-consulta--self-input')]
    inputMotivo.map(item => item.addEventListener('keyup', motivoConsultaSelf))

    let inputMotivoCode = [...document.querySelectorAll('.code-motivo-self')]
    inputMotivoCode.map(item => item.addEventListener('keyup', motivoConsultaSelfCode))
  }

  $scope.handleAddMotivoCompany = () => {
    motivoContadorService.data.indexMotivoCompany++
    let template = `
      <li class="input-field Motivo-consulta--self-item">
        <input type="text" placeholder="Ingrese el motivo de consulta"
          id="input-company-${motivoContadorService.data.indexMotivoCompany}" class="Motivo-consulta--company-input" />
        <p class="consulta-cie--code">
          <input type="text" placeholder="Codigo cie10"  id="cie-company-${motivoContadorService.data.indexMotivoCompany}"
            class="cie-input-motivo code-motivo-company" maxlength="4" />
        </p>
      </li>`
    $('#motivo-list-company').append(template)
    let inputMotivoCompany = [...document.querySelectorAll('.Motivo-consulta--company-input')]
    inputMotivoCompany.map(item => item.addEventListener('keyup', motivoConsultaCompany))

    let inputMotivoCompanyCode = [...document.querySelectorAll('.code-motivo-company')]
    inputMotivoCompanyCode.map(item => item.addEventListener('keyup', motivoConsultaCompanyCode))
  }

  $scope.handleAddDiagnostico = () => {
    motivoContadorService.data.indexDiagnostico++
    let template = `
      <li class="input-field Motivo-consulta--self-item">
        <input type="text" placeholder="Ingrese el motivo de consulta" id="diagnostico-input-${motivoContadorService.data.indexDiagnostico}"
          class="Diagnostico-input" />
        <p class="consulta-cie--code">
          <input type="text" placeholder="Codigo cie10" id="diagnostico-cie-${motivoContadorService.data.indexDiagnostico}"
            class="cie-input-motivo Diagnostico-code" maxlength="4" />
        </p>
      </li>`
    $('#diagnostico-list').append(template)
    let inputDiagnostico = [...document.querySelectorAll('.Diagnostico-input')]
    inputDiagnostico.map(item => item.addEventListener('keyup', handleDianostico))

    let inputDiagnosticoCode = [...document.querySelectorAll('.Diagnostico-code')]
    inputDiagnosticoCode.map(item => item.addEventListener('keyup', handleDianosticoCode))
  }

  // Eventos javascript
  let inputMotivo = [...document.querySelectorAll('.Motivo-consulta--self-input')]
  inputMotivo.map(item => item.addEventListener('keyup', motivoConsultaSelf))

  let inputMotivoCode = [...document.querySelectorAll('.code-motivo-self')]
  inputMotivoCode.map(item => item.addEventListener('keyup', motivoConsultaSelfCode))

  let inputMotivoCompany = [...document.querySelectorAll('.Motivo-consulta--company-input')]
  inputMotivoCompany.map(item => item.addEventListener('keyup', motivoConsultaCompany))

  let inputMotivoCompanyCode = [...document.querySelectorAll('.code-motivo-company')]
  inputMotivoCompanyCode.map(item => item.addEventListener('keyup', motivoConsultaCompanyCode))

  let inputDiagnostico = [...document.querySelectorAll('.Diagnostico-input')]
  inputDiagnostico.map(item => item.addEventListener('keyup', handleDianostico))

  let inputDiagnosticoCode = [...document.querySelectorAll('.Diagnostico-code')]
  inputDiagnosticoCode.map(item => item.addEventListener('keyup', handleDianosticoCode))

  function motivoConsultaSelf (e) {
    if (e.keyCode === 13) {
      let id = e.target.id
      let index = id.split('-')[1]
      let input = $(`#${id}`)
      let nombreCie = $(`#${id}`).val().trim()

      if (nombreCie === '') {
        Materialize.toast('Ingrese el motivo de consulta CIE10', 4000)
        return false
      }

      $http.get(`src/doctor/form28C/service/filterNombreCI10.php?nombre=${nombreCie}`)
      .then(response => {
        input.val(response.data.hgc_desc_c10)
        $(`#cie-${index}`).val(response.data.hgc_codi_c10)
      })
    }
  }

  function motivoConsultaCompany (e) {
    if (e.keyCode === 13) {
      let id = e.target.id
      let index = id.split('-')[2]
      let input = $(`#${id}`)
      let nombreCie = $(`#${id}`).val().trim()

      if (nombreCie === '') {
        Materialize.toast('Ingrese el motivo de consulta CIE10', 4000)
        return false
      }

      $http.get(`src/doctor/form28C/service/filterNombreCI10.php?nombre=${nombreCie}`)
      .then(response => {
        input.val(response.data.hgc_desc_c10)
        $(`#cie-company-${index}`).val(response.data.hgc_codi_c10)
      })
    }
  }

  function motivoConsultaSelfCode (e) {
    if (e.keyCode === 13) {
      let id = e.target.id
      let index = id.split('-')[1]
      let input = $(`#${id}`)
      let nombreCie = $(`#${id}`).val().trim()

      if (nombreCie === '') {
        Materialize.toast('Ingrese el motivo de consulta CIE10', 4000)
        return false
      }

      $http.get(`src/doctor/form28C/service/filterCI10.php?codigo=${nombreCie}&len=${nombreCie.length}`)
      .then(response => {
        input.val(response.data.hgc_codi_c10)
        $(`#input-${index}`).val(response.data.hgc_desc_c10)
      })
    }
  }

  function motivoConsultaCompanyCode (e) {
    if (e.keyCode === 13) {
      let id = e.target.id
      let index = id.split('-')[2]
      let input = $(`#${id}`)
      let nombreCie = $(`#${id}`).val().trim()

      if (nombreCie === '') {
        Materialize.toast('Ingrese el motivo de consulta CIE10', 4000)
        return false
      }

      $http.get(`src/doctor/form28C/service/filterCI10.php?codigo=${nombreCie}&len=${nombreCie.length}`)
      .then(response => {
        input.val(response.data.hgc_codi_c10)
        $(`#input-company-${index}`).val(response.data.hgc_desc_c10)
      })
    }
  }

  function handleDianostico (e) {
    if (e.keyCode === 13) {
      let id = e.target.id
      let index = id.split('-')[2]
      let input = $(`#${id}`)
      let nombreCie = $(`#${id}`).val().trim()

      if (nombreCie === '') {
        Materialize.toast('Ingrese el motivo de consulta CIE10', 4000)
        return false
      }

      $http.get(`src/doctor/form28C/service/filterNombreCI10.php?nombre=${nombreCie}`)
      .then(response => {
        input.val(response.data.hgc_desc_c10)
        $(`#diagnostico-cie-${index}`).val(response.data.hgc_codi_c10)
      })
    }
  }

  function handleDianosticoCode (e) {
    if (e.keyCode === 13) {
      let id = e.target.id
      let index = id.split('-')[2]
      let input = $(`#${id}`)
      let nombreCie = $(`#${id}`).val().trim()

      if (nombreCie === '') {
        Materialize.toast('Ingrese el motivo de consulta CIE10', 4000)
        return false
      }

      $http.get(`src/doctor/form28C/service/filterCI10.php?codigo=${nombreCie}&len=${nombreCie.length}`)
      .then(response => {
        input.val(response.data.hgc_codi_c10)
        $(`#diagnostico-input-${index}`).val(response.data.hgc_desc_c10)
      })
    }
  }
})
