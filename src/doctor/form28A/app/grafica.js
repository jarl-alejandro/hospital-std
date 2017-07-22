'use struct'

const grafica028A = angular.module('Hospital')

grafica028A.controller('graficas028AController', function ($scope, $http) {
  const s = Snap("#grafica_curva_crecimiento")
  const bigCircle = s.circle(150, 150, 5)
  const bigCircle1 = s.circle(200, 200, 5)

  bigCircle.attr({
    fill: "#bada55",
    stroke: "#000",
    strokeWidth: 1
  })

  bigCircle1.attr({
    fill: "#bada55",
    stroke: "#000",
    strokeWidth: 1
  })

  const line = s.path('M431.484,316.158C513.005,316.146,594.525,124.644,702.011,125.322')
  line.attr({ fill: 'red' })

  // bigCircle.animate({r: 50}, 1000);

})
