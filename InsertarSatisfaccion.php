<?php 
require_once './bootstrap.php';
$email= $_POST['email'];
$value_satisfaction= $_POST['value_satisfaction'];
$reasons= $_POST['reasons'];
$reasons_explained= $_POST['reasons_explained'];



$sql="INSERT INTO tdc_user_satisfaction (email,value_satisfaction,reasons,reasons_explained,country) values ('$email','$value_satisfaction','$reasons','$reasons_explained','CO')";

$querie= $mysqli->query($sql);

if ($querie==true) {
		echo 'si';
	}
	else{
		echo 'no';
	}
?>
