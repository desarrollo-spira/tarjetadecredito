<?php 
require_once './bootstrap.php';
$correo= $_POST['Correo'];



$sql="INSERT INTO correos (mail,fecha) values ('$correo',now())";

$querie= $mysqli->query($sql);

if ($querie==true) {
		echo 'si';
	}
	else{
		echo 'no';
	}
?>
