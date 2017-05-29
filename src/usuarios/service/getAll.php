<?php
include '../../../helpers/conexion.php';

$query = $pdo->query("SELECT * FROM hgc_profesionales");
$profesionales = array();

while ($row = $query->fetch()) {
  $profesionales[] = $row;
}

$json = json_encode($profesionales);
print $json;