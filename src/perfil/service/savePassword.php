<?php
session_start();

include '../../../helpers/conexion.php';

if(isset($_SESSION['87ea5dfc8b8e384d848979496e706390b497e547'])) {
  $id = $_SESSION['87ea5dfc8b8e384d848979496e706390b497e547'];

	$json = file_get_contents('php://input');
	$obj = json_decode($json);
	$pasword = sha1($obj->password1);
	$user = $pdo->query("UPDATE hgc_usuario SET hgc_pass_usu='$pasword' WHERE hgc_codi_usu='$id'");

	if($user) {
		echo 201;
	}
	
}