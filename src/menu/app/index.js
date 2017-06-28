angular.module('Hospital')
  .directive('hgcMenu', function ($rootScope) {
    return {
      restrict: 'E',
      templateUrl: 'src/menu/menu.html',
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
