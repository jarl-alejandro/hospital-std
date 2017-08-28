<?php
include '../../../../helpers/conexion.php';

$query = $pdo->query("SELECT * FROM hgc_sisfis WHERE hgc_tipo_sisfi='2'");
$sistemasFisico = array();

while ($row = $query->fetch()) {
  $sistemasFisico[] = $row;
}

$json = json_encode($sistemasFisico);
print $json;
