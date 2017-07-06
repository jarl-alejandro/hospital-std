'use strict'

const perfil = angular.module('Hospital')

perfil.controller('perfilController', function ($scope, $http) {
  const avatarFile = document.getElementById('upload-avatar')
  $scope.perfil = {}
  $scope.avatar = ''
  $scope.password = { password1: '', password2: '' }

  avatarFile.addEventListener('change', changeAvatar)

  $http.get('src/perfil/service/me.php')
    .then(response => {
      $scope.perfil = response.data.user
      console.log($scope.perfil)
    })

  $scope.handlepasswordModal = function () {
    $('#password-container').modal('open')
  }

  $scope.handleClosePass = function () {
    $scope.password = { password1: '', password2: '' }
    $('#password-container label.active').removeClass('active')
  }

  function changeAvatar () {
    const formData = new FormData()
    formData.append("imagen", avatarFile.files[0])

    const xhr = new XMLHttpRequest()
    xhr.open('POST', 'src/perfil/service/saveAvatar.php', true)

    xhr.onload = function (e) {
      if (this.status == 200) {
        console.log(this.responseText)
        if (this.responseText === '201') {
          Materialize.toast('Ha cambiado su foto', 4000)
          setTimeout(()=> location.reload(), 1000)
        }
      }
    }

    xhr.send(formData)
  }

  $scope.handleSavePass = function () {
    if (validarPassword()) {
      $http.post('src/perfil/service/savePassword.php', $scope.password)
        .then(response => {
          console.log(response)
          if (response.data === '201') {
            Materialize.toast('Se ha cambiado su contraseña', 4000)
            $scope.password = { password1: '', password2: '' }
            $('#password-container').modal('close')
            $('#password-container label.active').removeClass('active')
          }
        })
    }
  }

  function validarPassword () {
    const password = $scope.password

    if (password.password1.trim() === '') {
      Materialize.toast('Ingrese su nueva contraseña', 4000)
      $('#password-container').modal('open')
      return false
    }
    if (password.password2.trim() === '') {
      Materialize.toast('Repita su contraseña', 4000)
      return false
    }
    if (password.password1.trim() !== password.password2.trim()) {
      Materialize.toast('La contraseña no coinciden', 4000)
      return false
    } else return true
  }

})
