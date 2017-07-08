<?php
include '../../../../helpers/conexion.php';

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
$rol = $profesional->rol;
$password = sha1($cedula);
$especialidades = $profesional->especialidades;

$universidad = $profesional->universidad;
$fecha_egreso = $profesional->fecha_egreso;
$fecha_ingreso = $profesional->fecha_ingreso;
$tipoPasante = $profesional->tipoPasante;


$pdo->query("DELETE FROM hgc_det_doc WHERE hgc_doc_det='$cedula'");

$detail = $pdo->prepare("INSERT INTO hgc_det_doc (hgc_doc_det, hgc_esp_det) VALUES (?, ?)");

foreach ($especialidades as $row) {
  $detail->bindParam(1, $cedula);
  $detail->bindParam(2, $row->especialidades);
  $detail->execute();
}

if ($id == "") {

  $pasan = $pdo->prepare("INSERT INTO hgc_pasantes (hgc_ced_pasa, hgc_univ_pasa, hgc_fing_pasa, hgc_fegr_pasa, hgc_tipo_pasa) VALUES (?, ?, ?, ?, ?)");

  $pasan->bindParam(1, $cedula);
  $pasan->bindParam(2, $universidad);
  $pasan->bindParam(3, $fecha_ingreso);
  $pasan->bindParam(4, $fecha_egreso);
  $pasan->bindParam(5, $tipoPasante);

  $pasan->execute();

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

  $newUser = $pdo->prepare("INSERT INTO hgc_usuario (hgc_codi_usu, hgc_user_usu, hgc_pass_usu,
    hgc_rol_usu) VALUES (?, ?, ?, ?)");

  $newUser->bindParam(1, $cedula);
  $newUser->bindParam(2, $email);
  $newUser->bindParam(3, $password);
  $newUser->bindParam(4, $rol);
  $newUser->execute();

}
else {
  $new = $pdo->query("UPDATE hgc_profesionales SET hgc_cedu_profe='$cedula', hgc_nom_profe='$nombre', hgc_ape_profe='$apellido', hgc_celu_profe='$celular', hgc_tele_profe='$telefono', hgc_direc_profe='$direccion', hgc_dni_profe='$dni', hgc_emai_profe='$email', hgc_fecn_profe='$fechaNac', hgc_profe_profe='$profesion', hgc_sexo_profe='$sexo' WHERE hgc_codi_profe='$id'");

  $pdo->query("UPDATE hgc_usuario SET hgc_rol_usu='$rol' WHERE hgc_codi_usu='$cedula'");

  $pdo->query("UPDATE hgc_pasantes set hgc_univ_pasa='$universidad',
     hgc_fing_pasa='$fecha_ingreso', hgc_fegr_pasa='$fecha_egreso',
     hgc_tipo_pasa='$tipoPasante' WHERE hgc_ced_pasa='$cedula'");

}

if ($new) {
  echo 201;
}
