<?php
include '../../../../helpers/conexion.php';

$establecimiento = array();

$qs = $pdo->query("SELECT * FROM view_establecimiento");

while ($row = $qs->fetch()) {
  $establecimiento[] = $row;
}

$json = json_encode($establecimiento);
print $json;
