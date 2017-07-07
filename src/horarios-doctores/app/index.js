'use strict'

const horariosDoctores = angular.module('Hospital')

horariosDoctores.controller('horariosDocController', function ($scope, $http) {
  $('ul.tabs').tabs()
  const mesTag = document.getElementById('mes')
  mesTag.addEventListener('change', createMes)
  $scope.medicos = []
  $scope.consultorios = []
  $scope.horarios = []
  $scope.data = { medicos: '', consultorio: '', mes: '' }
  $scope.diaHorario = ''

  $scope.mes = [
    { id: 1, nombre: 'Enero' },
    { id: 2, nombre: 'Febrero' },
    { id: 3, nombre: 'Marzo' },
    { id: 4, nombre: 'Abril' },
    { id: 5, nombre: 'Mayo' },
    { id: 6, nombre: 'Junio' },
    { id: 7, nombre: 'Julio' },
    { id: 8, nombre: 'Agosto' },
    { id: 9, nombre: 'Septiembre' },
    { id: 10, nombre: 'Octubre' },
    { id: 11, nombre: 'Noviembre' },
    { id: 12, nombre: 'Diciembre' }
  ]

  $http.get('src/horarios-doctores/service/consultorios.php')
    .then(response => $scope.consultorios = response.data)

  $http.get('src/horarios-doctores/service/medicos.php')
    .then(response => $scope.medicos = response.data)

  $http.get('src/archivos/horarios/service/getAll.php')
    .then(response => $scope.horarios = response.data)

  $scope.handleShowForm = () => $('#adignarFormHorario').modal('open')
  $scope.handleHours = () => {
    if ($scope.diaHorario === '') {
      Materialize.toast('Seleciona el dia que va asignar el horario', 4000)
      return false
    }
    $('#modalInstitucion').modal('open')
  }

  function fechaPorDia(year, dia, mes) {
    var date = new Date(year, mes)
    return new Date(date.setDate(dia))
  }

  function createMes () {
    const hoy = new Date()
    if (mesTag.value !== '') {

      if (mesTag.value < hoy.getMonth() + 1) {
        Materialize.toast('El mes que seleciono ya paso', 4000)
        return false
      }
      struct()
      const year = hoy.getFullYear()
      const semanas = document.getElementById('semanasDelMes')

      const primerDia = new Date(year, mesTag.value, 1)
      const ultimoDia = new Date(year, mesTag.value, 0)

      for (let i = 1; i <= ultimoDia.getDate(); i++){
        let fecha = fechaPorDia(year, i, parseInt(mesTag.value)-1)
        let dia = fecha.getDate()
        let dia_semana = fecha.getDay()
        if (dia == 1) var sem = 0
        semanas.children[sem].children[dia_semana].innerHTML = dia
        semanas.children[sem].children[dia_semana].dataset.dia = dia
        semanas.children[sem].children[dia_semana].className = 'dia'
        if (dia_semana == 6) sem = sem + 1
      }
    }
    handleEventMonth()
  }

  function handleEventMonth () {
    const dias = document.querySelectorAll('.dia')

    for (let i=0; i<dias.length; i++) {
      dias[i].addEventListener('click', event => {
        $scope.diaHorario = event.target.dataset.dia
      })
    }
  }

  function struct () {
    const semanas = document.getElementById('semanasDelMes')
    semanas.innerHTML = ''
    for (let i = 1; i <= 6; i++){
      const template = `<tr>
        <td></td><td></td><td></td><td></td><td></td><td></td><td></td>
      </tr>`
      semanas.innerHTML += template
    }
  }

})
