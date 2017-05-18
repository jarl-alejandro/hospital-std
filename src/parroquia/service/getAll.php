<?php
include '../../../helpers/conexion.php';

$query = $pdo->query("SELECT * FROM hgc_parroquia");
$parroquias = array();

while ($row = $query->fetch()) {
  $parroquias[] = $row;
}

$json = json_encode($parroquias);
print $json;