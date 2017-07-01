angular.module('Hospital')
  .directive('hgcMenu', function ($rootScope) {
    return {
      restrict: 'E',
      templateUrl: 'src/menu/menuAdmin.html',
      link: (scope, elem, attrs) => {

        $(".button-collapse").sideNav({
          closeOnClick: true,
          draggable: true
        })
        $('.collapsible').collapsible()
        $('.dropdown-button').dropdown()
      }
    }
  })

angular.module('Hospital')
  .directive('hgcMenuDoctor', function ($rootScope) {
    return {
      restrict: 'E',
      templateUrl: 'src/menu/doctor.html',
      link: (scope, elem, attrs) => {

        $(".button-collapse").sideNav({
          closeOnClick: true,
          draggable: true
        })
        $('.collapsible').collapsible()
        $('.dropdown-button').dropdown()
      }
    }
  })

angular.module('Hospital')
  .directive('hgcMenuEnfermera', function ($rootScope) {
    return {
      restrict: 'E',
      templateUrl: 'src/menu/enfermera.html',
      link: (scope, elem, attrs) => {

        $(".button-collapse").sideNav({
          closeOnClick: true,
          draggable: true
        })
        $('.collapsible').collapsible()
        $('.dropdown-button').dropdown()
      }
    }
  })

angular.module('Hospital')
  .directive('hgcMenuEstadistica', function ($rootScope) {
    return {
      restrict: 'E',
      templateUrl: 'src/menu/estadistica.html',
      link: (scope, elem, attrs) => {

        $(".button-collapse").sideNav({
          closeOnClick: true,
          draggable: true
        })
        $('.collapsible').collapsible()
        $('.dropdown-button').dropdown()
      }
    }
  })