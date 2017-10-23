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
$arterialAcostado = $obj->arterialAcostado;
$arterialSentado = $obj->arterialSentado;
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
$frecuenciaRespirar = $obj->frecuenciaRespirar;
$ginecoObstretricos = $obj->ginecoObstretricos;
$habitosNocivos = $obj->habitosNocivos;
$imc = $obj->imc;
$medicamento = $obj->medicamento;
$motivo = $obj->motivo;
$partos = $obj->partos;
$perimetroCadera = $obj->perimetroCadera;
$perimetroPantorrilla = $obj->perimetroPantorrilla;
$peso = $obj->peso;
$pruebasDiagnostico = $obj->pruebasDiagnostico;
$pulso = $obj->pulso;
$responsables = $obj->responsables;
$revisionSistema = $obj->revisionSistema;
$sindromeGeriatricos = $obj->sindromeGeriatricos;
$talla = $obj->talla;
$tamizajePapido = $obj->tamizajePapido;
$temperatura = $obj->temperatura;
$terapia = $obj->terapia;
$terapiaHormonal = $obj->terapiaHormonal;
$tratamiento = $obj->tratamiento;

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
  hgc_arac_ma65, hgc_arsen_ma65, hgc_ces_ma65, hgc_cliqui_ma65, hgc_edmen_ma65, hgc_educit_ma65,
  hgc_edumam_ma65, hgc_edupro_ma65, hgc_emb_ma65, hgc_enferm_ma65, hgc_estge_ma65, hgc_exafi_ma65,
  hgc_farc_ma65, hgc_frere_ma65, hgc_gineob_ma65, hgc_habnoc_ma65, hgc_imc_ma65, hgc_medi_ma65,
  hgc_moti_ma65, hgc_part_ma65, hgc_perca_ma65, hgc_perpan_ma65, hgc_peso_ma65, hgc_prueb_ma65,
  hgc_pulso_ma65, hgc_resp_ma65, hgc_revsis_ma65, hgc_sisgeri_ma65, hgc_talla_ma65, hgc_tami_ma65,
  hgc_temp_ma65, hgc_terap_ma65, hgc_terhor_ma65, hgc_tratamiento_ma65, hgc_fet_ma65, hgc_pac_ma65,
  hgc_turno_ma65)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
  ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
);

$qs->bindParam(1, $codigo);
$qs->bindParam(2, $alertaRiesgo);
$qs->bindParam(3, $antecedentePersonales);
$qs->bindParam(4, $antecedentesPersoanles2);
$qs->bindParam(5, $arterialAcostado);
$qs->bindParam(6, $arterialSentado);
$qs->bindParam(7, $cesareas);

$qs->bindParam(8, $clinicoQuirurgicos);
$qs->bindParam(9, $edadMenopausia);
$qs->bindParam(10, $edadUltimaCitologia);
$qs->bindParam(11, $edadUltimaMamografia);
$qs->bindParam(12, $edadUltimoProstatico);
$qs->bindParam(13, $embarazos);
$qs->bindParam(14, $enfermedad);
$qs->bindParam(15, $estadoGeneral);
$qs->bindParam(16, $examenFisico);
$qs->bindParam(17, $farcologicos);
$qs->bindParam(18, $frecuenciaRespirar);
$qs->bindParam(19, $ginecoObstretricos);
$qs->bindParam(20, $habitosNocivos);
$qs->bindParam(21, $imc);
$qs->bindParam(22, $medicamento);
$qs->bindParam(23, $motivo);
$qs->bindParam(24, $partos);
$qs->bindParam(25, $perimetroCadera);
$qs->bindParam(26, $perimetroPantorrilla);
$qs->bindParam(27, $peso);
$qs->bindParam(28, $pruebasDiagnostico);
$qs->bindParam(29, $pulso);
$qs->bindParam(30, $responsables);
$qs->bindParam(31, $revisionSistema);
$qs->bindParam(32, $sindromeGeriatricos);
$qs->bindParam(33, $talla);
$qs->bindParam(34, $tamizajePapido);
$qs->bindParam(35, $temperatura);
$qs->bindParam(36, $terapia);
$qs->bindParam(37, $terapiaHormonal);
$qs->bindParam(38, $tratamiento);
$qs->bindParam(39, $hoy);
$qs->bindParam(40, $paciente);
$qs->bindParam(41, $turno);

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

if ($qs) {
  echo 201;
}
