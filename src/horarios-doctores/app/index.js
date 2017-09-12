'use strict'

const horariosDoctores = angular.module('Hospital')

horariosDoctores.controller('horariosDocController', function ($scope, $http) {
  $('ul.tabs').tabs()
  $('ul.tabs').tabs('select_tab', 'horarios-swipe-1')

  const mesTag = document.getElementById('mes')
  mesTag.addEventListener('change', createMes)
  $scope.medicos = []
  $scope.consultorios = []
  $scope.horarios = []
  $scope.horarioDoc = []
  $scope.data = { medicos: '', consultorio: '', mes: '', horarios: [], id: '' }
  $scope.diaHorario = ''

  getAll()

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

  $scope.setHorario = (horario) => {
    const hoy = new Date()
    const mes = $scope.data.mes < 10 ? '0'+$scope.data.mes : $scope.data.mes
    const dia = $scope.diaHorario < 10 ? $scope.diaHorario : $scope.diaHorario
    const year = hoy.getFullYear()
    const ctx = {
      codigo: horario.hgc_codi_hora,
      dia: `${year}-${mes}-${dia}`
    }

    $scope.data.horarios.push(ctx)
    document.querySelector(`#semanasDelMes td[data-dia="${$scope.diaHorario}"]`)
      .className = 'dias-asiganado__active'
  }

  $scope.handleSave = () => {
    if (validar()) {
      $http.post('src/horarios-doctores/service/save.php', $scope.data)
        .then(response => {
          console.log(response)
          if (response.data === '201') {
            Materialize.toast('Se ha guardado con exito', 4000)
            getAll()
            close()
          }
        })
    }
  }
  $scope.handleClose = () => close()

  $scope.handleEdit = (horario) => {
    $scope.data = {
      medicos: horario.hgc_codi_profe,
      consultorio: horario.hgc_codi_cons,
      mes: horario.hgc_mes_hora,
      horarios: [],
      id: horario.hgc_codi_hora
    }
    mesTag.value = horario.hgc_mes_hora
    createMes()

    $('#adignarFormHorario').modal('open')
    $http.get(`src/horarios-doctores/service/horarios.php?id=${horario.hgc_codi_hora}`)
      .then(response => {
        for(let i in response.data) {
          const item = response.data[i]
          const ctx = {
            codigo: item.hgc_hora_det,
            dia: item.hgc_dia_det
          }
          $scope.data.horarios.push(ctx)
          const dia = ctx.dia.split("-")[2]
          console.log(`#semanasDelMes td[data-dia="${dia}"]`)
          document.querySelector(`#semanasDelMes td[data-dia="${dia}"]`)
            .className = 'dias-asiganado__active'
        }
      })
  }

  $scope.handleDelete = (id) => {
    $http.post('src/horarios-doctores/service/delete.php', { id })
      .then(response => {
        console.log(response)
        getAll()
        Materialize.toast('Se ha eliminado con exito', 4000)
      })
  }

  function getAll () {
    $http.get('src/horarios-doctores/service/getAll.php')
      .then(response => $scope.horarioDoc = response.data)
  }

  function close () {
    $('#adignarFormHorario').modal('close')
    $('ul.tabs').tabs('select_tab', 'horarios-swipe-1')
    $scope.data = { medicos: '', consultorio: '', mes: '', horarios: [], id: '' }
    $scope.diaHorario = ''
    document.getElementById('semanasDelMes').innerHTML = ''
  }

  function validar () {
    const data = $scope.data
    if (data.medicos === '') {
      Materialize.toast('Selecione el medico', 4000)
      $('#medicos').focus()
      return false
    }
    if (data.consultorio === '') {
      Materialize.toast('Selecione el consultorio', 4000)
      $('#consultorio').focus()
      return false
    }
    if (data.mes === '') {
      Materialize.toast('Selecione el mes', 4000)
      $('#mes').focus()
      return false
    }
    if (data.horarios.length === 0){
      Materialize.toast('Ingrese los horarios para el doctor', 4000)
    } else return true
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
        let diaSet = dia < 10 ? '0'+dia : dia
        semanas.children[sem].children[dia_semana].innerHTML = dia
        semanas.children[sem].children[dia_semana].dataset.dia = diaSet
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
        $scope.diaHorario = ''
        if ($scope.diaHorario !== ''){
            Materialize.toast('Ya ha selecionado el dia ingrese el horario', 4000)
            return false
        }
        dias[i].className = 'dias-asiganado__select'
        $scope.diaHorario = event.target.dataset.dia
      })
    }
  }

  function struct () {
    $scope.data.horarios = []
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
