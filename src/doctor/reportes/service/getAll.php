<?php
include '../../../../helpers/conexion.php';
date_default_timezone_set('America/Guayaquil');
$hoy = date("Y-m-d");


$stamp = date('Y-m-d H:i:s');
$newDate = strtotime( '-24 hour' , strtotime($stamp) );
$newDate = date( 'Y-m-d H:i:s' , $newDate );

// AND hgc_fecha_consulta BETWEEN '$newDate' AND '$stamp'

$query = $pdo->query("SELECT * FROM view_turnos WHERE hgc_esta_turno='form' ");

$turnos = array();

while ($row = $query->fetch()) {
  $turnos[] = $row;
}

$json = json_encode($turnos);
print $json;
