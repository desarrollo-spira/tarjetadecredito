<?php 
require_once './bootstrap.php';
$correo= $_POST['Correo'];



$sql="INSERT INTO tdc_correos (mail,fecha,country) values ('$correo',now(),'CO')";

$querie= $mysqli->query($sql);

if ($querie==true) {
		echo 'si';
	}
	else{
		echo 'no';
	}
?>
