<?php
include '../../../../helpers/conexion.php';

$id = $_GET['id'];
$signos = array();

$qs = $pdo->query("SELECT * FROM hgc_sigvit 
  WHERE hgc_tform_sigvit='form056' AND hgc_hcli_sigvit='$id'
");

while ($row = $qs->fetch()) {
  $signos[] = $row;
}

echo json_encode($signos);
