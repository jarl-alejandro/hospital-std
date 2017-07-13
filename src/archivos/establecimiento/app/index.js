'use strict'

const establecimiento = angular.module('Hospital')

establecimiento.controller('establecimientoController', function ($scope, $http) {
  $scope.establecimientos = []
  $scope.instituciones = []
  $scope.tipologias = []
  $scope.parroquias = []
  $scope.data = {
    id: '', visible: true, descripcion: '', tipologia: '', institucion: '',
    red: '', horas: '', direccion: '', telefono: '', celular: '', parroquia: ''
  }
  $('.browser-default').select2()

  getAll()

  $http.get('src/archivos/institucion/service/getAll.php')
    .then(response => $scope.instituciones = response.data)

  $http.get('src/archivos/tipologia/service/getAll.php')
    .then(response => $scope.tipologias = response.data)

  $http.get('src/datos/parroquia/service/getAll.php')
    .then(response => $scope.parroquias = response.data)

  $scope.handleShowForm = () => $('#modalEstablecimiento').modal('open')
  $scope.handleClose = () => close()

  $scope.handleSave = () => {
    if (validar ()) {
      $http.post('src/archivos/establecimiento/service/save.php', {
        id: $scope.data.id,
        institucion: $scope.data.institucion,
        tipologia: $scope.data.tipologia,
        red: $scope.data.red,
        horas: $scope.data.horas,
        descripcion: $scope.data.descripcion,
        direccion: $scope.data.direccion,
        visible: $scope.data.visible === true ? 1 : 0,
        telefono: $scope.data.telefono,
        celular: $scope.data.celular,
        parroquia: $scope.data.parroquia
      }).then(response => {
        console.log(response)
        if (response.data === '201') {
          Materialize.toast('Se ha guardado con exito', 4000)
          getAll()
          close()
        }
      })
    }
  }

  $scope.handleVisible = (establecimiento) => {
    $http.post('src/archivos/establecimiento/service/visible.php', {
      id: establecimiento.hgc_codi_esta,
      visible: establecimiento.hgc_esta_esta === true ? 0 : 1,
    }).then(response => {
      console.log(response)
    })
  }

  $scope.handleEdit = (establecimiento) => {
    $('#modalEstablecimiento').modal('open')
    $('#modalEstablecimiento label').addClass('active')
    $scope.data = {
      id: establecimiento.hgc_codi_esta,
      visible: establecimiento.hgc_esta_esta,
      descripcion: establecimiento.hgc_desc_esta,
      tipologia: establecimiento.hgc_codi_tipo,
      institucion: establecimiento.hgc_codi_inst,
      red: establecimiento.hgc_red_esta,
      horas: establecimiento.hgc_hate_esta,
      direccion: establecimiento.hgc_dire_esta,
      telefono: establecimiento.hgc_tele_esta,
      celular: establecimiento.hgc_celu_esta,
      parroquia: establecimiento.hgc_parr_esta
    }

    setTimeout(() => {
      $('#institucion').val(establecimiento.hgc_codi_inst).trigger('change')
      $('#tipologia').val(establecimiento.hgc_codi_tipo).trigger('change')
      $('#red').val(establecimiento.hgc_red_esta).trigger('change')
      $('#hora').val(establecimiento.hgc_hate_esta).trigger('change')
      $('#parroquia').val(establecimiento.hgc_parr_esta).trigger('change')
    }, 100)
  }

  $scope.handleDelete = (id) => {
    $http.post('src/archivos/establecimiento/service/delete.php', { id })
    .then(response => {
      console.log(response)
      if (response.data === '201') {
        getAll()
        Materialize.toast('Se ha eliminado con exito', 4000)
      }
    })
  }

  function close () {
    $('#modalEstablecimiento').modal('close')
    $('#modalEstablecimiento label.active').removeClass('active')
    $scope.data = {
      id: '', visible: true, descripcion: '', tipologia: '', institucion: '',
      red: '', horas: '', direccion: '', telefono: '', celular: '', parroquia: ''
    }
    setTimeout(() => {
      $('#institucion').val('').trigger('change')
      $('#tipologia').val('').trigger('change')
      $('#red').val('').trigger('change')
      $('#hora').val('').trigger('change')
      $('#parroquia').val('').trigger('change')
    }, 100)
  }

  function getAll () {
    $http.get('src/archivos/establecimiento/service/getAll.php')
    .then(response => $scope.establecimientos = response.data)
  }

  function validar () {
    const data = $scope.data

    if (data.institucion === '') {
      Materialize.toast('Selecione la institucion', 4000)
      return false
    }
    if (data.tipologia === '') {
      Materialize.toast('Selecione la tipologia', 4000)
      return false
    }
    if (data.descripcion === '') {
      Materialize.toast('Ingrese la descripcion', 4000)
      return false
    }
    if (data.direccion === '') {
      Materialize.toast('Ingrese la direccion', 4000)
      return false
    }
    if (data.telefono === '') {
      Materialize.toast('Ingrese la telefono', 4000)
      return false
    }
    if (data.celular === '') {
      Materialize.toast('Ingrese la celular', 4000)
      return false
    }
    if (data.parroquia === '') {
      Materialize.toast('Ingrese la parroquia', 4000)
      return false
    }else return true
  }

})
