<?php

function upload_image ($codeImage, $routeImage) {
  $imagen = $_FILES['imagen']['name'];
  $imagen = $codeImage . ".png";
  $ruta = $_FILES["imagen"]["tmp_name"];
  $destino = "../../../media/$routeImage/$imagen";
  copy($ruta, $destino);
  return $imagen;
}

function upload_image_large ($codeImage, $routeImage) {
  $imagen = $_FILES['imagen']['name'];
  $imagen = $codeImage . ".png";
  $ruta = $_FILES["imagen"]["tmp_name"];
  $destino = "../../../../media/$routeImage/$imagen";
  copy($ruta, $destino);
  return $imagen;
}

function upload_pdf ($codeFile, $fileName, $routeFile) {
  $file = $_FILES[$fileName];
  $file = $codeFile . ".pdf";
  $ruta = $_FILES[$fileName]["tmp_name"];
  $destino = $routeFile."/".$file;
  copy($ruta, $destino);
  return $file;
}