<?php
include '../../../../helpers/conexion.php';
date_default_timezone_set('America/Guayaquil');
$hoy = date("Y-m-d");

$query = $pdo->query("SELECT * FROM view_turnos WHERE hgc_fech_turno='$hoy'
                      AND hgc_esta_turno='turno'");
$turnos = array();

while ($row = $query->fetch()) {
  $turnos[] = $row;
}

$json = json_encode($turnos);
print $json;
