'use strict'

const cie10FilterForm = angular.module('Hospital')

cie10FilterForm.controller('cie10FilterFormController', function ($scope, $http, $stateParams, form028CieService) {
  const paciente = $stateParams.id
  let filterCI10 = [...document.querySelectorAll('.filter-cie10')]
  let nombreFilterCie10 = [...document.querySelectorAll('.filter-cie-nombre10')]

  if ($stateParams.action !== 'edit') {
    $('#cie-table').html('')

    $http.get(`src/doctor/form28C/service/prescripciones-medicas.php?id=${paciente}`)
    .then(response => {
      response.data.map(item => {
        let template = `<tr>
          <td style="border-left:0">${item.hgc_fec_presc}</td>
          <td>${item.hgc_hor_presc}</td>
          <td>${item.hgc_nota_presc}</td>
          <td>${item.hgc_det_presc}</td>
        </tr>`
        $('.table_preescipcion').prepend(template)
      })
    })
  }

  $scope.handleBack = () => {
    $('#form28C-Workaspace').slideDown()
    $('#cie10-Workspace').slideUp()
    setTimeout(() => window.scrollTo(0, 0), 100)
  }

  $scope.handleNewCIE10 = () => {
    form028CieService.data.index++
    let template = `<tr>
      <td id="cie-nombre${form028CieService.data.index}" class="input-field">
        <input type="text" placeholder="Ingresa el nombre CIE 10"
          class="u-noMargin filter-cie-nombre10" id="column-nombre-${form028CieService.data.index}"
          data-index="${form028CieService.data.index}"
        />
      </td>
      <td class="input-field">
        <input type="text" maxlength="4" placeholder="Ingresa el codigo CIE 10"
          class="u-noMargin filter-cie10" id="column${form028CieService.data.index}"
          data-index="${form028CieService.data.index}"
        />
      </td>
      <td id="cie-pre${form028CieService.data.index}"></td>
      <td id="cie-def${form028CieService.data.index}"></td>
    </tr>`
    $('#cie-table').append(template)
    filterCI10 = [...document.querySelectorAll('.filter-cie10')]
    nombreFilterCie10 = [...document.querySelectorAll('.filter-cie-nombre10')]

    for (let i in filterCI10) filterCI10[i].addEventListener('keyup', handleFilter)
    for (let i in nombreFilterCie10) nombreFilterCie10[i].addEventListener('keyup', handleFilterNombre)
  }

  for (let i in filterCI10) filterCI10[i].addEventListener('keyup', handleFilter)
  for (let i in nombreFilterCie10) nombreFilterCie10[i].addEventListener('keyup', handleFilterNombre)

  function handleFilter (e) {
    if (e.keyCode === 13) {
      let index = e.target.dataset.index
      let cie10 = $(`#column${index}`).val().trim()
      let len = cie10.length

      if (cie10 === '') {
        Materialize.toast('Ingrese el codigo CIE10', 4000)
      } else if (len < 3 || len > 4) {
        Materialize.toast('Ingrese el codigo CIE10 correcto', 4000)
      }
      else {
        $http.get(`src/doctor/form28C/service/filterCI10.php?codigo=${cie10}&len=${len}`)
        .then(response => {
          if (response.data === 'false') Materialize.toast('No hay registro de CIE10', 4000)
          else renderCIE10(response.data, index)
        })

      }
    }
  }

  function handleFilterNombre (e) {
    if (e.keyCode === 13) {
      let index = e.target.dataset.index
      let cie10 = $(`#column-nombre-${index}`).val().trim()

      if (cie10 === '')
        Materialize.toast('Ingrese el nombre de CIE10', 4000)
      else {
        $http.get(`src/doctor/form28C/service/filterNombreCI10.php?nombre=${cie10}`)
        .then(response => {
          if (response.data === 'false') Materialize.toast('No hay registro de CIE10', 4000)
          else renderCIE10 (response.data, index)
          console.log(response)
        })
      }
    }
  }

  function renderCIE10 (data, index) {
    let templatePRE = `<p>
      <input name="${data.hgc_codi_c10}_${index}" type="radio"
        id="${data.hgc_codi_c10}_${index}pre" class="cie--input"
        data-codigo='${data.hgc_codi_c10}' data-value='pre'
      />
      <label for="${data.hgc_codi_c10}_${index}pre"></label>
    </p>`

    let templateDEF = `<p>
      <input name="${data.hgc_codi_c10}_${index}" type="radio"
        id="${data.hgc_codi_c10}_${index}def" class="cie--input"
        data-codigo='${data.hgc_codi_c10}' data-value='def'
      />
      <label for="${data.hgc_codi_c10}_${index}def"></label>
    </p>`
    $(`#column-nombre-${index}`).val(data.hgc_desc_c10)
    $(`#column${index}`).val(data.hgc_codi_c10)
    $(`#cie-pre${index}`).html(templatePRE)
    $(`#cie-def${index}`).html(templateDEF)
  }

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
  $('.timepicker').pickatime({
    default: 'now',
    fromnow: 0,
    twelvehour: false,
    donetext: 'OK',
    cleartext: 'Limpiar',
    canceltext: 'Cancelar',
    autoclose: false,
    ampmclickable: true,
    aftershow: function(){}
  })

})
