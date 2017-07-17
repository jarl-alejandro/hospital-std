<?php
include '../../../../helpers/conexion.php';

$doctor = $_GET["doctor"];
$fecha = $_GET["fecha"];

$qs = $pdo->query("SELECT * FROM hgc_turno WHERE hgc_doct_turno='$doctor'
    AND hgc_fech_turno='$fecha' ORDER BY hgc_fin_turno DESC LIMIT 1");


$row = $qs->fetch();

echo json_encode($row);
