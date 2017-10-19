<?php
include '../../../../helpers/conexion.php';
include '../../../../helpers/generar_codigo.php';
date_default_timezone_set('America/Guayaquil');

$json = file_get_contents('php://input');
$obj = json_decode($json);

$codigo = setCode($pdo, 'SL-', 9, 'hgc_solicitud', 'hgc_cont_solicitud');
updateCode($pdo, 'hgc_cont_solicitud');

$paciente = $obj->paciente;
$especialidad = $obj->especialidad;
$medico = $obj->medico;
$tipo = $obj->tipo;
$fecha = $obj->fecha;
$estado = 'false';

$qs = $pdo->prepare("INSERT INTO hgc_solicitud (hgc_cod_soli, hgc_pac_soli, hgc_esps_soli, hgc_med_soli,
  hgc_tip_soli, hgc_fet_soli, hgc_est_soli) VALUES (?, ?, ?, ?, ?, ?, ?)");

$qs->bindParam(1, $codigo);
$qs->bindParam(2, $paciente);
$qs->bindParam(3, $especialidad);
$qs->bindParam(4, $medico);
$qs->bindParam(5, $tipo);
$qs->bindParam(6, $fecha);
$qs->bindParam(7, $estado);

$qs->execute();

if ($qs) {
  echo 201;
}
