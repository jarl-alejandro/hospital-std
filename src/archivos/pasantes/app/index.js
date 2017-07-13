'use strict'


const pasantes = angular.module('Hospital')

pasantes.controller('pasantesController', function ($scope, $http) {
  $('.formContainer').slideUp()
  $('ul.tabs').tabs()
  $('ul.tabs').tabs('select_tab', 'test-swipe-1')
  $('.browser-default').select2()

  $('.datepicker').pickadate({
    selectMonths: true,
    selectYears: 15,
    clear: 'Limpiar',
    close: 'OK',
    today: 'Hoy',
    format: 'dd/mm/yyyy',
    monthsFull: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Dicembre'],
    monthsShort: ['Ene', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    weekdaysFull: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
    weekdaysShort: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
    weekdaysLetter: [ 'D', 'L', 'M', 'M', 'J', 'V', 'S' ],
    labelMonthNext: 'Siguiente mes',
    labelMonthPrev: 'Mes Anterior',
    labelMonthSelect: 'Selecione el mes',
    labelYearSelect: 'Selecione el año',
    min: new Date(),
  })

  $scope.data = {
    id: '',
    cedula: '',
    nombre: '',
    apellido: '',
    fechaNac: '',
    dni: '',
    telefono: '',
    ceulular: '',
    direccion: '',
    email: '',
    sexo: '',
    profesion: '',
    tipoPasante: '',
    fecha_ingreso: '',
    fecha_egreso: '',
    universidad: '',
    rol: 'pasantes',
    especialidades: []
  }
  $scope.usuarios = []
  $scope.profesiones = []
  $scope.generos = []
  $scope.especialidades = []

  getAll()

  $http.get('src/archivos/profesiones/service/getAll.php')
    .then(response => $scope.profesiones = response.data )

  $http.get('src/archivos/pasantes/service/getAll.php')
    .then(response => $scope.usuarios = response.data )

  $http.get('src/datos/generos/service/getAll.php')
    .then(response => $scope.generos = response.data )

  $http.get('src/archivos/especialidades/service/getAll.php')
    .then(response => $scope.especialidades = response.data)

  $scope.handleShowForm = function (e) {
    $('.formContainer').slideDown()
  }

  $scope.handleCancel = () => clear()

  $scope.handleSave = function (e) {
    getEspecialidadesDoctor()
    if (validar()) {
      $http.post("src/archivos/pasantes/service/save.php", {
        'profesional': $scope.data
      }).then(response => {
        console.log(response)
        if (response.data == 201) {
          Materialize.toast("Se ha guardado con exito", 4000)
          getAll()
          clear()
        }
      })
    }
  }

  $scope.get = function (usuario) {
    $http.post('src/archivos/pasantes/service/especialidades.php', {
      id: usuario.hgc_cedu_profe
    }).then(response => {
      console.log(response)

      for (let i in response.data) {
        let item = response.data[i]
        document.querySelector(`#confir_${item.hgc_esp_det}`).checked = true
      }
    })

    $scope.data = {
      id: usuario.hgc_codi_profe,
      cedula: usuario.hgc_cedu_profe,
      nombre: usuario.hgc_nom_profe,
      apellido: usuario.hgc_ape_profe,
      fechaNac: new Date(usuario.hgc_fecn_profe),
      dni: usuario.hgc_dni_profe,
      telefono: usuario.hgc_tele_profe,
      ceulular: usuario.hgc_celu_profe,
      direccion: usuario.hgc_direc_profe,
      email: usuario.hgc_emai_profe,
      sexo: usuario.hgc_sexo_profe,
      profesion: usuario.hgc_profe_profe,
      rol: usuario.hgc_rol_usu,
      tipoPasante: usuario.hgc_tipo_pasa,
      fecha_ingreso: usuario.hgc_fing_pasa,
      fecha_egreso: usuario.hgc_fegr_pasa,
      universidad: usuario.hgc_univ_pasa,
    }
    setTimeout(() => {
      $('#rol').val(usuario.hgc_rol_usu).trigger('change')
      $('#profesion').val(usuario.hgc_profe_profe).trigger('change')
      $('#sexo').val(usuario.hgc_sexo_profe).trigger('change')
    }, 100)

    $('.formContainer').slideDown()
    $('.formContainer label').addClass('active')
  }

  $scope.delete = function (id) {
    $http.post("src/archivos/pasantes/service/delete.php", { id })
      .then(response => {
        if (response.data == 201) {
          Materialize.toast("Se ha eliminado con exito", 4000)
          $http.get('src/archivos/pasantes/service/getAll.php')
            .then(response => $scope.usuarios = response.data)
        }
      })
  }

  function getAll () {
    $http.get('src/archivos/pasantes/service/getAll.php')
    .then(response =>$scope.usuarios = response.data)
  }

  function getEspecialidadesDoctor () {
    const confirmar = Array.prototype.slice.call(
      document.querySelectorAll('.confirmarEspecialidad')
    )
    $scope.data.especialidades = []

    for (let i in confirmar) {
      let item = confirmar[i]
      if (item.checked === true) {
        $scope.data.especialidades.push({ especialidades: item.dataset.esp })
      }
    }
  }

  function clear () {
    $scope.data = {
      id: '',
      cedula: '',
      nombre: '',
      apellido: '',
      fechaNac: '',
      dni: '',
      telefono: '',
      ceulular: '',
      direccion: '',
      email: '',
      sexo: '',
      profesion: '',
      rol: 'pasantes',
      tipoPasante: '',
      fecha_ingreso: '',
      fecha_egreso: '',
      universidad: '',
      especialidades: []
    }
    $('.formContainer').slideUp()
    $('ul.tabs').tabs('select_tab', 'test-swipe-1')
    $('.formContainer label.active').removeClass('active')

    setTimeout(() => {
      $('#rol').val('').trigger('change')
      $('#profesion').val('').trigger('change')
      $('#sexo').val('').trigger('change')
    }, 100)

    const confirmar = Array.prototype.slice.call(
      document.querySelectorAll('.confirmarEspecialidad')
    )
    for (let i in confirmar) confirmar[i].checked = false
  }

  function validar () {
    if ($scope.data.cedula == "") {
      Materialize.toast("Ingresa la cedula", 4000)
      return false
    }
    if ($scope.data.nombre == "") {
      Materialize.toast("Ingresa el nombre", 4000)
      return false
    }
    if ($scope.data.apellido == "") {
      Materialize.toast("Ingresa el apellido", 4000)
      return false
    }
    if ($scope.data.fechaNac == "") {
      Materialize.toast("Ingresa la fecha de nacimiento", 4000)
      return false
    }
    if ($scope.data.dni == "") {
      Materialize.toast("Ingresa el dni", 4000)
      return false
    }
    if ($scope.data.telefono == "") {
      Materialize.toast("Ingresa el telefono", 4000)
      return false
    }
    if ($scope.data.ceulular == "") {
      Materialize.toast("Ingresa el ceulular", 4000)
      return false
    }
    if ($scope.data.direccion == "") {
      Materialize.toast("Ingresa la direccion", 4000)
      return false
    }
    if ($scope.data.email == "") {
      Materialize.toast("Ingresa el email", 4000)
      return false
    }
    if ($scope.data.sexo == "") {
      Materialize.toast("Ingresa el genero", 4000)
      return false
    }
    if ($scope.data.profesion == "") {
      Materialize.toast("Ingresa la profesion", 4000)
      return false
    }
    if ($scope.data.rol == "") {
      Materialize.toast("Ingresa el rol", 4000)
      return false
    }
    if ($scope.data.universidad == "") {
      Materialize.toast("Ingresa el rol", 4000)
      return false
    }
    if ($scope.data.fecha_ingreso == "") {
      Materialize.toast("Ingresa la fecha de ingreso", 4000)
      return false
    }
    if ($scope.data.fecha_egreso == "") {
      Materialize.toast("Ingresa la fecha de egreso", 4000)
      return false
    }
    if ($scope.data.tipoPasante == "") {
      Materialize.toast("Ingresa el tipo de pasante", 4000)
      return false
    }
    if ($scope.data.especialidades.length === 0) {
      Materialize.toast('Selecione la/las especialidades del pasante', 4000)
      return false
    }
    else return true
  }
})
