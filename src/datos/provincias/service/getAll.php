<?php
include '../../../../helpers/conexion.php';

$query = $pdo->query("SELECT * FROM view_provincias");
$provincias = array();

while ($row = $query->fetch()) {
  $provincias[] = $row;
}

$json = json_encode($provincias);
print $json;
