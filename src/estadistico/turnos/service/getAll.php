<?php
include '../../../../helpers/conexion.php';

$query = $pdo->query("SELECT * FROM view_turnos");
$turnos = array();

while ($row = $query->fetch()) {
  $turnos[] = $row;
}

$json = json_encode($turnos);
print $json;
