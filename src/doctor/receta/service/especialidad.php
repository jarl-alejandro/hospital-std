<?php
include '../../../../helpers/conexion.php';

$qs = $pdo->query("SELECT * FROM view_especialidad");
$array = array();

while ($row = $qs->fetch()) {
  $array[] = $row;
}

echo json_encode($array);
