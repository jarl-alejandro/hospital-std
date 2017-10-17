<?php
include '../../../../helpers/conexion.php';

$qs = $pdo->query("SELECT * FROM hgc_farmacia");
$array = array();

while ($row = $qs->fetch()) {
  $array[] = $row;
}

echo json_encode($array);
