<?php
include '../../../../helpers/conexion.php';

$servicios = array();

$qs = $pdo->query("SELECT * FROM hgc_distrito WHERE hgc_est_dist='true'");

while ($row = $qs->fetch()) {
  $servicios[] = $row;
}

$json = json_encode($servicios);
print $json;
