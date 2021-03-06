<?php session_start();
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
$procedimiento = $obj->procedimiento;
$id = $obj->id;
$grupoPrioritado = $obj->grupoPrioritado;
$tipoForm = $obj->tipoForm;
$hoy = date("Y/m/d");
$hora = date("h:i");
$userId = $_SESSION['87ea5dfc8b8e384d848979496e706390b497e547'];

if ($id == "") {
  $new = $pdo->prepare("UPDATE hgc_sigvit SET hgc_temp_sigvit=?, hgc_frcar_sigvit=?,
    hgc_frresp_sigvit=?, hgc_prart_sigvit=?, hgc_peso_sigvit=?, hgc_talla_sigvit=?,
    hgc_prence_sigvit=?, hgc_esta_sigvit=?, hgc_longi_sigvit=?, hgc_puls_sigvit=?,
    hgc_fecha_sigvit=?, hgc_hcli_sigvit=?, hgc_hora_sigvit=?, hgc_proc_sigvit=?,
    hgc_grup_sigvit=?, hgc_tform_sigvit=?, hgc_enfer_sigvit=? WHERE hgc_turno_sigvit=?");

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
  $new->bindParam(11, $hoy);
  $new->bindParam(12, $historiaClinica);
  $new->bindParam(13, $hora);
  $new->bindParam(14, $procedimiento);
  $new->bindParam(15, $grupoPrioritado);
  $new->bindParam(16, $tipoForm);
  $new->bindParam(17, $userId);
  $new->bindParam(18, $turno);

  $new->execute();
  $pdo->query("UPDATE hgc_turno SET hgc_esta_turno='signosVitales' WHERE hgc_id_turno='$turno'");

}
else {
  $new = $pdo->prepare("UPDATE hgc_sigvit SET hgc_temp_sigvit=?, hgc_frcar_sigvit=?,
    hgc_frresp_sigvit=?, hgc_prart_sigvit=?, hgc_peso_sigvit=?, hgc_talla_sigvit=?,
    hgc_prence_sigvit=?, hgc_esta_sigvit=?, hgc_longi_sigvit=?, hgc_puls_sigvit=?,
    hgc_turno_sigvit=?, hgc_fecha_sigvit=?, hgc_hcli_sigvit=?, hgc_hora_sigvit=?,
    hgc_proc_sigvit=?, hgc_grup_sigvit=?, hgc_enfer_sigvit=? WHERE hgc_id_sigvit=?");

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
  $new->bindParam(14, $hora);
  $new->bindParam(15, $procedimiento);
  $new->bindParam(16, $grupoPrioritado);
  $new->bindParam(17, $userId);
  $new->bindParam(18, $id);

  $new->execute();
}

if ($new) {
  echo 201;
}
