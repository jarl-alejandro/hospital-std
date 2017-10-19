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
$historiaClinica = $obj->historiaClinica;
$procedimiento = $obj->procedimiento;
$grupoPrioritado = $obj->grupoPrioritado;
$tamizajeRapido = $obj->tamizajeRapido;

$id = $obj->id;
$turno = $obj->turno;
$hoy = date("Y/m/d");
$hora = date("h:i");

if ($id == "") {
  $new = $pdo->prepare('UPDATE hgc_sigvit SET hgc_pracost_sigvit=?, hgc_prsent_sigvit=?,
    hgc_temp_sigvit=?,   hgc_puls_sigvit=?,  hgc_fre_sigvit=?,     hgc_peso_sigvit=?,
    hgc_talla_sigvit=?,  hgc_imc_sigvit=?,   hgc_percint_sigvit=?, hgc_percad_sigvit=?,
    hgc_perpan_sigvit=?, hgc_resp_sigvit=?,  hgc_fecha_sigvit=?,   hgc_hcli_sigvit=?,
    hgc_hora_sigvit=?, hgc_proc_sigvit=?, hgc_grup_sigvit=?, hgc_tami_sigvit=? WHERE hgc_turno_sigvit=?');

  $new->bindParam(1, $presionAcostada);
  $new->bindParam(2, $presionSentado);
  $new->bindParam(3, $temperatura);
  $new->bindParam(4, $pulso7);
  $new->bindParam(5, $frecuencia);
  $new->bindParam(6, $peso);
  $new->bindParam(7, $talla);
  $new->bindParam(8, $imc);
  $new->bindParam(9, $perimetroCintura);
  $new->bindParam(10, $perimetroCadera);
  $new->bindParam(11, $perimetroPantorrilla);
  $new->bindParam(12, $responsables);
  $new->bindParam(13, $hoy);
  $new->bindParam(14, $historiaClinica);
  $new->bindParam(15, $hora);
  $new->bindParam(16, $procedimiento);
  $new->bindParam(17, $grupoPrioritado);
  $new->bindParam(18, $tamizajeRapido);
  $new->bindParam(19, $turno);

  $new->execute();
  $pdo->query("UPDATE hgc_turno SET hgc_esta_turno='signosVitales' WHERE hgc_id_turno='$turno'");

}
else {
  $new = $pdo->prepare('UPDATE hgc_sigvit SET hgc_pracost_sigvit=?, hgc_prsent_sigvit=?,
    hgc_temp_sigvit=?,  hgc_puls_sigvit=?,    hgc_fre_sigvit=?,    hgc_peso_sigvit=?,   hgc_talla_sigvit=?,
    hgc_imc_sigvit=?,   hgc_percint_sigvit=?, hgc_percad_sigvit=?, hgc_perpan_sigvit=?, hgc_resp_sigvit=?,
    hgc_fecha_sigvit=?, hgc_hcli_sigvit=?,    hgc_hora_sigvit=?, hgc_proc_sigvit=?, hgc_grup_sigvit=?,
    hgc_tami_sigvit=? WHERE hgc_id_sigvit=?');

  $new->bindParam(1, $presionAcostada);
  $new->bindParam(2, $presionSentado);
  $new->bindParam(3, $temperatura);
  $new->bindParam(4, $pulso7);
  $new->bindParam(5, $frecuencia);
  $new->bindParam(6, $peso);
  $new->bindParam(7, $talla);
  $new->bindParam(8, $imc);
  $new->bindParam(9, $perimetroCintura);
  $new->bindParam(10, $perimetroCadera);
  $new->bindParam(11, $perimetroPantorrilla);
  $new->bindParam(12, $responsables);
  $new->bindParam(13, $fecha);
  $new->bindParam(14, $historiaClinica);
  $new->bindParam(15, $hora);
  $new->bindParam(16, $procedimiento);
  $new->bindParam(17, $grupoPrioritado);
  $new->bindParam(18, $tamizajeRapido);
  $new->bindParam(19, $id);

  $new->execute();
}
if ($new) {
  echo 201;
}
