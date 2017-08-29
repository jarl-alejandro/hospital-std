'use strict'

angular.module('Hospital')
.controller('hojadevReporteController', function ($scope, $http, $stateParams, $location, motivoContadorService) {
  const fecha = new Date()
  $('.tooltipped').tooltip({delay: 50})

  $scope.paciente = {}
  $scope.empresa = {}
  $scope.signos = {}
  $scope.guardandoConsult = false

  $scope.hoy = fecha.getDate() < 10 ? '0'+fecha.getDate() : fecha.getDate()
  $scope.month = fecha.getMonth() < 10 ? '0'+(fecha.getMonth() + 1) : fecha.getMonth() + 1
  $scope.year = fecha.getFullYear().toString().split('')

  $scope.hoy = $scope.hoy.toString().split('')
  $scope.month = $scope.month.toString().split('')

  $http.get(`src/doctor/form056/service/paciente.php?id=${$stateParams.id}`)
  .then(response => {
    console.log(response);
    $scope.paciente = response.data.paciente
    $scope.apellidos = $scope.paciente.hgc_ape_pacie.split(' ')

    const edad = duration(fecha, new Date($scope.paciente.hgc_fecn_pacie))
    $scope.ageCumplid = edad.years < 10 ? '0'+ edad.years : edad.years
    $scope.ageYear = $scope.ageCumplid.toString().split('')
    $scope.ageMonth = edad.months < 10 ? '0' + edad.months : edad.months
    $scope.ageMonth = $scope.ageMonth.toString().split('')

    $http.get(`src/doctor/hoja-devolucion/service/signos.php?id=${$stateParams.turno}`)
    .then(snap => {
      $scope.signos = snap.data
      console.log(snap);
    })

    $scope.centil = `${$scope.signos.hgc_peso_sigvit} / ${$scope.ageCumplid}`
    $scope.deTalla = `${$scope.signos.hgc_talla_sigvit} / ${$scope.ageCumplid}`

    response.data.sexo.hgc_desc_genero === 'Mujer' ? $scope.urologia = true : $scope.urologia = false
  })

  $http.get(`src/doctor/hoja-devolucion/service/consultas.php?id=${$stateParams.id}`)
  .then(response => $scope.contlasN = response.data)

  $http.get('src/config/empresa/service/get.php')
  .then(response => {
    if (response.data.cont === 1) $scope.empresa = response.data.empresa
  })

  $http.get(`src/doctor/form056/service/signos.php?id=${$stateParams.turno}`)
  .then(response => {
    $scope.signos = response.data
    const edadPaciente = duration(new Date($scope.paciente.hgc_fecn_pacie), new Date($scope.signos.hgc_fecha_sigvit))

    $scope.cetilPesoEdad = `${$scope.signos.hgc_peso_sigvit} / ${edadPaciente.years}`
    $scope.deTallaEdad = `${$scope.signos.hgc_talla_sigvit} / ${edadPaciente.years}`

    $('.SignosVitalesDevolucion .input-field label').addClass('active')
  })

  $scope.handleDateVisit = () => $('.month-turno').slideDown()

  //Guarda y Edita el formularo "hoja de devolucion"
  $scope.data = {
    paciente: $stateParams.id,
    turno: $stateParams.turno,
    enfermedadActual: '',
    planTratamiento: '',
  }

  $('#fecha_proxima_visita-link').fadeOut()
  $('#fecha_proxima_visita-linkOut').css('display', 'inline-block')

  $http.get(`src/doctor/hoja-devolucion/service/get.php?turno=${$stateParams.turno}`)
  .then(response => {
    console.log(response)
    const cie = response.data.cie
    const form = response.data.form

    const compa = document.querySelector(`.Evolucion-company input[value="${form.hgc_acom_f056}"]`)
    const civil = document.querySelector(`.Informacion-consulta-civilStatus input[value="${form.hgc_civi_f056}"]`)
    const estud = document.querySelector(`.Evolucion-estudios__list input[value="${form.hgc_estu_f056}"]`)
    const men = document.querySelector(`.noMenstruacion[value="${form.hgc_nomen_f056}"]`)
    const tanne = document.querySelector(`.tannerSigno[value="${form.hgc_tanne_f056}"]`)

    compa !== null ? compa.checked = true : null
    civil !== null ? civil.checked = true : null
    estud !== null ? estud.checked = true : null
    men !== null ? men.checked = true : null
    tanne !== null ? tanne.checked = true : null

    $scope.data.enfermedadActual = form.hgc_enfe_f056
    $scope.data.planTratamiento = form.hgc_indic_f056

    $('#codigoForm056').val(form.hgc_codi_f056)
    $('#fecha_proxima_visita').val(form.hgc_fetpr_f056)
    $('#menstruacion').val(form.hgc_ulmen_f056)
    $('.ultima-mestruacion label').addClass('active')

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
          // End Cie
    })

    $scope.exportPDF = () => {
      convertoSVGToImage($('#exportthis'))

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
          pdfMake.createPdf(docDefinition).download("hojadevolucion.pdf");
        }
      })
    }

    $scope.exportPNG = () => {
      let jpg = document.querySelector('#exportthis')
      convertoSVGToImage($('#exportthis'))

      html2canvas(jpg, {
        useCORS: true,
      }).then(function (canvas) {
        canvas.toBlob(function (blob) {
          saveAs(blob, 'hojadevolucion.png')
        })
      })
    }


    function convertoSVGToImage (targetElement) {
      const listSVG = [...targetElement.find('svg')]

      listSVG.map((item, index) => {
        $(item).hide()
        let svg = $(item).html()
        let prop = $(item).attr('id')
        let canvas = document.createElement('canvas')
        canvas.classList.add(`${prop}-canvas`)

        let parent = item.parentElement
        parent.append(canvas)
        canvg(canvas, `<svg>${svg}</svg>`)
      })
    }

})
