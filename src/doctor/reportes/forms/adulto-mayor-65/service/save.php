<?php
include '../../../../helpers/conexion.php';
include '../../../../helpers/generar_codigo.php';
date_default_timezone_set('America/Guayaquil');

$json = file_get_contents('php://input');
$obj = json_decode($json);

$codigo = setCode($pdo, 'FMA65-', 9, 'hgc_form_ma65', 'hgc_cont_ma65');
updateCode($pdo, 'hgc_cont_ma65');

$stamp = date('Y-m-d H:i:s');

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

$paciente = $obj->paciente;
$turno = $obj->turno;
$hoy = date("Y/m/d");
$cie10 = $obj->cie10;

$pdo->query(
  "UPDATE hgc_turno SET hgc_esta_turno='form', hgc_tipo_form='may65', hgc_fecha_consulta='$stamp'
  WHERE hgc_id_turno='$turno'"
);

$qs = $pdo->prepare(
  "INSERT INTO hgc_form_ma65 (hgc_codi_ma65, hgc_alri_ma65, hgc_antper_ma65, hgc_antper2_ma65,
  hgc_ces_ma65, hgc_cliqui_ma65, hgc_edmen_ma65, hgc_educit_ma65, hgc_edumam_ma65, hgc_edupro_ma65,
  hgc_emb_ma65, hgc_enferm_ma65, hgc_estge_ma65, hgc_exafi_ma65, hgc_farc_ma65, hgc_gineob_ma65,
  hgc_habnoc_ma65, hgc_medi_ma65, hgc_moti_ma65, hgc_part_ma65, hgc_prueb_ma65, hgc_revsis_ma65,
  hgc_sisgeri_ma65, hgc_terap_ma65, hgc_terhor_ma65, hgc_tratamiento_ma65, hgc_fet_ma65,
  hgc_pac_ma65, hgc_turno_ma65)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
);

$qs->bindParam(1, $codigo);
$qs->bindParam(2, $alertaRiesgo);
$qs->bindParam(3, $antecedentePersonales);
$qs->bindParam(4, $antecedentesPersoanles2);
$qs->bindParam(5, $cesareas);
$qs->bindParam(6, $clinicoQuirurgicos);
$qs->bindParam(7, $edadMenopausia);
$qs->bindParam(8, $edadUltimaCitologia);
$qs->bindParam(9, $edadUltimaMamografia);
$qs->bindParam(10, $edadUltimoProstatico);
$qs->bindParam(11, $embarazos);
$qs->bindParam(12, $enfermedad);
$qs->bindParam(13, $estadoGeneral);
$qs->bindParam(14, $examenFisico);
$qs->bindParam(15, $farcologicos);
$qs->bindParam(16, $ginecoObstretricos);
$qs->bindParam(17, $habitosNocivos);
$qs->bindParam(18, $medicamento);
$qs->bindParam(19, $motivo);
$qs->bindParam(20, $partos);
$qs->bindParam(21, $pruebasDiagnostico);
$qs->bindParam(22, $revisionSistema);
$qs->bindParam(23, $sindromeGeriatricos);
$qs->bindParam(24, $terapia);
$qs->bindParam(25, $terapiaHormonal);
$qs->bindParam(26, $tratamiento);
$qs->bindParam(27, $hoy);
$qs->bindParam(28, $paciente);
$qs->bindParam(29, $turno);

$qs->execute();

$detail = $pdo->prepare(
  "INSERT INTO hgc_detail_ma65 (hgc_form_ma65, hgc_cie_ma65, hgc_tip_ma65, hgc_det_ma65) VALUES (?,?,?,?)"
);

foreach ($cie10 as $row) {
  $cie = $row->cie;
  $tipo = $row->check;
  $detalle = $row->detalle;

  $detail->bindParam(1, $codigo);
  $detail->bindParam(2, $cie);
  $detail->bindParam(3, $tipo);
  $detail->bindParam(4, $detalle);

  $detail->execute();
}

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
