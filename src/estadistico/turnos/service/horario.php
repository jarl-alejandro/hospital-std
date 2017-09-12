<?php
include '../../../../helpers/conexion.php';

$doctor = $_GET["doctor"];
$inicio = $_GET["inicio"];
$mes = $_GET['mes'];
$fin = $_GET["fin"];

$array = array();

$qs = $pdo->query("SELECT * FROM hgc_horar_doc WHERE hgc_med_hora='$doctor' AND hgc_mes_hora='$mes'");
$row = $qs->fetch();

$codi = $row["hgc_codi_hora"];

$qs_detail = $pdo->query("SELECT * FROM view_dhor_doc WHERE hgc_dia_det
    BETWEEN '$inicio' AND '$fin' AND hgc_codi_det='$codi' ORDER BY hgc_ent_hora");

while ($detail = $qs_detail->fetch()) {
  $row = array(
    'dia'=>$detail['hgc_dia_det'],
    'entrada'=>$detail['hgc_ent_hora'],
    'salida'=>$detail['hgc_sal_hora'],
    'hora'=>$detail['hgc_hora_det'],
  );
  $array[] = $row;
}

$json = json_encode($array);
echo $json;
