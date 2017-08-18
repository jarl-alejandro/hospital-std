<?php
session_start();

include '../../../../helpers/conexion.php';
date_default_timezone_set('America/Guayaquil');

$hoy = date("Y-m-d");
$hora = date("h:i");
// $hoy = date('Y-m-d', (strtotime ("+24 Hours")));

$id = $_SESSION['87ea5dfc8b8e384d848979496e706390b497e547'];

$qs_user = $pdo->query("SELECT * FROM hgc_profesionales WHERE hgc_cedu_profe='$id'");
$user = $qs_user->fetch();
$codi = $user["hgc_codi_profe"];

$query = $pdo->query("SELECT * FROM view_form WHERE hgc_fech_form28<='$hoy' AND hgc_doct_turno='$codi'");
$turnos = array();

while ($row = $query->fetch()) {
  if ($row['hgc_fech_form28'] == $hoy) {
    $turnos[] = $row;
  }
  if ($hoy > $row['hgc_fech_form28'] && $row['hgc_hora_form28'] > $hora) {
    $turnos[] = $row;
  }
}

$json = json_encode($turnos);
print $json;
