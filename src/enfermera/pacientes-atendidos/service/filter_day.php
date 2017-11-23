<?php session_start();
date_default_timezone_set('America/Guayaquil');

include '../../../../helpers/conexion.php';

$userId = $_SESSION['87ea5dfc8b8e384d848979496e706390b497e547'];
$hoy = date("Y-m-d");

$qs = $pdo->query("SELECT * FROM view_turnos_sigvit
  WHERE hgc_fecha_sigvit='$hoy'
  AND (hgc_esta_turno='form' OR hgc_esta_turno='signosVitales')
  AND hgc_enfer_sigvit='$userId' ORDER BY hgc_fech_turno DESC
");


$turnos = array();

while ($row = $qs->fetch()) {
  $turnos[] = $row;
}

$json = json_encode($turnos);
print $json;
