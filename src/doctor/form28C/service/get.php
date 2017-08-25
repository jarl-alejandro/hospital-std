<?php
include '../../../../helpers/conexion.php';

date_default_timezone_set('America/Guayaquil');

$turno = $_GET['turno'];

$detalle = array();
$cie = array();
// $medicas = array();

$qs = $pdo->query("SELECT * FROM hgc_form28 WHERE hgc_turno_form28='$turno'");
$form = $qs->fetch();

$codigo = $form['hgc_codi_form28'];

$pre = $pdo->query("SELECT * FROM hgc_presc WHERE hgc_codi_presc='$codigo'");
$det = $pdo->query("SELECT * FROM hgc_dform28 WHERE hgc_form_dform28='$codigo'");
$fcie = $pdo->query("SELECT * FROM hgc_focie WHERE hgc_form_fci='$codigo'");

while ($row = $det->fetch()) {
  $detalle[] = $row;
}
while ($row = $fcie->fetch()) {
  $cie[] = $row;
}

$medicas = $pre->fetch();

$json = array('form'=>$form, 'medicas'=> $medicas, 'detalle'=> $detalle, 'cie'=> $cie);
echo json_encode($json);
