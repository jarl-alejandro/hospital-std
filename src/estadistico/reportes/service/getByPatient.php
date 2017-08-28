<?php session_start();
include '../../../../helpers/conexion.php';
date_default_timezone_set('America/Guayaquil');
$hoy = date("Y-m-d");

$id_doctor = $row['hgc_codi_profe'];
$patient = $_GET['patient'];

$query = $pdo->query("SELECT * FROM view_turnos WHERE hgc_esta_turno='form' AND hgc_paci_turno='$patient'");

$turnos = array();

while ($row = $query->fetch()) {
  $turnos[] = $row;
}

$json = json_encode($turnos);
print $json;
