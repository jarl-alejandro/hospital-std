<?php session_start();
include '../../../../helpers/conexion.php';
date_default_timezone_set('America/Guayaquil');
$hoy = date("Y-m-d");

$doctor = $_GET['doctor'];

$query = $pdo->query("SELECT * FROM view_turnos WHERE hgc_esta_turno='form' AND hgc_doct_turno='$doctor'");

$turnos = array();

while ($row = $query->fetch()) {
  $turnos[] = $row;
}

$json = json_encode($turnos);
print $json;
