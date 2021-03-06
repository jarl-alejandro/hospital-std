<?php
include '../../../../helpers/conexion.php';
include '../../../../helpers/generar_codigo.php';
date_default_timezone_set('America/Guayaquil');

$json = file_get_contents('php://input');
$obj = json_decode($json);

$codigo = $obj->id;
$motivo = $obj->motivo;
$enfermedad = $obj->enfermedad;
$metodo = $obj->metodo;
$clasificacion = $obj->clasificacion;
$antfamiliares = $obj->antfamiliares;
$antPersonales = $obj->antPersonales;

$sistemas = $obj->sistemas;
$fisicos = $obj->fisicos;
$paciente = $obj->paciente;
$turno = $obj->turno;
$planTratamiento = $obj->planTratamiento;

$planTratamiento = $obj->planTratamiento;
$ci10 = $obj->ci10;
$prescripcion = $obj->prescripcion;

// $new = $pdo->prepare("INSERT INTO hgc_form28 (hgc_codi_form28, hgc_moti_form28, hgc_enfer_form28,
//    hgc_meto_form28, hgc_clas_form28, hgc_paci_form28, hgc_turno_form28, hgc_antp_form28, hgc_antf_form28,
//    hgc_pltra_form28) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

$new = $pdo->prepare("UPDATE hgc_form28 SET hgc_moti_form28=?, hgc_enfer_form28=?,
  hgc_meto_form28=?, hgc_clas_form28=?, hgc_paci_form28=?, hgc_turno_form28=?, hgc_antp_form28=?, hgc_antf_form28=?,
  hgc_pltra_form28=? WHERE hgc_codi_form28=?");

$new->bindParam(1, $motivo);
$new->bindParam(2, $enfermedad);
$new->bindParam(3, $metodo);
$new->bindParam(4, $clasificacion);
$new->bindParam(5, $paciente);
$new->bindParam(6, $turno);
$new->bindParam(7, $antPersonales);
$new->bindParam(8, $antfamiliares);
$new->bindParam(9, $planTratamiento);
$new->bindParam(10, $codigo);

$new->execute();

// $stamp = date('Y-m-d H:i:s');
$pdo->query("UPDATE hgc_turno SET hgc_esta_turno='form', hgc_tipo_form='form28C' WHERE hgc_id_turno='$turno'");
// Descomentar cuando haya terminado el trabajo

$pdo->query("DELETE FROM hgc_dform28 WHERE hgc_form_dform28='$codigo'");

$detail = $pdo->prepare("INSERT INTO hgc_dform28 (hgc_form_dform28, hgc_codi_dform28, hgc_tipo_dform28,
  hgc_obser_dform28) VALUES (?, ?, ?, ?)");

foreach ($sistemas as $row) {
  $id = $row->id;
  $tipo = $row->tipo;
  $observacion = $row->observacion;

  $detail->bindParam(1, $codigo);
  $detail->bindParam(2, $id);
  $detail->bindParam(3, $tipo);
  $detail->bindParam(4, $observacion);

  $detail->execute();
}

foreach ($fisicos as $row) {
  $id = $row->id;
  $tipo = $row->tipo;
  $observacion = $row->observacion;

  $detail->bindParam(1, $codigo);
  $detail->bindParam(2, $id);
  $detail->bindParam(3, $tipo);
  $detail->bindParam(4, $observacion);

  $detail->execute();
}

$pdo->query("DELETE FROM hgc_focie WHERE hgc_form_fci='$codigo'");

$cief = $pdo->prepare('INSERT INTO hgc_focie (hgc_form_fci, hgc_cie_fci, hgc_val_fci) VALUES (?,?,?)');

foreach ($ci10 as $row) {
  $codigoCie = $row->codigo;
  $value = $row->value;

  $cief->bindParam(1, $codigo);
  $cief->bindParam(2, $codigoCie);
  $cief->bindParam(3, $value);
  $cief->execute();
}

$pdo->query("DELETE FROM hgc_presc WHERE hgc_codi_presc='$codigo'");
$pres = $pdo->prepare('INSERT INTO hgc_presc (hgc_fec_presc, hgc_hor_presc, hgc_nota_presc,
  hgc_det_presc, hgc_codi_presc) VALUES (?, ?, ?, ?, ?)');

$pres->bindParam(1, $prescripcion->fecha);
$pres->bindParam(2, $prescripcion->tiempo);
$pres->bindParam(3, $prescripcion->nota);
$pres->bindParam(4, $prescripcion->prescipcion);
$pres->bindParam(5, $codigo);

$pres->execute();

if ($new) {
  echo 201;
}
