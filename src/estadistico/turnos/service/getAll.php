<?php
include '../../../../helpers/conexion.php';

date_default_timezone_set('America/Guayaquil');
$hoy = date("Y/m/d");

$query = $pdo->query("SELECT * FROM view_turnos WHERE hgc_fech_turno='$hoy'");
$turnos = array();

while ($row = $query->fetch()) {
  $turnos[] = $row;
}

$json = json_encode($turnos);
print $json;
