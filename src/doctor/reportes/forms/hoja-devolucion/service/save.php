<?php
date_default_timezone_set('America/Guayaquil');

include '../../../../helpers/conexion.php';
include '../../../../helpers/generar_codigo.php';

$json = file_get_contents('php://input');
$obj = json_decode($json);

$codigo = setCode($pdo, 'F056-', 9, 'hgc_form056', 'hgc_cont_form056');
updateCode($pdo, 'hgc_cont_form056');

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

$form->bindParam(1, $codigo);
$form->bindParam(2, $paciente);
$form->bindParam(3, $numeroConsulta);
$form->bindParam(4, $hoy);
$form->bindParam(5, $companion);
$form->bindParam(6, $civilStatus);
$form->bindParam(7, $enfermedadActual);
$form->bindParam(8, $turno);
$form->bindParam(9, $planTratamiento);
$form->bindParam(10, $fechaProxima);
$form->bindParam(11, $tanner);
$form->bindParam(12, $estudios);
$form->bindParam(13, $noMenstruacion);
$form->bindParam(14, $menstruacion);
$form->execute();

$estado = 'solicitud';
$tipoTurno = 'subsecuente';
$doctorTurno = $obj->doctorTurno;

if ($fechaProxima != '') {
  $new = $pdo->prepare("INSERT INTO hgc_turno (hgc_paci_turno, hgc_doct_turno, hgc_esta_turno,
    hgc_fech_turno, hgc_tipo_turno) VALUES (?, ?, ?, ?, ?)");

    $new->bindParam(1, $paciente);
    $new->bindParam(2, $doctorTurno);
    $new->bindParam(3, $estado);
    $new->bindParam(4, $fechaProxima);
    $new->bindParam(5, $tipoTurno);
    $new->execute();
}

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
  $stamp = date('Y-m-d H:i:s');
  $pdo->query("UPDATE hgc_turno SET hgc_esta_turno='form', hgc_tipo_form='hojadev', hgc_fecha_consulta='$stamp'
    WHERE hgc_id_turno='$turno'");
  echo "201";
}
