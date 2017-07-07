<?php
include '../../../helpers/conexion.php';

$consultorios = array();

$qs = $pdo->query("SELECT * FROM hgc_consultorio WHERE hgc_est_cons=true");

while ($row = $qs->fetch()) {
  $consultorios[] = $row;
}

$json = json_encode($consultorios);
print $json;
