<?php
session_start();

include '../../../helpers/conexion.php';

$json = file_get_contents('php://input');
$obj = json_decode($json);

$email = $obj->email;
$password = sha1($obj->password);

$user = $pdo->query("SELECT * FROM hgc_usuario WHERE hgc_user_usu='$email'");

if ($user->rowCount() === 1) {
  $row = $user->fetch();
  $pass = $row['hgc_pass_usu'];

  $_SESSION['87ea5dfc8b8e384d848979496e706390b497e547'] = $row['hgc_codi_usu'];

  if ($password === $pass) {
    $json = array('status'=>200, 'user'=>$row);
    echo json_encode($json);
  } else {
    $json = array('status'=>303);
    echo json_encode($json);
  }

} else {
  $json = array('status'=>404);
  echo json_encode($json);
}
