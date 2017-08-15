<?php

try {
  $pdo = new PDO('pgsql:host=localhost;
            port=5432;dbname=hospital',
            'postgres',
            '123456'
          );

    /*$pdo = new PDO('pgsql:host=172.20.19.117
            port=5433;
        dbname=hospital',
        'gabriel.alban',
        'g.a2017');*/
}
catch(PDOException $e) {
  echo $e->getMessage();

}
