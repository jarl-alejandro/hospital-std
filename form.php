<?php
// echo date('Y');
echo sha1("123456");
?>
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
      <button class='btn__flat danger'>Cancelar</button>
      <button class='btn__flat'>Aceptar</button>
    </div>
  </form>
</section>
