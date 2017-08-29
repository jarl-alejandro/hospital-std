'use strict'

angular.module('Hospital')
.controller('form06SaveCtrl', function ($scope, $http, $stateParams, $location, motivoContadorService) {
  $scope.data = {
    paciente: $stateParams.id,
    turno: $stateParams.turno,
    enfermedadActual: '',
    planTratamiento: '',
    numerosCuartos: '',
    ocupacion: '',
  }
  $scope.guardandoConsult = false

  $scope.saveForm = () => {
    $scope.guardandoConsult = true
    const inputCompanion = document.querySelector('.Informacion-consulta-companion input:checked')
    const inputCivilStatus = document.querySelector('.Informacion-consulta-civilStatus input:checked')
    const listMotivo = [...document.querySelectorAll('.Motivo-consulta .consulta-cie--code input')]
    const listDiagnostico = [...document.querySelectorAll('.DiagnosticoCIE10 p input')]
    const listObservacion = [...document.querySelectorAll('.observacion')]
    const lisChecksRadio = [...document.querySelectorAll('input[type="radio"]:checked')]
    const lisChecksBox = [...document.querySelectorAll('input[type="checkbox"]:checked')]

    const motivoConsulta = []
    const observaciones = []
    const anexos = []

    listMotivo.map(item => {
      if (item.value !== '') {
        motivoConsulta.push({
          tipo: item.id.split("-")[1] === 'company' ? 'company' : 'adolecente',
          valor: item.value
        })
      }
    })

    listDiagnostico.map(item => {
      if (item.value !== '') {
        motivoConsulta.push({
          tipo: 'diagnostico',
          valor: item.value
        })
      }
    })

    listObservacion.map(item => {
      observaciones.push({
        tipo: item.dataset.tipo,
        desc: item.value,
      })
    })

    lisChecksRadio.map(item => {
      anexos.push({
        valor: item.value,
        tipo: item.name
      })
    })

    lisChecksBox.map(item => {
      if (item.value !== "on") {
        anexos.push({
          valor: item.value,
          tipo: item.name
        })
      }
    })

    $scope.data.companion = inputCompanion !== null ? inputCompanion.value : ''
    $scope.data.civilStatus = inputCivilStatus !== null ? inputCivilStatus.value : ''
    $scope.data.motivo = motivoConsulta
    $scope.data.observaciones = observaciones
    $scope.data.anexos = anexos
    $scope.data.fechaProxima = $('#fecha_proxima_visita').val()
    $scope.data.doctorTurno = localStorage.getItem('doctor')
    $scope.data.codigoForm = $('#codigoForm056').val()

    $http.post(`src/doctor/form056/service/${$stateParams.action}.php`, $scope.data)
    .then(response => {
      $scope.guardandoConsult = false
      if (response.data === '201') {
        $location.path(`/grafica-form056/${$stateParams.id}/${$stateParams.turno}`)
      }
    })

  }

  $scope.action = $stateParams.action

  if ($scope.action === 'edit') {
    $http.get(`src/doctor/form056/service/get.php?turno=${$stateParams.turno}`)
    .then(response => {
      console.log(response);
      $('#fecha_proxima_visita-link').fadeOut()
      $('#fecha_proxima_visita-linkOut').css('display', 'inline-block')
      const form = response.data.form
      const anexo = response.data.anexo
      const observacion = response.data.observacion
      const cie = response.data.cie

      //Fomr 056
      let companion = document.querySelector(`.Informacion-consulta-companion input[value="${form.hgc_acom_f056}"]`)
      let civilStatus = document.querySelector(`.Informacion-consulta-civilStatus input[value="${form.hgc_civi_f056}"]`)
      companion !== null ? companion.checked = true : null
      civilStatus !== null ? civilStatus.checked = true : null

      $('#codigoForm056').val(form.hgc_codi_f056)
      $('#fecha_proxima_visita').val(form.hgc_fetpr_f056)

      $scope.data.enfermedadActual = form.hgc_enfe_f056
      $scope.data.ocupacion = form.hgc_ocup_f056
      $scope.data.numerosCuartos = form.hgc_ncuar_f056
      $scope.data.planTratamiento = form.hgc_indic_f056

      $('label').addClass('active')
      //Observacion
      observacion.map(item => {
        document.querySelector(`.observacion[data-tipo="${item.hgc_tipo_df056}"]`).value = item.hgc_desc_df056
      })

      //Anexo
      let familiaAnexo = 0
      anexo.map(item => {
        const tag = document.querySelector(`input[name="${item.hgc_tipo_df056}"][value="${item.hgc_valo_df056}"]`)
        tag.checked = true

        if (tag.id === 'vive1-1') {
          document.querySelector('#vive4-2').disabled = false
          document.querySelector('#vive4-1').disabled = false
          document.querySelector('#vive2-1').disabled = true
          document.querySelector('#vive2-2').disabled = true
          document.querySelector('#vive3-1').disabled = true
          document.querySelector('#vive3-2').disabled = true
        }
        if (tag.id === 'vive1-1') {
          document.querySelector('#vive4-2').disabled = true
          document.querySelector('#vive4-1').disabled = true
          document.querySelector('#vive2-1').disabled = false
          document.querySelector('#vive2-2').disabled = false
          document.querySelector('#vive3-1').disabled = false
          document.querySelector('#vive3-2').disabled = false
        }
        if (tag.name.substr(0, 7) === 'familia') {
          familiaAnexo++
          const checked = document.querySelector(`#${tag.name}-1`).checked
          document.querySelector(`#${tag.name}-2`).disabled = checked
          document.querySelector(`#${tag.name}-3`).disabled = checked
        }

      })

      if (cie.length > 0) {
        motivoContadorService.data.indexMotivo = 0
        motivoContadorService.data.indexMotivoCompany = 0
        motivoContadorService.data.indexDiagnostico = 0
        $('#motivo-list').html('')
        $('#motivo-list-company').html('')
        $('#diagnostico-list').html('')

        // cie
        cie.map(item => {
          $http.get(
            `src/doctor/form28C/service/filterCI10.php?codigo=${item.hgc_cie_f056}&len=${item.hgc_cie_f056.length}`
          )
          .then(response => {
            if (item.hgc_tipo_f056 === 'adolecente') {
              motivoContadorService.data.indexMotivo++
              let template = `
              <li class="input-field Motivo-consulta--self-item">
                <input type="text" placeholder="Ingrese el motivo de consulta"
                  id="input-${motivoContadorService.data.indexMotivo}"
                  class="Motivo-consulta--self-input" value="${response.data.hgc_desc_c10}" />
                <p class="consulta-cie--code">
                  <input type="text" placeholder="Codigo cie10" id="cie-${motivoContadorService.data.indexMotivo}"
                      class="cie-input-motivo code-motivo-self" maxlength="4" value="${item.hgc_cie_f056}" />
                </p>
              </li>`
              $('#motivo-list').append(template)
            }
            if (item.hgc_tipo_f056 === 'company') {
              motivoContadorService.data.indexMotivoCompany++
              let template = `
              <li class="input-field Motivo-consulta--self-item">
                <input type="text" placeholder="Ingrese el motivo de consulta"
                  id="input-company-${motivoContadorService.data.indexMotivoCompany}"
                  class="Motivo-consulta--company-input" value="${response.data.hgc_desc_c10}" />
                <p class="consulta-cie--code">
                  <input type="text" placeholder="Codigo cie10"  id="cie-company-${motivoContadorService.data.indexMotivoCompany}"
                    class="cie-input-motivo code-motivo-company" maxlength="4" value="${item.hgc_cie_f056}" />
                </p>
              </li>`
              $('#motivo-list-company').append(template)
            }
            if (item.hgc_tipo_f056 === 'diagnostico') {
              motivoContadorService.data.indexDiagnostico++
              let template = `
                <li class="input-field Motivo-consulta--self-item">
                  <input type="text" placeholder="Ingrese el motivo de consulta"
                    id="diagnostico-input-${motivoContadorService.data.indexDiagnostico}"
                    class="Diagnostico-input" value="${response.data.hgc_desc_c10}" />
                  <p class="consulta-cie--code">
                    <input type="text" placeholder="Codigo cie10"
                      id="diagnostico-cie-${motivoContadorService.data.indexDiagnostico}"
                      class="cie-input-motivo Diagnostico-code" maxlength="4" value="${item.hgc_cie_f056}" />
                  </p>
                </li>`
              $('#diagnostico-list').append(template)
            }
          })
        })
      }

      $scope.noEscolariz()
      $scope.trabajaCheck()
      $scope.relacionesSexual()
      $scope.repeatYearDisabled()
      $scope.handleDisabledOtherActividades()
      $scope.handleWorkDisabInsalubre()
      $scope.handleDeserExclDis()
      $scope.handleDisEducaNoFormal()
      $scope.handleOtherToxico()
      $scope.handleDriveCar()
      $scope.handleTrasmiSexual()
      $scope.handleAgeStartSex()
    })
  }
})
