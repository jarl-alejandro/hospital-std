<?php session_start();
date_default_timezone_set('America/Guayaquil');
include '../../../../helpers/conexion.php';

$inicio = $_GET['inicio'];
$final = $_GET['final'];

$doctor = $_SESSION['87ea5dfc8b8e384d848979496e706390b497e547'];

$qs = $pdo->query("SELECT * FROM hgc_profesionales WHERE hgc_cedu_profe='$doctor'");
$row = $qs->fetch();

$id_doctor = $row['hgc_codi_profe'];

$query = $pdo->query(
  "SELECT * FROM view_turnos WHERE hgc_fech_turno BETWEEN '$inicio' AND '$final' AND hgc_esta_turno='form' AND  hgc_doct_turno='$id_doctor'"
);

$turnos = array();

while ($row = $query->fetch()) {
  $turnos[] = $row;
}

$json = json_encode($turnos);
print $json;