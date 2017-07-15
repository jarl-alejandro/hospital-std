<?php
include '../../../../helpers/conexion.php';

$json = file_get_contents('php://input');
$obj = json_decode($json);

$month = $_GET["mes"];
$doctor = $_GET["doctor"];

$year = date("Y");
$turnos = array();

$primerDia = date('Y-m-d', mktime(0,0,0, $month, 1, $year));
$ultimoDia = date("Y-m-d", (mktime(0, 0, 0, $month+1, 1, $year) - 1));

$qs = $pdo->query("SELECT * FROM view_turnos WHERE( hgc_fech_turno
              BETWEEN '$primerDia' AND '$ultimoDia') AND hgc_doct_turno='$doctor'");

while ($row = $qs->fetch()) {
  $turnos[] = $row;
}

$json = json_encode($turnos);
print $json;
