<?php
include '../../../helpers/conexion.php';

$query = $pdo->query("SELECT * FROM hgc_barrios");
$barrios = array();

while ($row = $query->fetch()) {
  $barrios[] = $row;
}

$json = json_encode($barrios);
print $json;