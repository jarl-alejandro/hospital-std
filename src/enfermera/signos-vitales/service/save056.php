<?php
include '../../../../helpers/conexion.php';
date_default_timezone_set('America/Guayaquil');

$json = file_get_contents('php://input');
$obj = json_decode($json);

$imc = $obj->imc;
$frCardica = $obj->frCardica;
$prArterial = $obj->prArterial;
$peso = $obj->peso;
$talla = $obj->talla;
$imc = $obj->imc;

$turno = $obj->turno;
$historiaClinica = $obj->historiaClinica;

$id = $obj->id;

$hoy = date("Y/m/d");
$hora = date("h:i");

if ($id == "") {
  $new = $pdo->prepare("UPDATE hgc_sigvit SET hgc_frcar_sigvit=?, hgc_prart_sigvit=?, hgc_peso_sigvit=?,
    hgc_talla_sigvit=?, hgc_imc_sigvit=?, hgc_fecha_sigvit=?, hgc_hcli_sigvit=?, hgc_hora_sigvit=?
    WHERE hgc_turno_sigvit=?");

  $new->bindParam(1, $frCardica);
  $new->bindParam(2, $prArterial);
  $new->bindParam(3, $peso);
  $new->bindParam(4, $talla);
  $new->bindParam(5, $imc);
  $new->bindParam(6, $hoy);
  $new->bindParam(7, $historiaClinica);
  $new->bindParam(8, $hora);
  $new->bindParam(9, $turno);

  $new->execute();

  $pdo->query("UPDATE hgc_turno SET hgc_esta_turno='signosVitales' WHERE hgc_id_turno='$turno'");
}else {
  $new = $pdo->prepare("UPDATE hgc_sigvit SET hgc_frcar_sigvit=?, hgc_prart_sigvit=?, hgc_peso_sigvit=?,
    hgc_talla_sigvit=?, hgc_imc_sigvit=?, hgc_fecha_sigvit=?, hgc_hcli_sigvit=?, hgc_hora_sigvit=?
    WHERE hgc_id_sigvit=?");

  $new->bindParam(1, $frCardica);
  $new->bindParam(2, $prArterial);
  $new->bindParam(3, $peso);
  $new->bindParam(4, $talla);
  $new->bindParam(5, $imc);
  $new->bindParam(6, $hoy);
  $new->bindParam(7, $historiaClinica);
  $new->bindParam(8, $hora);
  $new->bindParam(9, $id);

  $new->execute();
}

if ($new) {
  echo 201;
}
