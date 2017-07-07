<?php
include '../../../../helpers/conexion.php';

$consultorios = array();

$qs = $pdo->query("SELECT * FROM hgc_consultorio");

while ($row = $qs->fetch()) {
  $consultorios[] = $row;
}

$json = json_encode($consultorios);
print $json;
