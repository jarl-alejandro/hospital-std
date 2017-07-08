<?php
include '../../../helpers/conexion.php';

$horarios = array();

$qs = $pdo->query("SELECT * FROM view_asigna_horario");

while ($row = $qs->fetch()) {
  $horarios[] = $row;
}

$json = json_encode($horarios);
print $json;
