<?php
include '../../../../helpers/conexion.php';

$query = $pdo->query("SELECT * FROM hgc_pais");
$paises = array();

while ($row = $query->fetch()) {
  $paises[] = $row;
}

$json = json_encode($paises);
print $json;
