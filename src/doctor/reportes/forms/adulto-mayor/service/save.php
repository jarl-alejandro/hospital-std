<?php
include '../../../../helpers/conexion.php';
include '../../../../helpers/generar_codigo.php';
date_default_timezone_set('America/Guayaquil');

$json = file_get_contents('php://input');
$obj = json_decode($json);

$codigo = setCode($pdo, 'FMA-', 9, 'hgc_form_ma', 'hgc_cont_ma');
updateCode($pdo, 'hgc_cont_ma');

$stamp = date('Y-m-d H:i:s');
$hoy = date("Y/m/d");

$paciente = $obj->paciente;
$turno = $obj->turno;
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

$pdo->query(
  "UPDATE hgc_turno SET hgc_esta_turno='form', hgc_tipo_form='mayor', hgc_fecha_consulta='$stamp'
  WHERE hgc_id_turno='$turno'"
);

$qs = $pdo->prepare(
  "INSERT INTO hgc_form_ma (hgc_cod_ma, hgc_can_ma, hgc_car_ma, hgc_dia_ma, hgc_hip_ma,
  hgc_inf_ma, hgc_men_ma, hgc_otro_ma, hgc_sin_ma, hgc_vas_ma, hgc_tub_ma, hgc_tra_ma,
  hgc_ant_ma, hgc_ext_ma, hgc_abs_ma, hgc_cue_ma, hgc_enf_ma, hgc_pel_ma, hgc_tor_ma,
  hgc_tur_ma, hgc_pac_ma, hgc_fecha_ma, hgc_mot_ma, hgc_cab_ma, hgc_exf_ma)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
");

$qs->bindParam(1, $codigo);
$qs->bindParam(2, $cancer);
$qs->bindParam(3, $cardiopatia);
$qs->bindParam(4, $diabetis);
$qs->bindParam(5, $hipertension);
$qs->bindParam(6, $infecciosa);
$qs->bindParam(7, $mental);
$qs->bindParam(8, $otroantece);
$qs->bindParam(9, $sinantecedente);
$qs->bindParam(10, $vascular);
$qs->bindParam(11, $tuberculosis);
$qs->bindParam(12, $tratamiento);
$qs->bindParam(13, $antpersonal);
$qs->bindParam(14, $extremidades);
$qs->bindParam(15, $abdomen);
$qs->bindParam(16, $cuello);
$qs->bindParam(17, $enfermedad);
$qs->bindParam(18, $pelvis);
$qs->bindParam(19, $torax);
$qs->bindParam(20, $turno);
$qs->bindParam(21, $paciente);
$qs->bindParam(22, $hoy);
$qs->bindParam(23, $motivo);
$qs->bindParam(24, $cabeza);
$qs->bindParam(25, $examenFisico);

$qs->execute();

$detail = $pdo->prepare(
  "INSERT INTO hgc_detail_ma (hgc_form_ma, hgc_cie_ma, hgc_tip_ma) VALUES (?,?,?)"
);

foreach ($cie as $row) {
  $cie = $row->cie;
  $tipo = $row->check;

  $detail->bindParam(1, $codigo);
  $detail->bindParam(2, $cie);
  $detail->bindParam(3, $tipo);

  $detail->execute();
}

if ($qs) {
  echo 201;
}
