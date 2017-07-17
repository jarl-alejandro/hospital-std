<?php
include '../../../../helpers/conexion.php';

$doctor = $_GET["doctor"];
$fecha = $_GET["fecha"];
$array = array();

$qs = $pdo->query("SELECT * FROM hgc_turno WHERE hgc_doct_turno='$doctor'
    AND hgc_fech_turno='$fecha'");

while ($row = $qs->fetch()) {
  $array[] = $row;
}

echo json_encode($array);
