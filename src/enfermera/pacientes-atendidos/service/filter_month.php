<?php session_start();
date_default_timezone_set('America/Guayaquil');

include '../../../../helpers/conexion.php';

function _data_last_month_day($month) { 
  // $month = date('m');
  $year = date('Y');
  $day = date("d", mktime(0,0,0, $month+1, 0, $year));
 
  return date('d', mktime(0,0,0, $month, $day, $year));
}

$year = date('Y');
$month = $_GET["month"];
$day = _data_last_month_day($month);
$desde = "$year-$month-01";
$hasta = "$year-$month-$day";
$userId = $_SESSION['87ea5dfc8b8e384d848979496e706390b497e547'];

$qs = $pdo->query("SELECT * FROM view_turnos_sigvit
  WHERE hgc_fecha_sigvit BETWEEN '$desde' AND '$hasta'
  AND (hgc_esta_turno='form' OR hgc_esta_turno='signosVitales')
  AND hgc_enfer_sigvit='$userId' ORDER BY hgc_fech_turno DESC
");

$turnos = array();

while ($row = $qs->fetch()) {
  $turnos[] = $row;
}

$json = json_encode($turnos);
print $json;
