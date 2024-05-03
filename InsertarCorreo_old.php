<?php
require_once './bootstrap.php';
require_once './src/Correo.php';

if(isset($_POST['correo'])){
    $correo = new Correo();
    //$correo->setMail("henrrygd@yahoo.com");
    $correo->setMail($_POST['correo']);
    $correo->setFecha(new \DateTime);

    $entityManager->persist($correo);
    $entityManager->flush();

    echo "True";
}else{
    echo "False";
}
