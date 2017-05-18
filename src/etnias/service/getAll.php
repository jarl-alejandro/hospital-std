<?php
include '../../../helpers/conexion.php';

$query = $pdo->query("SELECT * FROM hgc_etnia");
$etnias = array();

while ($row = $query->fetch()) {
  $etnias[] = $row;
}

$json = json_encode($etnias);
print $json;