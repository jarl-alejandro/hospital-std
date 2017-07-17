<?php
include '../../../../helpers/conexion.php';

$doctor = $_GET["doctor"];
$inicio = $_GET["inicio"];
$fin = $_GET["fin"];

$array = array();

$qs = $pdo->query("SELECT * FROM hgc_horar_doc WHERE hgc_med_hora='$doctor'");
$row = $qs->fetch();

$codi = $row["hgc_codi_hora"];

$qs_detail = $pdo->query("SELECT * FROM view_dhor_doc WHERE hgc_dia_det
    BETWEEN '$inicio' AND '$fin' AND hgc_codi_det='$codi'");

while ($detail = $qs_detail->fetch()) {
  $row = array(
    'dia'=>$detail['hgc_dia_det'],
    'entrada'=>$detail['hgc_ent_hora'],
    'salida'=>$detail['hgc_sal_hora'],
  );
  $array[] = $row;
}

$json = json_encode($array);
echo $json;
