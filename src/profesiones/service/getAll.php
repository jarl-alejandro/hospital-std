<?php
include '../../../helpers/conexion.php';

$query = $pdo->query("SELECT * FROM hgc_profesion");
$profesiones = array();

while ($row = $query->fetch()) {
  $profesiones[] = $row;
}

$json = json_encode($profesiones);
print $json;