'use strict'

const singosVitales = angular.module('Hospital')

singosVitales.controller('singosVitalesController', function ($scope, $http) {
  $scope.pacientes = []

  $http.get('src/enfermera/signos-vitales/service/pacientes.php')
    .then(response => $scope.pacientes = response.data)
})

singosVitales.controller('pacienteSignoController', function ($scope, $http, $stateParams) {
  const id = $stateParams.id
  const turno = $stateParams.turno
  const filePDF = document.getElementById('inputPDF')
  filePDF.addEventListener('change', handleUploadPDF)

  $scope.activeSignosBtn = false
  $scope.menor = false
  $scope.paciente = {}
  $scope.signosVitales = []
  $scope.empresa = {}
  $scope.pacient = {}

  $scope.data = {
    temperatura: '',
    frCardica: '',
    frRespiratoria: '',
    prArterial: '',
    peso: '',
    talla: '',
    prEncefalico: '',
    estado: '',
    longitud: '',
    pulso: '',
    turno,
    historiaClinica: id,
    id: ''
  }

  $http.get(`src/enfermera/signos-vitales/service/turno.php?id=${turno}`)
  .then(response => {
    console.log(response)
    if (response.data.hgc_esta_turno === 'pdf') {
      $('#filepdf').fadeOut()
      $('#signosVitales').fadeIn()
    }
    if (response.data.hgc_esta_turno === 'signosVitales') {
      $('#filepdf').fadeOut()
      $('#signosVitales').fadeIn()
      $scope.activeSignosBtn = true
    }
  })

  $http.get('src/config/empresa/service/get.php')
  .then(response => {
    if (response.data.cont === 1)
      $scope.empresa = response.data.empresa
  })

  $http.get(`src/doctor/form28A/service/paciente.php?id=${id}`)
  .then(response => $scope.pacient = response.data)

  $http.get(
    `src/enfermera/signos-vitales/service/getAll.php?id=${id}`
  ).then(response => $scope.signosVitales = response.data)

  $http.get(
    `src/enfermera/signos-vitales/service/pacienteOne.php?id=${id}`
  )
  .then(response => {
    $scope.paciente = response.data
    const parametros = $scope.paciente.hgc_fecn_pacie.split('-')
    const fecha = new Date(parametros[0], parametros[1] - 1, parametros[2])
    const now = new Date()
    const year = now.getFullYear() - fecha.getFullYear()
    const moth = now.getMonth() - fecha.getMonth()
    const age = (year * 12) + moth

    if (age < 2) $scope.menor = true
    else $scope.menor = false
  })

  $scope.handleShowForm = () => $('.formPlus').slideDown()
  $scope.handleCancel = () => closeForm()

  $scope.handleReport = () => {
    window.open (`src/enfermera/signos-vitales/reporte/signos-vitales.php`, "_blank","toolbar=yes, scrollbars=yes, resizable=yes, top=50, left=60, width=1200, height=600")
  }

  $scope.handleSave = function handleSave () {
    if (validar()) {
      $scope.data.estado = $scope.data.peso / ($scope.data.talla ** 2)
      $http.post('src/enfermera/signos-vitales/service/save.php', $scope.data)
      .then(response => {
        console.log(response)
        if (response.data === "201") {
          $scope.activeSignosBtn = true
          Materialize.toast('Se ha guarado con exito', 4000)
          closeForm()
          $http.get(`src/enfermera/signos-vitales/service/getAll.php?id=${id}`)
          .then(response => $scope.signosVitales = response.data)
        }
      })
    }
  }

  $scope.handleEdit = (signos) => {
    const hoy = new Date()

    const fecha = signos.hgc_fecha_sigvit
    const hora = signos.hgc_hora_sigvit
    const array = fecha.split('-')
    const horaArray = hora.split(':')

    let date = new Date(array[0], array[1]-1, array[2],
      parseInt(horaArray[0])+24, horaArray[1])

    if (hoy > date) {
      Materialize.toast('No pude editar ya han pasado las 24 horas', 4000)
    } else {
      $('.formPlus').slideDown()
      $scope.data.temperatura = signos.hgc_temp_sigvit
      $scope.data.frCardica = signos.hgc_frcar_sigvit
      $scope.data.frRespiratoria = signos.hgc_frresp_sigvit
      $scope.data.prArterial = signos.hgc_prart_sigvit
      $scope.data.peso = signos.hgc_peso_sigvit
      $scope.data.talla = signos.hgc_talla_sigvit
      $scope.data.prEncefalico = signos.hgc_prence_sigvit
      $scope.data.estado = signos.hgc_esta_sigvit
      $scope.data.longitud = signos.hgc_longi_sigvit
      $scope.data.pulso = signos.hgc_puls_sigvit
      $scope.data.id = signos.hgc_id_sigvit
      $('.formPlus-content label').addClass('active')
    }
  }

  function handleUploadPDF (e) {
    const formData = new FormData()
    const xhr = new XMLHttpRequest()

    formData.append('filePDF', filePDF.files[0])
    formData.append('turno', turno)

    xhr.open('POST', 'src/enfermera/signos-vitales/service/uploadFile.php')
    xhr.onload = function (e) {
      if (this.status === 200) {

        if (this.responseText === '201') {
          Materialize.toast('Se ha subido el PDF', 4000)
          $('#filepdf').fadeOut()
          $('#signosVitales').fadeIn()
        }
      }
    }

    xhr.send(formData)
  }

  function closeForm () {
    $('.formPlus').slideUp()
    $('label.active').removeClass('active')

    $scope.data = {
      temperatura: '',
      frCardica: '',
      frRespiratoria: '',
      prArterial: '',
      peso: '',
      talla: '',
      prEncefalico: '',
      estado: '',
      longitud: '',
      pulso: '',
      turno,
      historiaClinica: id,
      id: ''
    }
  }

  function validar () {
    const data = $scope.data
    if (data.temperatura === '') {
      Materialize.toast('Ingrese la temperatura', 4000)
      return false
    }
    else if ($scope.menor === false) {
      if (data.frCardica === '') {
        Materialize.toast('Ingrese la frecuencia cardiaca', 4000)
        return false
      }
      if (data.frRespiratoria === '') {
        Materialize.toast('Ingrese la frecuencia respiratoria', 4000)
        return false
      }
      if (data.prArterial === '') {
        Materialize.toast('Ingrese el presion arterial', 4000)
        return false
      }
      if (data.peso === '') {
        Materialize.toast('Ingresa el peso', 4000)
        return false
      }
      if (data.talla === '') {
        Materialize.toast('Ingresa la talla', 4000)
        return false
      }
      if (data.prEncefalico === '') {
        Materialize.toast('Ingresa el perimetro encefalico', 4000)
        return false
      } else return true
    }
    else if ($scope.menor === true) {
      if (data.pulso === '') {
        Materialize.toast('Ingrese el pulso', 4000)
        return false
      }
      if (data.peso === '') {
        Materialize.toast('Ingrese el peso', 4000)
        return false
      }
      if (data.longitud === '') {
        Materialize.toast('Ingresa la longitud', 4000)
        return false
      }
      if (data.prEncefalico === '') {
        Materialize.toast('Ingresa el perimetro encefalico', 4000)
        return false
      } else return true
    }
    else return true
  }

})
