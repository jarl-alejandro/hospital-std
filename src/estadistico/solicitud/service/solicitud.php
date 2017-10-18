<?php
include '../../../../helpers/conexion.php';

$query = $pdo->query("SELECT * FROM view_solicitud");
$solicitudes = array();

while ($row = $query->fetch()) {
  $solicitudes[] = $row;
}

$json = json_encode($solicitudes);
print $json;
