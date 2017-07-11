<?php
include '../../../../helpers/conexion.php';

$servicios = array();

$qs = $pdo->query("SELECT * FROM hgc_circuito");

while ($row = $qs->fetch()) {
  $servicios[] = $row;
}

$json = json_encode($servicios);
print $json;
