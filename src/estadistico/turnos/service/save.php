<?php
include '../../../../helpers/conexion.php';

$json = file_get_contents('php://input');
$obj = json_decode($json);

$paciente = $obj->paciente;
$doctor = $obj->doctor;
$fecha = $obj->fecha;
$horaInicio = $obj->horaInicio;
$horaFin = $obj->horaFin;
$interconsulta = $obj->interconsulta;
$id = $obj->id;
$estado = 'desactive';

if ($id == "") {
  $new = $pdo->prepare("INSERT INTO hgc_turno (hgc_paci_turno, hgc_doct_turno, hgc_esta_turno,
    hgc_fech_turno, hgc_hini_turno, hgc_fin_turno, hgc_inter_turno) VALUES (?, ?, ?, ?, ?, ?, ?)");

  $new->bindParam(1, $paciente);
  $new->bindParam(2, $doctor);
  $new->bindParam(3, $estado);
  $new->bindParam(4, $fecha);
  $new->bindParam(5, $horaInicio);
  $new->bindParam(6, $horaFin);
  $new->bindParam(7, $interconsulta);
  $new->execute();
}
else {}

if ($new) {
  echo 201;
}
