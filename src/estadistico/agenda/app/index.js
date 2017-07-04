// 'use strict'

const agenda = angular.module('Hospital')

agenda.controller('agendaController', function ($scope, $http) {
  $scope.month = 0
  $scope.DB = []
  const hoy = new Date()

  var mes_text = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto",
    "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ]
  var dia_text = ["Dom", "Lun", "Mar", "Mie", "Juv", "Vie", "Sab"]

  estructurar()
  numerar()

  $scope.handleMonth = function (index) {
    $scope.month = index
    $(document.querySelectorAll('.mes')[$scope.month - 1]).slideDown()

    $http.get(`src/estadistico/agenda/service/agenda.php?mes=${$scope.month}`)
      .then(response => {
        console.log(response)
        if (response.data.length === 0) {
          Materialize.toast('No hay agendado nada en este mes', 4000)
        } else generateAgenda(response.data)
      })

    setTimeout(() => {
      $('.mes__active').removeClass('mes__active')
      $('.months-diary').slideUp()
      $('.days-moth').slideDown()
    }, 500)
  }

  $scope.handleBack = function () {
    $(document.querySelectorAll('.mes')[$scope.month - 1]).slideUp()
    $('.days-moth').slideUp()
    $('.months-diary').slideDown()
    $scope.month = 0
  }

  function generateAgenda (data) {
    for (let i in data) {
      let item = data[i]
      let fecha = item.hgc_fech_turno
      let celda = document.querySelector(`.fecha_${fecha}`)
      celda.classList.add('agenda-ocupado')
      DB.push(item)
    }

    const agendas = document.querySelectorAll('.agenda-ocupado')

    for (let i=0; i<agendas.length; i++) {
      agendas[i].addEventListener('click', function (event) {
        const info = event.target.dataset
        console.log(info)
        $('#modalAgenda').modal('open')
      })
    }
  }

  function fechaPorDia(year, dia) {
    var date = new Date(year, 0)
    return new Date(date.setDate(dia))
  }

  function numerar() {
    let hoy = new Date()
    let year = hoy.getFullYear()
    for (i = 1; i < 366; i++) {
      let fecha = fechaPorDia(year, i);
      let mes = fecha.getMonth();
      let select_tabla = document.getElementsByClassName('tabla_mes')[mes];
      let dia = fecha.getDate()
      let dia_semana = fecha.getDay();
      if (dia == 1) {var sem = 0;}
      select_tabla.children[2].children[sem].children[dia_semana].innerText = dia;

      let mesClass = (mes + 1) < 10 ? `0${mes+1}`: mes + 1
      let diaClass = (dia + 1) < 10 ? `0${dia}`: dia
      let className = `fecha_${year}-${mesClass}-${diaClass}`

      select_tabla.children[2].children[sem].children[dia_semana].className = className;
      if (dia_semana == 6) { sem = sem + 1; }
    }
  }


  function estructurar() {
    for (let m = 0; m <= 11; m++) {
      let mes = document.createElement("DIV")
      mes.className = "mes none"

      document.querySelector('#calendario').appendChild(mes)

      // Tabla
      let tabla_mes = document.createElement("TABLE")
      tabla_mes.className = "tabla_mes bordered highlight centered responsive-table"
      mes.appendChild(tabla_mes)

      // Título
      let titulo = document.createElement("CAPTION")
      titulo.className = "titulo"
      titulo.innerText = mes_text[m]
      tabla_mes.appendChild(titulo)

      // Cabecera
      let cabecera = document.createElement("THEAD")
      tabla_mes.appendChild(cabecera)
      let fila = document.createElement("TR")
      cabecera.appendChild(fila)

      for (let d = 0; d < 7; d++) {
        let dia = document.createElement("TH")
        dia.innerText = dia_text[d]
        fila.appendChild(dia)
      }

      // Cuerpo
      let cuerpo = document.createElement("TBODY")
      tabla_mes.appendChild(cuerpo)

      for (let f = 0; f < 6; f++) {
        let fila = document.createElement("TR")
        cuerpo.appendChild(fila)

        for (let d = 0; d < 7; d++) {
          let dia = document.createElement("TD")
          dia.innerText = ""
          fila.appendChild(dia)
        }
      }
    }
  }
})
