<?php
include '../../../../helpers/conexion.php';
include '../../../../helpers/upload_file.php';
include '../../../../helpers/generar_codigo.php';

$json = file_get_contents('php://input');
$obj = json_decode($json);

$id = $_POST['id'];
$avatar = $_FILES['imagen'];

$codigo = setCode($pdo, 'EM-', 9, 'hgc_empresa', 'hgc_cont_imagen');
$img_equipo = upload_image_large($codigo, "empresa");
updateCode($pdo, 'hgc_cont_imagen');

if ($id == "") {
  $new = $pdo->query("INSERT INTO hgc_empresa (hgc_ava_empr) VALUES ('$img_equipo')");

  $qs = $pdo->query("SELECT hgc_id_empr FROM hgc_empresa");
  $row = $qs->fetch();
  $codigo = $row['hgc_id_empr'];
  $response = array('id'=>$codigo, 'estado'=>'nuevo', 'status'=>'201');

} else {
  $new = $pdo->query("UPDATE hgc_empresa SET hgc_ava_empr='$img_equipo'
                        WHERE hgc_id_empr='$id'");
  $response = array('id'=>0, 'estado'=>'edit', 'status'=>'201');
}
if($new) {
  echo json_encode($response);
}
