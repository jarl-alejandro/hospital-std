<?php
include '../../../../helpers/conexion.php';

$id = $_GET['id'];
$signos = array();

$qs = $pdo->query("SELECT * FROM hgc_sigvit WHERE hgc_imc_sigvit IS NOT NULL");

while ($row = $qs->fetch()) {
  $signos[] = $row;
}

echo json_encode($signos);
