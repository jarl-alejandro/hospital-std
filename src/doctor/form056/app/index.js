'use strict'

angular.module('Hospital')
.controller('formCtrl056', function ($scope, $http, $stateParams) {
  const fecha = new Date()
  let indexMotivo = 3
  let indexMotivoCompany = 3

  $scope.paciente = {}
  $scope.empresa = {}
  $scope.mensajeFlag = false
  $scope.domicilioFlag = false
  $scope.hoy = fecha.getDate() < 10 ? '0'+fecha.getDate() : fecha.getDate()
  $scope.month = fecha.getMonth() < 10 ? '0'+(fecha.getMonth() + 1) : fecha.getMonth() + 1
  $scope.year = fecha.getFullYear().toString().split('')

  $scope.hoy = $scope.hoy.toString().split('')
  $scope.month = $scope.month.toString().split('')

  $scope.antecendesPersonales = [
    { id:'ant1', name: 'PERINATALES normales', options: [
      {id:'ant1-1', name:'si', class:'si-check', val: 1},
      {id:'ant1-2', name:'no se', class:'nose-check', val: 2},
      {id:'ant1-3', name:'no', class:'no-check', val: 3}
    ] },
    { id:'ant2', name: 'CRECIMIENTO normal', options: [
      {id:'ant2-1', name:'si', class:'si-check', val: 1},
      {id:'ant2-2', name:'no se', class:'nose-check', val: 2},
      {id:'ant2-3', name:'no', class:'no-check', val: 3}
    ] },
    { id:'ant3', name: 'DESARROLLO normal', options: [
      {id:'ant3-1', name:'si', class:'si-check', val: 1},
      {id:'ant3-2', name:'no se', class:'nose-check', val: 2},
      {id:'ant3-3', name:'no', class:'no-check', val: 3}
    ] },
    { id:'ant4', name: 'VACUNAS COMPLETAS', options: [
      {id:'ant4-1', name:'si', class:'si-check', val: 1},
      {id:'ant4-2', name:'no se', class:'nose-check', val: 2},
      {id:'ant4-3', name:'no', class:'no-check', val: 3}
    ] },
    { id:'ant5', name: 'ENFERMEDADES CRÒNICAS', options: [
      {id:'ant5-1',name:'si', class:'si-check', val: 1},
      {id:'ant5-2',name:'no se', class:'nose-check', val: 2},
      {id:'ant5-3',name:'no', class:'no-check', val: 3}
    ] },
    { id:'ant6', name: 'ENFERMEDADES INFECTO CONTAGIOSAS', options: [
      {id:'ant6-1', name:'si', class:'si-check', val: 1},
      {id:'ant6-2', name:'no se', class:'nose-check', val: 2},
      {id:'ant6-3', name:'no', class:'no-check', val: 3}
    ] },
    { id:'ant7', name: 'ACCIDENTES INTOXICACIÒN', options: [
      {id:'ant7-1', name:'si', class:'si-check', val: 1},
      {id:'ant7-2', name:'no se', class:'nose-check', val: 2},
      {id:'ant7-3', name:'no', class:'no-check', val: 3}
    ] },
    { id:'ant8', name: 'CIRUGÌA HOSPITALIZACIÒN', options: [
      {id:'ant8-1', name:'si', class:'si-check', val: 1},
      {id:'ant8-2', name:'no se', class:'nose-check', val: 2},
      {id:'ant8-3', name:'no', class:'no-check', val: 3}
    ] },
    { id:'ant9', name: 'USO DE MEDICINAS O SUSTANCIAS', options: [
      {id:'ant9-1', name:'si', class:'si-check', val: 1},
      {id:'ant9-2', name:'no se', class:'nose-check', val: 2},
      {id:'ant9-3', name:'no', class:'no-check', val: 3}
    ] },
    { id:'ant10', name: 'TRASTORNOS PSICOLOGICOS', options: [
      {id:'ant10-1', name:'si', class:'si-check', val: 1},
      {id:'ant10-2', name:'no se', class:'nose-check', val: 2},
      {id:'ant10-3', name:'no', class:'no-check', val: 3}
    ] },
    { id:'ant11', name: 'MALTRATO', options: [
      {id:'ant11-1', name:'si', class:'si-check', val: 1},
      {id:'ant11-2', name:'no se', class:'nose-check', val: 2},
      {id:'ant11-3', name:'no', class:'no-check', val: 3}
    ] },
    { id:'ant12', name: 'JUDICIALES', options: [
      {id:'ant12-1', name:'si', class:'si-check', val: 1},
      {id:'ant12-2', name:'no se', class:'nose-check', val: 2},
      {id:'ant12-3', name:'no', class:'no-check', val: 3}
    ] },
    { id:'ant13', name: 'OTROS', options: [
      {id:'ant13-1', name:'si', class:'si-check', val: 1},
      {id:'ant13-2', name:'no', class:'no-check', val: 3}
    ] },
  ]

  $scope.antecendesFamiliares = [
    { id: 'antFam1', name: 'DIABETES', options: [
        {id:'antFam1-1', name:'si', class:'si-check', val: 1},
        {id:'antFam1-2', name:'no se', class:'nose-check', val: 2},
        {id:'antFam1-3', name:'no', class:'no-check', val: 3}
      ]
    },
    { id: 'antFam2', name: 'OBESIDAD', options: [
      {id:'antFam2-1', name:'si', class:'si-check', val: 1},
      {id:'antFam2-2', name:'no se', class:'nose-check', val: 2},
      {id:'antFam2-3', name:'no', class:'no-check', val: 3}
    ] },
    { id: 'antFam3', name: 'CARDIOVASC. (HTA, cardiopatia, etc)', options: [
      {id:'antFam3-1', name:'si', class:'si-check', val: 1},
      {id:'antFam3-2', name:'no se', class:'nose-check', val: 2},
      {id:'antFam3-3', name:'no', class:'no-check', val: 3}
    ] },
    { id: 'antFam4', name: 'ALERGÌA', options: [
      {id:'antFam4-1', name:'si', class:'si-check', val: 1},
      {id:'antFam4-2', name:'no se', class:'nose-check', val: 2},
      {id:'antFam4-3', name:'no', class:'no-check', val: 3}
    ] },
    { id: 'antFam5', name: 'INFECCIONES (TBC, VHI, etc)', options: [
      {id:'antFam5-1', name:'si', class:'si-check', val: 1},
      {id:'antFam5-2', name:'no se', class:'nose-check', val: 2},
      {id:'antFam5-3', name:'no', class:'no-check', val: 3}
    ] },
    { id: 'antFam6', name: 'TRASTORNOS PSICOLOGICOS', options: [
      {id:'antFam6-1', name:'si', class:'si-check', val: 1},
      {id:'antFam6-2', name:'no se', class:'nose-check', val: 2},
      {id:'antFam6-3', name:'no', class:'no-check', val: 3}
    ] },
    { id: 'antFam7', name: 'ALCOHOL DROGAS', options: [
      {id:'antFam7-1', name:'si', class:'si-check', val: 1},
      {id:'antFam7-2', name:'no se', class:'nose-check', val: 2},
      {id:'antFam7-3', name:'no', class:'no-check', val: 3}
    ] },
    { id: 'antFam8', name: 'VIOLENCIA INTRAFAMILIAR', options: [
      {id:'antFam8-1', name:'si', class:'si-check', val: 1},
      {id:'antFam8-2', name:'no se', class:'nose-check', val: 2},
      {id:'antFam8-3', name:'no', class:'no-check', val: 3}
    ] },
    { id: 'antFam9', name: 'MADRE ADOLESC.', options: [
      {id:'antFam9-1', name:'si', class:'si-check', val: 1},
      {id:'antFam9-2', name:'no se', class:'nose-check', val: 2},
      {id:'antFam9-3', name:'no', class:'no-check', val: 3}
    ] },
    { id: 'antFam10', name: 'JUDICIALES', options: [
      {id:'antFam10-1', name:'si', class:'si-check', val: 1},
      {id:'antFam10-2', name:'no se', class:'nose-check', val: 2},
      {id:'antFam10-3', name:'no', class:'no-check', val: 3}
    ] },
    { id: 'antFam11', name: 'OTROS', options: [
      {id:'antFam10-1', name:'si', class:'si-check', val: 1},
      {id:'antFam10-3', name:'no', class:'no-check', val: 3}]
    },
  ]

  $scope.familia = [
    { id: 'familia1', name: 'madre', options: [
      { id: 'familia1-1', name: 'no', class: 'no-check', val: 1, type: 'checkbox' },
      { id: 'familia1-2', name: 'En la casa', class: 'nose-check', val: 2, type: 'radio' },
      { id: 'familia1-3', name: 'En el cuarto', class: 'nose-check', val: 3, type: 'radio' },
    ]},
    { id: 'familia2', name: 'padre', options: [
      { id: 'familia2-1', name: 'no', class: 'no-check', val: 1, type: 'checkbox' },
      { id: 'familia2-2', name: 'En la casa', class: 'nose-check', val: 2, type: 'radio' },
      { id: 'familia2-3', name: 'En el cuarto', class: 'nose-check', val: 3, type: 'radio' },
    ]},
    { id: 'familia3', name: 'madrastra', options: [
      { id: 'familia3-1', name: 'no', class: 'no-check', val: 1, type: 'checkbox' },
      { id: 'familia3-2', name: 'En la casa', class: 'nose-check', val: 2, type: 'radio' },
      { id: 'familia3-3', name: 'En el cuarto', class: 'nose-check', val: 3, type: 'radio' },
    ]},
    { id: 'familia4', name: 'padrastro', options: [
      { id: 'familia4-1', name: 'no', class: 'no-check', val: 1, type: 'checkbox'},
      { id: 'familia4-2', name: 'En la casa', class: 'nose-check', val: 2, type: 'radio'},
      { id: 'familia4-3', name: 'En el cuarto', class: 'nose-check', val: 3, type: 'radio'},
    ]},
    { id: 'familia5', name: 'hermanos', options: [
      { id: 'familia5-1', name: 'no', class: 'no-check', val: 1, type: 'checkbox' },
      { id: 'familia5-2', name: 'En la casa', class: 'nose-check', val: 2, type: 'radio' },
      { id: 'familia5-3', name: 'En el cuarto', class: 'nose-check', val: 3, type: 'radio' },
    ]},
    { id: 'familia6', name: 'pareja', options: [
      { id: 'familia6-1', name: 'no', class: 'no-check', val: 1, type: 'checkbox' },
      { id: 'familia6-2', name: 'En la casa', class: 'nose-check', val: 2, type: 'radio' },
      { id: 'familia6-3', name: 'En el cuarto', class: 'nose-check', val: 3, type: 'radio' },
    ]},
    { id: 'familia7', name: 'hijo', options: [
      { id: 'familia7-1', name: 'no', class: 'no-check', val: 1, type: 'checkbox' },
      { id: 'familia7-2', name: 'En la casa', class: 'nose-check', val: 2, type: 'radio' },
      { id: 'familia7-3', name: 'En el cuarto', class: 'nose-check', val: 3, type: 'radio' },
    ]},
    { id: 'familia8', name: 'otros', options: [
      { id: 'familia8-1', name: 'no', class: 'no-check', val: 1, type: 'checkbox' },
      { id: 'familia8-2', name: 'En la casa', class: 'nose-check', val: 2, type: 'radio' },
      { id: 'familia8-3', name: 'En el cuarto', class: 'nose-check', val: 3, type: 'radio' },
    ]},
  ]

  $scope.vive = [
    { id: 'vive1', name: 'en instituc.', options: [
      { id: 'vive1-1', name: 'no', class: 'no-check', val: 1, type: 'checkbox' },
      { id: 'vive1-2', name: 'En la casa', class: 'nose-check', val: 2, type: 'radio' },
    ]},
    { id: 'vive2', name: 'en la calle', options: [
      { id: 'vive2-1', name: 'no', class: 'no-check', val: 1, type: 'checkbox' },
      { id: 'vive2-2', name: 'En la casa', class: 'nose-check', val: 2, type: 'radio' },
    ]},
    { id: 'vive3', name: 'solo', options: [
      { id: 'vive3-1', name: 'no', class: 'no-check', val: 1, type: 'checkbox' },
      { id: 'vive3-2', name: 'En la casa', class: 'nose-check', val: 2, type: 'radio' },
    ]},
    { id: 'vive4', name: 'COMPARTE LA CAMA', options: [
      { id: 'vive4-1', name: 'no', class: 'no-check', val: 1, type: 'checkbox'},
      { id: 'vive4-2', name: 'En la casa', class: 'nose-check', val: 2, type: 'radio'},
    ]},
  ]

  $scope.nivelInstruccion = [
    { instr: 'analfabeto', name: 'analbabeto', options: [ 'padreAnalbabeto', 'madreAnalbabeto' ] },
    { instr: 'prim. incomp', name: 'prim-incomp', options: [ 'primIncompPadre', 'primIncompMadre' ] },
    { instr: 'primario', name: 'primario', options: [ 'primarioPadre', 'madrePrimario' ] },
    { instr: 'secund./tècnicos', name: 'secund-tecnico', options: [ 'secundTecnicoPadre', 'secundTecnicoMadre' ] },
    { instr: 'univ./terciario', name: 'univ-terciario', options: [ 'univTerciarioPadre', 'univTerciarioMadre' ] },
  ]

  $scope.trabajo = [
    { trab: 'ninguno', name: 'ninguno', options: [ 'padreNinguno', 'madreNinguno' ] },
    { trab: 'no estable', name: 'no-estable', options: [ 'padreNoEstable', 'madreNoEstable' ] },
    { trab: 'estable', name: 'estable', options: [ 'padreEstable', 'madreEstable' ] },
  ]

  $http.get(`src/doctor/form056/service/paciente.php?id=${$stateParams.id}`)
  .then(response => {
    $scope.paciente = response.data.paciente
    $scope.apellidos = $scope.paciente.hgc_ape_pacie.split(' ')
    $scope.nacimiento = $scope.paciente.hgc_fecn_pacie.split('-')
    $scope.provincia = `${$scope.paciente.hgc_desc_provi}, ${$scope.paciente.hgc_desc_canton}, ${$scope.paciente.hgc_desc_parro}`

    $scope.domicilioFlag = $scope.paciente.hgc_tele_pacie === null
          || $scope.paciente.hgc_tele_pacie === '' ? false : true

    $scope.mensajeFlag = $scope.paciente.hgc_celu_pacie === null
          || $scope.paciente.hgc_celu_pacie === '' ? false : true

    const edad = duration(fecha, new Date($scope.paciente.hgc_fecn_pacie))
    $scope.ageYear = edad.years < 10 ? '0'+ edad.years : edad.years
    $scope.ageYear = $scope.ageYear.toString().split('')
    $scope.ageMonth = edad.months < 10 ? '0' + edad.months : edad.months
    $scope.ageMonth = $scope.ageMonth.toString().split('')
  })

  $http.get('src/config/empresa/service/get.php')
  .then(response => {
    if (response.data.cont === 1) $scope.empresa = response.data.empresa
  })

  $scope.handleAddMotivoSelf = () => {
    indexMotivo++
    let template = `
      <li class="input-field Motivo-consulta--self-item">
        <input type="text" placeholder="Ingrese el motivo de consulta" id="input-${indexMotivo}" />
        <p class="consulta-cie--code" id="cie-${indexMotivo}"></p>
      </li>`
    $('#motivo-list').append(template)
  }

  $scope.handleAddMotivoCompany = () => {
    indexMotivoCompany++
    let template = `
      <li class="input-field Motivo-consulta--self-item">
        <input type="text" placeholder="Ingrese el motivo de consulta" id="input-${indexMotivoCompany}" />
        <p class="consulta-cie--code" id="cie-${indexMotivoCompany}"></p>
      </li>`
    $('#motivo-list-company').append(template)
  }

  var canvas = document.querySelector('#paint');
  var ctx = canvas.getContext('2d');

  var sketch = document.querySelector('#sketch');
  var sketch_style = getComputedStyle(sketch);
  canvas.width = parseInt(sketch_style.getPropertyValue('width'));
  canvas.height = parseInt(sketch_style.getPropertyValue('height'));

  var mouse = {x: 0, y: 0};

  /* Mouse Capturing Work */
  canvas.addEventListener('mousemove', function(e) {
  mouse.x = e.pageX - this.offsetLeft;
  mouse.y = e.pageY - this.offsetTop;
  }, false);

  /* Drawing on Paint App */
  ctx.lineWidth = 1;
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  ctx.strokeStyle = 'black';

  canvas.addEventListener('mousedown', function(e) {
  ctx.beginPath();
  ctx.moveTo(mouse.x, mouse.y);

  canvas.addEventListener('mousemove', onPaint, false);
  }, false);

  canvas.addEventListener('mouseup', function() {
  canvas.removeEventListener('mousemove', onPaint, false);
  }, false);

  var onPaint = function() {
    ctx.lineTo(mouse.x, mouse.y);
    ctx.stroke();
  };
  // End Paint


})
