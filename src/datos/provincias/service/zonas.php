<?php
include '../../../../helpers/conexion.php';

$servicios = array();

$qs = $pdo->query("SELECT * FROM hgc_zonas WHERE hgc_est_zona='true'");

while ($row = $qs->fetch()) {
  $servicios[] = $row;
}

$json = json_encode($servicios);
print $json;
