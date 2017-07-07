<?php
include '../../../../helpers/conexion.php';

$query = $pdo->query("SELECT * FROM hgc_horarios");
$horarios = array();

while ($row = $query->fetch()) {
  $horarios[] = $row;
}

$json = json_encode($horarios);
print $json;
