<?php
include '../../../../helpers/conexion.php';

$qs = $pdo->query("SELECT * FROM view_paciente_select");
$array = array();

while ($row = $qs->fetch()) {
  $array[] = $row;
}

echo json_encode($array);
