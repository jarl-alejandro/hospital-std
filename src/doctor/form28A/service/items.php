<?php
include '../../../../helpers/conexion.php';

$tipo = $_GET["tipo"];

$query = $pdo->query("SELECT * FROM hgc_sisfis WHERE hgc_tipo_sisfi='$tipo'");
$sistemasFisico = array();

while ($row = $query->fetch()) {
  $sistemasFisico[] = $row;
}

$json = json_encode($sistemasFisico);
print $json;
