<?php

function upload_image ($codeImage, $routeImage) {
  $imagen = $_FILES['imagen']['name'];
  $imagen = $codeImage . ".png";
  $ruta = $_FILES["imagen"]["tmp_name"];
  $destino = "../../../media/$routeImage/$imagen";
  copy($ruta, $destino);
  return $imagen;
}