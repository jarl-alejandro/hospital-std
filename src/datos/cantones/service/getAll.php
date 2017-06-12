<?php
include '../../../../helpers/conexion.php';

$query = $pdo->query("SELECT * FROM hgc_contanes");
$cantones = array();

while ($row = $query->fetch()) {
  $cantones[] = $row;
}

$json = json_encode($cantones);
print $json;
