<?php
include '../../../../helpers/conexion.php';
date_default_timezone_set('America/Guayaquil');

$id = $_GET["id"];

$query = $pdo->query("SELECT * FROM hgc_sigvit WHERE hgc_hcli_sigvit='$id'");
$signosVitales = array();

while ($row = $query->fetch()) {
  $signosVitales[] = $row;
}

$json = json_encode($signosVitales);
print $json;
