<?php
include '../../../../helpers/conexion.php';

date_default_timezone_set('America/Guayaquil');

$turno = $_GET['turno'];

$observacion = array();
$nacido = array();
$detalle = array();
$atendido = array();

$qs = $pdo->query("SELECT * FROM hgc_form28 WHERE hgc_turno_form28='$turno'");
$form = $qs->fetch();

$codigo = $form['hgc_codi_form28'];

$obs = $pdo->query("SELECT * FROM hgc_obst WHERE hgc_form_obst='$codigo'");
$nac = $pdo->query("SELECT * FROM hgc_recien_nacido WHERE hgc_form_nac='$codigo'");
$det = $pdo->query("SELECT * FROM hgc_dform28 WHERE hgc_form_dform28='$codigo'");
$atend = $pdo->query("SELECT * FROM hgc_atendido WHERE hgc_form_aten='$codigo'");


while ($row = $obs->fetch()) {
  $observacion[] = $row;
}
while ($row = $nac->fetch()) {
  $nacido[] = $row;
}
while ($row = $det->fetch()) {
  $detalle[] = $row;
}
while ($row = $atend->fetch()) {
  $atendido[] = $row;
}

$json = array('form'=>$form, 'observacion'=> $observacion,'nacido'=> $nacido,'detalle'=> $detalle,'atendido'=> $atendido);
echo json_encode($json);
