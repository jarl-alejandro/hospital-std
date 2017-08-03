<?php
include '../../../../helpers/conexion.php';
include '../../../../helpers/generar_codigo.php';

$json = file_get_contents('php://input');
$obj = json_decode($json);

$codigo = setCode($pdo, 'F28C-', 9, 'hgc_form28', 'hgc_cont_form28');
updateCode($pdo, 'hgc_cont_form28');

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

$new = $pdo->prepare("INSERT INTO hgc_form28 (hgc_codi_form28, hgc_moti_form28, hgc_enfer_form28,
  hgc_meto_form28, hgc_clas_form28, hgc_paci_form28, hgc_turno_form28, hgc_antp_form28, hgc_antf_form28) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");

$new->bindParam(1, $codigo);
$new->bindParam(2, $motivo);
$new->bindParam(3, $enfermedad);
$new->bindParam(4, $metodo);
$new->bindParam(5, $clasificacion);
$new->bindParam(6, $paciente);
$new->bindParam(7, $turno);
$new->bindParam(8, $antPersonales);
$new->bindParam(9, $antfamiliares);

$new->execute();

// $pdo->query("UPDATE hgc_turno SET hgc_esta_turno='form' WHERE hgc_id_turno='$turno'");
// Descomentar cuando haya terminado el trabajo

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

if ($new) {
  echo 201;
}
