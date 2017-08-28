<?php session_start();
include '../../../../helpers/conexion.php';
date_default_timezone_set('America/Guayaquil');
$hoy = date("Y-m-d");

$inicio = $_GET['inicio'];
$final = $_GET['final'];

$query = $pdo->query("SELECT * FROM view_turnos WHERE hgc_esta_turno='form' AND
    hgc_fecha_consulta BETWEEN '$inicio' AND '$final'");

$turnos = array();

while ($row = $query->fetch()) {
  $turnos[] = $row;
}

$json = json_encode($turnos);
print $json;
