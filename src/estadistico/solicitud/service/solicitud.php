<?php
include '../../../../helpers/conexion.php';

$query = $pdo->query("SELECT * FROM view_solicitud WHERE hgc_est_soli='false'");
$solicitudes = array();

while ($row = $query->fetch()) {
  $solicitudes[] = $row;
}

$json = json_encode($solicitudes);
print $json;
