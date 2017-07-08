<?php
include '../../../../helpers/conexion.php';

$query = $pdo->query("SELECT * FROM view_pasante");
$profesionales = array();

while ($row = $query->fetch()) {
  $profesionales[] = $row;
}

$json = json_encode($profesionales);
print $json;
