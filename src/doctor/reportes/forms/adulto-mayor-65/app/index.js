'use strict'

angular.module('Hospital')
.controller('adultoMayor65ReporteCtrl', function ($scope, $http, $stateParams, $location) {
  const paciente = $stateParams.id
  const turno = $stateParams.turno

  $('input').attr('disabled', true)
  $('textarea').attr('disabled', true)


  $scope.pacient = {}
  $scope.empresa = {}
  $scope.signos = {}

  $scope.data = { paciente, turno }
  $scope.cie10 = [
    { name: '', cie: '', isActive: false, check: '', detalle: '' }
  ]

  $scope.handlePrintReport = () => {
    html2canvas(document.getElementById('hoja1'), {
      useCORS: true,
      onrendered: function (canvas) {
        var data = canvas.toDataURL();
        var docDefinition = {
            content: [{
                image: data,
                width: 500,
            }]
        };
        pdfMake.createPdf(docDefinition).download("formhoja1.pdf");
      }
    })

    html2canvas(document.getElementById('hoja2'), {
      useCORS: true,
      onrendered: function (canvas) {
        var data = canvas.toDataURL();
        var docDefinition = {
            content: [{
                image: data,
                width: 500,
            }]
        };
        pdfMake.createPdf(docDefinition).download("formhoja2.pdf");
      }
    })
  }

  $http.get(`src/doctor/adulto-mayor/service/signos.php?turno=${turno}`)
  .then(response => {
    $scope.signos = response.data
    let tami = document.querySelector(`.checkedAdulto[value="${$scope.signos.hgc_tami_sigvit}"]`)
    tami.checked = true
    $('.Signos label').addClass('active')
  })

  $http.get(`src/doctor/form28A/service/paciente.php?id=${paciente}`)
  .then(response => $scope.pacient = response.data)

  $http.get('src/config/empresa/service/get.php')
  .then(response => {
    if (response.data.cont === 1) {
      $scope.empresa = response.data.empresa
    }
  })

  $http.get(`src/doctor/form28C/service/consultas.php?id=${paciente}`)
  .then(response => {
    $scope.consulta = response.data.count + 1
    const parametros = response.data.paciente.hgc_fecn_pacie.toString().split('-')
    const fecha = new Date(parametros[0], parametros[1] - 1, parametros[2])
    const now = new Date()

    $scope.edad = duration(now, fecha)
  })

  $scope.handleNewCIE10 = () => {
    $scope.cie10.push({ name: '', cie: '', isActive: false, check: '', detalle:'' })
  }

  $scope.cieGetName = (event, item) => {
    if (event.which === 13) {
      let name = item.name.toLowerCase()
      $http.get(`src/doctor/form28C/service/filterNombreCI10.php?nombre=${name}`)
      .then(response => {
        item.cie = response.data.hgc_codi_c10
        item.isActive = true
      })
    }
  }

  $scope.cieGet = (event, item) => {
    if (event.which === 13) {
      $http.get(`src/doctor/form28C/service/filterCI10.php?codigo=${item.cie}&len=${item.cie.length}`)
      .then(response => {
        item.name = response.data.hgc_desc_c10
        item.isActive = true
      })
    }
  }

  $scope.save = function () {
    $scope.data.estadoGeneral = document.querySelector('.estadoGeneral:checked').value
    $scope.data.alertaRiesgo = document.querySelector('.alertaRiesgo:checked').value
    $scope.data.habitosNocivos = document.querySelector('.habitosNocivos:checked').value
    $scope.data.clinicoQuirurgicos = document.querySelector('.clinicoQuirurgicos:checked').value
    $scope.data.farcologicos = document.querySelector('.farcologicos input:checked').value
    $scope.data.sindromeGeriatricos = document.querySelector('.sindromeGeriatricos input:checked').value

    $scope.data.cie10 = $scope.cie10
    $scope.data.parametrosFisicos = []

    Array.prototype.slice.apply(document.querySelectorAll('.RevisionSistema-item input:checked'))
    .map(item => {
      $scope.data.parametrosFisicos.push({ name: item.id, tipo: 1 })
    })

    Array.prototype.slice.apply(
      document.querySelectorAll('.AntecedentesFamiliaresSociales input:checked')
    )
    .map(item => {
      $scope.data.parametrosFisicos.push({ name: item.id, tipo: 2 })
    })
    Array.prototype.slice.apply(
      document.querySelectorAll('.ExamenFisicoMayor-list input:checked')
    )
    .map(item => {
      $scope.data.parametrosFisicos.push({ name: item.id, tipo: 3 })
    })

    $http.post(`src/doctor/adulto-mayor-65/service/${$stateParams.action}.php`, $scope.data)
    .then(response => {
      console.log(response)

      if (response.data === '201') {
        Materialize.toast('Se ha guardado con exito', 4000)
        $location.path('/doctor')
      }
    })
  }

  if (true) {
    $http.get(`src/doctor/adulto-mayor-65/service/get.php?turno=${turno}`)
    .then(response => {
      $('.input-field label').addClass('active')
      $scope.cie10 = []
      let main = response.data.main
      let params = response.data.params

      params.map(item => {
        console.log(item);
        if (item.hgc_tipo_ma65 === '1') {
          document.querySelector(`.RevisionSistema-item input[id="${item.hgc_name_ma65}"]`).checked = true
        }
        if (item.hgc_tipo_ma65 === '2') {
          document.querySelector(`.AntecedentesFamiliaresSociales input[id="${item.hgc_name_ma65}"]`)
            .checked = true
        }
        if (item.hgc_tipo_ma65 === '3') {
          document.querySelector(`.ExamenFisicoMayor-list input[id="${item.hgc_name_ma65}"]`)
            .checked = true
        }
      })

      $scope.data = {
        id: main.hgc_codi_ma65,
        motivo: main.hgc_moti_ma65,
        enfermedad: main.hgc_enferm_ma65,
        medicamento: main.hgc_medi_ma65,
        revisionSistema: main.hgc_revsis_ma65,
        antecedentePersonales: main.hgc_antper_ma65,
        antecedentesPersoanles2: main.hgc_antper2_ma65,
        edadUltimaMamografia: main.hgc_edumam_ma65,
        edadUltimaCitologia: main.hgc_educit_ma65,
        edadMenopausia: main.hgc_edmen_ma65,
        embarazos: main.hgc_emb_ma65,
        partos: main.hgc_part_ma65,
        cesareas: main.hgc_ces_ma65,
        terapiaHormonal: main.hgc_terhor_ma65,
        ginecoObstretricos: main.hgc_gineob_ma65,
        edadUltimoProstatico: main.hgc_edupro_ma65,
        terapia: main.hgc_terap_ma65,
        farcologicos: main.hgc_farc_ma65,
        pruebasDiagnostico: main.hgc_prueb_ma65,
        tratamiento: main.hgc_tratamiento_ma65,
        examenFisico: main.hgc_exafi_ma65
      }

      response.data.detail.map(item => {
        let codcie = item.hgc_cie_ma65
        $http.get(`src/doctor/form28C/service/filterCI10.php?codigo=${codcie}&len=${codcie.length}`)
        .then(cie_response => {
          $scope.cie10.push({
            name: cie_response.data.hgc_desc_c10,
            cie: item.hgc_cie_ma65,
            isActive: true,
            check: item.hgc_tip_ma65,
            detalle: item.hgc_det_ma65
          })
        })
      })

      document.querySelector(`.estadoGeneral[value="${main.hgc_estge_ma65}"]`).checked = true
      document.querySelector(`.alertaRiesgo[value="${main.hgc_alri_ma65}"]`).checked = true
      document.querySelector(`.habitosNocivos[value="${main.hgc_habnoc_ma65}"]`).checked = true
      document.querySelector(`.clinicoQuirurgicos[value="${main.hgc_cliqui_ma65}"]`).checked = true
      document.querySelector(`.farcologicos input[value="${main.hgc_farc_ma65}"]`).checked = true
      document.querySelector(`.sindromeGeriatricos input[value="${main.hgc_sisgeri_ma65}"]`).checked = true
    })
  }

})
