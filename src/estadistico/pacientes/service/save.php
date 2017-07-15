<?php
session_start();

include '../../../../helpers/conexion.php';
include '../../../../helpers/ubicacion.php';

date_default_timezone_set('America/Guayaquil');

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
$ubicacion = ubicacion_fisica_historial($apellido, $pdo);
$apertura = date("Y-m-d");
$hora = date("h:i:s");
$user = $_SESSION['87ea5dfc8b8e384d848979496e706390b497e547'];

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

  $hcli = $pdo->prepare("INSERT INTO hgc_hclinica (hgc_histo_hcli, hgc_ubica_hcli, hgc_aper_hcli,
                            hgc_hora_hcli, hgc_user_hcli) VALUES (?, ?, ?, ?, ?)");
  $hcli->bindParam(1, $cedula);
  $hcli->bindParam(2, $ubicacion);
  $hcli->bindParam(3, $apertura);
  $hcli->bindParam(4, $hora);
  $hcli->bindParam(5, $user);
  $hcli->execute();
}
else {
  $new = $pdo->query("UPDATE hgc_paciente SET hgc_cedu_pacie='$cedula', hgc_nom_pacie='$nombre', hgc_ape_pacie='$apellido', hgc_celu_pacie='$celular', hgc_tele_pacie='$telefono', hgc_direc_pacie='$direccion', hgc_dni_pacie='$dni', hgc_emai_pacie='$email', hgc_fecn_pacie='$fechaNac', hgc_sexo_pacie='$sexo' WHERE hgc_codi_pacie='$id'");
}


if ($new) {
  echo 201;
}
