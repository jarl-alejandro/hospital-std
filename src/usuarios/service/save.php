<?php
include '../../../helpers/conexion.php';

$json = file_get_contents('php://input');
$obj = json_decode($json);
$profesional = $obj->profesional;

$id = $profesional->id;

$cedula = $profesional->cedula;
$nombre = $profesional->nombre;
$apellido = $profesional->apellido;
$celular = $profesional->ceulular;
$telefono = $profesional->telefono;
$direccion = $profesional->direccion;
$dni = $profesional->dni;
$email = $profesional->email;
$fechaNac = $profesional->fechaNac;
$profesion = $profesional->profesion;
$sexo = $profesional->sexo;



if ($id == "") {
  $new = $pdo->prepare("INSERT INTO hgc_profesionales (hgc_cedu_profe, hgc_nom_profe, hgc_ape_profe, hgc_celu_profe, hgc_tele_profe, hgc_direc_profe, hgc_dni_profe, hgc_emai_profe, hgc_fecn_profe, hgc_profe_profe, hgc_sexo_profe) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

  $new->bindParam(1, $cedula);
  $new->bindParam(2, $nombre);
  $new->bindParam(3, $apellido);
  $new->bindParam(4, $celular);
  $new->bindParam(5, $telefono);
  $new->bindParam(6, $direccion);
  $new->bindParam(7, $dni);
  $new->bindParam(8, $email);
  $new->bindParam(9, $fechaNac);
  $new->bindParam(10, $profesion);
  $new->bindParam(11, $sexo);
  $new->execute();


}
else {
  $new = $pdo->query("UPDATE hgc_profesionales SET hgc_cedu_profe='$cedula', hgc_nom_profe='$nombre', hgc_ape_profe='$apellido', hgc_celu_profe='$celular', hgc_tele_profe='$telefono', hgc_direc_profe='$direccion', hgc_dni_profe='$dni', hgc_emai_profe='$email', hgc_fecn_profe='$fechaNac', hgc_profe_profe='$profesion', hgc_sexo_profe='$sexo' WHERE hgc_codi_profe='$id'");
}


if ($new) {
  echo 201;
}
