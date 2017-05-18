<?php
include '../../../helpers/conexion.php';

$query = $pdo->query("SELECT * FROM hgc_provincia");
$provincias = array();

while ($row = $query->fetch()) {
  $provincias[] = $row;
}

$json = json_encode($provincias);
print $json;