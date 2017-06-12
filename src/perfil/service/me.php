<?php
session_start();

include '../../../helpers/conexion.php';

if(isset($_SESSION['87ea5dfc8b8e384d848979496e706390b497e547'])) {
  $id = $_SESSION['87ea5dfc8b8e384d848979496e706390b497e547'];

  $user = $pdo->query("SELECT * FROM view_user WHERE hgc_cedu_profe='$id'");
  $row = $user->fetch();

  $json = array('status'=>200, 'user'=>$row);
  echo json_encode($json);
} else {
  $json = array('status'=>404);
  echo json_encode($json);
}
