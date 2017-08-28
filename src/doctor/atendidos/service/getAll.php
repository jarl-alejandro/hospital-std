<?php session_start();
include '../../../../helpers/conexion.php';
date_default_timezone_set('America/Guayaquil');
$hoy = date("Y-m-d");
$doctor = $_SESSION['87ea5dfc8b8e384d848979496e706390b497e547'];

$qs = $pdo->query("SELECT * FROM hgc_profesionales WHERE hgc_cedu_profe='$doctor'");
$row = $qs->fetch();

$id_doctor = $row['hgc_codi_profe'];
$stamp = date('Y-m-d H:i:s');
$newDate = strtotime( '-24 hour' , strtotime($stamp) );
$newDate = date( 'Y-m-d H:i:s' , $newDate );

$query = $pdo->query("SELECT * FROM view_turnos WHERE hgc_esta_turno='form' AND
    hgc_fecha_consulta BETWEEN '$newDate' AND '$stamp' AND hgc_doct_turno='$id_doctor'");

$turnos = array();

while ($row = $query->fetch()) {
  $turnos[] = $row;
}

$json = json_encode($turnos);
print $json;
