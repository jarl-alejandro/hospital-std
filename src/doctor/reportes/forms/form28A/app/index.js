'use strict'

angular.module('Hospital')
.controller('reportform28ACtrl', function ($scope, $http, $stateParams, $location) {
  const paciente = $stateParams.id
  const turno = $stateParams.turno
  const hoy = new Date()

  $('.tooltipped').tooltip({delay: 50})

  const dia = hoy.getDate() < 10 ? '0' + hoy.getDate() : hoy.getDate()
  const mes = hoy.getMonth() < 10 ? '0' + (hoy.getMonth() + 1) : (hoy.getMonth() + 1)

  $scope.activoForm28 = false
  $scope.fecha = `${dia}/${mes}/${hoy.getFullYear()}`
  $scope.sistemas = []
  $scope.fisicos = []
  $scope.pacient = {}
  $scope.empresa = {}
  $scope.year = hoy.getFullYear()
  $scope.data = {
    motivo: '',
    enfermedad: '',
    paciente,
    turno,
    gestasPrevias: '',
    abortos: '',
    partos: '',
    partosVaginales: '',
    cesarias: '',
    nacidosVivos: '',
    hijosVivos: '',
    muertosMenor7: '',
    muertosMayor7: '',
    nacidosMuertos: '',
    fechaEmbarazo: '',
    tamizaje: '',
    condicionEgreso: '',
    referido: '',
    edadGestion: '',
    relacionPeso: '',
    tipoficacionSanguinea: '',
    tipoficacionSanguineaCheck: 'no',
    examenesEspeciales: '',
    examenesEspecialesCheck: 'no',
    apagar1Min: '',
    apagar5Min: '',
    longitud: '',
    pCefalico: '',
    pesoNacer: '',
    reanimacion: '',
    reanimacionCheck: 'no'
  }

	let array_sistemas = []
  let array_fisicos = []
  let array_form = []
  let array_atendido = []

  $http.get(`src/doctor/form28C/service/consultas.php?id=${paciente}`)
  .then(response => {
    $scope.consulta = response.data.count + 1
    const parametros = response.data.paciente.hgc_fecn_pacie.toString().split('-')
    const fecha = new Date(parametros[0], parametros[1] - 1, parametros[2])
    const now = new Date()

    $scope.edad = duration(now, fecha)
  })

  $http.get('src/doctor/form28A/service/sistemas.php')
  .then(response => $scope.sistemas = response.data)

  $http.get('src/doctor/form28A/service/fisico.php')
  .then(response => $scope.fisicos = response.data)

  $http.get(`src/doctor/form28A/service/paciente.php?id=${paciente}`)
  .then(response => $scope.pacient = response.data)

  $http.get('src/config/empresa/service/get.php')
  .then(response => {
    if (response.data.cont === 1) {
      $scope.empresa = response.data.empresa
    }
  })

  // document.querySelector('.input-field label').classList.add('active')
  setTimeout(
    () => {
      [...document.querySelectorAll('.input-field label')].map(item => {
        item.classList.add('active')
      })
    },
    500
  )

  $http.get(`src/doctor/form28A/service/get.php?id=${paciente}&turno=${turno}`)
  .then(response => {
    const form = response.data
    $scope.data = {
      motivo: form.form.hgc_moti_form28,
      enfermedad: form.form.hgc_enfer_form28,
      id: form.form.hgc_codi_form28,
      paciente,
      turno,
      gestasPrevias: form.observacion.hgc_gpre_obst,
      abortos: form.observacion.hgc_abor_obst,
      partos: form.observacion.hgc_part_obst,
      partosVaginales: form.observacion.hgc_pvag_obst,
      cesarias: form.observacion.hgc_cesa_obst,
      nacidosVivos: form.observacion.hgc_nviv_obst,
      hijosVivos: form.observacion.hgc_nmue_obst,
      muertosMenor7: form.observacion.hgc_hviv_obst,
      muertosMayor7: form.observacion.hgc_mne7_obst,
      nacidosMuertos: form.observacion.hgc_mma7_obst,
      fechaEmbarazo: form.observacion.hgc_gpre_obst,
      tamizaje: form.nacido.hgc_tami_nac,
      condicionEgreso: form.nacido.hgc_coeg_nac,
      referido: form.nacido.hgc_refe_nac,
      edadGestion: form.nacido.hgc_edge_nac,
      relacionPeso: form.nacido.hgc_repe_nac,
      tipoficacionSanguinea: form.nacido.hgc_tipob_nac,
      tipoficacionSanguineaCheck: form.nacido.hgc_tisa_nac,
      examenesEspeciales: form.nacido.hgc_exob_nac,
      examenesEspecialesCheck: form.nacido.hgc_exes_nac,
      apagar1Min: form.nacido.hgc_ap1m_nac,
      apagar5Min: form.nacido.hgc_ap5m_nac,
      longitud: form.nacido.hgc_lon_nac,
      pCefalico: form.nacido.hgc_pcef_nac,
      pesoNacer: form.nacido.hgc_pena_nac,
      reanimacion: form.nacido.hgc_reob_nac,
      reanimacionCheck: form.nacido.hgc_rean_nac
    }

    form.atendido.map(item => {
      setTimeout(() => {
        document.querySelector(`#${item.hgc_tipo_aten}_${item.hgc_desc_aten}`).checked = true
      }, 100)
    })

    form.detalle.map(item => {
      setTimeout(() => {
        let code = `${item.hgc_tipo_dform28}_${item.hgc_codi_dform28}_${item.hgc_secc_dform28}`
        let input = document.querySelector(`input[value="${code}"]`)
        let obs = document.querySelector(`#input__form-${item.hgc_codi_dform28}`)
        let system = document.querySelector(`#input-system-${item.hgc_codi_dform28}`)
        let fisico = document.querySelector(`#input-fisico-${item.hgc_codi_dform28}`)

        if (obs !== null) {
          obs.value = item.hgc_obser_dform28
        } else if (system !== null) {
          system.value = item.hgc_obser_dform28
        } else if (fisico !== null) {
          fisico.value = item.hgc_obser_dform28
        }

        if (input !== null) {
          input.checked = true
        }
        else {
          code = `${item.hgc_tipo_dform28}_${item.hgc_codi_dform28}`
          input = document.querySelector(`input[value="${code}"]`)
          input !== null ? input.checked = true : null
        }
      }, 100)

    })
  })

  $scope.exportPDF = () => {
    convertoSVGToImage($('#exportthis'))

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

    html2canvas(document.getElementById('grafica-section'), {
      useCORS: true,
      onrendered: function (canvas) {
        var data = canvas.toDataURL();
        var docDefinition = {
          content: [{
            image: data,
            width: 500,
          }]
        };
        pdfMake.createPdf(docDefinition).download("menorGraphic.pdf");
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
        saveAs(blob, 'form028a.png')
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
