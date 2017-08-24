<?php
date_default_timezone_set('America/Guayaquil');

include '../../../../helpers/conexion.php';
include '../../../../helpers/generar_codigo.php';

$json = file_get_contents('php://input');
$obj = json_decode($json);

$codigo = $obj->codigoForm;

$paciente = $obj->paciente;
$ncon_qs = $pdo->query("SELECT hgc_ncon_f056 FROM hgc_form056 WHERE hgc_paci_f056='$paciente'");

$numeroConsulta = $ncon_qs->rowCount() + 1;
$hoy = date("Y-m-d");
$companion = $obj->companion;
$civilStatus = $obj->civilStatus;
$enfermedadActual = $obj->enfermedadActual;
$turno = $obj->turno;
$planTratamiento = $obj->planTratamiento;
$fechaProxima = $obj->fechaProxima;
$tanner = $obj->tanner;
$estudios = $obj->estudios;
$menstruacion = $obj->menstruacion;
$noMenstruacion = $obj->noMenstruacion;

$form = $pdo->prepare("INSERT INTO hgc_form056 (hgc_codi_f056, hgc_paci_f056, hgc_ncon_f056, hgc_fech_f056,
  hgc_acom_f056, hgc_civi_f056, hgc_enfe_f056, hgc_turno_f056, hgc_indic_f056,hgc_fetpr_f056, hgc_tanne_f056,
  hgc_estu_f056,hgc_nomen_f056, hgc_ulmen_f056)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

$form = $pdo->prepare("UPDATE hgc_form056 SET hgc_paci_f056=?, hgc_ncon_f056=?, hgc_fech_f056=?, hgc_acom_f056=?,
  hgc_civi_f056=?, hgc_enfe_f056=?, hgc_turno_f056=?, hgc_indic_f056=?, hgc_fetpr_f056=?, hgc_tanne_f056=?,
  hgc_estu_f056=?, hgc_nomen_f056=?, hgc_ulmen_f056=? WHERE hgc_codi_f056=?");

$form->bindParam(1, $paciente);
$form->bindParam(2, $numeroConsulta);
$form->bindParam(3, $hoy);
$form->bindParam(4, $companion);
$form->bindParam(5, $civilStatus);
$form->bindParam(6, $enfermedadActual);
$form->bindParam(7, $turno);
$form->bindParam(8, $planTratamiento);
$form->bindParam(9, $fechaProxima);
$form->bindParam(10, $tanner);
$form->bindParam(11, $estudios);
$form->bindParam(12, $noMenstruacion);
$form->bindParam(13, $menstruacion);
$form->bindParam(14, $codigo);
$form->execute();

$pdo->query("DELETE FROM hgc_motivocie10_f056 WHERE hgc_form_f056='$codigo'");
$motivo = $obj->motivo;
$motivo_qs = $pdo->prepare("INSERT INTO hgc_motivocie10_f056 (hgc_form_f056, hgc_cie_f056, hgc_tipo_f056) VALUES (?,?,?)");

foreach ($motivo as $row) {
  $valor = $row->valor;
  $tipo = $row->tipo;

  $motivo_qs->bindParam(1, $codigo);
  $motivo_qs->bindParam(2, $valor);
  $motivo_qs->bindParam(3, $tipo);

  $motivo_qs->execute();
}


if ($form) {
  $pdo->query("UPDATE hgc_turno SET hgc_esta_turno='form', hgc_tipo_form='056' WHERE hgc_id_turno='$turno'");
  echo "201";
}
