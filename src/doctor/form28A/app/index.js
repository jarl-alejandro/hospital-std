'use strict'

const form28A = angular.module('Hospital')

form28A.controller('form28AController', function ($scope, $http, $stateParams, $location) {
  const paciente = $stateParams.id
  const turno = $stateParams.turno
  const hoy = new Date()

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

  $scope.handleBack = () => {
    $('#hoja__1').slideDown()
    $('#hoja__2').slideUp()
    setTimeout(() => window.scrollTo(0, 0), 100)
  }

  $scope.handleSave = () => {
    const items_sistemas = [...document.querySelectorAll('.items_sistemas')]
    const items_fisicico = [...document.querySelectorAll('.items_fisicico')]
    const items__form = [...document.querySelectorAll('.items__form')]
    const items_atendido = [...document.querySelectorAll('.item_atendido')]

    array_sistemas = []
    array_fisicos = []
    array_form = []
    array_atendido = []

    for(let i in items_sistemas) {
      let sistemas = items_sistemas[i]
      if(sistemas.checked === true) {
        let tipo = sistemas.value.split('_')[0]
        let id = sistemas.value.split('_')[1]
        let observacion = document.getElementById(`input-system-${id}`).value
        array_sistemas.push({ id, tipo, observacion })
      }
    }

    for(let i in items_fisicico) {
      let fisico = items_fisicico[i]
      if(fisico.checked === true) {
        let tipo = fisico.value.split('_')[0]
        let id = fisico.value.split('_')[1]
        let observacion = document.getElementById(`input-fisico-${id}`).value
        array_fisicos.push({ id, tipo, observacion })
      }
    }

    for (let i in items__form) {
      let item = items__form[i]
      if (item.checked === true) {
        let tipo = item.value.split('_')[0]
        let id = item.value.split('_')[1]
        let seccion = item.value.split('_')[2]
        let observacion = document.getElementById(`input__form-${id}`).value

        array_form.push({ id, tipo, observacion, seccion })
      }
    }

    for (let i in items_atendido) {
      let item = items_atendido[i]
      if (item.checked === true) {
        let tipo = item.id.split('_')[0]
        let atendido = item.id.split('_')[1]

        array_atendido.push({ atendido, tipo })
      }
    }

    if (validarForm()) {
      $scope.activoForm28 = true
      $scope.data.sistemas = array_sistemas
      $scope.data.fisicos = array_fisicos
      $scope.data.form = array_form
      $scope.data.atendido = array_atendido

      $http.post(`src/doctor/form28A/service/${$stateParams.action}.php`, $scope.data)
      .then(response => {
        console.log(response)
        if (response.data === '201') {
          Materialize.toast('Se ha guardado con exito', 4000)
          $location.path('/doctor')
          $scope.activoForm28 = false
        } else {
        Materialize.toast('Intente nuevamente', 4000)
          $scope.activoForm28 = false
        }
      })
    }
  }

  function validarForm () {
    const data = $scope.data

    if (data.motivo === '') {
      Materialize.toast('Ingrese el motivo de la consulta', 4000)
      return false
    }
    if (data.enfermedad === '') {
      Materialize.toast('Ingrese la enfermedad o problemas actual', 4000)
      return false
    }
    if (array_sistemas.length !== $scope.sistemas.length) {
      Materialize.toast('Debe selecionar la revision de organos y sistemas', 4000)
      return false
    }
    if (array_fisicos.length !== $scope.fisicos.length) {
      Materialize.toast('Debe selecionar los examenes fisicos', 4000)
      return false
    } else return true
  }


  // Editar
  if ($stateParams.action === 'edit') {
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

    $http.get(`src/doctor/form28A/service/get.php?id=${paciente}&turno=${turno}`)
    .then(response => {
      const form = response.data
      console.log(form);
      $scope.data = {
        motivo: form.form.hgc_moti_form28,
        enfermedad: form.form.hgc_enfer_form28,
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
    })
  }

})
