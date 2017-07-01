<?php
session_start();

include '../../../helpers/conexion.php';
include '../../../helpers/upload_file.php';
include '../../../helpers/generar_codigo.php';

if(isset($_SESSION['87ea5dfc8b8e384d848979496e706390b497e547'])) {
  $id = $_SESSION['87ea5dfc8b8e384d848979496e706390b497e547'];

	$avatar = $_FILES['imagen'];
	$codigo = setCode($pdo, 'AV-', 9, 'hgc_usuario', 'hgc_cont_imagen');
	$img_equipo = upload_image($codigo, "avatar");

	updateCode($pdo, 'hgc_cont_imagen');

	$user = $pdo->query("UPDATE hgc_profesionales SET hgc_avat_profe='$img_equipo' 
												WHERE hgc_cedu_profe='$id'");

	if($user) {
		echo 201;
	}
	
}