<?php
include '../../../../helpers/conexion.php';

$id = $_GET["id"];
$turno = $_GET["turno"];

$qs = $pdo->query("SELECT hgc_antp_pacie, hgc_antf_pacie FROM hgc_paciente WHERE hgc_cedu_pacie='$id'");
$paciente = $qs->fetch();

$qst = $pdo->query("SELECT hgc_turno_form28 FROM hgc_form28 WHERE hgc_turno_form28='$turno'");

$response = array('paciente'=>$paciente, 'turno'=>$qst->rowCount());
$json = json_encode($response);
print $json;
