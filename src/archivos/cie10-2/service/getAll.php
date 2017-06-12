<?php
include '../../../../helpers/conexion.php';

$query = $pdo->query("SELECT * FROM hgc_cie102");
$cie10 = array();

while ($row = $query->fetch()) {
  $cie10[] = $row;
}

$json = json_encode($cie10);
print $json;
