<?php session_start();
date_default_timezone_set('America/Guayaquil');

include '../../../../helpers/conexion.php';

$json = file_get_contents('php://input');
$obj = json_decode($json);

$imc = $obj->imc;
$frCardica = $obj->frCardica;
$prArterial = $obj->prArterial;
$peso = $obj->peso;
$talla = $obj->talla;
$imc = $obj->imc;
$procedimiento = $obj->procedimiento;
$grupoPrioritado = $obj->grupoPrioritado;

$turno = $obj->turno;
$historiaClinica = $obj->historiaClinica;

$id = $obj->id;

$hoy = date("Y/m/d");
$year = date("Y");
$hora = date("h:i");
$tipoForm = 'form056';
$userId = $_SESSION['87ea5dfc8b8e384d848979496e706390b497e547'];

if ($id == "") {
  $new = $pdo->prepare("UPDATE hgc_sigvit SET hgc_frcar_sigvit=?, hgc_prart_sigvit=?,
    hgc_peso_sigvit=?, hgc_talla_sigvit=?, hgc_imc_sigvit=?, hgc_fecha_sigvit=?,
    hgc_hcli_sigvit=?, hgc_hora_sigvit=?, hgc_yea_sigvit=?, hgc_proc_sigvit=?,
    hgc_grup_sigvit=?, hgc_tform_sigvit=?, hgc_enfer_sigvit=? WHERE hgc_turno_sigvit=?");

  $new->bindParam(1, $frCardica);
  $new->bindParam(2, $prArterial);
  $new->bindParam(3, $peso);
  $new->bindParam(4, $talla);
  $new->bindParam(5, $imc);
  $new->bindParam(6, $hoy);
  $new->bindParam(7, $historiaClinica);
  $new->bindParam(8, $hora);
  $new->bindParam(9, $year);
  $new->bindParam(10, $procedimiento);
  $new->bindParam(11, $grupoPrioritado);
  $new->bindParam(12, $tipoForm);
  $new->bindParam(13, $userId);
  $new->bindParam(14, $turno);

  $new->execute();

  $pdo->query("UPDATE hgc_turno SET hgc_esta_turno='signosVitales' WHERE hgc_id_turno='$turno'");
}else {
  $new = $pdo->prepare("UPDATE hgc_sigvit SET hgc_frcar_sigvit=?, hgc_prart_sigvit=?,
    hgc_peso_sigvit=?, hgc_talla_sigvit=?, hgc_imc_sigvit=?, hgc_fecha_sigvit=?,
    hgc_hcli_sigvit=?, hgc_hora_sigvit=?, hgc_proc_sigvit=?, hgc_grup_sigvit=?, hgc_enfer_sigvit=?
    WHERE hgc_id_sigvit=?");

  $new->bindParam(1, $frCardica);
  $new->bindParam(2, $prArterial);
  $new->bindParam(3, $peso);
  $new->bindParam(4, $talla);
  $new->bindParam(5, $imc);
  $new->bindParam(6, $hoy);
  $new->bindParam(7, $historiaClinica);
  $new->bindParam(8, $hora);
  $new->bindParam(9, $procedimiento);
  $new->bindParam(10, $grupoPrioritado);
  $new->bindParam(11, $userId);
  $new->bindParam(12, $id);

  $new->execute();
}

if ($new) {
  echo 201;
}
