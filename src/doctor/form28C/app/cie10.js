'use strict'

const cie10FilterForm = angular.module('Hospital')

cie10FilterForm.controller('cie10FilterFormController', function ($scope, $http) {
  let filterCI10 = [...document.querySelectorAll('.filter-cie10')]
  let index = 2

  $scope.handleNewCIE10 = () => {
    index++
    let template = `<tr>
      <td id="cie-nombre${index}"></td>
      <td class="input-field">
        <input type="text" maxlength="4" placeholder="Ingresa el codigo CIE 10"
        class="u-noMargin filter-cie10" id="column${index}" data-index="${index}" />
      </td>
      <td id="cie-pre${index}"></td>
      <td id="cie-def${index}"></td>
    </tr>`
    $('#cie-table').append(template)
    filterCI10 = [...document.querySelectorAll('.filter-cie10')]
    for (let i in filterCI10) filterCI10[i].addEventListener('keyup', handleFilter)
  }

  for (let i in filterCI10) filterCI10[i].addEventListener('keyup', handleFilter)

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
        let count = 0
        for (let i in filterCI10) {
          if (filterCI10[i].value === cie10) {
            count++
            if (count === 2) {
              Materialize.toast('Ya ha ingresado ese codigo CIE 10', 4000)
              return false
            }
          }
        }

        $http.get(`src/doctor/form28C/service/filterCI10.php?codigo=${cie10}&len=${len}`)
        .then(response => {
          if (response.data === 'false') Materialize.toast('No hay registro de CIE10', 4000)
          else renderCIE10(response.data, index)
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
    $(`#cie-nombre${index}`).html(data.hgc_desc_c10)
    $(`#cie-pre${index}`).html(templatePRE)
    $(`#cie-def${index}`).html(templateDEF)
  }

})
