<?php
session_start();
include '../../../../helpers/conexion.php';
date_default_timezone_set('America/Guayaquil');

$hoy = date("Y/m/d");
$id = $_SESSION['87ea5dfc8b8e384d848979496e706390b497e547'];

$qs_user = $pdo->query("SELECT * FROM hgc_profesionales WHERE hgc_cedu_profe='$id'");
$user = $qs_user->fetch();
$codi = $user["hgc_codi_profe"];

$query = $pdo->query("SELECT * FROM view_turnos WHERE hgc_fech_turno='$hoy'
              AND hgc_esta_turno='signosVitales' AND hgc_doct_turno='$codi'");
$turnos = array();

while ($row = $query->fetch()) {
  $turnos[] = $row;
}

$json = json_encode($turnos);
print $json;
