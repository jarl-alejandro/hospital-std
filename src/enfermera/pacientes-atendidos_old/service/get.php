<?php
include '../../../../helpers/conexion.php';
date_default_timezone_set('America/Guayaquil');
$hoy = date("Y-m-d");

$stamp = date('Y-m-d H:i:s');
$newDate = strtotime( '-24 hour' , strtotime($stamp) );
$newDate = date( 'Y-m-d H:i:s' , $newDate );

$query = $pdo->query("SELECT * FROM view_turnos WHERE hgc_fecha_consulta BETWEEN '$newDate' AND '$stamp'
    AND hgc_esta_turno='form' OR hgc_esta_turno='signosVitales'");

$turnos = array();

while ($row = $query->fetch()) {
  $turnos[] = $row;
}

$json = json_encode($turnos);
print $json;
