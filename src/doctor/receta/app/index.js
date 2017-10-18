'use strict'

angular.module('Hospital')
.controller('RecetaCtrl', function ($scope, $http) {
  $scope.empresa = {}
  $scope.form = { paciente: '', especialidad: '', medico: '' }
  $scope.farmacia = []
  $scope.receta = []
  $scope.pacientes = []
  $scope.espcialidades = []
  $scope.medicos = []
  $scope.isLoader = false
  $('.browser-default').select2()
  getData()

  $scope.medicineAdd = () => {
    $('.mask').fadeIn()
    $('.Form-medicine').slideDown()
  }

  $scope.cancel = () => {
    $('.mask').fadeOut()
    $('.Form-medicine').slideUp()
  }

  $scope.save = () => {
    if (validForm() && validReceta()) {
      $scope.form.receta = $scope.receta

      $http.post('src/doctor/receta/service/save.php', $scope.form)
      .then(response => {
        console.log(response);
        if (response.data === '201') {
          Materialize.toast('Se ha guardado con exito la receta', 4000)
          $scope.receta = []
          $scope.form = { paciente: '', especialidad: '', medico: '' }
          $scope.medicos = []
        }
        else {
          Materialize.toast('Tuvimos problemas', 4000)
          console.log(response);
        }
      })
    }
  }

  $scope.add = (medicine) => {
    let ctx = {
      id: medicine.hgc_id_farm,
      codigo: medicine.hgc_cod_farm,
      detalle: medicine.hgc_det_farm,
      prescripcion: '',
      cant: 0
    }
    if (valid(ctx)) {
      $scope.receta.push(ctx)
      $scope.cancel()
      setTimeout(() => {
        document.querySelector(`#receta_prescripcion--${ctx.id}`).focus()
      }, 300)
    }
  }

  $scope.changeEspecialidad = () => {
    if ($scope.form.especialidad !== null) {
      $http.get(`src/doctor/receta/service/medico.php?especialidad=${$scope.form.especialidad}`)
      .then(response => {
        $scope.medicos = response.data
        $('.browser-default').select2()
      })
    }

  }

  function validReceta () {
    let flag = false

    for (let i in $scope.receta) {
      let item = $scope.receta[i]

      if (!item.prescripcion.trim()) {
        Materialize.toast('Ingrese la prescripcion', 4000)
        $(`#receta_prescripcion--${item.id}`).focus()
        return false
      }
      if (item.cant === '' || item.cant === 0) {
        Materialize.toast('Ingrese la cantidad', 4000)
        $(`#receta_cant--${item.id}`).focus()
        return false
      }
      else flag = true
    }
    return flag
  }

  function validForm () {
    if (!$scope.form.paciente) {
      $('#paciente').focus()
      Materialize.toast('Ingrese el paciente', 4000)
      return false
    }
    if (!$scope.form.especialidad) {
      $('#especialidad').focus()
      Materialize.toast('Ingrese la especialidad', 4000)
      return false
    }
    if (!$scope.form.medico) {
      $('#medico').focus()
      Materialize.toast('Ingrese el medico', 4000)
      return false
    }
    if ($scope.receta.length === 0) {
      Materialize.toast('Ingrese la receta medica', 4000)
      return false
    }
    else return true
  }


  function valid (object) {
    let flag = false
    if ($scope.receta.length === 0) {
      return true
    }

    for (let i in $scope.receta) {
      let item = $scope.receta[i]
      if (item.id === object.id) {
        Materialize.toast('La medicina ya existe', 4000)
        return false
      }
      if (!item.prescripcion.trim()) {
        Materialize.toast('Ingrese la prescripcion', 4000)
        $(`#receta_prescripcion--${item.id}`).focus()
        $scope.cancel()
        return false
      }
      if (item.cant === '' || item.cant === 0) {
        Materialize.toast('Ingrese la cantidad', 4000)
        $(`#receta_cant--${item.id}`).focus()
        $scope.cancel()
        return false
      }
      else flag = true
    }
    return flag
  }

  function getData () {
    $http.get('src/doctor/receta/service/empresa.php')
    .then(response => $scope.empresa = response.data)

    $http.get('src/doctor/receta/service/farmacia.php')
    .then(response => $scope.farmacia = response.data)

    $http.get('src/doctor/receta/service/pacientes.php')
    .then(response => {
      $scope.pacientes = response.data
      $scope.isLoader = true
    })

    $http.get('src/doctor/receta/service/especialidad.php')
    .then(response => $scope.espcialidades = response.data)
  }

})
