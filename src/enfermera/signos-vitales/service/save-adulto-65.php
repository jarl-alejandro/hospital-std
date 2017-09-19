<?php
include '../../../../helpers/conexion.php';
date_default_timezone_set('America/Guayaquil');

$json = file_get_contents('php://input');
$obj = json_decode($json);

$presionAcostada = $obj->presionAcostada;
$presionSentado = $obj->presionSentado;
$temperatura = $obj->temperatura;
$pulso7 = $obj->pulso7;
$frecuencia = $obj->frecuencia;
$peso = $obj->peso;
$talla = $obj->talla;
$imc = $obj->imc;
$perimetroCintura = $obj->perimetroCintura;
$perimetroCadera = $obj->perimetroCadera;
$perimetroPantorrilla = $obj->perimetroPantorrilla;
$responsables = $obj->responsables;

$id = $obj->id;

if ($id == "") {
  $new = $pdo->prepare('INSERT INTO hgc_sigvit (hgc_pracost_sigvit, hgc_prsent_sigvit, hgc_temp_sigvit, hgc_puls_sigvit,
   hgc_imc_sigvit, hgc_fecha_sigvit,
  hgc_hcli_sigvit, hgc_hora_sigvit, hgc_imc_sigvit) VALUES ()');
}