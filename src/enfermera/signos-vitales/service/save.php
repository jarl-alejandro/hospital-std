<?php
include '../../../../helpers/conexion.php';
date_default_timezone_set('America/Guayaquil');

$json = file_get_contents('php://input');
$obj = json_decode($json);

$temperatura = $obj->temperatura;
$frCardica = $obj->frCardica;
$frRespiratoria = $obj->frRespiratoria;
$prArterial = $obj->prArterial;
$peso = $obj->peso;
$talla = $obj->talla;
$prEncefalico = $obj->prEncefalico;
$estado = $obj->estado;
$longitud = $obj->longitud;
$pulso = $obj->pulso;
$turno = $obj->turno;
$historiaClinica = $obj->historiaClinica;
$hoy = date("Y/m/d");

$new = $pdo->prepare("INSERT INTO hgc_sigvit (hgc_temp_sigvit, hgc_frcar_sigvit, hgc_frresp_sigvit,
  hgc_prart_sigvit, hgc_peso_sigvit, hgc_talla_sigvit, hgc_prence_sigvit, hgc_esta_sigvit, hgc_longi_sigvit,
  hgc_puls_sigvit, hgc_turno_sigvit, hgc_fecha_sigvit, hgc_hcli_sigvit)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

$new->bindParam(1, $temperatura);
$new->bindParam(2, $frCardica);
$new->bindParam(3, $frRespiratoria);
$new->bindParam(4, $prArterial);
$new->bindParam(5, $peso);
$new->bindParam(6, $talla);
$new->bindParam(7, $prEncefalico);
$new->bindParam(8, $estado);
$new->bindParam(9, $longitud);
$new->bindParam(10, $pulso);
$new->bindParam(11, $turno);
$new->bindParam(12, $hoy);
$new->bindParam(13, $historiaClinica);

$new->execute();

if ($new) {
  echo 201;
}
