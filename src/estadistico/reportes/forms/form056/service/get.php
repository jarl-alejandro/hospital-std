<?php
date_default_timezone_set('America/Guayaquil');

include '../../../../helpers/conexion.php';

$turno = $_GET['turno'];

$anexo = array();
$observ = array();
$motiv = array();

$qs056 = $pdo->query("SELECT * FROM hgc_form056 WHERE hgc_turno_f056='$turno'");
$form056 = $qs056->fetch();

$codigo = $form056['hgc_codi_f056'];

$qsAnexo = $pdo->query("SELECT * FROM hgc_anexo_f056 WHERE hgc_form_df056='$codigo'");
$qsObserv = $pdo->query("SELECT * FROM hgc_observ_f056 WHERE hgc_form_df056='$codigo'");
$qsMotiv = $pdo->query("SELECT * FROM hgc_motivocie10_f056 WHERE hgc_form_f056='$codigo'");

while ($row = $qsAnexo->fetch()){
  $anexo[] = $row;
}
while ($row = $qsObserv->fetch()){
  $observ[] = $row;
}
while ($row = $qsMotiv->fetch()){
  $motiv[] = $row;
}


$response = array('form' => $form056, 'anexo' => $anexo, 'observacion' => $observ, 'cie' => $motiv);

echo json_encode($response);
