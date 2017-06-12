<?php
include '../../../../helpers/conexion.php';

$json = file_get_contents('php://input');
$obj = json_decode($json);
$paciente = $obj->pacientes;

$id = $paciente->id;

$cedula = $paciente->cedula;
$nombre = $paciente->nombre;
$apellido = $paciente->apellido;
$celular = $paciente->ceulular;
$telefono = $paciente->telefono;
$direccion = $paciente->direccion;
$dni = $paciente->dni;
$email = $paciente->email;
$fechaNac = $paciente->fechaNac;
$sexo = $paciente->sexo;

if ($id == "") {
  $new = $pdo->prepare("INSERT INTO hgc_paciente (hgc_cedu_pacie, hgc_nom_pacie, hgc_ape_pacie, hgc_celu_pacie, hgc_tele_pacie, hgc_direc_pacie, hgc_dni_pacie, hgc_emai_pacie, hgc_fecn_pacie, hgc_sexo_pacie) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

  $new->bindParam(1, $cedula);
  $new->bindParam(2, $nombre);
  $new->bindParam(3, $apellido);
  $new->bindParam(4, $celular);
  $new->bindParam(5, $telefono);
  $new->bindParam(6, $direccion);
  $new->bindParam(7, $dni);
  $new->bindParam(8, $email);
  $new->bindParam(9, $fechaNac);
  $new->bindParam(10, $sexo);
  $new->execute();

}
else {
  $new = $pdo->query("UPDATE hgc_paciente SET hgc_cedu_pacie='$cedula', hgc_nom_pacie='$nombre', hgc_ape_pacie='$apellido', hgc_celu_pacie='$celular', hgc_tele_pacie='$telefono', hgc_direc_pacie='$direccion', hgc_dni_pacie='$dni', hgc_emai_pacie='$email', hgc_fecn_pacie='$fechaNac', hgc_sexo_pacie='$sexo' WHERE hgc_codi_pacie='$id'");
}


if ($new) {
  echo 201;
}
