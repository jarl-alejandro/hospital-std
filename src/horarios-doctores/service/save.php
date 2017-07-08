<?php
include '../../../helpers/conexion.php';
include '../../../helpers/generar_codigo.php';

$json = file_get_contents('php://input');
$obj = json_decode($json);

$codigo = setCode($pdo, 'HAD-', 9, 'hgc_horar_doc', 'hgc_cont_horario');
updateCode($pdo, 'hgc_cont_horario');

$medico = $obj->medicos;
$consultorio = $obj->consultorio;
$mes = $obj->mes;
$horarios = $obj->horarios;
$year = date('Y');
/*
  codigo medico, consultorio, mes
  id rel dia, hora
*/
$new = $pdo->prepare("INSERT INTO hgc_horar_doc (hgc_codi_hora, hgc_med_hora, hgc_consu_hora,
        hgc_mes_hora, hgc_yea_hora) values (?, ?, ?, ?, ?)");

$new->bindParam(1, $codigo);
$new->bindParam(2, $medico);
$new->bindParam(3, $consultorio);
$new->bindParam(4, $mes);
$new->bindParam(5, $year);

$new->execute();

$detail = $pdo->prepare("INSERT INTO hgc_dhor_asig (hgc_codi_det, hgc_dia_det, hgc_hora_det)
                          VALUES (?, ?, ?)");

foreach ($horarios as $row) {
  $hora = $row->codigo;
  $dia = $row->dia;

  $detail->bindParam(1, $codigo);
  $detail->bindParam(2, $dia);
  $detail->bindParam(3, $hora);

  $detail->execute();
}

if ($new) {
  echo 201;
}
