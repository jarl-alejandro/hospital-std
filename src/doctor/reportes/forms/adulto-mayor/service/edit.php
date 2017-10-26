<?php
include '../../../../helpers/conexion.php';
date_default_timezone_set('America/Guayaquil');

$json = file_get_contents('php://input');
$obj = json_decode($json);

$cie = $obj->cie;

$cancer = $obj->cancer;
$cardiopatia = $obj->cardiopatia;
$diabetis = $obj->diabetis;
$hipertension = $obj->hipertension;
$infecciosa = $obj->infecciosa;
$mental = $obj->mental;
$otroantece = $obj->otroantece;
$sinantecedente = $obj->sinantecedente;
$vascular = $obj->vascular;
$tuberculosis = $obj->tuberculosis;

$tratamiento = $obj->tratamiento;
$antpersonal = $obj->antpersonal;
$extremidades = $obj->extremidades;
$motivo = $obj->motivo;

$abdomen = $obj->abdomen;
$cuello = $obj->cuello;
$enfermedad = $obj->enfermedad;
$pelvis = $obj->pelvis;
$torax = $obj->torax;
$cabeza = $obj->cabeza;
$examenFisico = $obj->examenFisico;

$id = $obj->id;

$qs = $pdo->prepare(
  "UPDATE hgc_form_ma SET hgc_can_ma=?, hgc_car_ma=?, hgc_dia_ma=?, hgc_hip_ma=?,
  hgc_inf_ma=?, hgc_men_ma=?, hgc_otro_ma=?, hgc_sin_ma=?, hgc_vas_ma=?, hgc_tub_ma=?, hgc_tra_ma=?,
  hgc_ant_ma=?, hgc_ext_ma=?, hgc_abs_ma=?, hgc_cue_ma=?, hgc_enf_ma=?, hgc_pel_ma=?, hgc_tor_ma=?,
  hgc_mot_ma=?, hgc_cab_ma=?, hgc_exf_ma=? WHERE hgc_cod_ma=?
");

$qs->bindParam(1, $cancer);
$qs->bindParam(2, $cardiopatia);
$qs->bindParam(3, $diabetis);
$qs->bindParam(4, $hipertension);
$qs->bindParam(5, $infecciosa);
$qs->bindParam(6, $mental);
$qs->bindParam(7, $otroantece);
$qs->bindParam(8, $sinantecedente);
$qs->bindParam(9, $vascular);
$qs->bindParam(10, $tuberculosis);
$qs->bindParam(11, $tratamiento);
$qs->bindParam(12, $antpersonal);
$qs->bindParam(13, $extremidades);
$qs->bindParam(14, $abdomen);
$qs->bindParam(15, $cuello);
$qs->bindParam(16, $enfermedad);
$qs->bindParam(17, $pelvis);
$qs->bindParam(18, $torax);
$qs->bindParam(19, $motivo);
$qs->bindParam(20, $cabeza);
$qs->bindParam(21, $examenFisico);
$qs->bindParam(22, $id);

$qs->execute();

$pdo->query("DELETE FROM hgc_detail_ma WHERE hgc_form_ma='$id'");

$detail = $pdo->prepare(
  "INSERT INTO hgc_detail_ma (hgc_form_ma, hgc_cie_ma, hgc_tip_ma) VALUES (?,?,?)"
);

foreach ($cie as $row) {
  $cie = $row->cie;
  $tipo = $row->check;

  $detail->bindParam(1, $id);
  $detail->bindParam(2, $cie);
  $detail->bindParam(3, $tipo);

  $detail->execute();
}
if ($qs) {
  echo 201;
}
