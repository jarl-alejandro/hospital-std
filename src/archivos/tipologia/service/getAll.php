<?php
include '../../../../helpers/conexion.php';

$tipologias = array();

$qs = $pdo->query("SELECT * FROM hgc_tipologia");

while ($row = $qs->fetch()) {
  $tipologias[] = $row;
}

$json = json_encode($tipologias);
print $json;
