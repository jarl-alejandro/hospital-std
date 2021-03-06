angular.module('Hospital')
.controller('CalendarDevolucionCtrl', function ($scope, $http) {
  $scope.month = 0
  $scope.DB = []
  $scope.horarioTrabajo = []

  const json = JSON.parse(localStorage.getItem('user'))
  const cedula = json.cedula
  let doctor = null

  $http.get(`src/doctor/form056/service/doctor.php?cedula=${cedula}`)
  .then(response => {
    doctor = response.data.hgc_codi_profe
    localStorage.setItem('doctor', doctor)
  })

  const hoy = new Date()

  var mes_text = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto",
    "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ]
  var dia_text = ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"]
  estructurar()
  numerar()

  $scope.cerrar = () => $('.month-turno').slideUp()

  $scope.handleBack = () => {
    $(document.querySelectorAll('.mes')[$scope.month - 1]).slideUp()
    $scope.month = 0
    $('.days-moth').slideUp()
    $('.month-turno').slideDown()
  }

  $scope.handleMonth = (index) => {
    if (doctor === null) {
      Materialize.toast('Debe selecionar primero el doctor', 4000)
      return false
    }

    $scope.month = index
    var dateFin = new Date(hoy.getFullYear(), $scope.month, 0)
    const diaFin = dateFin.getDate() < 10 ? "0" + dateFin.getDate() : dateFin.getDate()
    const mes = $scope.month < 10 ? "0" + $scope.month : $scope.month

    const inicio = `${hoy.getFullYear()}-${mes}-01`
    const fin = `${hoy.getFullYear()}-${mes}-${diaFin}`

    $(document.querySelectorAll('.mes')[$scope.month - 1]).slideDown()

    $http.get(
      `src/doctor/form056/service/agenda.php
      ?mes=${$scope.month}&doctor=${doctor}`
    ).then(response => {
      if (response.data.length === 0) {
        Materialize.toast('No hay agendado nada en este mes', 4000)
      } else generateAgenda(response.data)
    })

    $http.get(`src/estadistico/turnos/service/horario.php
      ?doctor=${doctor}&inicio=${inicio}&fin=${fin}`
    ).then(response => {
      $scope.horarioTrabajo = response.data

      for (let i in $scope.horarioTrabajo) {
        let item = $scope.horarioTrabajo[i]
        const td = document.querySelector(`.fecha_${item.dia}`)
        td.children[1].dataset.trabajo = 1
        td.style = "background:#E91E63;transform: scale(.9);"
        td.dataset.entrada = item.entrada
        td.dataset.salida = item.salida
        td.dataset.dia = item.dia
      }
    })

    setTimeout(() => {
      $('.month-turno').slideUp()
      $('.days-moth').slideDown()
    }, 500)

  }

  function generateAgenda (data) {
    $scope.DB = []
    for (let i in data) {
      let item = data[i]
      let fecha = item.hgc_fech_turno
      let celda = document.querySelector(`.fecha_${fecha}`)
      celda.children[0].classList.add('agenda-ocupado')
      celda.children[0].dataset.fecha = fecha
      $scope.DB.push(item)
    }

    const agendas = document.querySelectorAll('.agenda-ocupado')

    for (let i=0; i<agendas.length; i++) {
      agendas[i].addEventListener('click', event => {
        $('#modalAgenda').modal('open')
        $('#agenda__container').html('')

        for (let i in $scope.DB) {
          let item = $scope.DB[i]
          if (item.hgc_fech_turno === event.target.dataset.fecha) {
            let template = `<article class="agenda__item">
              <ul>
                <li>
                  <p>Paciente:</p>
                  <p>${item.paciente}</p>
                </li>
                <li>
                  <p>Doctor:</p>
                  <p>${item.doctor}</p>
                </li>
                <li>
                  <p>Fecha:</p>
                  <p>${item.hgc_fech_turno}</p>
                </li>
                <li>
                  <p>Hora Inicial:</p>
                  <p>${item.hgc_hini_turno}</p>
                </li>
                <li>
                  <p>Hora Final:</p>
                  <p>${item.hgc_fin_turno}</p>
                </li>
              </ul>
            </article>`
            document.querySelector('#agenda__container').innerHTML += template
          }
        }

      })
    }
  }

  function fechaPorDia(year, dia) {
    var date = new Date(year, 0)
    return new Date(date.setDate(dia))
  }

  function numerar () {
    let hoy = new Date()
    let year = hoy.getFullYear()
    for (i = 1; i < 366; i++) {
      let fecha = fechaPorDia(year, i)
      let mes = fecha.getMonth()

      let select_tabla = document.getElementsByClassName('tabla_mes')[mes];
      let dia = fecha.getDate()
      let dia_semana = fecha.getDay()

      if (dia == 1) {var sem = 0;}
      select_tabla.children[2].children[sem].children[dia_semana]
        .innerHTML = `<a>${dia}</a>`;
      select_tabla.children[2].children[sem].children[dia_semana]
        .innerHTML += `<button class="select_fecha btn bxn waves-effect waves-light">A</button>`;


      let mesClass = (mes + 1) < 10 ? `0${mes+1}`: mes + 1
      let diaClass = dia + 1 < 10 ? `0${dia}`: dia
      if (dia === 9) diaClass = "0" + diaClass
      let className = `item_calendar fecha_${year}-${mesClass}-${diaClass}`

      select_tabla.children[2].children[sem].children[dia_semana].className = className;
      if (dia_semana == 6) { sem = sem + 1; }
    }

    const selectsMes = Array.prototype.slice.call(document.querySelectorAll('.select_fecha'))

    for (let i in selectsMes) {
      let item = selectsMes[i]
      item.addEventListener('click', fechaSelecionada)
    }
  }

  function fechaSelecionada (e) {
    if(e.target.dataset.trabajo === undefined) {
      Materialize.toast('El doctor no trabaja este dia', 4000)
      return false
    }

    const mes = $scope.month < 10 ? "0"+$scope.month : $scope.month
    const year = hoy.getFullYear()
    const fechaHoy = new Date()

    let dia = this.parentNode.children[0].innerText
    dia = dia < 10 ? "0"+dia : dia

    let mesHoy = fechaHoy.getMonth() + 1 < 10 ?
      "0"+(fechaHoy.getMonth() + 1) : (fechaHoy.getMonth() + 1)
    let diaHoy = fechaHoy.getDate() < 10 ?
      "0"+fechaHoy.getDate() : fechaHoy.getDate()

    const fechaFormat = `${fechaHoy.getFullYear()}-${mesHoy}-${diaHoy}`
    const fecha = `${year}-${mes}-${dia}`

    if (fecha < fechaFormat) {
      Materialize.toast('No puede ingresar turno para esta fecha', 4000)
      return false
    }
    $(document.querySelectorAll('.mes')[$scope.month - 1]).slideUp()
    $('.days-moth').slideUp()
    $scope.month = 0
    $('#fecha_proxima_visita').val(fecha)
  }

  function estructurar () {
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
