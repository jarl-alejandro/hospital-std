<?php
include '../../../../helpers/conexion.php';
date_default_timezone_set('America/Guayaquil');

$json = file_get_contents('php://input');
$obj = json_decode($json);

$alertaRiesgo = $obj->alertaRiesgo;
$antecedentePersonales = $obj->antecedentePersonales;
$antecedentesPersoanles2 = $obj->antecedentesPersoanles2;
$cesareas = $obj->cesareas;
$clinicoQuirurgicos = $obj->clinicoQuirurgicos;
$edadMenopausia = $obj->edadMenopausia;
$edadUltimaCitologia = $obj->edadUltimaCitologia;
$edadUltimaMamografia = $obj->edadUltimaMamografia;
$edadUltimoProstatico = $obj->edadUltimoProstatico;
$embarazos = $obj->embarazos;
$enfermedad = $obj->enfermedad;
$estadoGeneral = $obj->estadoGeneral;
$examenFisico = $obj->examenFisico;
$farcologicos = $obj->farcologicos;
$ginecoObstretricos = $obj->ginecoObstretricos;
$habitosNocivos = $obj->habitosNocivos;
$medicamento = $obj->medicamento;
$motivo = $obj->motivo;
$partos = $obj->partos;
$pruebasDiagnostico = $obj->pruebasDiagnostico;
$revisionSistema = $obj->revisionSistema;
$sindromeGeriatricos = $obj->sindromeGeriatricos;
$terapia = $obj->terapia;
$terapiaHormonal = $obj->terapiaHormonal;
$tratamiento = $obj->tratamiento;
$parametrosFisicos = $obj->parametrosFisicos;

$cie10 = $obj->cie10;

$id = $obj->id;

$qs = $pdo->prepare(
  "UPDATE hgc_form_ma65 SET hgc_alri_ma65=?, hgc_antper_ma65=?, hgc_antper2_ma65=?,
  hgc_ces_ma65=?, hgc_cliqui_ma65=?, hgc_edmen_ma65=?, hgc_educit_ma65=?, hgc_edumam_ma65=?,
  hgc_edupro_ma65=?, hgc_emb_ma65=?, hgc_enferm_ma65=?, hgc_estge_ma65=?, hgc_exafi_ma65=?,
  hgc_farc_ma65=?, hgc_gineob_ma65=?, hgc_habnoc_ma65=?, hgc_medi_ma65=?, hgc_moti_ma65=?,
  hgc_part_ma65=?, hgc_prueb_ma65=?, hgc_revsis_ma65=?, hgc_sisgeri_ma65=?, hgc_terap_ma65=?,
  hgc_terhor_ma65=?, hgc_tratamiento_ma65=? WHERE hgc_codi_ma65=?"
);

$qs->bindParam(1, $alertaRiesgo);
$qs->bindParam(2, $antecedentePersonales);
$qs->bindParam(3, $antecedentesPersoanles2);
$qs->bindParam(4, $cesareas);
$qs->bindParam(5, $clinicoQuirurgicos);
$qs->bindParam(6, $edadMenopausia);
$qs->bindParam(7, $edadUltimaCitologia);
$qs->bindParam(8, $edadUltimaMamografia);
$qs->bindParam(9, $edadUltimoProstatico);
$qs->bindParam(10, $embarazos);
$qs->bindParam(11, $enfermedad);
$qs->bindParam(12, $estadoGeneral);
$qs->bindParam(13, $examenFisico);
$qs->bindParam(14, $farcologicos);
$qs->bindParam(15, $ginecoObstretricos);
$qs->bindParam(16, $habitosNocivos);
$qs->bindParam(17, $medicamento);
$qs->bindParam(18, $motivo);
$qs->bindParam(19, $partos);
$qs->bindParam(20, $pruebasDiagnostico);
$qs->bindParam(21, $revisionSistema);
$qs->bindParam(22, $sindromeGeriatricos);
$qs->bindParam(23, $terapia);
$qs->bindParam(24, $terapiaHormonal);
$qs->bindParam(25, $tratamiento);
$qs->bindParam(26, $id);

$qs->execute();

$pdo->query("DELETE FROM hgc_detail_ma65 WHERE hgc_form_ma65='$id'");

$detail = $pdo->prepare(
  "INSERT INTO hgc_detail_ma65 (hgc_form_ma65, hgc_cie_ma65, hgc_tip_ma65, hgc_det_ma65) VALUES (?,?,?,?)"
);

foreach ($cie10 as $row) {
  $cie = $row->cie;
  $tipo = $row->check;
  $detalle = $row->detalle;

  $detail->bindParam(1, $id);
  $detail->bindParam(2, $cie);
  $detail->bindParam(3, $tipo);
  $detail->bindParam(4, $detalle);

  $detail->execute();
}

$pdo->query("DELETE FROM hgc_params_ma65 WHERE hgc_form_ma65='$id'");
$params = $pdo->prepare(
  "INSERT INTO hgc_params_ma65 (hgc_name_ma65, hgc_form_ma65, hgc_tipo_ma65)
  VALUES (?, ?, ?)"
);

foreach ($parametrosFisicos as $item) {
  $name = $item->name;
  $tipo = $item->tipo;

  $params->bindParam(1, $name);
  $params->bindParam(2, $id);
  $params->bindParam(3, $tipo);
  $params->execute();
}

if ($qs) {
  echo 201;
}
