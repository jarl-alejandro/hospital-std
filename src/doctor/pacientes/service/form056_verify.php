<?php
session_start();
include '../../../../helpers/conexion.php';
date_default_timezone_set('America/Guayaquil');

$day = date("d");
$month = date("m");
$year = date("Y");

$paciente = $_GET['paciente'];

$qs = $pdo->query("SELECT * FROM hgc_form056 WHERE hgc_paci_f056='$paciente' ORDER BY hgc_fech_f056 DESC LIMIT 1");
$len = $qs->rowCount();
$row = $qs->fetch();

if ($len === 0) {
  echo "0";
}
if ($len > 0) {
  $fecha = $row['hgc_fech_f056'];
  $split = explode('-', $fecha);

  if ($split[2] >= $day && $split[1] >= $month && $year > $split[0]) {
    echo "0";
  }
  else echo "1";
}
