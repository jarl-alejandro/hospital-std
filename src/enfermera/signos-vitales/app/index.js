'use strict'

const singosVitales = angular.module('Hospital')

singosVitales.controller('singosVitalesController', function ($scope, $http) {
  $scope.pacientes = []

  $http.get('src/enfermera/signos-vitales/service/pacientes.php')
    .then(response => $scope.pacientes = response.data)
})

singosVitales.controller('pacienteSignoController', function ($scope, $http, $stateParams, $rootScope) {
  const id = $stateParams.id
  const turno = $stateParams.turno
  $scope.tipo_form = ''
  const filePDF = document.getElementById('inputPDF')
  filePDF.addEventListener('change', handleUploadPDF)

  $scope.activeSignosBtn = false
  $scope.menor = false
  $scope.pacientId = id
  $scope.paciente = {}
  $rootScope.signosVitales = []
  $scope.empresa = {}
  $scope.pacient = {}
  $scope.procedimientos = []

  // $('.browser-default').select2()

  $http.get('src/datos/procedimientos/service/getAll.php')
  .then(response => $scope.procedimientos = response.data )

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
    id: '',
    procedimiento: '',
    grupoPrioritado: ''
  }

  $http.get(`src/enfermera/signos-vitales/service/turno.php?id=${turno}`)
  .then(response => {
    if (response.data.hgc_esta_turno === 'pdf') {
      $('#filepdf').hide()
      $('#signosVitales').show()
    }
    if (response.data.hgc_esta_turno === 'signosVitales') {
      $('#filepdf').hide()
      $('#signosVitales').hide()
      // $scope.activeSignosBtn = true
    }
    if (response.data.hgc_esta_turno === 'form') {
      $('#signosVitales').hide()
      $('#filepdf').hide()
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
  ).then(response => $rootScope.signosVitales = response.data)

  $http.get(
    `src/enfermera/signos-vitales/service/pacienteOne.php?id=${id}`
  )
  .then(response => {
    $scope.paciente = response.data
    $scope.fechaNacimiento = $scope.paciente.hgc_fecn_pacie
    const parametros = $scope.paciente.hgc_fecn_pacie.split('-')
    const fecha = new Date(parametros[0], parametros[1] - 1, parametros[2])
    const now = new Date()
    const duracion = duration(fecha, now)

    if (duracion.months >= 2) {
      $scope.tipo_form = 'form028c'
      $scope.menor = false
    }
    else {
      $scope.menor = true
      $scope.tipo_form = 'form028a'
    }
  })

  $scope.handleShowForm = () => {
    const duracion = duration(new Date($scope.fechaNacimiento), new Date())
    console.log(duracion);
    if (duracion.years >= 65) {
      $('#formPlusAdultoMayor65').slideDown()
    }
    else if (duracion.years >= 19) {
      $('#formPlusAdultoMenor65').slideDown()
    }
    else if (duracion.years >= 10) {
      $('.formPlus056').slideDown()
    }
    else if (duracion.years >= 0){
      $('.formPlus').slideDown()
    }
  }
  $scope.handleCancel = () => closeForm()

  $scope.handleReport = id => {
    window.open (`src/enfermera/signos-vitales/reporte/signos-vitales.php?id=${id}`,
      "_blank","toolbar=yes, scrollbars=yes, resizable=yes, top=50, left=60, width=1200, height=600")
  }

  $scope.handleSave = function handleSave () {
    if (validar()) {
      let m = ($scope.data.talla / 100)
      m = parseFloat(m)
      m = m * 2
      let imc = parseFloat($scope.data.peso) / m
      $scope.data.estado = parseInt(imc)
      $scope.data.tipoForm = $scope.tipo_form

      $http.post('src/enfermera/signos-vitales/service/save.php', $scope.data)
      .then(response => {
        console.log(response);

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
    }
    else {
      const duracion = duration(new Date($scope.fechaNacimiento), date)
      console.log(duracion);
      if (duracion.years >= 65) {

        $('.mayor65--input label').addClass('active')
        $('#formPlusAdultoMayor65').slideDown()

        $http.get(`src/enfermera/signos-vitales/service/tamizaje.php?turno=${signos.hgc_turno_sigvit}`)
        .then(response => {
          response.data.map(item => {
            let nombre = item.hgc_det_tam
            document.querySelector(`.checkedAdulto[value="${nombre}"]`).checked = true
          })
        })

        $('.AdultoMayorSignos input').addClass('active')
        $('#mayor65-parterialAcostado').val(signos.hgc_pracost_sigvit)
        $('#mayor65-parterialSentada').val(signos.hgc_prsent_sigvit)
        $('#mayor65-pulso7min').val(signos.hgc_puls_sigvit)
        $('#mayor65-temperatura').val(signos.hgc_temp_sigvit)
        $('#mayor65-frecuencia').val(signos.hgc_fre_sigvit)
        $('#mayor65-peso').val(signos.hgc_peso_sigvit)
        $('#mayor65-talla').val(signos.hgc_talla_sigvit)
        $('#mayor65-imc').val(signos.hgc_imc_sigvit)
        $('#mayor65-perimetroCintura').val(signos.hgc_percint_sigvit)
        $('#mayor65-perimetroCadera').val(signos.hgc_percad_sigvit)
        $('#mayor65-perimetroPantorrilla').val(signos.hgc_perpan_sigvit)
        $('#mayor65-responsables').val(signos.hgc_resp_sigvit)
        $('#formMayor65-procedimiento').val(signos.hgc_proc_sigvit)
        $('#formMayor65-grupoPrioritado').val(signos.hgc_grup_sigvit)
      }
      else if (duracion.years >= 19) {
        console.log(signos);
        $('#formPlusAdultoMenor65').slideDown()
        $('#formMenor65-temperatura').val(signos.hgc_temp_sigvit)
        $('#formMenor65-presionArterial').val(signos.hgc_prart_sigvit)
        $('#formMenor65-pulso').val(signos.hgc_puls_sigvit)
        $('#formMenor65-frecuencia').val(signos.hgc_fre_sigvit)
        $('#formMenor65-peso').val(signos.hgc_peso_sigvit)
        $('#formMenor65-talla').val(signos.hgc_talla_sigvit)
        $('#formMenor65-idAdultoMenor65').val(signos.hgc_id_sigvit)
        $('#formMenor65-procedimiento').val( signos.hgc_proc_sigvit)
        $('#formMenor65-grupoPrioritado').val(signos.hgc_grup_sigvit)
      }
      else if (duracion.years >= 10) {
        $('.formPlus056').slideDown()

        $('#fr-cardiaca056').val(signos.hgc_frcar_sigvit)
        $('#presion-arterial056').val(signos.hgc_prart_sigvit)
        $('#peso056').val(signos.hgc_peso_sigvit)
        $('#talla056').val(signos.hgc_talla_sigvit)
        $('#imc056').val(signos.hgc_imc_sigvit)
        $("#idform056").val(signos.hgc_id_sigvit)
        $('#Procedimiento56').val(signos.hgc_proc_sigvit)
        $('#grupoPrioritado056').val(signos.hgc_grup_sigvit)
      }
      else {
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
        $scope.data.procedimiento = signos.hgc_proc_sigvit
        $scope.data.grupoPrioritado = signos.hgc_grup_sigvit
      }

      $('.formPlus-content label').addClass('active')
    }
  }

  function handleUploadPDF (e) {
    const formData = new FormData()
    const xhr = new XMLHttpRequest()

    if (filePDF.files[0].size > (1024 * 1024 * 2)) {
      Materialize.toast('No puede subir pdf mas de 2mb', 4000)
      return false
    }

    formData.append('filePDF', filePDF.files[0])
    formData.append('turno', turno)

    xhr.open('POST', 'src/enfermera/signos-vitales/service/uploadFile.php')
    xhr.onload = function (e) {
      if (this.status === 200) {
        if (this.responseText == '201') {
          $scope.activeSignosBtn = false
          Materialize.toast('Se ha subido el PDF', 4000)
          $('#filepdf').hide()
          $('#signosVitales').show()
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
      id: '',
      grupoPrioritado: ''
    }
    // $('#Procedimiento').val('').trigger('change')
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
      }
      if (data.procedimiento === '') {
        Materialize.toast('Ingresa el procedimiento', 4000)
        return false
      }
      if (data.grupoPrioritado === '') {
        Materialize.toast('Ingrese el grupo prioritado', 4000)
        document.getElementById('grupoPrioritado').focus()
        return false
      }
       else return true
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
      }
      if (data.procedimiento === '') {
        Materialize.toast('Ingresa el procedimiento', 4000)
        return false
      }
      if (data.grupoPrioritado === '') {
        Materialize.toast('Ingrese el grupo prioritado', 4000)
        document.getElementById('grupoPrioritado').focus()
        return false
      }
      else return true
    }
    else return true
  }

  $scope.sacar_edad = (nacimiento, fecha) => {
    const duracion = duration(new Date(nacimiento), new Date(fecha))
    console.log(duracion);
    return `${duracion.years} años ${duracion.months} meses`
  }

  setInterval(() => {
    let active = localStorage.getItem('activar')
    if (active === 'true') {
      $http.get(`src/enfermera/signos-vitales/service/getAll.php?id=${$stateParams.id}`)
      .then(response =>  {
        $scope.signosVitales = response.data
        $scope.activeSignosBtn = true
        localStorage.setItem('activar', false)
        console.log('inicion');
      })
    }
    console.log('local----');
  }, 100)

})

singosVitales.controller('formCtrl056SigVit', function ($scope, $http, $stateParams, $rootScope) {
  $scope.dataform056 = {
    imc: '',
    frCardica: '',
    prArterial: '',
    peso: '',
    talla: '',
    turno: $stateParams.turno,
    historiaClinica: $stateParams.id,
    id: '',
    procedimiento: '',
    grupoPrioritado056: ''
  }

  $scope.handleCancel056 = () => closeForm056()

  $scope.calcularImc = () => {
    if (!!$scope.dataform056.peso && !!$scope.dataform056.talla) {
      let m = ($scope.dataform056.talla / 100)
      m = parseFloat(m)
      m = m * 2
      let imc = parseFloat($scope.dataform056.peso) / m
      $scope.dataform056.imc = parseInt(imc)
      $('#label-imc').addClass('active')
    }
  }

  $scope.handleSave056 = () => {
    editform056()
    if (validar056()) {
      $http.post('src/enfermera/signos-vitales/service/save056.php', $scope.dataform056)
      .then(response => {
        if (response.data === '201') {
          getAll056()
          closeForm056()
          Materialize.toast('Se ha guarado con exito', 4000)
          // location.reload()
        }
      })

    }
  }

  function editform056 () {
    if ($('#idform056').val() !== '') {
      $scope.dataform056 = {
        id: $('#idform056').val(),
        procedimiento: $('#Procedimiento56').val(),
        grupoPrioritado: $('#grupoPrioritado056').val(),
        imc: $('#imc056').val(),
        frCardica: $('#fr-cardiaca056').val(),
        prArterial: $('#presion-arterial056').val(),
        peso: $('#peso056').val(),
        talla: $('#talla056').val(),
        turno: $stateParams.turno,
        historiaClinica: $stateParams.id,
        procedimiento: $('#Procedimiento56').val(),
        grupoPrioritado:  $('#grupoPrioritado056').val()
      }
    }
  }

  function getAll056(){
    $http.get(
      `src/enfermera/signos-vitales/service/getAll.php?id=${$stateParams.id}`
    ).then(response => $rootScope.signosVitales = response.data)
  }

  function closeForm056 () {
    $('.formPlus056').slideUp()
    $('label.active').removeClass('active')
    $('#idform056').val('')
    $scope.dataform056 = {
      imc: '',
      frCardica: '',
      prArterial: '',
      peso: '',
      talla: '',
      turno: $stateParams.turno,
      historiaClinica: $stateParams.id,
      id: '',
      procedimiento: '',
      grupoPrioritado: ''
    }
  }

  function validar056 () {
    const form = $scope.dataform056
    if (form.frCardica.trim() === '') {
      Materialize.toast('Ingrese el indice de masa corporal', 4000)
      $('#fr-cardiaca056').focus()
      return false
    }
    if (form.prArterial.trim() === '') {
      Materialize.toast('Ingrese el indice de masa corporal', 4000)
      $('#presion-arterial056').focus()
      return false
    }
    if (form.peso.trim() === '') {
      Materialize.toast('Ingrese el indice de masa corporal', 4000)
      $('#peso056').focus()
      return false
    }
    if (form.talla.trim() === '') {
      Materialize.toast('Ingrese el indice de masa corporal', 4000)
      $('#talla056').focus()
      return false
    }
    if (form.procedimiento === '') {
      Materialize.toast('Ingrese el procedimiento', 4000)
      $('#Procedimiento56').focus()
      return false
    }
    if (form.grupoPrioritado === '') {
      Materialize.toast('Ingrese el grupo prioritado', 4000)
      $('#grupoPrioritado056').focus()
      return false
    }
    else return true
  }
})
