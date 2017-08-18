'use strict'

angular.module('Hospital')
.controller('form056EditCtrl', function ($scope, $http, $stateParams, motivoContadorService) {
  $scope.action = $stateParams.action

  if ($scope.action === 'edit') {
    $http.get(`src/doctor/form056/service/get.php?turno=${$stateParams.turno}`)
    .then(response => {
      $('#fecha_proxima_visita-link').fadeOut()
      $('#fecha_proxima_visita-linkOut').css('display', 'inline-block')
      const form = response.data.form
      const anexo = response.data.anexo
      const observacion = response.data.observacion
      const cie = response.data.cie

      //Fomr 056
      document.querySelector(`.Informacion-consulta-companion input[value="${form.hgc_acom_f056}"]`).checked = true
      document.querySelector(`.Informacion-consulta-civilStatus input[value="${form.hgc_civi_f056}"]`).checked = true
      $('#codigoForm056').val(form.hgc_codi_f056)
      $('#enfermedad-actual').val(form.hgc_enfe_f056)
      $('#ocupacion056').val(form.hgc_ocup_f056)
      $('#numerosCuartos056').val(form.hgc_ncuar_f056)
      $('#plandeTratamiento').val(form.hgc_indic_f056)
      $('#fecha_proxima_visita').val(form.hgc_fetpr_f056)
      $('label').addClass('active')
      //Observacion
      observacion.map(item => {
        document.querySelector(`.observacion[data-tipo="${item.hgc_tipo_df056}"]`).value = item.hgc_desc_df056
      })

      //Anexo
      anexo.map(item => {
        const tag = document.querySelector(`input[name="${item.hgc_tipo_df056}"][value="${item.hgc_valo_df056}"]`)
        tag.checked = true
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
                  id="input-${motivoContadorService.data.indexMotivoCompany}"
                  class="Motivo-consulta--company-input" value="${response.data.hgc_desc_c10}" />
                <p class="consulta-cie--code">
                  <input type="text" placeholder="Codigo cie10"  id="cie-${motivoContadorService.data.indexMotivoCompany}"
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

    })
  }
})
