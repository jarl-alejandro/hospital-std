<?php
include '../../../../helpers/conexion.php';
date_default_timezone_set('America/Guayaquil');

$hoy = date("Y-m-d H:i:s");

echo $hoy;
echo "<br><br>";
$fecha 	= date('Y-m-d H:i:s', (strtotime ("+24 Hours")));
echo $fecha;


$query = $pdo->query("SELECT * FROM view_turnos WHERE hgc_fech_turno='$hoy'
                      AND hgc_esta_turno='form'");
$turnos = array();

while ($row = $query->fetch()) {
  $turnos[] = $row;
}

$json = json_encode($turnos);
// print $json;
