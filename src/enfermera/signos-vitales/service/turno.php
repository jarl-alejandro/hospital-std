<?php
include '../../../../helpers/conexion.php';
date_default_timezone_set('America/Guayaquil');

$hoy = date("Y/m/d");
$id = $_GET["id"];

$query = $pdo->query("SELECT hgc_id_turno, hgc_esta_turno FROM hgc_turno WHERE hgc_id_turno='$id'");
$turno = $query->fetch();

$json = json_encode($turno);
print $json;
