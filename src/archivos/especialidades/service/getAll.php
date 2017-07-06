<?php
include '../../../../helpers/conexion.php';

$especialidades = array();

$qs = $pdo->query("SELECT * FROM view_especialidad");

while ($row = $qs->fetch()) {
  $especialidades[] = $row;
}

$json = json_encode($especialidades);
print $json;
