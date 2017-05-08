<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Consultorio</title>
    <link rel="stylesheet" href="assets/css/style.css">
  </head>
  <body>
    <section class="container">
      <section class="main-sidebar">
        <article class="sidebar__settings">
          <div class="image">
            <img src="assets/img/logo_inspi.png" />
          </div>
          <div class="content">
            <span class="user__state"></span>
            <h4 class="user__name">Alejandro Rivas</h4>
          </div>
        </article>
        <nav class="sidebar__menu">
          <ul class="sidebar__menu_list">
            <li><a href="#"><i class="material-icons">home</i> <span>Inicio</span></a></li>
            <li><a href="#"><i class="material-icons">backup</i> <span>Archivos</span></a></li>
            <li><a href="#"><i class="material-icons">build</i> <span>Build</span></a></li>
            <li><a href="#"><i class="material-icons">android</i> <span>Android</span></a></li>
            <li><a href="#"><i class="material-icons">language</i> <span>Language</span></a></li>
          </ul>
        </nav>
      </section>
      <section class="workSpace">
        <form class='form ed-item s-50'>
          <header>
            <h3>Registrar Paciente</h3>
          </header>
          <div class="form__input">
            <label for="nombre">Ingresa tu nombre</label>
            <input id="nombre" type="text" placeholder='Ejemplo: Alejandro'>
          </div>
          <div class="form__input">
            <label for="apelido">Ingresa tu apelido</label>
            <input id="apelido" type="text" placeholder='Ejemplo: Rivas'>
          </div>
          <div class='main-distribute'>
            <button class='btn__flat'>Aceptar</button>
            <button class='btn__flat'>Aceptar</button>
          </div>
        </form>
      </section>
    </section>

    <script>
      document.querySelector('button').addEventListener('click', (e) => e.preventDefault())
    </script>

  </body>
</html>
