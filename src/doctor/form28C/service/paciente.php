<?php
include '../../../../helpers/conexion.php';

$id = $_GET["id"];
$turno = $_GET["turno"];

$qs = $pdo->query("SELECT hgc_antp_form28, hgc_antf_form28 FROM hgc_form28 WHERE hgc_paci_form28='$id'
  ORDER BY hgc_turno_form28 ASC");
$paciente = $qs->fetch();

$qst = $pdo->query("SELECT hgc_turno_form28 FROM hgc_form28 WHERE hgc_turno_form28='$turno'");

$response = array('paciente'=>$paciente, 'turno'=>$qst->rowCount());
$json = json_encode($response);
print $json;
