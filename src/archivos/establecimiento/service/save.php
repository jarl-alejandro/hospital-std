<?php
include '../../../../helpers/conexion.php';

$json = file_get_contents('php://input');
$obj = json_decode($json);

$id = $obj->id;
$institucion = $obj->institucion;
$tipologia = $obj->tipologia;
$red = $obj->red;
$horas = $obj->horas;
$descripcion = $obj->descripcion;
$direccion = $obj->direccion;
$visible = $obj->visible;
$telefono = $obj->telefono;
$celular = $obj->celular;
$parroquia = $obj->parroquia;

if ($id == "") {
  $new = $pdo->prepare("INSERT INTO hgc_establecimiento (hgc_inst_esta, hgc_tipo_esta,
    hgc_desc_esta, hgc_red_esta, hgc_hate_esta, hgc_dire_esta, hgc_esta_esta, hgc_tele_esta,
    hgc_celu_esta, hgc_parr_esta) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

  $new->bindParam(1, $institucion);
  $new->bindParam(2, $tipologia);
  $new->bindParam(3, $descripcion);
  $new->bindParam(4, $red);
  $new->bindParam(5, $horas);
  $new->bindParam(6, $direccion);
  $new->bindParam(7, $visible);
  $new->bindParam(8, $telefono);
  $new->bindParam(9, $celular);
  $new->bindParam(10, $parroquia);
  $new->execute();
}
else {
  $new = $pdo->query("UPDATE hgc_establecimiento SET hgc_inst_esta='$institucion',
    hgc_tipo_esta='$tipologia', hgc_desc_esta='$descripcion', hgc_red_esta='$red',
    hgc_hate_esta='$horas', hgc_dire_esta='$direccion', hgc_esta_esta='$visible',
    hgc_tele_esta='$telefono', hgc_celu_esta='$celular', hgc_parr_esta='$parroquia'
    WHERE hgc_codi_esta='$id'");
}

if ($new) {
  echo 201;
}
