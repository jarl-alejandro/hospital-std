<?php
include '../../../../helpers/conexion.php';

$query = $pdo->query("SELECT * FROM hgc_cantones");
$cantones = array();

while ($row = $query->fetch()) {
  $cantones[] = $row;
}

$json = json_encode($cantones);
print $json;
