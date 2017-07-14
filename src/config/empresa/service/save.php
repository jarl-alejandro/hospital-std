<?php
include '../../../../helpers/conexion.php';

$json = file_get_contents('php://input');
$obj = json_decode($json);

$empresa = $obj->empresa;
$direccion = $obj->direccion;
$telefono = $obj->telefono;
$fax = $obj->fax;
$eslogan = $obj->eslogan;
$mision = $obj->mision;
$vision = $obj->vision;
$id = $obj->id;

if ($id == "") {
  $new = $pdo->prepare("INSERT INTO hgc_empresa (hgc_nom_empr, hgc_dir_empr, hgc_tel_empr,
    hgc_fax_empr, hgc_esl_empr, hgc_mis_empr, hgc_vis_empr) VALUES (?,?,?,?,?,?,?)");

  $new->bindParam(1, $empresa);
  $new->bindParam(2, $direccion);
  $new->bindParam(3, $telefono);
  $new->bindParam(4, $fax);
  $new->bindParam(5, $eslogan);
  $new->bindParam(6, $mision);
  $new->bindParam(7, $vision);

  $new->execute();

} else {
  $new = $pdo->prepare("UPDATE hgc_empresa SET hgc_nom_empr=?, hgc_dir_empr=?,
    hgc_tel_empr=?, hgc_fax_empr=?, hgc_esl_empr=?, hgc_mis_empr=?, hgc_vis_empr=?
    WHERE hgc_id_empr=?");

  $new->bindParam(1, $empresa);
  $new->bindParam(2, $direccion);
  $new->bindParam(3, $telefono);
  $new->bindParam(4, $fax);
  $new->bindParam(5, $eslogan);
  $new->bindParam(6, $mision);
  $new->bindParam(7, $vision);
  $new->bindParam(8, $id);

  $new->execute();
}
if ($new) {
  echo 201;
}
