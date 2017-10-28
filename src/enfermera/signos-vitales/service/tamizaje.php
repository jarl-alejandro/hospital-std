<?php
include '../../../../helpers/conexion.php';
date_default_timezone_set('America/Guayaquil');

$hoy = date("Y/m/d");
$turno = $_GET["turno"];
$tamizajes = array();

$query = $pdo->query("SELECT * FROM hgc_tami_sigv WHERE hgc_turn_tam='$turno'");

while ($row = $query->fetch()) {
  $tamizajes[] = $row;
}

$json = json_encode($tamizajes);
print $json;
