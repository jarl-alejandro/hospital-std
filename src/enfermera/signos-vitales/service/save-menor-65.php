<?php
include '../../../../helpers/conexion.php';
date_default_timezone_set('America/Guayaquil');

$json = file_get_contents('php://input');
$obj = json_decode($json);

$id = $obj->id;
$turno = $obj->turno;
$historiaClinica = $obj->historiaClinica;

$temperatura = $obj->temperatura;
$presionArterial = $obj->presionArterial;
$pulso = $obj->pulso;
$frecuencia = $obj->frecuencia;
$peso = $obj->peso;
$talla = $obj->talla;
$procedimiento = $obj->procedimiento;
$grupoPrioritado = $obj->grupoPrioritado;

$hoy = date("Y/m/d");
$hora = date("h:i");

if ($id == "") {
  $new = $pdo->prepare('UPDATE hgc_sigvit SET hgc_temp_sigvit=?, hgc_prart_sigvit=?,
    hgc_puls_sigvit=?,  hgc_fre_sigvit=?,  hgc_peso_sigvit=?,
    hgc_talla_sigvit=?,  hgc_fecha_sigvit=?, hgc_hcli_sigvit=?,
    hgc_hora_sigvit=?, hgc_proc_sigvit=?, hgc_grup_sigvit=? WHERE hgc_turno_sigvit=?');

  $new->bindParam(1, $temperatura);
  $new->bindParam(2, $presionArterial);
  $new->bindParam(3, $pulso);
  $new->bindParam(4, $frecuencia);
  $new->bindParam(5, $peso);
  $new->bindParam(6, $talla);
  $new->bindParam(7, $hoy);
  $new->bindParam(8, $historiaClinica);
  $new->bindParam(9, $hora);
  $new->bindParam(10, $procedimiento);
  $new->bindParam(11, $grupoPrioritado);
  $new->bindParam(12, $turno);

  $new->execute();
  $pdo->query("UPDATE hgc_turno SET hgc_esta_turno='signosVitales' WHERE hgc_id_turno='$turno'");
}
else {

  $new = $pdo->prepare('UPDATE hgc_sigvit SET hgc_temp_sigvit=?, hgc_prart_sigvit=?,
    hgc_puls_sigvit=?,  hgc_fre_sigvit=?,  hgc_peso_sigvit=?,
    hgc_talla_sigvit=?, hgc_fecha_sigvit=?, hgc_hcli_sigvit=?,
    hgc_hora_sigvit=?, hgc_proc_sigvit=?,
    hgc_grup_sigvit=?   WHERE hgc_id_sigvit=?');

    $new->bindParam(1, $temperatura);
    $new->bindParam(2, $presionArterial);
    $new->bindParam(3, $pulso);
    $new->bindParam(4, $frecuencia);
    $new->bindParam(5, $peso);
    $new->bindParam(6, $talla);
    $new->bindParam(7, $hoy);
    $new->bindParam(8, $historiaClinica);
    $new->bindParam(9, $hora);
    $new->bindParam(10, $procedimiento);
    $new->bindParam(11, $grupoPrioritado);
    $new->bindParam(12, $id);

    $new->execute();
}

if ($new) {
  echo 201;
}
